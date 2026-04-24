"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";

const TOUR_COPY = {
  en: {
    welcome: {
      title: "Welcome to the Kane County Community Health Atlas",
      description:
        "A short tour of what this atlas delivers: six public sections, an interactive map, equity views, a custom report builder, and a secure staff workspace. Built specifically for Kane County.",
    },
    nav: {
      title: "Six public sections",
      description:
        "Overview, an interactive county map, priority area deep dives organized against IPLAN, a standalone health equity dashboard, a custom report builder, and a data and methods page.",
    },
    search: {
      title: "Global search",
      description:
        "One search bar across every indicator, place, priority area, and data source. Press ⌘K (or Ctrl+K) anywhere in the atlas.",
    },
    language: {
      title: "English, Spanish, and Polish",
      description:
        "Switch languages at any time. Interface, content, and exported reports all translate. Polish is Kane County's third-most-spoken language.",
    },
    indicators: {
      title: "Headline indicators, three CHA cycles",
      description:
        "Eight headline indicators back-loaded with four CHA cycles (2015, 2019, 2022, 2024) per Addendum 3. Click any indicator to open the full priority area page.",
    },
    iplan: {
      title: "IPLAN priority areas",
      description:
        "Dashboard organized around the Illinois Project for Local Assessment of Needs: chronic disease, maternal and child health, behavioral health, injury, access to care, and environmental health.",
    },
    equity: {
      title: "Disparity is the story",
      description:
        "Every indicator disaggregated by race and ethnicity, age, income, language, geography, and LGBTQ+. Equity lives on every page and has its own dedicated section.",
    },
    map: {
      title: "Interactive Kane County map",
      description:
        "Choropleth of 104 real census tracts. Five geographic levels: county, municipality, ZIP, tract, and KCHD Planning Areas. Togglable CDC Social Vulnerability Index overlay.",
    },
    reports: {
      title: "Custom report builder",
      description:
        "Pick indicators, geography, demographics, time period. Export to PDF, CSV, or PNG. Every report has a shareable URL that restores the exact same view for a colleague.",
    },
    sources: {
      title: "Every source, transparent",
      description:
        "Every data source with its citation, refresh schedule, and a real-vs-illustrative label for the demo. Plus the methodology behind equity analyses and accessibility.",
    },
    admin: {
      title: "KCHD staff workspace",
      description:
        "A /admin route for internal staff: usage analytics (like Google Analytics, privacy-respecting), data refresh controls, a role-based upload form, and the 20-person staff directory with row-level permissions.",
    },
    done: {
      title: "You're ready to explore",
      description:
        "Everything Kane County asked for in the RFQ and Addenda is visible in the atlas. Start anywhere. Press the tour button in Data & Methods to replay this.",
    },
  },
  es: {
    welcome: {
      title: "Bienvenido al Atlas de Salud Comunitaria del Condado de Kane",
      description:
        "Un breve recorrido por lo que ofrece este atlas: seis secciones públicas, un mapa interactivo, vistas de equidad, un generador de informes personalizados y un área segura para el personal. Creado específicamente para el Condado de Kane.",
    },
    nav: {
      title: "Seis secciones públicas",
      description:
        "Resumen, un mapa interactivo del condado, áreas prioritarias organizadas según IPLAN, un panel de equidad independiente, un generador de informes personalizados y una página de datos y métodos.",
    },
    search: {
      title: "Búsqueda global",
      description:
        "Una barra de búsqueda que abarca todo indicador, lugar, área prioritaria y fuente de datos. Pulse ⌘K (o Ctrl+K) en cualquier lugar del atlas.",
    },
    language: {
      title: "Inglés, español y polaco",
      description:
        "Cambie de idioma en cualquier momento. Interfaz, contenido e informes exportados se traducen. El polaco es el tercer idioma más hablado del Condado de Kane.",
    },
    indicators: {
      title: "Indicadores principales, tres ciclos de CHA",
      description:
        "Ocho indicadores principales cargados con cuatro ciclos de CHA (2015, 2019, 2022, 2024) según el Addendum 3. Haga clic en cualquier indicador para abrir la página completa del área prioritaria.",
    },
    iplan: {
      title: "Áreas prioritarias IPLAN",
      description:
        "Panel organizado en torno al Illinois Project for Local Assessment of Needs: enfermedades crónicas, salud materno-infantil, salud conductual, lesiones, acceso a atención y salud ambiental.",
    },
    equity: {
      title: "La disparidad es la historia",
      description:
        "Cada indicador desagregado por raza y etnia, edad, ingresos, idioma, geografía y LGBTQ+. La equidad está presente en cada página y tiene su propia sección dedicada.",
    },
    map: {
      title: "Mapa interactivo del Condado de Kane",
      description:
        "Mapa coroplético de 104 secciones censales reales. Cinco niveles geográficos: condado, municipio, código postal, sección y Áreas de Planificación de KCHD. Superposición opcional del Índice de Vulnerabilidad Social de los CDC.",
    },
    reports: {
      title: "Generador de informes personalizados",
      description:
        "Elija indicadores, geografía, datos demográficos y período. Exporte a PDF, CSV o PNG. Cada informe tiene una URL compartible que restaura exactamente la misma vista para un colega.",
    },
    sources: {
      title: "Cada fuente, transparente",
      description:
        "Cada fuente de datos con su cita, programa de actualización y una etiqueta real vs. ilustrativa para la demo. Además, la metodología detrás de los análisis de equidad y la accesibilidad.",
    },
    admin: {
      title: "Área del personal de KCHD",
      description:
        "Una ruta /admin para el personal interno: analítica de uso (estilo Google Analytics, respetuosa con la privacidad), controles de actualización de datos, un formulario de carga basado en roles y el directorio de 20 personas con permisos a nivel de fila.",
    },
    done: {
      title: "Listo para explorar",
      description:
        "Todo lo que el Condado de Kane pidió en el RFQ y los Addenda está visible en el atlas. Comience en cualquier lugar. Pulse el botón del recorrido en Datos y Métodos para repetirlo.",
    },
  },
  pl: {
    welcome: {
      title: "Witamy w Atlasie Zdrowia Społeczności Hrabstwa Kane",
      description:
        "Krótka wycieczka po tym, co oferuje atlas: sześć publicznych sekcji, interaktywna mapa, widoki równości, kreator raportów niestandardowych i bezpieczny obszar dla personelu. Stworzony specjalnie dla Hrabstwa Kane.",
    },
    nav: {
      title: "Sześć publicznych sekcji",
      description:
        "Przegląd, interaktywna mapa hrabstwa, obszary priorytetowe uporządkowane według IPLAN, niezależny panel równości zdrowotnej, kreator raportów niestandardowych i strona danych i metod.",
    },
    search: {
      title: "Wyszukiwanie globalne",
      description:
        "Jeden pasek wyszukiwania obejmujący każdy wskaźnik, miejsce, obszar priorytetowy i źródło danych. Naciśnij ⌘K (lub Ctrl+K) w dowolnym miejscu atlasu.",
    },
    language: {
      title: "Angielski, hiszpański i polski",
      description:
        "Zmień język w dowolnym momencie. Interfejs, treść i wyeksportowane raporty są tłumaczone. Polski to trzeci najczęściej używany język w Hrabstwie Kane.",
    },
    indicators: {
      title: "Wskaźniki nagłówkowe, trzy cykle CHA",
      description:
        "Osiem wskaźników nagłówkowych wczytanych z czterema cyklami CHA (2015, 2019, 2022, 2024) zgodnie z Aneksem 3. Kliknij dowolny wskaźnik, aby otworzyć pełną stronę obszaru priorytetowego.",
    },
    iplan: {
      title: "Obszary priorytetowe IPLAN",
      description:
        "Panel uporządkowany wokół Illinois Project for Local Assessment of Needs: choroby przewlekłe, zdrowie matki i dziecka, zdrowie behawioralne, urazy, dostęp do opieki i zdrowie środowiskowe.",
    },
    equity: {
      title: "Nierówności to nagłówek",
      description:
        "Każdy wskaźnik dezagregowany według rasy i pochodzenia etnicznego, wieku, dochodu, języka, geografii i LGBTQ+. Równość istnieje na każdej stronie i ma własną sekcję.",
    },
    map: {
      title: "Interaktywna mapa Hrabstwa Kane",
      description:
        "Kartogram 104 prawdziwych obwodów spisowych. Pięć poziomów geograficznych: hrabstwo, gmina, kod pocztowy, obwód i Obszary Planowania KCHD. Przełączalna nakładka CDC Social Vulnerability Index.",
    },
    reports: {
      title: "Kreator raportów niestandardowych",
      description:
        "Wybierz wskaźniki, geografię, dane demograficzne, okres. Eksportuj do PDF, CSV lub PNG. Każdy raport ma udostępnialny URL, który przywraca dokładnie ten sam widok dla współpracownika.",
    },
    sources: {
      title: "Każde źródło, przejrzyście",
      description:
        "Każde źródło danych z cytowaniem, harmonogramem odświeżania i etykietą real vs. ilustracyjne dla demonstracji. Plus metodologia analiz równości i dostępności.",
    },
    admin: {
      title: "Obszar roboczy personelu KCHD",
      description:
        "Trasa /admin dla personelu wewnętrznego: analityka użycia (w stylu Google Analytics, dbająca o prywatność), kontrole odświeżania danych, formularz przesyłania oparty na rolach i katalog 20 osób z uprawnieniami na poziomie wiersza.",
    },
    done: {
      title: "Gotowe do eksploracji",
      description:
        "Wszystko, o co Hrabstwo Kane prosiło w RFQ i Aneksach, jest widoczne w atlasie. Zacznij gdziekolwiek. Naciśnij przycisk wycieczki w Danych i metodach, aby ją powtórzyć.",
    },
  },
} as const;

export function GuidedTour() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("kane-tour-seen");
    if (seen) return;

    (async () => {
      const { driver } = await import("driver.js");
      // @ts-expect-error - driver.js ships CSS without types
      await import("driver.js/dist/driver.css");

      const copy = TOUR_COPY[locale] ?? TOUR_COPY.en;
      const nextBtn = locale === "es" ? "Siguiente" : locale === "pl" ? "Dalej" : "Next";
      const prevBtn = locale === "es" ? "Atrás" : locale === "pl" ? "Wstecz" : "Back";
      const doneBtn = locale === "es" ? "Finalizar" : locale === "pl" ? "Zakończ" : "Finish";

      const d = driver({
        showProgress: true,
        overlayColor: "rgba(21, 52, 82, 0.65)",
        stagePadding: 6,
        stageRadius: 2,
        popoverClass: "kane-tour",
        nextBtnText: nextBtn,
        prevBtnText: prevBtn,
        doneBtnText: doneBtn,
        steps: [
          {
            element: '[data-tour="brand"]',
            popover: { title: copy.welcome.title, description: copy.welcome.description },
          },
          {
            element: '[data-tour="nav"]',
            popover: { title: copy.nav.title, description: copy.nav.description },
          },
          {
            element: '[data-tour="search"]',
            popover: { title: copy.search.title, description: copy.search.description },
          },
          {
            element: '[data-tour="language"]',
            popover: { title: copy.language.title, description: copy.language.description },
          },
          {
            element: '[data-tour="indicators"]',
            popover: { title: copy.indicators.title, description: copy.indicators.description },
          },
          {
            element: '[data-tour="iplan"]',
            popover: { title: copy.iplan.title, description: copy.iplan.description },
          },
          {
            element: '[data-tour="equity"]',
            popover: { title: copy.equity.title, description: copy.equity.description },
          },
          {
            element: '[data-tour="cta-map"]',
            popover: { title: copy.map.title, description: copy.map.description },
          },
          {
            element: '[data-tour="cta-reports"]',
            popover: { title: copy.reports.title, description: copy.reports.description },
          },
          {
            element: '[data-tour="cta-sources"]',
            popover: { title: copy.sources.title, description: copy.sources.description },
          },
          {
            element: '[data-tour="cta-admin"]',
            popover: { title: copy.admin.title, description: copy.admin.description },
          },
          {
            popover: { title: copy.done.title, description: copy.done.description },
          },
        ],
        onDestroyed: () => {
          localStorage.setItem("kane-tour-seen", "1");
        },
      });

      setTimeout(() => d.drive(), 900);
    })();
  }, [pathname, locale]);

  return null;
}
