import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, ListMinus, User, Settings, PlusCircle } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

interface NavigationMenuProps {
  items: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/accounts', label: 'Accounts', icon: ListMinus },
  { path: '/joint/create', label: 'New Joint', icon: PlusCircle }, // Example for CTA
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items = defaultNavItems }) => {
  const location = useLocation();
  console.log("Rendering NavigationMenu, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid h-16 max-w-screen-md grid-cols-5 items-center px-2">
        {items.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 rounded-md p-2 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <IconComponent className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationMenu;