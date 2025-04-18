
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { AuthState, logout } from '@/lib/authService';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import { UserSettings } from '@/lib/types';
import { toast } from "sonner";

interface MainLayoutProps {
  authState: AuthState;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ authState, onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Default user settings with proper type
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: 'dark',
    responseStyle: 'detailed',
    modelVersion: 'gpt-4',
    dataSourcesEnabled: {
      mitre: true,
      cve: true,
      osint: true,
      internalThreatFeeds: false,
    }
  });

  // Handler for updating user settings
  const handleUpdateSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    toast.success("Settings updated successfully", {
      description: "Your preferences have been saved"
    });
  };

  // Handler for user profile
  const handleViewProfile = () => {
    navigate('/profile');
  };

  // Handler for logout
  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      toast.success("Logged out successfully", {
        description: "Session terminated securely"
      });
      navigate('/auth');
    } catch (error) {
      toast.error("Logout failed", {
        description: "Please try again"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container-fluid mx-auto py-2 flex items-center justify-between">
          <Navigation />
          
          <div className="flex items-center gap-4 mr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={authState.user?.avatar} alt={authState.user?.name} />
                    <AvatarFallback>
                      {authState.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{authState.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {authState.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleViewProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      
      {/* Profile Settings Dialog */}
      <ProfileSettings 
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={userSettings}
        onUpdateSettings={handleUpdateSettings}
      />
      
      <Toaster />
      <Sonner position="top-right" closeButton />
    </div>
  );
};

export default MainLayout;
