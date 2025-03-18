
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as fnsFormat } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return fnsFormat(date, "MMMM d, yyyy");
}

// Sample data
export const mockEvents = [
  {
    id: "1",
    title: "Annual Tech Conference",
    date: "2024-09-15",
    time: "09:00 AM",
    location: "San Francisco Convention Center",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
    attendees: 250,
    organizer: {
      name: "Tech Innovations Inc",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "2",
    title: "Community Networking Mixer",
    date: "2024-07-22",
    time: "06:30 PM",
    location: "Downtown Workspace Hub",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2000&auto=format&fit=crop",
    attendees: 85,
    organizer: {
      name: "Professional Network Group",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: "3",
    title: "Design Workshop Series",
    date: "2024-08-05",
    time: "10:00 AM",
    location: "Creative Arts Center",
    image: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2000&auto=format&fit=crop",
    attendees: 40,
    organizer: {
      name: "DesignLab",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  },
  {
    id: "4",
    title: "Startup Pitch Night",
    date: "2024-06-18",
    time: "07:00 PM",
    location: "Innovation Hub",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2000&auto=format&fit=crop",
    attendees: 120,
    organizer: {
      name: "Venture Connect",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  },
  {
    id: "5",
    title: "Music in the Park",
    date: "2024-07-08",
    time: "05:00 PM",
    location: "Central Park Amphitheater",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2000&auto=format&fit=crop",
    attendees: 300,
    organizer: {
      name: "City Events Committee",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
  {
    id: "6",
    title: "Product Management Summit",
    date: "2024-10-12",
    time: "09:30 AM",
    location: "Business Convention Center",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
    attendees: 175,
    organizer: {
      name: "PM Collective",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  },
];

export const mockAttendees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "attending" as const,
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "attending" as const,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "pending" as const,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "declined" as const,
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "attending" as const,
  },
  {
    id: "6",
    name: "Amanda Martinez",
    email: "amanda.martinez@example.com",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    status: "attending" as const,
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    status: "pending" as const,
  },
  {
    id: "8",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    status: "pending" as const,
  },
  {
    id: "9",
    name: "Thomas Rodriguez",
    email: "thomas.rodriguez@example.com",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    status: "declined" as const,
  },
];
