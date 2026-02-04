import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { StepProgress } from "@/components/StepProgress";
import { LandingPage } from "@/components/LandingPage";

// Lazy load des étapes pour optimiser les performances
const TermsStep = lazy(() => import("@/components/steps/TermsStep").then(m => ({ default: m.TermsStep })));
const AuthStep = lazy(() => import("@/components/steps/AuthStep").then(m => ({ default: m.AuthStep })));
const LicenseRequestStep = lazy(() => import("@/components/steps/LicenseRequestStep").then(m => ({ default: m.LicenseRequestStep })));
const ConfigurationStep = lazy(() => import("@/components/steps/ConfigurationStep").then(m => ({ default: m.ConfigurationStep })));

// Lazy load du fond animé - ne charge que quand visible
const AnimatedBackground = lazy(() => import("@/components/AnimatedBackground").then(m => ({ default: m.AnimatedBackground })));

const STEPS = [
  { id: 1, title: "Conditions", description: "Accepter les CGU" },
  { id: 2, title: "Authentification", description: "Code Telegram" },
  { id: 3, title: "Demande", description: "Licence Omni" },
  { id: 4, title: "Configuration", description: "Installation" },
];

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedOs, setSelectedOs] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [directConfigAccess, setDirectConfigAccess] = useState(false);

  // Reset all progress on page load/refresh - start fresh every time
  useEffect(() => {
    // Clear all saved progress
    localStorage.removeItem("omni-current-step");
    localStorage.removeItem("omni-completed-steps");
    localStorage.removeItem("omni-show-landing");
    
    // Reset to initial state
    setShowLanding(true);
    setCurrentStep(1);
    setCompletedSteps([]);
    setDirectConfigAccess(false);
    
    // Keep OS preference for quick access feature
    const savedOs = localStorage.getItem("omni-selected-os");
    if (savedOs) {
      setSelectedOs(savedOs);
    }
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // No longer save progress - each refresh starts fresh
  // Only save OS preference for quick access

  const handleStartFromLanding = () => {
    setShowLanding(false);
    setDirectConfigAccess(false);
  };

  const handleViewConfig = (os: string) => {
    setSelectedOs(os);
    localStorage.setItem("omni-selected-os", os);
    setShowLanding(false);
    setDirectConfigAccess(true);
    setCurrentStep(4);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setDirectConfigAccess(false);
  };

  const handleStepComplete = (stepId: number, os?: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (os) {
      setSelectedOs(os);
      localStorage.setItem("omni-selected-os", os);
    }
    if (stepId < STEPS.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const renderCurrentStep = () => {
    const stepComponent = (() => {
      switch (currentStep) {
        case 1:
          return <TermsStep onComplete={() => handleStepComplete(1)} />;
        case 2:
          return <AuthStep onComplete={() => handleStepComplete(2)} />;
        case 3:
          return <LicenseRequestStep onComplete={(os) => handleStepComplete(3, os)} />;
        case 4:
          return <ConfigurationStep selectedOs={selectedOs} onBackToMenu={directConfigAccess ? handleBackToLanding : undefined} />;
        default:
          return <TermsStep onComplete={() => handleStepComplete(1)} />;
      }
    })();

    return (
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {stepComponent}
      </Suspense>
    );
  };

  // Animation variants for page entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const stepTransitionVariants = {
    initial: { opacity: 0, x: 60, scale: 0.98 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const,
      }
    },
    exit: { 
      opacity: 0, 
      x: -60, 
      scale: 0.98,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" as const,
      }
    },
  };

  // Show landing page
  if (showLanding) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onStart={handleStartFromLanding} onViewConfig={handleViewConfig} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="main"
        className="min-h-screen bg-background relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        exit={{ opacity: 0 }}
      >
        {/* Global Animated Background - Lazy loaded */}
        <Suspense fallback={null}>
          <AnimatedBackground intensity="medium" />
        </Suspense>
        
        <div className="relative z-10">
          <motion.div variants={itemVariants}>
            <Header onLogoClick={handleBackToLanding} />
          </motion.div>
        
          <main className="container mx-auto px-4 py-8">
          {!directConfigAccess && (
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-8">
              <StepProgress
                steps={STEPS}
                currentStep={currentStep}
                completedSteps={completedSteps}
              />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pb-12"
            >
              {renderCurrentStep()}
            </motion.div>
            </AnimatePresence>
          </main>

          <motion.footer 
            variants={itemVariants}
            className="border-t border-border/50 bg-card/30 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>© 2024 Omni.</span>
                  <span className="hidden md:inline">Tous droits réservés.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    Systèmes supportés : Windows, macOS, Linux
                  </span>
                </div>
              </div>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
