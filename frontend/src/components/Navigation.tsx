
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Target, 
  Brain, 
  BarChart2, 
  Database, 
  FileText, 
  Users,
  MessagesSquare,
  Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: "Chat",
    icon: Terminal,
    path: "/chat",
    standalone: true
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    standalone: true
  },
  {
    title: "Threat Intelligence",
    children: [
      {
        title: "Threats",
        icon: ShieldAlert,
        path: "/threats",
      },
      {
        title: "Indicators",
        icon: Target,
        path: "/indicators",
      },
      {
        title: "Intelligence",
        icon: Brain,
        path: "/intelligence",
      }
    ]
  },
  {
    title: "Analysis",
    children: [
      {
        title: "Analytics",
        icon: BarChart2,
        path: "/analytics",
      },
      {
        title: "Data Sources",
        icon: Database,
        path: "/data-sources",
      },
      {
        title: "Reports",
        icon: FileText,
        path: "/reports",
      }
    ]
  },
  {
    title: "Community",
    icon: Users,
    path: "/community",
    standalone: true
  }
];

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/chat" className="text-xl font-bold mr-6">OSCTIP</Link>
          
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                item.standalone ? (
                  <NavigationMenuItem key={item.title}>
                    <Link to={item.path}>
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center gap-2",
                          location.pathname === item.path && "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="flex items-center gap-2">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 md:w-[200px]">
                        {item.children?.map((child) => (
                          <li key={child.title}>
                            <Link to={child.path}>
                              <NavigationMenuLink 
                                className={cn(
                                  "flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  location.pathname === child.path && "bg-accent text-accent-foreground"
                                )}
                              >
                                {child.icon && <child.icon className="h-4 w-4" />}
                                <div className="text-sm font-medium">{child.title}</div>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
