"use client";

import { useEffect, useState } from "react";
import { LocaleContext, Locale, STRINGS } from "@/lib/i18n";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("kane-locale") as Locale | null) : null;
    if (saved && ["en", "es", "pl"].includes(saved)) setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("kane-locale", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: STRINGS[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}
