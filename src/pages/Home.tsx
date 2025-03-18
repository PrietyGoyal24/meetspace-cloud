
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, PlusCircle } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { mockEvents } from "@/lib/utils";
import { motion } from "framer-motion";

const Home = () => {
  const upcomingEvents = mockEvents.slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-transparent" />
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Create Memorable Events, Effortlessly
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A beautiful platform to organize, manage, and share your events with
              the people who matter most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 group">
                <Link to="/create-event">
                  <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Event
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Streamlined Event Management</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create and manage successful events in one beautiful platform.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="p-6 rounded-lg bg-white border hover:shadow-md transition-shadow"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intuitive Creation</h3>
            <p className="text-muted-foreground">
              Design events with our step-by-step wizard that guides you through every detail.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg bg-white border hover:shadow-md transition-shadow"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Effortless RSVP</h3>
            <p className="text-muted-foreground">
              Track attendees, send invitations, and manage responses in real-time.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg bg-white border hover:shadow-md transition-shadow"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <line x1="3" x2="21" y1="9" y2="9"></line>
                <line x1="9" x2="9" y1="21" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Timeline</h3>
            <p className="text-muted-foreground">
              Organize your events chronologically and never miss important dates.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Button asChild variant="ghost" className="gap-2 group">
            <Link to="/events">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {upcomingEvents.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to create your event?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start planning your next gathering, conference, or celebration with our intuitive event management platform.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/create-event">
                <PlusCircle className="h-5 w-5" />
                Create Event Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
