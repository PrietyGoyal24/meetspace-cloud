
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperSteps,
} from "./Stepper";
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EventWizardProps {
  children: ReactNode;
}

type Step = {
  id: string;
  title: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    id: "details",
    title: "Event Details",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: "location",
    title: "Location",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: "attendees",
    title: "Attendees",
    icon: <Users className="h-5 w-5" />,
  },
];

export const EventWizard = ({ children }: EventWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const navigate = useNavigate();

  const next = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
      toast.success("Event created successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="mb-10">
            <Stepper activeStep={currentStep}>
              <StepperSteps>
                {steps.map((step, index) => (
                  <StepperStep key={step.id} completed={index < currentStep} active={currentStep === index}>
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                  </StepperStep>
                ))}
              </StepperSteps>
            </Stepper>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {isComplete ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Check className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Event Created!</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Your event has been created successfully. You will be redirected to the events page.
                  </p>
                </div>
              ) : (
                <StepperContent step={currentStep}>
                  {childArray[currentStep] || <div>No content for this step</div>}
                </StepperContent>
              )}
            </motion.div>
          </AnimatePresence>

          {!isComplete && (
            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={prev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={next} className="gap-2">
                {currentStep === steps.length - 1 ? "Create Event" : "Next"}
                {currentStep === steps.length - 1 ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
