import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "system";

export const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("omni-theme") as ThemeMode | null;
      return stored || "dark"; // Dark par défaut
    }
    return "dark";
  });

  const getSystemPreference = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const isDark = mode === "dark" || (mode === "system" && getSystemPreference());

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      if (mode === "dark" || (mode === "system" && getSystemPreference())) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
    
    applyTheme();
    localStorage.setItem("omni-theme", mode);

    // Écouter les changements système si mode === "system"
    if (mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [mode]);

  const cycleMode = () => {
    const modes: ThemeMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  const getIcon = () => {
    if (mode === "system") {
      return <Monitor className="h-4 w-4" />;
    }
    return isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getLabel = () => {
    switch (mode) {
      case "light": return "Mode clair";
      case "dark": return "Mode sombre";
      case "system": return "Mode système";
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleMode}
      className="relative h-9 w-9 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-300"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="transition-transform duration-300">
        {getIcon()}
      </span>
    </Button>
  );
};
