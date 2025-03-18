
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, MapPin, Navigation, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const mockVenues = [
  {
    id: "1",
    name: "Central Park Conference Center",
    address: "123 Park Avenue, New York, NY",
    capacity: 150,
  },
  {
    id: "2",
    name: "Waterfront Hotel & Convention",
    address: "456 Bay Street, San Francisco, CA",
    capacity: 300,
  },
  {
    id: "3",
    name: "Highland Event Space",
    address: "789 Mountain View, Denver, CO",
    capacity: 100,
  },
  {
    id: "4",
    name: "Skyline Downtown Loft",
    address: "210 Main Street, Chicago, IL",
    capacity: 80,
  },
];

const StepTwo = () => {
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<typeof mockVenues[0] | null>(null);

  const filteredVenues = mockVenues.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVenueSelect = (venue: typeof mockVenues[0]) => {
    setSelectedVenue(venue);
    setVenue(venue.name);
    setAddress(venue.address);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Event Location</h2>
        <p className="text-muted-foreground">
          Choose where your event will take place.
        </p>
      </div>

      <Tabs defaultValue="venue">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="venue" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Find a Venue</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            <span>Enter Manually</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="venue" className="mt-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg border divide-y max-h-64 overflow-y-auto">
              {filteredVenues.length > 0 ? (
                filteredVenues.map((venue) => (
                  <div
                    key={venue.id}
                    className={cn(
                      "p-3 hover:bg-accent cursor-pointer transition-colors",
                      selectedVenue?.id === venue.id && "bg-accent"
                    )}
                    onClick={() => handleVenueSelect(venue)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{venue.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {venue.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Capacity: {venue.capacity} people
                        </p>
                      </div>
                      {selectedVenue?.id === venue.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No venues found matching your search.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="venue-name">Venue Name</Label>
            <Input
              id="venue-name"
              placeholder="Enter venue name"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              disabled
            >
              <MapPin className="h-4 w-4" />
              <span>Locate on Map</span>
              <span className="text-xs text-muted-foreground ml-2">(Coming Soon)</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-1">Selected Location</h4>
        <p className="text-sm text-muted-foreground">
          {venue ? venue : "No location selected yet"}
        </p>
        <p className="text-sm text-muted-foreground">
          {address ? address : ""}
        </p>
      </div>
    </motion.div>
  );
};

export default StepTwo;
