
import React from 'react';
import { 
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  Database,
  FileType,
  Globe,
  RefreshCcw,
  Settings,
  Twitter,
  XCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type DataSourceStatus = 'connected' | 'disconnected' | 'error' | 'waiting';

type DataSource = {
  id: string;
  name: string;
  description: string;
  type: 'api' | 'feed' | 'social' | 'community' | 'osint';
  status: DataSourceStatus;
  lastUpdated?: string;
  indicators?: number;
  format?: 'stix' | 'json' | 'csv' | 'xml' | 'text';
};

const statusIcons: Record<DataSourceStatus, React.ElementType> = {
  connected: CheckCircle,
  disconnected: XCircle,
  error: AlertTriangle,
  waiting: Clock,
};

const statusColors: Record<DataSourceStatus, string> = {
  connected: 'bg-cyber-success/20 text-cyber-success',
  disconnected: 'bg-muted/20 text-muted-foreground',
  error: 'bg-cyber-alert/20 text-cyber-alert',
  waiting: 'bg-cyber-warning/20 text-cyber-warning',
};

const typeIcons: Record<string, React.ElementType> = {
  api: Database,
  feed: RefreshCcw,
  social: Twitter,
  community: Globe,
  osint: FileType,
};

export function DataSourceConnector({ dataSource }: { dataSource: DataSource }) {
  const StatusIcon = statusIcons[dataSource.status];
  const TypeIcon = typeIcons[dataSource.type];
  
  return (
    <Card className="cyber-card overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap-2">
              <div className={cn(
                'p-1.5 rounded-md',
                dataSource.status === 'connected' ? 'bg-cyber-accent/20' : 'bg-muted/20'
              )}>
                <TypeIcon size={18} />
              </div>
              {dataSource.name}
            </CardTitle>
            <CardDescription className="mt-1">{dataSource.description}</CardDescription>
          </div>
          <Badge variant="outline" className={cn(
            'flex items-center gap-1 rounded px-2 py-1',
            statusColors[dataSource.status]
          )}>
            <StatusIcon size={14} />
            <span className="capitalize">{dataSource.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium capitalize">{dataSource.type}</span>
          </div>
          {dataSource.format && (
            <div className="flex flex-col">
              <span className="text-muted-foreground">Format</span>
              <span className="font-medium uppercase">{dataSource.format}</span>
            </div>
          )}
          {dataSource.lastUpdated && (
            <div className="flex flex-col">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">{dataSource.lastUpdated}</span>
            </div>
          )}
          {dataSource.indicators !== undefined && (
            <div className="flex flex-col">
              <span className="text-muted-foreground">Indicators</span>
              <span className="font-medium">{dataSource.indicators.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 opacity-70 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="sm" className="flex-1">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
        <Button variant="default" size="sm" className="flex-1">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Sync Now
        </Button>
      </CardFooter>
    </Card>
  );
}
