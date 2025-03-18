
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CalendarDays, ListFilter } from "lucide-react";
import EventList from "@/components/events/EventList";
import Timeline from "@/components/events/Timeline";
import { mockEvents } from "@/lib/utils";

const Events = () => {
  const [view, setView] = useState("grid");

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-muted-foreground">
          Browse and discover upcoming events or check your event timeline.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <div className="bg-muted rounded-lg p-1">
            <button
              className={`px-3 py-1.5 rounded-md flex items-center gap-2 ${
                view === "grid" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setView("grid")}
            >
              <ListFilter className="h-4 w-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center gap-2 ${
                view === "timeline" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setView("timeline")}
            >
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm font-medium">Timeline</span>
            </button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {view === "grid" ? (
            <EventList events={mockEvents} />
          ) : (
            <Timeline events={mockEvents} />
          )}
        </TabsContent>

        <TabsContent value="my-events" className="mt-0">
          {view === "grid" ? (
            <EventList 
              events={mockEvents.slice(0, 3)} 
              title="Events you're hosting or attending"
            />
          ) : (
            <Timeline events={mockEvents.slice(0, 3)} />
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Events;
