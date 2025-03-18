
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  attendees: number;
  organizer: {
    name: string;
    avatar?: string;
  };
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  image,
  attendees,
  organizer,
}: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/events/${id}`}>
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-none">
          <div className="relative h-48 overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <Calendar className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
          <CardContent className="p-5">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {formatDate(date)}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{time}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{attendees} attendees</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-5 py-4 border-t bg-muted/30">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={organizer.avatar} alt={organizer.name} />
                <AvatarFallback>
                  {organizer.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="text-muted-foreground">Organized by </span>
                <span className="font-medium">{organizer.name}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default EventCard;
