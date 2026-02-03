"use client";

import { useThemeStore } from "@/shared/model/theme-store";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-700 shadow-sm transition-all hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-sky-500 dark:hover:bg-zinc-700"
      aria-label="Переключить тему"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden text-sm font-medium sm:inline">Тёмная</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden text-sm font-medium sm:inline">Светлая</span>
        </>
      )}
    </button>
  );
}
