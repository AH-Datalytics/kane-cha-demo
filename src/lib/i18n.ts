"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es" | "pl";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "pl", label: "Polish", native: "Polski" },
];

export const STRINGS: Record<Locale, StringsTree> = {
  en: {
    skipToContent: "Skip to main content",
    tagline: "Community Health Assessment · Kane County, Illinois",
    searchPlaceholder: "Search indicators, places, priority areas…",
    lastUpdated: "Data last updated",
    nav: {
      overview: "Overview",
      map: "Map",
      priorities: "Priority Areas",
      equity: "Health Equity",
      reports: "Reports",
      sources: "Data & Methods",
    },
    hero: {
      eyebrow: "2024 Community Health Assessment",
      title: "The data behind Kane County’s health.",
      lede:
        "An interactive atlas of chronic disease, maternal and child health, behavioral health, access to care, and the social conditions that shape each of them. Built for residents, partners, and policymakers.",
      cta1: "Explore indicators",
      cta2: "Open the map",
    },
    iplan: {
      title: "Priority areas, organized against IPLAN",
      subtitle:
        "The Illinois Project for Local Assessment of Needs framework, paired with the priorities KCHD and community partners named in the 2024 CHA.",
    },
    equity: {
      eyebrow: "Health equity, not buried",
      title: "Disparities are the story, not a subsection.",
      body:
        "Every indicator is disaggregated by race and ethnicity, age, income, language, geography, and sexual orientation and gender identity where data permit. The equity view is the default.",
    },
    footer: {
      tagline: "Community Health Assessment and Improvement Plan",
      builtBy: "A custom dashboard built for the Kane County Health Department.",
      contact: "Contact the Health Department",
      accessibility: "Accessibility",
      methodology: "Methods & Sources",
      owner: "© Kane County Health Department",
    },
    report: {
      title: "Custom report",
      description:
        "Pick indicators, geographies, demographics, and a time period. Save, share via URL, or export to PDF, CSV, or PNG.",
    },
    admin: {
      title: "KCHD staff workspace",
      signInAs: "Sign in as KCHD staff",
      signOut: "Sign out",
      sessionAs: "Signed in as",
    },
  },
  es: {
    skipToContent: "Saltar al contenido principal",
    tagline: "Evaluación de Salud Comunitaria · Condado de Kane, Illinois",
    searchPlaceholder: "Buscar indicadores, lugares, áreas prioritarias…",
    lastUpdated: "Datos actualizados",
    nav: {
      overview: "Resumen",
      map: "Mapa",
      priorities: "Áreas prioritarias",
      equity: "Equidad en salud",
      reports: "Informes",
      sources: "Datos y métodos",
    },
    hero: {
      eyebrow: "Evaluación de Salud Comunitaria 2024",
      title: "Los datos detrás de la salud del Condado de Kane.",
      lede:
        "Un atlas interactivo de enfermedades crónicas, salud materno-infantil, salud conductual, acceso a la atención médica y las condiciones sociales que influyen en cada uno. Creado para residentes, socios y responsables de políticas.",
      cta1: "Explorar indicadores",
      cta2: "Abrir el mapa",
    },
    iplan: {
      title: "Áreas prioritarias, organizadas según IPLAN",
      subtitle:
        "El marco del Illinois Project for Local Assessment of Needs, junto con las prioridades que KCHD y los socios comunitarios identificaron en la Evaluación 2024.",
    },
    equity: {
      eyebrow: "Equidad en salud, visible",
      title: "Las disparidades son la historia principal.",
      body:
        "Cada indicador se desagrega por raza y etnia, edad, ingresos, idioma, geografía, y orientación sexual e identidad de género cuando los datos lo permiten. La vista de equidad es la predeterminada.",
    },
    footer: {
      tagline: "Evaluación y Plan de Mejora de la Salud Comunitaria",
      builtBy: "Un panel personalizado creado para el Departamento de Salud del Condado de Kane.",
      contact: "Contactar al Departamento de Salud",
      accessibility: "Accesibilidad",
      methodology: "Métodos y fuentes",
      owner: "© Departamento de Salud del Condado de Kane",
    },
    report: {
      title: "Informe personalizado",
      description:
        "Elija indicadores, geografías, datos demográficos y un período de tiempo. Guarde, comparta por URL o exporte a PDF, CSV o PNG.",
    },
    admin: {
      title: "Espacio de trabajo del personal de KCHD",
      signInAs: "Iniciar sesión como personal de KCHD",
      signOut: "Cerrar sesión",
      sessionAs: "Sesión iniciada como",
    },
  },
  pl: {
    skipToContent: "Przejdź do głównej treści",
    tagline: "Ocena Zdrowia Społeczności · Hrabstwo Kane, Illinois",
    searchPlaceholder: "Szukaj wskaźników, miejscowości, obszarów priorytetowych…",
    lastUpdated: "Dane zaktualizowano",
    nav: {
      overview: "Przegląd",
      map: "Mapa",
      priorities: "Obszary priorytetowe",
      equity: "Równość zdrowotna",
      reports: "Raporty",
      sources: "Dane i metody",
    },
    hero: {
      eyebrow: "Ocena Zdrowia Społeczności 2024",
      title: "Dane stojące za zdrowiem Hrabstwa Kane.",
      lede:
        "Interaktywny atlas chorób przewlekłych, zdrowia matki i dziecka, zdrowia behawioralnego, dostępu do opieki oraz uwarunkowań społecznych, które je kształtują. Stworzony dla mieszkańców, partnerów i decydentów.",
      cta1: "Przeglądaj wskaźniki",
      cta2: "Otwórz mapę",
    },
    iplan: {
      title: "Obszary priorytetowe, uporządkowane według IPLAN",
      subtitle:
        "Ramowy program Illinois Project for Local Assessment of Needs, wraz z priorytetami wskazanymi przez KCHD i partnerów społecznych w ocenie 2024.",
    },
    equity: {
      eyebrow: "Równość zdrowotna, nie ukryta",
      title: "Nierówności to nagłówek, nie podsekcja.",
      body:
        "Każdy wskaźnik jest dezagregowany według rasy i pochodzenia etnicznego, wieku, dochodu, języka, geografii oraz orientacji seksualnej i tożsamości płciowej, gdy pozwalają na to dane.",
    },
    footer: {
      tagline: "Ocena i Plan Poprawy Zdrowia Społeczności",
      builtBy: "Niestandardowy panel zbudowany dla Departamentu Zdrowia Hrabstwa Kane.",
      contact: "Kontakt z Departamentem Zdrowia",
      accessibility: "Dostępność",
      methodology: "Metody i źródła",
      owner: "© Departament Zdrowia Hrabstwa Kane",
    },
    report: {
      title: "Raport niestandardowy",
      description:
        "Wybierz wskaźniki, obszary geograficzne, demografię i okres. Zapisz, udostępnij przez URL lub wyeksportuj do PDF, CSV lub PNG.",
    },
    admin: {
      title: "Obszar roboczy personelu KCHD",
      signInAs: "Zaloguj się jako personel KCHD",
      signOut: "Wyloguj",
      sessionAs: "Zalogowany jako",
    },
  },
};

type StringsTree = {
  skipToContent: string;
  tagline: string;
  searchPlaceholder: string;
  lastUpdated: string;
  nav: { overview: string; map: string; priorities: string; equity: string; reports: string; sources: string };
  hero: { eyebrow: string; title: string; lede: string; cta1: string; cta2: string };
  iplan: { title: string; subtitle: string };
  equity: { eyebrow: string; title: string; body: string };
  footer: { tagline: string; builtBy: string; contact: string; accessibility: string; methodology: string; owner: string };
  report: { title: string; description: string };
  admin: { title: string; signInAs: string; signOut: string; sessionAs: string };
};

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: StringsTree;
}>({ locale: "en", setLocale: () => {}, t: STRINGS.en });

export function useLocale() {
  return useContext(LocaleContext);
}
