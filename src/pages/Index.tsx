import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { StepProgress } from "@/components/StepProgress";
import { TermsStep } from "@/components/steps/TermsStep";
import { AuthStep } from "@/components/steps/AuthStep";
import { LicenseRequestStep } from "@/components/steps/LicenseRequestStep";
import { ConfigurationStep } from "@/components/steps/ConfigurationStep";

const STEPS = [
  { id: 1, title: "Conditions", description: "Accepter les CGU" },
  { id: 2, title: "Authentification", description: "Code Telegram" },
  { id: 3, title: "Demande", description: "Licence Omni" },
  { id: 4, title: "Configuration", description: "Installation" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedOs, setSelectedOs] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("omni-current-step");
    const savedCompleted = localStorage.getItem("omni-completed-steps");
    const savedOs = localStorage.getItem("omni-selected-os");
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted));
    }
    if (savedOs) {
      setSelectedOs(savedOs);
    }
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("omni-current-step", currentStep.toString());
    localStorage.setItem("omni-completed-steps", JSON.stringify(completedSteps));
  }, [currentStep, completedSteps]);

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
    switch (currentStep) {
      case 1:
        return <TermsStep onComplete={() => handleStepComplete(1)} />;
      case 2:
        return <AuthStep onComplete={() => handleStepComplete(2)} />;
      case 3:
        return <LicenseRequestStep onComplete={(os) => handleStepComplete(3, os)} />;
      case 4:
        return <ConfigurationStep selectedOs={selectedOs} />;
      default:
        return <TermsStep onComplete={() => handleStepComplete(1)} />;
    }
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

  return (
    <motion.div 
      className="min-h-screen bg-background gradient-hero"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-8">
          <StepProgress
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </motion.div>

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
        className="border-t border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2024 Omni.</span>
              <span className="hidden md:inline">Tous droits réservés.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" />
                Systèmes supportés : Windows, macOS, Linux
              </span>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
