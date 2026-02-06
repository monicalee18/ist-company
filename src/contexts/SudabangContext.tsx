"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SudabangContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  currentMarketId: string | null;
  setCurrentMarketId: (id: string | null) => void;
}

const SudabangContext = createContext<SudabangContextType | undefined>(undefined);

export function SudabangProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentMarketId, setCurrentMarketId] = useState<string | null>(null);

  return (
    <SudabangContext.Provider value={{ isExpanded, setIsExpanded, currentMarketId, setCurrentMarketId }}>
      {children}
    </SudabangContext.Provider>
  );
}

export function useSudabang() {
  const context = useContext(SudabangContext);
  if (context === undefined) {
    throw new Error("useSudabang must be used within a SudabangProvider");
  }
  return context;
}
