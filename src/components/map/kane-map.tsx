"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { FeatureCollection, Feature } from "geojson";
import type { LeafletMouseEvent, PathOptions } from "leaflet";
import type L from "leaflet";
import { SEQUENTIAL_PALETTE } from "@/lib/utils";

const INDICATOR_META: Record<
  string,
  { label: string; unit: string; min: number; max: number; interpretation: "higher-worse" | "higher-better" }
> = {
  diabetes: { label: "Adults with diabetes", unit: "%", min: 6, max: 18, interpretation: "higher-worse" },
  obesity: { label: "Adults with obesity", unit: "%", min: 22, max: 42, interpretation: "higher-worse" },
  hypertension: { label: "Adults with hypertension", unit: "%", min: 22, max: 38, interpretation: "higher-worse" },
  uninsured: { label: "Adults uninsured", unit: "%", min: 3, max: 22, interpretation: "higher-worse" },
  no_primary_care: { label: "No personal doctor", unit: "%", min: 6, max: 26, interpretation: "higher-worse" },
  mental_distress: { label: "Frequent mental distress", unit: "%", min: 16, max: 32, interpretation: "higher-worse" },
  infant_mortality: { label: "Infant mortality", unit: " / 1,000", min: 3, max: 11, interpretation: "higher-worse" },
  overdose: { label: "Overdose deaths", unit: " / 100k", min: 14, max: 35, interpretation: "higher-worse" },
  svi: { label: "CDC Social Vulnerability Index", unit: "", min: 0, max: 1, interpretation: "higher-worse" },
};

export function KaneMap({
  indicator,
  svi,
}: {
  indicator: string;
  svi: boolean;
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

  const getColor = (v: number, min: number, max: number) => {
    const pct = Math.max(0, Math.min(1, (v - min) / (max - min)));
    const bucket = Math.min(SEQUENTIAL_PALETTE.length - 1, Math.floor(pct * SEQUENTIAL_PALETTE.length));
    return SEQUENTIAL_PALETTE[bucket];
  };

  const style = (feature?: Feature): PathOptions => {
    if (!feature) return {};
    const props = feature.properties ?? {};
    const v = (props as Record<string, number>)[indicator] ?? 0;
    return {
      fillColor: getColor(v, meta.min, meta.max),
      weight: 0.5,
      opacity: 1,
      color: "rgba(8, 110, 159, 0.4)",
      fillOpacity: 0.82,
    };
  };

  const sviStyle = (feature?: Feature): PathOptions => {
    if (!feature) return {};
    const v = (feature.properties as Record<string, number>)?.svi ?? 0;
    // high SVI = more hatched/amber overlay
    return {
      fillColor: "transparent",
      stroke: true,
      color: v > 0.7 ? "rgba(219, 117, 44, 0.9)" : v > 0.5 ? "rgba(219, 117, 44, 0.5)" : "transparent",
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

  return (
    <div className="relative h-full w-full bg-paper-deep">
      <MapContainer
        center={[41.935, -88.43]}
        zoom={10}
        scrollWheelZoom
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        {tracts && (
          <GeoJSON
            key={indicator + String(svi)}
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
            {(hovered.properties as any)?.name}
          </p>
          <p className="mt-1 font-mono text-[10px] text-ink-soft/70">
            GEOID {(hovered.properties as any)?.geoid} · pop.{" "}
            {((hovered.properties as any)?.population ?? 0).toLocaleString()}
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display tnum text-3xl text-kane-blue-ink leading-none">
              {(hovered.properties as any)?.[indicator]}
            </span>
            <span className="font-display text-base text-ink-soft">{meta.unit}</span>
          </div>
          <p className="mt-1 text-xs text-ink-soft">{meta.label}</p>
          <div className="mt-3 pt-3 border-t border-rule grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="font-mono uppercase text-[9px] tracking-[0.12em] text-ink-soft/70">SVI</span>
              <div className="font-display tnum text-kane-blue-ink">
                {(hovered.properties as any)?.svi?.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="font-mono uppercase text-[9px] tracking-[0.12em] text-ink-soft/70">% Latino</span>
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
