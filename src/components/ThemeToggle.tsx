import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("omni-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("omni-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("omni-theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const stored = localStorage.getItem("omni-theme");
    if (stored) {
      setIsDark(stored === "dark");
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="relative h-9 w-9 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
