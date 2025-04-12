
import React from 'react';
import { 
  AlertTriangle, 
  Bug, 
  FileWarning, 
  Globe, 
  Shield, 
  Zap 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ThreatEvent = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'attack' | 'vulnerability' | 'malware' | 'alert' | 'patch';
  severity: 'low' | 'medium' | 'high' | 'critical';
};

const typeIcons = {
  attack: Globe,
  vulnerability: Bug,
  malware: FileWarning,
  alert: AlertTriangle,
  patch: Shield,
};

const severityColors = {
  low: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  high: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-500 border-red-500/30',
};

type ThreatTimelineProps = {
  events?: ThreatEvent[];
  className?: string;
};

const defaultEvents: ThreatEvent[] = [
  {
    id: '1',
    title: 'Critical Zero-Day Vulnerability',
    description: 'Critical vulnerability detected in OpenSSL affecting TLS connections.',
    timestamp: '2023-07-12T10:30:00Z',
    type: 'vulnerability',
    severity: 'critical',
  },
  {
    id: '2',
    title: 'Ransomware Campaign',
    description: 'New ransomware campaign targeting healthcare institutions detected.',
    timestamp: '2023-07-11T15:45:00Z',
    type: 'malware',
    severity: 'high',
  },
  {
    id: '3',
    title: 'Security Patch Released',
    description: 'Microsoft released security patches for 15 critical vulnerabilities.',
    timestamp: '2023-07-10T09:15:00Z',
    type: 'patch',
    severity: 'medium',
  },
  {
    id: '4',
    title: 'DDoS Attack',
    description: 'Large-scale DDoS attack targeting financial institutions detected.',
    timestamp: '2023-07-09T18:20:00Z',
    type: 'attack',
    severity: 'high',
  },
  {
    id: '5',
    title: 'New Phishing Campaign',
    description: 'Phishing campaign impersonating Google Drive notifications observed.',
    timestamp: '2023-07-08T14:10:00Z',
    type: 'alert',
    severity: 'medium',
  }
];

export function ThreatTimeline({ events = defaultEvents, className }: ThreatTimelineProps) {
  return (
    <div className={cn("cyber-card p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Recent Threat Activity</h3>
        <button className="text-xs text-cyber-secondary hover:underline">View all</button>
      </div>
      
      <div className="space-y-6 relative">
        <div className="absolute top-0 bottom-0 left-[22px] w-px bg-cyber-accent/20"></div>
        {events.map((event) => {
          const Icon = typeIcons[event.type];
          return (
            <div key={event.id} className="flex gap-4">
              <div className={cn(
                "h-11 w-11 rounded-full border flex items-center justify-center shrink-0 z-10",
                severityColors[event.severity]
              )}>
                <Icon size={20} />
              </div>
              
              <div className="space-y-1 pt-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    severityColors[event.severity]
                  )}>
                    {event.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
