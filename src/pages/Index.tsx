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

  // Load progress from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("omni-current-step");
    const savedCompleted = localStorage.getItem("omni-completed-steps");
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("omni-current-step", currentStep.toString());
    localStorage.setItem("omni-completed-steps", JSON.stringify(completedSteps));
  }, [currentStep, completedSteps]);

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
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
        return <LicenseRequestStep onComplete={() => handleStepComplete(3)} />;
      case 4:
        return <ConfigurationStep />;
      default:
        return <TermsStep onComplete={() => handleStepComplete(1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <StepProgress
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-12"
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
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
      </footer>
    </div>
  );
};

export default Index;
