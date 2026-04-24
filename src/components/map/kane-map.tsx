"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { FeatureCollection, Feature } from "geojson";
import type { LeafletMouseEvent, PathOptions } from "leaflet";
import type L from "leaflet";
import { SEQUENTIAL_PALETTE } from "@/lib/utils";
import { DEMO_LABELS, DemographicSlice, EQUITY_BY_INDICATOR } from "@/lib/data";

const INDICATOR_META: Record<
  string,
  { label: string; unit: string; min: number; max: number; equityKey?: string }
> = {
  diabetes: { label: "Adults with diabetes", unit: "%", min: 6, max: 20, equityKey: "diabetes" },
  obesity: { label: "Adults with obesity", unit: "%", min: 22, max: 46, equityKey: "obesity" },
  hypertension: { label: "Adults with hypertension", unit: "%", min: 22, max: 42 },
  uninsured: { label: "Adults uninsured", unit: "%", min: 3, max: 26 },
  no_primary_care: {
    label: "No personal doctor",
    unit: "%",
    min: 6,
    max: 28,
    equityKey: "no-primary-care",
  },
  mental_distress: {
    label: "Frequent mental distress",
    unit: "%",
    min: 16,
    max: 36,
    equityKey: "mental-distress",
  },
  infant_mortality: {
    label: "Infant mortality",
    unit: " / 1,000",
    min: 3,
    max: 12,
    equityKey: "infant-mortality",
  },
  overdose: {
    label: "Overdose deaths",
    unit: " / 100k",
    min: 14,
    max: 38,
    equityKey: "overdose",
  },
  svi: { label: "CDC Social Vulnerability Index", unit: "", min: 0, max: 1 },
};

type GeoLevel = "county" | "municipality" | "zip" | "tract" | "planning-area";

export function KaneMap({
  indicator,
  svi,
  geoLevel,
  demographic,
}: {
  indicator: string;
  svi: boolean;
  geoLevel: GeoLevel;
  demographic: DemographicSlice;
}) {
  const [tracts, setTracts] = useState<FeatureCollection | null>(null);
  const [hovered, setHovered] = useState<Feature | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    fetch("/data/kane-county-tracts.geojson")
      .then((r) => r.json())
      .then(setTracts);
  }, []);

  const meta = INDICATOR_META[indicator] ?? INDICATOR_META.diabetes;

  // Compute demographic ratio (slice value / overall value) from equity data
  const demoRatio = useMemo(() => {
    if (demographic === "overall") return 1;
    const key = meta.equityKey ?? indicator;
    const data = EQUITY_BY_INDICATOR[key];
    if (!data) return 1;
    const overall = data.find((d) => d.slice === "overall")?.value ?? 1;
    const slice = data.find((d) => d.slice === demographic)?.value;
    if (!slice || !overall) return 1;
    return slice / overall;
  }, [demographic, indicator, meta.equityKey]);

  // Compute aggregates by PA / municipality / ZIP
  const aggregates = useMemo(() => {
    if (!tracts) return null;
    const sums: {
      pa: Record<string, { total: number; pop: number }>;
      muni: Record<string, { total: number; pop: number }>;
      zip: Record<string, { total: number; pop: number }>;
      county: { total: number; pop: number };
    } = {
      pa: {},
      muni: {},
      zip: {},
      county: { total: 0, pop: 0 },
    };
    tracts.features.forEach((f) => {
      const p = f.properties as Record<string, any>;
      const v = (p[indicator] ?? 0) as number;
      const pop = (p.population ?? 1) as number;
      const pa = p.pa as string;
      const muni = p.municipality as string;
      const zip = p.zip as string;
      const weighted = v * pop;
      if (!sums.pa[pa]) sums.pa[pa] = { total: 0, pop: 0 };
      sums.pa[pa].total += weighted;
      sums.pa[pa].pop += pop;
      if (!sums.muni[muni]) sums.muni[muni] = { total: 0, pop: 0 };
      sums.muni[muni].total += weighted;
      sums.muni[muni].pop += pop;
      if (!sums.zip[zip]) sums.zip[zip] = { total: 0, pop: 0 };
      sums.zip[zip].total += weighted;
      sums.zip[zip].pop += pop;
      sums.county.total += weighted;
      sums.county.pop += pop;
    });
    const avg = (s: { total: number; pop: number }) => (s.pop ? s.total / s.pop : 0);
    return {
      pa: Object.fromEntries(Object.entries(sums.pa).map(([k, v]) => [k, avg(v)])),
      muni: Object.fromEntries(Object.entries(sums.muni).map(([k, v]) => [k, avg(v)])),
      zip: Object.fromEntries(Object.entries(sums.zip).map(([k, v]) => [k, avg(v)])),
      county: avg(sums.county),
    };
  }, [tracts, indicator]);

  const getDisplayValue = (f: Feature): number => {
    const p = (f.properties ?? {}) as Record<string, any>;
    const raw = (p[indicator] ?? 0) as number;
    let base: number;
    if (!aggregates) base = raw;
    else if (geoLevel === "county") base = aggregates.county;
    else if (geoLevel === "planning-area") base = aggregates.pa[p.pa] ?? raw;
    else if (geoLevel === "municipality") base = aggregates.muni[p.municipality] ?? raw;
    else if (geoLevel === "zip") base = aggregates.zip[p.zip] ?? raw;
    else base = raw;
    return base * demoRatio;
  };

  const getColor = (v: number) => {
    const pct = Math.max(0, Math.min(1, (v - meta.min) / (meta.max - meta.min)));
    const bucket = Math.min(
      SEQUENTIAL_PALETTE.length - 1,
      Math.floor(pct * SEQUENTIAL_PALETTE.length)
    );
    return SEQUENTIAL_PALETTE[bucket];
  };

  const style = (feature?: Feature): PathOptions => {
    if (!feature) return {};
    const v = getDisplayValue(feature);
    const isAggregate =
      geoLevel === "county" ||
      geoLevel === "planning-area" ||
      geoLevel === "municipality" ||
      geoLevel === "zip";
    return {
      fillColor: getColor(v),
      weight: isAggregate ? 0 : 0.4,
      opacity: 1,
      color: isAggregate ? "transparent" : "rgba(8, 110, 159, 0.25)",
      fillOpacity: 0.85,
    };
  };

  const sviStyle = (feature?: Feature): PathOptions => {
    if (!feature) return {};
    const v = (feature.properties as Record<string, number>)?.svi ?? 0;
    return {
      fillColor: "transparent",
      stroke: true,
      color:
        v > 0.7
          ? "rgba(219, 117, 44, 0.9)"
          : v > 0.5
            ? "rgba(219, 117, 44, 0.5)"
            : "transparent",
      weight: v > 0.7 ? 2 : v > 0.5 ? 1 : 0,
      dashArray: "4 2",
    };
  };

  const onEach = (feature: Feature, layer: L.Layer) => {
    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const l = e.target as L.Path;
        l.setStyle({ weight: 2, color: "rgb(21, 52, 82)", fillOpacity: 0.95 });
        l.bringToFront();
        setHovered(feature);
      },
      mouseout: () => {
        geoJsonRef.current?.resetStyle(layer as any);
        setHovered(null);
      },
    });
  };

  const geoLabel = (f: Feature): string => {
    const p = (f.properties ?? {}) as Record<string, any>;
    if (geoLevel === "county") return "Kane County (all tracts)";
    if (geoLevel === "planning-area") {
      const paNames: Record<string, string> = {
        "pa-east": "East Kane · Aurora corridor",
        "pa-north": "North Kane · Elgin corridor",
        "pa-south": "South Kane · rural south",
        "pa-west": "West Kane · Hampshire / Burlington",
        "pa-central": "Central Kane · unincorporated",
      };
      return paNames[p.pa] ?? p.pa;
    }
    if (geoLevel === "municipality") {
      const muniNames: Record<string, string> = {
        aurora: "Aurora",
        elgin: "Elgin",
        geneva: "Geneva",
        "st-charles": "St. Charles",
        batavia: "Batavia",
        carpentersville: "Carpentersville",
        "west-dundee": "West Dundee",
        "south-elgin": "South Elgin",
        unincorporated: "Unincorporated Kane County",
      };
      return muniNames[p.municipality] ?? p.municipality;
    }
    if (geoLevel === "zip") return `ZIP ${p.zip}`;
    return p.name ?? `Tract ${p.tract}`;
  };

  return (
    <div className="relative h-full w-full bg-paper-deep">
      <MapContainer
        center={[41.935, -88.43]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        {tracts && aggregates && (
          <GeoJSON
            key={`${indicator}-${geoLevel}-${demographic}-${String(svi)}`}
            data={tracts}
            style={style}
            onEachFeature={onEach}
            ref={(r) => {
              geoJsonRef.current = r as any;
            }}
          />
        )}
        {tracts && svi && (
          <GeoJSON
            key={"svi-" + indicator}
            data={tracts}
            style={sviStyle}
            interactive={false}
          />
        )}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          attribution=""
          opacity={0.9}
        />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 border border-rule p-4 max-w-[280px] shadow-editorial-lg">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
          Indicator
        </p>
        <p className="mt-1 font-display text-sm text-kane-blue-ink leading-tight">
          {meta.label}
        </p>
        {demographic !== "overall" && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-kane-amber">
            × {demoRatio.toFixed(2)} · {DEMO_LABELS[demographic].en}
          </p>
        )}
        <div className="mt-3 flex h-3 w-full">
          {SEQUENTIAL_PALETTE.map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-soft">
          <span>
            {meta.min}
            {meta.unit}
          </span>
          <span>
            {meta.max}
            {meta.unit}
          </span>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
          Colored by{" "}
          {geoLevel === "county"
            ? "county aggregate"
            : geoLevel === "planning-area"
              ? "Planning Area"
              : geoLevel === "municipality"
                ? "municipality"
                : geoLevel === "zip"
                  ? "ZIP"
                  : "census tract"}
        </p>
        {svi && (
          <div className="mt-3 pt-3 border-t border-rule">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-kane-amber">
              SVI overlay active
            </p>
            <p className="mt-1 text-[11px] leading-snug text-ink-soft">
              Dashed amber outline marks tracts with Social Vulnerability Index &gt; 0.5.
            </p>
          </div>
        )}
      </div>

      {/* Hover card */}
      {hovered && (
        <div className="absolute top-4 right-4 z-[400] bg-white border border-kane-blue-ink p-4 max-w-[280px] shadow-editorial-lg pointer-events-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
            {geoLabel(hovered)}
          </p>
          {geoLevel === "tract" && (
            <p className="mt-1 font-mono text-[10px] text-ink-soft/70">
              GEOID {(hovered.properties as any)?.geoid} · pop.{" "}
              {((hovered.properties as any)?.population ?? 0).toLocaleString()}
            </p>
          )}
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display tnum text-3xl text-kane-blue-ink leading-none">
              {getDisplayValue(hovered).toFixed(1)}
            </span>
            <span className="font-display text-base text-ink-soft">{meta.unit}</span>
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {meta.label}
            {demographic !== "overall" && (
              <span className="block mt-0.5 text-kane-amber">
                {DEMO_LABELS[demographic].en}
              </span>
            )}
          </p>
          <div className="mt-3 pt-3 border-t border-rule grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="font-mono uppercase text-[9px] tracking-[0.12em] text-ink-soft/70">
                SVI
              </span>
              <div className="font-display tnum text-kane-blue-ink">
                {(hovered.properties as any)?.svi?.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="font-mono uppercase text-[9px] tracking-[0.12em] text-ink-soft/70">
                % Latino
              </span>
              <div className="font-display tnum text-kane-blue-ink">
                {(hovered.properties as any)?.pct_latino?.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
