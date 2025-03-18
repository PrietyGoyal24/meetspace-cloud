
import { motion } from "framer-motion";
import { EventWizard } from "@/components/events/create/EventWizard";
import StepOne from "@/components/events/create/StepOne";
import StepTwo from "@/components/events/create/StepTwo";
import StepThree from "@/components/events/create/StepThree";

const CreateEvent = () => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your event. You can edit these details anytime later.
        </p>
      </div>

      <EventWizard>
        <StepOne />
        <StepTwo />
        <StepThree />
      </EventWizard>
    </motion.div>
  );
};

export default CreateEvent;
