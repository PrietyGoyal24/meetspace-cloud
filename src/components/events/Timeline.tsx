
import { useState } from "react";
import { EventCardProps } from "./EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, CalendarDays, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TimelineProps {
  events: EventCardProps[];
}

const Timeline = ({ events }: TimelineProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  const upcomingEvents = sortedEvents.filter(
    (event) => new Date(event.date) >= today
  );
  const pastEvents = sortedEvents.filter(
    (event) => new Date(event.date) < today
  );

  return (
    <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 bg-background border">
        <TabsTrigger value="upcoming" className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>Upcoming</span>
        </TabsTrigger>
        <TabsTrigger value="past" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Past</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="mt-0">
        <TimelineList events={upcomingEvents} isUpcoming={true} />
      </TabsContent>
      
      <TabsContent value="past" className="mt-0">
        <TimelineList events={pastEvents} isUpcoming={false} />
      </TabsContent>
    </Tabs>
  );
};

interface TimelineListProps {
  events: EventCardProps[];
  isUpcoming: boolean;
}

const TimelineList = ({ events, isUpcoming }: TimelineListProps) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">
          {isUpcoming ? "No upcoming events" : "No past events"}
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, staggerChildren: 0.1 }}
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link 
            to={`/events/${event.id}`}
            className="block"
          >
            <div className={cn(
              "relative flex border rounded-lg p-4 hover:shadow-md transition-all duration-300",
              isUpcoming ? "hover:border-primary/50" : "hover:border-muted"
            )}>
              <div className="mr-4 flex-shrink-0 self-start">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-muted rounded-lg">
                  <span className="text-lg font-bold">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs uppercase text-muted-foreground">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{event.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground line-clamp-1">
                  {event.location}
                </div>
              </div>
              {isUpcoming && (
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Timeline;
