
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockEvents, mockAttendees, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import AttendeesList from "@/components/events/AttendeesList";
import { toast } from "sonner";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [rsvpStatus, setRsvpStatus] = useState<
    "attending" | "declined" | "pending"
  >("pending");

  // Find the event from mock data
  const event = mockEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  const handleRSVP = (status: "attending" | "declined" | "pending") => {
    setRsvpStatus(status);
    
    const messages = {
      attending: "You're attending this event!",
      declined: "You've declined this event.",
      pending: "Your RSVP status has been reset.",
    };
    
    toast.success(messages[status]);
  };

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Event Hero */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Calendar className="h-20 w-20 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant={rsvpStatus === "attending" ? "default" : "outline"}
            className="flex-1 sm:flex-none"
            onClick={() => handleRSVP("attending")}
          >
            Attending
          </Button>
          <Button
            variant={rsvpStatus === "declined" ? "default" : "outline"}
            className="flex-1 sm:flex-none"
            onClick={() => handleRSVP("declined")}
          >
            Decline
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleShareEvent}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Event Details and Attendees */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About this event</h3>
                <p className="text-muted-foreground">
                  Join us for an exciting event featuring industry experts, 
                  networking opportunities, and engaging discussions. This event 
                  is designed to bring together professionals from various 
                  backgrounds to share insights and explore new possibilities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Schedule</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 text-muted-foreground">
                      09:00 AM
                    </div>
                    <div>
                      <p className="font-medium">Registration & Coffee</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 text-muted-foreground">
                      10:00 AM
                    </div>
                    <div>
                      <p className="font-medium">Opening Keynote</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 text-muted-foreground">
                      12:00 PM
                    </div>
                    <div>
                      <p className="font-medium">Networking Lunch</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 text-muted-foreground">
                      02:00 PM
                    </div>
                    <div>
                      <p className="font-medium">Workshop Sessions</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 text-muted-foreground">
                      04:30 PM
                    </div>
                    <div>
                      <p className="font-medium">Closing Remarks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Organizer</h3>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                    <AvatarFallback>
                      {event.organizer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.organizer.name}</p>
                    <p className="text-sm text-muted-foreground">Event Organizer</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Location</h3>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">{event.location}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    123 Main Street, Suite 200, San Francisco, CA 94105
                  </p>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src="https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=600x300&key=YOUR_API_KEY"
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open in Maps</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="sticky top-24">
            <div className="space-y-1 mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Attendees</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {event.attendees} people are attending this event
              </p>
            </div>
            
            <AttendeesList attendees={mockAttendees} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;
