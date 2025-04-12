
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AlertCircle, 
  BarChart2, 
  Database, 
  Globe, 
  Home, 
  Layout, 
  Menu, 
  Shield, 
  Users, 
  X,
  Settings,
  FileText,
  UploadCloud
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      'flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-cyber-accent/10',
      isActive ? 'bg-cyber-accent/20 text-cyber-secondary font-medium' : 'text-cyber-foreground/80'
    )}
  >
    {({ isActive }) => (
      <>
        <Icon size={20} className={cn(isActive ? 'text-cyber-secondary' : 'text-cyber-foreground/70')} />
        {!collapsed && <span>{label}</span>}
      </>
    )}
  </NavLink>
);

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/threats', icon: AlertCircle, label: 'Threats' },
  { to: '/indicators', icon: Shield, label: 'Indicators' },
  { to: '/intelligence', icon: Globe, label: 'Intelligence' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/sources', icon: Database, label: 'Data Sources' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/community', icon: Users, label: 'Community' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      'h-screen flex flex-col bg-cyber-primary border-r border-cyber-accent/10 transition-all',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center justify-between p-4 border-b border-cyber-accent/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-cyber-secondary" />
            <h1 className="font-bold text-lg">OSCTIP</h1>
          </div>
        )}
        {collapsed && <Shield size={24} className="text-cyber-secondary mx-auto" />}
        <Button 
          variant="ghost" 
          size="icon" 
          className="p-1"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4 gap-1 px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="p-4 border-t border-cyber-accent/10">
        <NavItem
          to="/settings"
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
