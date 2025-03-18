
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "attending" | "declined" | "pending";
  note?: string;
}

interface AttendeesListProps {
  attendees: Attendee[];
}

const AttendeesList = ({ attendees }: AttendeesListProps) => {
  const attending = attendees.filter((a) => a.status === "attending");
  const declined = attendees.filter((a) => a.status === "declined");
  const pending = attendees.filter((a) => a.status === "pending");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg border">
          <div className="font-semibold text-2xl mb-1">{attending.length}</div>
          <div className="text-sm text-muted-foreground">Attending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="font-semibold text-2xl mb-1">{pending.length}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="font-semibold text-2xl mb-1">{declined.length}</div>
          <div className="text-sm text-muted-foreground">Declined</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">All Attendees</h3>
        <div className="space-y-2">
          {attendees.map((attendee, index) => (
            <motion.div
              key={attendee.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-white rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback>
                    {attendee.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{attendee.name}</div>
                  <div className="text-sm text-muted-foreground">{attendee.email}</div>
                </div>
              </div>
              <div className="flex items-center">
                <StatusBadge status={attendee.status} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Attendee["status"] }) => {
  return (
    <div
      className={cn(
        "flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "attending" && "bg-green-50 text-green-700",
        status === "declined" && "bg-red-50 text-red-700",
        status === "pending" && "bg-yellow-50 text-yellow-700"
      )}
    >
      {status === "attending" && (
        <CheckCircle className="h-3 w-3 mr-1" />
      )}
      {status === "declined" && (
        <XCircle className="h-3 w-3 mr-1" />
      )}
      {status === "pending" && (
        <HelpCircle className="h-3 w-3 mr-1" />
      )}
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default AttendeesList;
