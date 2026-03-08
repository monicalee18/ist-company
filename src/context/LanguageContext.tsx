"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "KO" | "EN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends ReactNode>(ko: T, en: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "KO";
  const lang = navigator.language || navigator.languages?.[0] || "ko";
  return lang.startsWith("ko") ? "KO" : "EN";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("KO");

  useEffect(() => {
    setLanguage(detectBrowserLanguage());
  }, []);

  const t = <T extends ReactNode>(ko: T, en: T): T => (language === "KO" ? ko : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
