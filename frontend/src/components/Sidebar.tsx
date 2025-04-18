
import React, { useState } from 'react';
import { 
  PlusCircle, 
  MessageSquare, 
  Trash2, 
  Settings, 
  LogOut, 
  Shield, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Database, 
  Terminal, 
  BarChart2, 
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation, User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  user: User;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  onOpenThreatDashboard?: () => void;
  onOpenIncidentPlaybook?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onSettingsClick,
  onLogout,
  onOpenThreatDashboard,
  onOpenIncidentPlaybook
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={cn(
      "flex flex-col h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-sidebar-primary mr-2" />
            <h1 className="text-lg font-bold">OSCTIP</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewConversation}
          className={cn(
            "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
            collapsed ? "p-2 justify-center" : ""
          )}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          {!collapsed && "New Session"}
        </Button>
      </div>

      {/* Security Tools */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-sidebar-foreground/70 mb-2 uppercase tracking-wider px-2">
            Security Tools
          </div>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onOpenThreatDashboard}
            >
              <BarChart2 className="h-4 w-4 mr-2 text-sidebar-primary" />
              Threat Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onOpenIncidentPlaybook}
            >
              <AlertTriangle className="h-4 w-4 mr-2 text-sidebar-primary" />
              Incident Response
            </Button>
          </div>
        </div>
      )}

      {/* Collapsed Mode Tools */}
      {collapsed && (
        <div className="p-3 flex flex-col items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenThreatDashboard}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <BarChart2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Threat Dashboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenIncidentPlaybook}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Incident Response</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Categories */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-sidebar-foreground/70 mb-2 uppercase tracking-wider px-2">
            Categories
          </div>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => navigate('/chat/threats')}
            >
              <Shield className="h-4 w-4 mr-2 text-sidebar-primary" />
              Threat Analysis
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => navigate('/chat/indicators')}
            >
              <Lock className="h-4 w-4 mr-2 text-sidebar-primary" />
              IOC Analysis
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => navigate('/chat/intelligence')}
            >
              <Activity className="h-4 w-4 mr-2 text-sidebar-primary" />
              Threat Intelligence
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => navigate('/chat/analytics')}
            >
              <Terminal className="h-4 w-4 mr-2 text-sidebar-primary" />
              Analytics
            </Button>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto py-2">
        {!collapsed && (
          <div className="text-xs font-medium text-sidebar-foreground/70 mb-2 uppercase tracking-wider px-5">
            Recent Sessions
          </div>
        )}
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "flex items-center px-3 py-2 my-1 mx-2 rounded-md cursor-pointer group",
              activeConversationId === conversation.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent/50"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <MessageSquare className="h-5 w-5 mr-3 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="truncate flex-1">
                  {conversation.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Data Sources */}
      {!collapsed && (
        <div className="px-3 py-2 border-t border-sidebar-border">
          <div className="text-xs font-medium text-sidebar-foreground/70 mb-2 uppercase tracking-wider px-2">
            Active Integrations
          </div>
          <div className="flex flex-wrap gap-1 px-2">
            <div className="text-xs py-1 px-2 rounded bg-sidebar-accent text-sidebar-primary">MITRE ATT&CK</div>
            <div className="text-xs py-1 px-2 rounded bg-sidebar-accent text-sidebar-primary">CVE</div>
            <div className="text-xs py-1 px-2 rounded bg-sidebar-accent text-sidebar-primary">OSINT</div>
          </div>
        </div>
      )}

      {/* Footer with user info and settings */}
      <div className="border-t border-sidebar-border p-3">
        <TooltipProvider>
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=5E35B1&color=fff`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{user.role || 'Analyst'}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onSettingsClick}
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
