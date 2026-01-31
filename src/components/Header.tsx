import { ThemeToggle } from "./ThemeToggle";
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-card">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-foreground">Omni</span>
            <span className="text-xs text-muted-foreground">Système de licences</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-accent-foreground font-medium">En ligne</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
