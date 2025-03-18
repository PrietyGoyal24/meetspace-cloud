
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Calendar className="h-12 w-12 text-primary" />
        </motion.div>
        <p className="mt-4 text-muted-foreground font-medium">Loading...</p>
      </motion.div>
    </div>
  );
};

export default PageLoader;
