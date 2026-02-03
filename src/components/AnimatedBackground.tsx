import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

export const AnimatedBackground = ({ intensity = "medium" }: AnimatedBackgroundProps) => {
  const particleCount = intensity === "low" ? 8 : intensity === "medium" ? 15 : 25;
  const orbOpacity = intensity === "low" ? 0.3 : intensity === "medium" ? 0.5 : 0.7;

  // Memoize particles to prevent re-renders
  const particles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.2 + Math.random() * 0.3,
    })),
  [particleCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Primary Pulsing Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [orbOpacity * 0.6, orbOpacity, orbOpacity * 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Floating Orb */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [orbOpacity * 0.4, orbOpacity * 0.7, orbOpacity * 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating Particles - Optimized with useMemo */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            background: `hsl(var(--primary) / ${particle.opacity})`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Corner Glow - Top Left */}
      <div
        className="absolute top-0 left-0 w-[350px] h-[350px]"
        style={{
          background: "radial-gradient(circle at top left, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
        }}
      />
      
      {/* Corner Glow - Bottom Right */}
      <div
        className="absolute bottom-0 right-0 w-[350px] h-[350px]"
        style={{
          background: "radial-gradient(circle at bottom right, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Slow Scanning Light Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.02) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 4,
        }}
      />
    </div>
  );
};
