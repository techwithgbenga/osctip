
import React from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThreatCardProps = {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'warning' | 'danger' | 'success';
  className?: string;
};

export function ThreatCard({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  variant = 'default',
  className 
}: ThreatCardProps) {
  const variantStyles = {
    default: 'bg-cyber-primary/70 border-cyber-accent/20',
    primary: 'bg-cyber-accent/10 border-cyber-accent/30',
    warning: 'bg-cyber-warning/10 border-cyber-warning/30',
    danger: 'bg-cyber-alert/10 border-cyber-alert/30',
    success: 'bg-cyber-success/10 border-cyber-success/30',
  };

  const trendColors = {
    up: 'text-cyber-alert',
    down: 'text-cyber-success',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className={cn(
      'cyber-card p-6 transition-all hover:shadow-md',
      variantStyles[variant],
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center gap-1">
              <ArrowUpRight className={cn(
                'h-3 w-3',
                trend === 'up' ? 'text-cyber-alert' : 'text-cyber-success',
                trend === 'neutral' && 'text-muted-foreground rotate-45'
              )} />
              <span className={cn(
                'text-xs font-medium',
                trendColors[trend]
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-full bg-cyber-accent/10 flex items-center justify-center text-cyber-accent">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
