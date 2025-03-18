
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BadgeCheck, 
  Copy, 
  Mail, 
  Plus, 
  Share, 
  Trash2, 
  UserPlus, 
  Users 
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Invitee {
  id: string;
  email: string;
  name?: string;
}

const StepThree = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleAddInvitee = () => {
    if (!email) return;
    
    const newInvitee: Invitee = {
      id: Date.now().toString(),
      email,
      name: name || undefined,
    };
    
    setInvitees([...invitees, newInvitee]);
    setEmail("");
    setName("");
    
    toast.success("Invitee added successfully");
  };

  const handleRemoveInvitee = (id: string) => {
    setInvitees(invitees.filter((i) => i.id !== id));
    toast("Invitee removed", {
      description: "The invitee has been removed from the list.",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://eventify.app/invite/abc123");
    toast.success("Invitation link copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Event Attendees</h2>
        <p className="text-muted-foreground">
          Invite people to your event or make it public.
        </p>
      </div>

      <Tabs defaultValue="invite">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invite" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Invite People</span>
          </TabsTrigger>
          <TabsTrigger value="public" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Make it Public</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="invite" className="mt-4 space-y-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <Button
              onClick={handleAddInvitee}
              className="w-full flex items-center justify-center gap-2"
              disabled={!email}
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Invitee</span>
            </Button>
          </div>
          
          {invitees.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitees.map((invitee) => (
                    <TableRow key={invitee.id}>
                      <TableCell>{invitee.email}</TableCell>
                      <TableCell>{invitee.name || "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveInvitee(invitee.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="border rounded-lg p-6 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No invitees added yet.</p>
              <p className="text-sm text-muted-foreground">
                Add someone to get started.
              </p>
            </div>
          )}
          
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Invitation Link</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground bg-white p-2 rounded border truncate">
              https://eventify.app/invite/abc123
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can RSVP to your event.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="public" className="mt-4 space-y-5">
          <div className="flex items-start space-x-3 p-4 bg-accent rounded-lg">
            <div className="mt-0.5">
              {isPublic ? (
                <BadgeCheck className="h-5 w-5 text-primary" />
              ) : (
                <Share className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <h4 className="font-medium">Make this event public</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Public events can be discovered by anyone on Eventify.
              </p>
              <Button
                variant={isPublic ? "default" : "outline"}
                onClick={() => setIsPublic(!isPublic)}
                className={cn(
                  "flex items-center gap-2",
                  isPublic && "bg-primary"
                )}
              >
                {isPublic ? (
                  <>
                    <BadgeCheck className="h-4 w-4" />
                    <span>Event is Public</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Make Public</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Event Visibility Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">Show in event directory</p>
                  <p className="text-sm text-muted-foreground">
                    Let people discover your event in our public listings
                  </p>
                </div>
                <div
                  className={cn(
                    "h-6 w-11 rounded-full p-1 transition-colors",
                    isPublic ? "bg-primary" : "bg-muted"
                  )}
                  onClick={() => setIsPublic(!isPublic)}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full bg-white transition-transform",
                      isPublic && "translate-x-5"
                    )}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md opacity-50">
                <div>
                  <p className="font-medium">Allow guest registrations</p>
                  <p className="text-sm text-muted-foreground">
                    Let people register without an invitation
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full p-1 bg-muted">
                  <div className="h-4 w-4 rounded-full bg-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md opacity-50">
                <div>
                  <p className="font-medium">Featured event</p>
                  <p className="text-sm text-muted-foreground">
                    Promote your event on our featured section (requires approval)
                  </p>
                </div>
                <div className="h-6 w-11 rounded-full p-1 bg-muted">
                  <div className="h-4 w-4 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StepThree;
