"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UI } from "@/data/ui";

const PrefsContext = createContext(null);

export function PrefsProvider({ children }) {
  const [lang, setLangState] = useState("es");
  const [theme, setThemeState] = useState("dark");

  // Lee preferencias guardadas (o las del sistema) al montar
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    const initialLang = savedLang || (navigator.language?.startsWith("en") ? "en" : "es");
    setLangState(initialLang);
    document.documentElement.lang = initialLang;
    setThemeState(document.documentElement.dataset.theme || "dark");
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.dataset.theme = t;
  }, []);

  const value = useMemo(() => {
    // t: textos {es,en}  ·  ui: claves de interfaz
    const t = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.es : obj);
    const ui = (key) => UI[lang][key] ?? UI.es[key] ?? key;
    return {
      lang,
      theme,
      setLang,
      setTheme,
      toggleLang: () => setLang(lang === "es" ? "en" : "es"),
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
      t,
      ui,
    };
  }, [lang, theme, setLang, setTheme]);

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export const usePrefs = () => {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs debe usarse dentro de <PrefsProvider>");
  return ctx;
};
