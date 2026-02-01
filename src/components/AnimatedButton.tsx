import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface AnimatedButtonProps extends ButtonProps {
  glowEffect?: boolean;
  pulseEffect?: boolean;
  shimmerEffect?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, glowEffect, pulseEffect, shimmerEffect, disabled, ...props }, ref) => {
    return (
      <motion.div
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        animate={pulseEffect && !disabled ? {
          boxShadow: [
            "0 0 0 0 hsl(var(--primary) / 0)",
            "0 0 0 8px hsl(var(--primary) / 0.1)",
            "0 0 0 0 hsl(var(--primary) / 0)",
          ],
        } : {}}
        transition={pulseEffect ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        } : {
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        className={cn(
          "relative inline-block rounded-md",
          glowEffect && !disabled && "shadow-glow"
        )}
      >
        <Button
          ref={ref}
          disabled={disabled}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            glowEffect && !disabled && "hover:shadow-glow",
            className
          )}
          {...props}
        >
          {shimmerEffect && !disabled && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          )}
          <span className="relative z-10">{children}</span>
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
