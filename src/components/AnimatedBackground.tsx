import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

export const AnimatedBackground = ({ intensity = "medium" }: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const particleCount = intensity === "low" ? 15 : intensity === "medium" ? 30 : 50;
  const orbOpacity = intensity === "low" ? 0.4 : intensity === "medium" ? 0.6 : 0.8;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Mouse-Following Gradient */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Primary Pulsing Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [orbOpacity * 0.6, orbOpacity, orbOpacity * 0.6],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Floating Orb */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [orbOpacity * 0.5, orbOpacity * 0.8, orbOpacity * 0.5],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Third Orb - Accent Color */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [orbOpacity * 0.3, orbOpacity * 0.6, orbOpacity * 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Rotating Center Gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px]"
        style={{
          background: "conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.05), transparent, hsl(var(--accent) / 0.05), transparent)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles - Enhanced */}
      {[...Array(particleCount)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = 4 + Math.random() * 6;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(var(--primary) / ${0.3 + Math.random() * 0.4})`,
              boxShadow: `0 0 ${size * 2}px hsl(var(--primary) / 0.3)`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Animated Vertical Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`v-line-${i}`}
          className="absolute w-px h-full"
          style={{
            left: `${15 + i * 18}%`,
            background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.15), transparent)`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Animated Horizontal Lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`h-line-${i}`}
          className="absolute h-px w-full"
          style={{
            top: `${20 + i * 20}%`,
            background: `linear-gradient(to right, transparent, hsl(var(--primary) / 0.12), transparent)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Corner Glow Effects */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle at top left, hsl(var(--primary) / 0.1) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle at bottom right, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Scanning Light Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.03) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
      />
    </div>
  );
};
