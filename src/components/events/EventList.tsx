
import { useState } from "react";
import EventCard, { EventCardProps } from "./EventCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface EventListProps {
  events: EventCardProps[];
  title?: string;
}

const EventList = ({ events, title }: EventListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (filter === "upcoming") {
      return matchesSearch && eventDate >= today;
    } else if (filter === "past") {
      return matchesSearch && eventDate < today;
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming Events</SelectItem>
              <SelectItem value="past">Past Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No events found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
