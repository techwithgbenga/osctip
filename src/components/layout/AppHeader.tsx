
import React from 'react';
import { 
  Bell, 
  Search, 
  User,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function AppHeader() {
  return (
    <header className="h-16 border-b border-cyber-accent/10 bg-cyber-primary/90 backdrop-blur flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold hidden md:block">Open Source Cybersecurity Threat Intelligence Platform</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex max-w-sm">
          <Input 
            type="search" 
            placeholder="Search threats, indicators..." 
            className="pl-10 bg-cyber-primary border-cyber-accent/20 focus:border-cyber-accent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cyber-alert">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                <NotificationItem 
                  icon={Shield} 
                  title="New CVE Published" 
                  description="CVE-2023-3456 affecting Apache Struts" 
                  time="10 min ago" 
                />
                <NotificationItem 
                  icon={AlertTriangle} 
                  title="Critical Threat Alert" 
                  description="New ransomware campaign detected targeting healthcare" 
                  time="25 min ago" 
                />
                <NotificationItem 
                  icon={Shield} 
                  title="IOC Updated" 
                  description="IP blocklist has been updated with 24 new indicators" 
                  time="1 hour ago" 
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">View all notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

type NotificationItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
};

function NotificationItem({ icon: Icon, title, description, time }: NotificationItemProps) {
  return (
    <div className="flex gap-3 p-3 hover:bg-cyber-primary/50 rounded cursor-pointer">
      <div className="h-10 w-10 rounded-full bg-cyber-accent/10 flex items-center justify-center text-cyber-accent shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}
