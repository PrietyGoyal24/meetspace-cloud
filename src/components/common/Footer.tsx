
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl tracking-tight">Eventify</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Modern event management platform for creating and managing memorable experiences.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/create-event" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Create Event
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8">
            <p className="text-sm text-center text-muted-foreground">
              &copy; {currentYear} Eventify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
