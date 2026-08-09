"use client";

import React, { createContext, useContext, useState } from "react";

interface StreakContextType {
  currentStreak: number;
  longestStreak: number;
  completedDays: number;
  hasSubmittedToday: boolean;
  incrementStreak: () => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(12);
  const [completedDays, setCompletedDays] = useState(12);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  const incrementStreak = () => {
    if (!hasSubmittedToday) {
      setCurrentStreak((prev) => prev + 1);
      setLongestStreak((prev) => prev + 1);
      setCompletedDays((prev) => prev + 1);
      setHasSubmittedToday(true);
    }
  };

  return (
    <StreakContext.Provider
      value={{
        currentStreak,
        longestStreak,
        completedDays,
        hasSubmittedToday,
        incrementStreak,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
}
