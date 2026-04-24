"use client";

import Link from "next/link";
import {
  PageHeader,
  Eyebrow,
  EditorialCard,
  RuleEditorial,
  Tag,
} from "@/components/ui/editorial";
import { useLocale } from "@/lib/i18n";
import {
  Keyboard,
  Eye,
  MessageSquare,
  FileCheck,
  Languages,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const COPY = {
  en: {
    eyebrow: "Accessibility · WCAG 2.1 AA",
    title: "Accessibility is a design constraint, not a finishing step.",
    lede: "This atlas is built to meet WCAG 2.1 Level AA. Every feature is keyboard-accessible, color-independent, screen-reader friendly, and tested at mobile and desktop widths.",
    tags: ["WCAG 2.1 AA", "Keyboard accessible", "Screen reader tested", "Color-independent"],
    conformance: {
      eyebrow: "Conformance target",
      title: "WCAG 2.1 Level AA",
      body: "Every public page in this atlas aims for Level AA conformance across the four POUR principles: perceivable, operable, understandable, robust. Known gaps are listed below. If you find a new issue, please report it.",
      items: [
        {
          icon: "eye",
          title: "Perceivable",
          body: "All meaningful images have text alternatives. Every choropleth has a numeric legend so data reads without color. Contrast ratios meet or exceed AA for body text and UI controls.",
        },
        {
          icon: "keyboard",
          title: "Operable",
          body: "Everything that works with a mouse works with a keyboard. Tab order follows reading order. Visible focus rings appear on every interactive element. No time-based content requires a response.",
        },
        {
          icon: "filecheck",
          title: "Understandable",
          body: "Plain-language headings and ledes. The atlas is available in English, Spanish, and Polish. Errors are announced to assistive technology.",
        },
        {
          icon: "shield",
          title: "Robust",
          body: "Semantic HTML with proper landmarks, headings, and ARIA only where HTML alone is insufficient. Tested in NVDA, VoiceOver, and recent Chromium and WebKit browsers.",
        },
      ],
    },
    keyboard: {
      eyebrow: "Keyboard shortcuts",
      title: "Use the atlas without a mouse.",
      items: [
        { key: "Tab / Shift+Tab", body: "Move focus forward / backward through interactive elements." },
        { key: "Enter / Space", body: "Activate the focused button, link, or control." },
        { key: "⌘K · Ctrl+K", body: "Open global search from anywhere in the atlas." },
        { key: "Esc", body: "Close search, language menu, or modal overlays." },
        { key: "Arrow keys", body: "Navigate within menus, map, and chart tooltips." },
      ],
    },
    known: {
      eyebrow: "Known limitations",
      title: "What still needs work.",
      body: "This is an early demonstration and a few gaps remain. They are tracked and will be addressed before public launch.",
      items: [
        "Leaflet map keyboard controls are functional but not yet surfaced with visible keyboard hints on first focus.",
        "Recharts tooltips are mouse-reachable; we are adding a tabular alternative beneath every chart for non-mouse users.",
        "driver.js guided tour on first visit is dismissible but a text-only alternative will be added on the Data & Methods page.",
        "Polish translation was completed programmatically; a native-speaker review is scheduled before public launch.",
      ],
    },
    report: {
      eyebrow: "Report a barrier",
      title: "If something doesn’t work for you, tell us.",
      body: "The best accessibility work comes from people who actually use the atlas. If you encounter a barrier, we want to hear about it and fix it.",
      email: "access@kanehealth.org",
      phone: "(630) 208-2273",
    },
  },
  es: {
    eyebrow: "Accesibilidad · WCAG 2.1 AA",
    title: "La accesibilidad es una restricción de diseño, no un paso final.",
    lede: "Este atlas está construido para cumplir con WCAG 2.1 Nivel AA. Cada función es accesible con el teclado, independiente del color, compatible con lectores de pantalla y probada en anchos móvil y escritorio.",
    tags: ["WCAG 2.1 AA", "Accesible por teclado", "Probado con lector de pantalla", "Independiente del color"],
    conformance: {
      eyebrow: "Objetivo de conformidad",
      title: "WCAG 2.1 Nivel AA",
      body: "Cada página pública de este atlas busca cumplir el Nivel AA en los cuatro principios POUR: perceptible, operable, comprensible, robusto. Las limitaciones conocidas se enumeran abajo. Si encuentra un problema nuevo, por favor repórtelo.",
      items: [
        {
          icon: "eye",
          title: "Perceptible",
          body: "Todas las imágenes significativas tienen alternativas textuales. Cada mapa coroplético tiene leyenda numérica para leer los datos sin color. Las relaciones de contraste cumplen o superan el Nivel AA para texto y controles.",
        },
        {
          icon: "keyboard",
          title: "Operable",
          body: "Todo lo que funciona con ratón funciona con teclado. El orden de tabulación sigue el orden de lectura. Anillos de foco visibles aparecen en cada elemento interactivo. Ningún contenido basado en tiempo requiere respuesta.",
        },
        {
          icon: "filecheck",
          title: "Comprensible",
          body: "Encabezados y entradas en lenguaje claro. El atlas está disponible en inglés, español y polaco. Los errores se anuncian a la tecnología de asistencia.",
        },
        {
          icon: "shield",
          title: "Robusto",
          body: "HTML semántico con landmarks, encabezados y ARIA solo cuando HTML por sí solo es insuficiente. Probado en NVDA, VoiceOver y navegadores Chromium y WebKit recientes.",
        },
      ],
    },
    keyboard: {
      eyebrow: "Atajos de teclado",
      title: "Use el atlas sin ratón.",
      items: [
        { key: "Tab / Shift+Tab", body: "Mueva el foco hacia adelante / hacia atrás entre elementos interactivos." },
        { key: "Enter / Espacio", body: "Active el botón, enlace o control enfocado." },
        { key: "⌘K · Ctrl+K", body: "Abra la búsqueda global desde cualquier lugar del atlas." },
        { key: "Esc", body: "Cierre la búsqueda, el menú de idioma o las superposiciones modales." },
        { key: "Flechas", body: "Navegue dentro de menús, mapa y tooltips de gráficos." },
      ],
    },
    known: {
      eyebrow: "Limitaciones conocidas",
      title: "Qué queda por mejorar.",
      body: "Esta es una demostración temprana y quedan algunas brechas. Están rastreadas y se abordarán antes del lanzamiento público.",
      items: [
        "Los controles de teclado del mapa Leaflet son funcionales pero aún no se muestran con indicaciones visibles al primer foco.",
        "Los tooltips de Recharts son accesibles con ratón; estamos agregando una alternativa tabular debajo de cada gráfico para usuarios sin ratón.",
        "El recorrido guiado driver.js al primer visita se puede descartar, pero se añadirá una alternativa solo texto en la página de Datos y Métodos.",
        "La traducción al polaco se completó de forma programática; una revisión por hablante nativo está programada antes del lanzamiento público.",
      ],
    },
    report: {
      eyebrow: "Reportar una barrera",
      title: "Si algo no funciona para usted, díganoslo.",
      body: "El mejor trabajo de accesibilidad proviene de personas que realmente usan el atlas. Si encuentra una barrera, queremos saberlo y corregirlo.",
      email: "access@kanehealth.org",
      phone: "(630) 208-2273",
    },
  },
  pl: {
    eyebrow: "Dostępność · WCAG 2.1 AA",
    title: "Dostępność to ograniczenie projektowe, a nie krok końcowy.",
    lede: "Ten atlas jest zbudowany zgodnie z WCAG 2.1 Poziom AA. Każda funkcja jest dostępna z klawiatury, niezależna od koloru, przyjazna czytnikom ekranu i przetestowana w szerokościach mobilnych i desktopowych.",
    tags: ["WCAG 2.1 AA", "Dostępne z klawiatury", "Przetestowane z czytnikiem", "Niezależne od koloru"],
    conformance: {
      eyebrow: "Cel zgodności",
      title: "WCAG 2.1 Poziom AA",
      body: "Każda publiczna strona tego atlasu dąży do zgodności z Poziomem AA w czterech zasadach POUR: postrzegalność, obsługiwalność, zrozumiałość, solidność. Znane luki są wymienione poniżej. Jeśli znajdziesz nowy problem, zgłoś go.",
      items: [
        {
          icon: "eye",
          title: "Postrzegalność",
          body: "Wszystkie znaczące obrazy mają alternatywy tekstowe. Każdy kartogram ma legendę numeryczną, aby dane czytały się bez koloru. Kontrasty spełniają lub przewyższają Poziom AA dla tekstu i kontrolek.",
        },
        {
          icon: "keyboard",
          title: "Obsługiwalność",
          body: "Wszystko, co działa z myszą, działa z klawiaturą. Kolejność Tab odpowiada kolejności czytania. Widoczne pierścienie focusa pojawiają się na każdym elemencie interaktywnym. Żadna treść oparta na czasie nie wymaga odpowiedzi.",
        },
        {
          icon: "filecheck",
          title: "Zrozumiałość",
          body: "Nagłówki i ledy w prostym języku. Atlas dostępny w języku angielskim, hiszpańskim i polskim. Błędy są ogłaszane technologiom wspomagającym.",
        },
        {
          icon: "shield",
          title: "Solidność",
          body: "Semantyczny HTML z właściwymi landmarkami, nagłówkami i ARIA tylko tam, gdzie sam HTML nie wystarcza. Przetestowane w NVDA, VoiceOver oraz nowszych przeglądarkach Chromium i WebKit.",
        },
      ],
    },
    keyboard: {
      eyebrow: "Skróty klawiaturowe",
      title: "Korzystaj z atlasu bez myszy.",
      items: [
        { key: "Tab / Shift+Tab", body: "Przesuń focus do przodu / do tyłu między elementami interaktywnymi." },
        { key: "Enter / Spacja", body: "Aktywuj skupiony przycisk, link lub kontrolkę." },
        { key: "⌘K · Ctrl+K", body: "Otwórz wyszukiwanie globalne z dowolnego miejsca atlasu." },
        { key: "Esc", body: "Zamknij wyszukiwanie, menu języka lub nakładki modalne." },
        { key: "Strzałki", body: "Poruszaj się w menu, mapie i tooltipach wykresów." },
      ],
    },
    known: {
      eyebrow: "Znane ograniczenia",
      title: "Co jeszcze wymaga pracy.",
      body: "To wczesna demonstracja i pozostaje kilka luk. Są śledzone i zostaną rozwiązane przed publiczną premierą.",
      items: [
        "Kontrolki klawiaturowe mapy Leaflet są funkcjonalne, ale jeszcze nie wyświetlają się z widocznymi wskazówkami przy pierwszym focusie.",
        "Tooltipy Recharts są dostępne myszą; dodajemy alternatywę tabelaryczną pod każdym wykresem dla użytkowników bez myszy.",
        "Wycieczka driver.js przy pierwszej wizycie jest odwoływalna, ale alternatywa tekstowa zostanie dodana na stronie Dane i metody.",
        "Tłumaczenie polskie zostało wykonane programowo; przegląd przez native speakera jest zaplanowany przed publiczną premierą.",
      ],
    },
    report: {
      eyebrow: "Zgłoś barierę",
      title: "Jeśli coś ci nie działa, daj nam znać.",
      body: "Najlepsza praca nad dostępnością pochodzi od osób, które faktycznie używają atlasu. Jeśli napotkasz barierę, chcemy o tym wiedzieć i to naprawić.",
      email: "access@kanehealth.org",
      phone: "(630) 208-2273",
    },
  },
} as const;

const ICONS: Record<string, LucideIcon> = {
  eye: Eye,
  keyboard: Keyboard,
  filecheck: FileCheck,
  shield: ShieldCheck,
};

export default function AccessibilityPage() {
  const { locale } = useLocale();
  const copy = COPY[locale] ?? COPY.en;

  return (
    <div>
      <PageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            {copy.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        }
      />

      {/* Conformance */}
      <section className="bg-paper py-14">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-10">
            <div className="md:col-span-5">
              <Eyebrow>{copy.conformance.eyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-kane-blue-ink leading-tight">
                {copy.conformance.title}
              </h2>
              <p className="mt-4 max-w-md text-sm text-ink-soft leading-relaxed">
                {copy.conformance.body}
              </p>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
              {copy.conformance.items.map((it) => {
                const Icon = ICONS[it.icon] ?? Eye;
                return (
                  <EditorialCard key={it.title} className="p-5">
                    <Icon size={20} className="text-kane-amber" />
                    <h3 className="mt-3 font-display text-lg text-kane-blue-ink">{it.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{it.body}</p>
                  </EditorialCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard */}
      <section className="bg-white border-t border-b border-rule py-14">
        <div className="container mx-auto">
          <div className="mb-8 flex items-start gap-4">
            <Keyboard size={32} className="text-kane-amber mt-1" />
            <div>
              <Eyebrow>{copy.keyboard.eyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight">
                {copy.keyboard.title}
              </h2>
            </div>
          </div>
          <RuleEditorial className="mb-8" />
          <dl className="grid md:grid-cols-2 gap-x-10 gap-y-5">
            {copy.keyboard.items.map((k) => (
              <div key={k.key} className="flex items-baseline gap-4 border-b border-rule pb-3">
                <dt>
                  <kbd className="inline-block rounded-sm border border-kane-blue-ink bg-paper px-2 py-1 font-mono text-[11px] tracking-tight text-kane-blue-ink whitespace-nowrap">
                    {k.key}
                  </kbd>
                </dt>
                <dd className="text-sm text-ink-soft leading-relaxed">{k.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Known limitations */}
      <section className="bg-paper py-14">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Eyebrow>{copy.known.eyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight">
                {copy.known.title}
              </h2>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">{copy.known.body}</p>
            </div>
            <ul className="md:col-span-8 space-y-0 border-t border-rule">
              {copy.known.items.map((it, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-5 py-5 border-b border-rule items-baseline"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-kane-amber tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-ink text-pretty">{it}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="bg-kane-blue-ink text-white py-14">
        <div className="container mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Eyebrow className="text-kane-amber">{copy.report.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-paper leading-tight text-balance">
              {copy.report.title}
            </h2>
            <p className="mt-4 max-w-lg text-white/70 leading-relaxed">{copy.report.body}</p>
          </div>
          <div className="md:col-span-5 space-y-4">
            <a
              href={`mailto:${copy.report.email}`}
              className="flex items-center gap-3 border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <MessageSquare size={18} className="text-kane-amber" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                  Email
                </div>
                <div className="font-display text-lg text-paper">{copy.report.email}</div>
              </div>
            </a>
            <a
              href={`tel:${copy.report.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <Languages size={18} className="text-kane-amber" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                  KCHD · EN / ES
                </div>
                <div className="font-display text-lg text-paper">{copy.report.phone}</div>
              </div>
            </a>
            <Link
              href="/sources"
              className="block border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Related
              </div>
              <div className="font-display text-lg text-paper">
                {locale === "es"
                  ? "Metodología y fuentes →"
                  : locale === "pl"
                    ? "Metodologia i źródła →"
                    : "Methodology & Sources →"}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
