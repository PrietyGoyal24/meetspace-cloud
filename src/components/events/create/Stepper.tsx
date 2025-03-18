
import { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// Step Context
type StepperContextValue = {
  activeStep: number;
};

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

function useStepper() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}

// Stepper Components
interface StepperProps {
  activeStep: number;
  children: ReactNode;
}

export function Stepper({ activeStep, children }: StepperProps) {
  return (
    <StepperContext.Provider value={{ activeStep }}>
      <div className="w-full">{children}</div>
    </StepperContext.Provider>
  );
}

export function StepperSteps({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-between">
      {children}
    </div>
  );
}

interface StepperStepProps {
  children: ReactNode;
  completed?: boolean;
  active?: boolean;
}

export function StepperStep({ children, completed, active }: StepperStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            {
              "bg-primary text-primary-foreground": completed || active,
              "bg-muted text-muted-foreground": !completed && !active,
            }
          )}
        >
          {completed ? <Check className="h-5 w-5" /> : null}
          {!completed && active ? <span className="text-sm font-medium">
            {Array.isArray(children) ? children[0] : children}
          </span> : null}
          {!completed && !active ? <span className="text-sm font-medium">
            {Array.isArray(children) ? children[0] : children}
          </span> : null}
        </div>
      </div>
      <div
        className={cn("mt-2 text-center text-sm font-medium", {
          "text-foreground": active,
          "text-muted-foreground": !active,
        })}
      >
        {Array.isArray(children) ? children[1] : null}
      </div>
    </div>
  );
}

interface StepperContentProps {
  step: number;
  children: ReactNode;
}

export function StepperContent({ step, children }: StepperContentProps) {
  const { activeStep } = useStepper();

  if (step !== activeStep) {
    return null;
  }

  return <div className="mt-4">{children}</div>;
}
