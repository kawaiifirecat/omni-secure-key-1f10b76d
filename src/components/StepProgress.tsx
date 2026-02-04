import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export const StepProgress = ({ steps, currentStep, completedSteps }: StepProgressProps) => {
  return (
    <div className="w-full py-4 sm:py-6">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center w-full max-w-2xl">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const isLocked = !isCompleted && !isCurrent && step.id > Math.max(...completedSteps, 0) + 1;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isCompleted && "border-success bg-success text-success-foreground",
                      isCurrent && "border-primary bg-primary text-primary-foreground shadow-lg",
                      isLocked && "border-muted bg-muted text-muted-foreground",
                      !isCompleted && !isCurrent && !isLocked && "border-border bg-card text-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : isLocked ? (
                      <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-medium whitespace-nowrap",
                        isCurrent && "text-primary",
                        isCompleted && "text-success",
                        isLocked && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 max-w-[100px]">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 sm:mx-4 rounded-full transition-colors duration-300 min-w-[20px] sm:min-w-[40px]",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
