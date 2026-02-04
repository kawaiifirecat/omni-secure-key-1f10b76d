import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight, 
  Monitor, 
  Apple, 
  Terminal,
  Sparkles,
  Lock,
  CheckCircle2
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

interface LandingPageProps {
  onStart: () => void;
  onViewConfig: (os: string) => void;
}

export const LandingPage = ({ onStart, onViewConfig }: LandingPageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, title: "Sécurisé", description: "Protection maximale de vos données" },
    { icon: Zap, title: "Rapide", description: "Performance optimisée" },
    { icon: Globe, title: "Universel", description: "Compatible tous systèmes" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-background overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Use the shared Animated Background */}
      <AnimatedBackground intensity="high" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen flex flex-col items-center justify-center">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 w-full max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bienvenue sur Omni</span>
          </motion.div>

          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient">
              OMNI
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4"
            variants={itemVariants}
          >
            La solution universelle pour votre environnement
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <Lock className="h-4 w-4" />
            <span>Authentification sécurisée via Telegram</span>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 w-full max-w-4xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                borderColor: activeFeature === index ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`relative overflow-hidden border-2 transition-all duration-500 ${
                activeFeature === index ? "bg-primary/5 shadow-glow" : "bg-card/50 backdrop-blur-sm"
              }`}>
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 ${
                      activeFeature === index ? "gradient-primary" : "bg-primary/10"
                    }`}
                    animate={{
                      rotate: activeFeature === index ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`h-7 w-7 ${
                      activeFeature === index ? "text-primary-foreground" : "text-primary"
                    }`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
                
                {activeFeature === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 w-full flex justify-center">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.3)",
                "0 0 40px hsl(var(--primary) / 0.5)",
                "0 0 20px hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block rounded-xl"
          >
            <Button
              size="lg"
              onClick={onStart}
              className="group relative overflow-hidden gradient-primary text-primary-foreground px-10 py-7 text-lg font-semibold rounded-xl shadow-elevated hover:shadow-glow transition-all duration-300"
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-3">
                Commencer la configuration
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Access - OS Cards */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Accès rapide à la configuration</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Consultez directement les instructions pour votre système</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { id: "windows", icon: Monitor, label: "Windows", color: "from-blue-500/20 to-blue-600/10" },
              { id: "macos", icon: Apple, label: "macOS", color: "from-gray-400/20 to-gray-500/10" },
              { id: "linux", icon: Terminal, label: "Linux", color: "from-orange-500/20 to-orange-600/10" },
            ].map((os, index) => (
              <motion.div
                key={os.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => onViewConfig(os.id)}
                  className={`w-full p-6 rounded-xl border border-border bg-gradient-to-br ${os.color} backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group`}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="h-12 w-12 rounded-xl bg-background/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <os.icon className="h-6 w-6 text-foreground" />
                    </motion.div>
                    <span className="font-medium text-foreground">{os.label}</span>
                    <motion.span
                      className="text-xs text-muted-foreground flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Voir la configuration <ArrowRight className="h-3 w-3" />
                    </motion.span>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 text-center w-full"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Licence temporaire
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Support Telegram
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Multi-plateforme
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
