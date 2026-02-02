import { motion } from "framer-motion";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.button 
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Shield className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">Omni</span>
            <span className="text-xs text-muted-foreground">Système de licences</span>
          </div>
        </motion.button>
        
        <div className="flex items-center gap-4">
          {onLogoClick && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogoClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Accueil</span>
              </Button>
            </motion.div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-primary font-medium">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
