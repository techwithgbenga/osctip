
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Globe, RefreshCw, Plus, Settings, MoreHorizontal, Check, X, Clock, DownloadCloud } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

type SourceStatus = 'active' | 'error' | 'inactive' | 'pending';

interface DataSource {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  lastSync: string;
  nextSync: string;
  indicatorCount: number;
  status: SourceStatus;
  tags: string[];
}

const SourcesPage = () => {
  const [sources, setSources] = useState<DataSource[]>(initialSources);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSources = sources.filter((source) => 
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSync = (id: string) => {
    setSources(sources.map(source => 
      source.id === id 
        ? { ...source, status: 'active' as SourceStatus, lastSync: 'Just now' } 
        : source
    ));
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
            <p className="text-muted-foreground">
              Manage and configure your threat intelligence data sources.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Source
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Data Source</DialogTitle>
                  <DialogDescription>
                    Configure a new threat intelligence data source.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      className="col-span-3"
                      placeholder="Source name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Type</label>
                    <Input
                      id="type"
                      className="col-span-3"
                      placeholder="API, RSS, STIX/TAXII, etc."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">URL</label>
                    <Input
                      id="url"
                      className="col-span-3"
                      placeholder="https://example.com/api"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">API Key</label>
                    <Input
                      id="apiKey"
                      type="password"
                      className="col-span-3"
                      placeholder="API Key or Access Token"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Description</label>
                    <Input
                      id="description"
                      className="col-span-3"
                      placeholder="Brief description of this data source"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Source</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-grow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              placeholder="Search data sources..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSources.map((source) => (
            <Card key={source.id} className={`${source.status === 'error' ? 'border-red-500/40' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full p-1 bg-cyber-accent/10">
                      {source.type === 'API' ? <Database className="h-4 w-4 text-cyber-secondary" /> : <Globe className="h-4 w-4 text-cyber-secondary" />}
                    </div>
                    <CardTitle className="text-base">{source.name}</CardTitle>
                  </div>
                  <Badge variant={getStatusVariant(source.status)}>
                    {getStatusLabel(source.status)}
                  </Badge>
                </div>
                <CardDescription className="text-xs pt-1">{source.type} • {source.category}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground pb-2">
                <p className="line-clamp-2 mb-4">{source.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Last sync:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{source.lastSync}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next sync:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{source.nextSync}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Indicators:</span>
                    <div className="font-medium">{source.indicatorCount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {source.tags.map((tag) => (
                    <span key={tag} className="bg-cyber-accent/5 text-cyber-secondary text-xs px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs flex items-center gap-1"
                  onClick={() => handleSync(source.id)}
                >
                  <RefreshCw className="h-3 w-3" />
                  Sync Now
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                  >
                    <DownloadCloud className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem>Pause</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

// Helper functions for status display
const getStatusVariant = (status: SourceStatus) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'error':
      return 'destructive';
    case 'inactive':
      return 'secondary';
    case 'pending':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusLabel = (status: SourceStatus) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'error':
      return 'Error';
    case 'inactive':
      return 'Inactive';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

// Sample initial data sources
const initialSources: DataSource[] = [
  {
    id: '1',
    name: 'AlienVault OTX',
    category: 'Community',
    type: 'API',
    description: 'Open Threat Exchange (OTX) by AlienVault. Provides community-generated threat data including IOCs.',
    lastSync: '2 hours ago',
    nextSync: 'In 4 hours',
    indicatorCount: 12458,
    status: 'active',
    tags: ['IOCs', 'Community', 'API']
  },
  {
    id: '2',
    name: 'MISP Instance',
    category: 'Sharing Platform',
    type: 'API',
    description: 'MISP (Malware Information Sharing Platform) instance for sharing structured threat information.',
    lastSync: '1 day ago',
    nextSync: 'In 12 hours',
    indicatorCount: 8932,
    status: 'active',
    tags: ['MISP', 'Structured', 'Sharing']
  },
  {
    id: '3',
    name: 'VirusTotal',
    category: 'Analysis',
    type: 'API',
    description: 'VirusTotal API for file, URL and domain reputation checks and malware analysis.',
    lastSync: 'Failed',
    nextSync: 'Retry in 30 min',
    indicatorCount: 5423,
    status: 'error',
    tags: ['Reputation', 'Malware', 'Analysis']
  },
  {
    id: '4',
    name: 'Shodan',
    category: 'Recon',
    type: 'API',
    description: 'Search engine for Internet-connected devices. Provides vulnerability and exposure data.',
    lastSync: '3 hours ago',
    nextSync: 'In 9 hours',
    indicatorCount: 3210,
    status: 'active',
    tags: ['Exposure', 'IoT', 'Recon']
  },
  {
    id: '5',
    name: 'US-CERT Advisories',
    category: 'Government',
    type: 'RSS',
    description: 'Security advisories from the United States Computer Emergency Readiness Team.',
    lastSync: '8 hours ago',
    nextSync: 'In 16 hours',
    indicatorCount: 756,
    status: 'active',
    tags: ['Advisories', 'Government', 'RSS']
  },
  {
    id: '6',
    name: 'Emerging Threats',
    category: 'Rules',
    type: 'API',
    description: 'Open source threat intelligence rules for intrusion detection and prevention systems.',
    lastSync: 'Never',
    nextSync: 'Waiting setup',
    indicatorCount: 0,
    status: 'pending',
    tags: ['IDS', 'Rules', 'Open Source']
  },
  {
    id: '7',
    name: 'Spamhaus',
    category: 'Reputation',
    type: 'API',
    description: 'IP and domain blocklists for detecting spam, malware and botnet sources.',
    lastSync: 'Disabled',
    nextSync: 'Disabled',
    indicatorCount: 1843,
    status: 'inactive',
    tags: ['Spam', 'Blocklists', 'Reputation']
  },
  {
    id: '8',
    name: 'STIX/TAXII Server',
    category: 'Structured',
    type: 'TAXII',
    description: 'STIX/TAXII server for structured threat intelligence exchange using standard formats.',
    lastSync: '1 hour ago',
    nextSync: 'In 5 hours',
    indicatorCount: 6742,
    status: 'active',
    tags: ['STIX', 'TAXII', 'Structured']
  },
  {
    id: '9',
    name: 'PhishTank',
    category: 'Phishing',
    type: 'API',
    description: 'Community-driven phishing URL verification and reporting database.',
    lastSync: '5 hours ago',
    nextSync: 'In 7 hours',
    indicatorCount: 4231,
    status: 'active',
    tags: ['Phishing', 'URLs', 'Community']
  }
];

export default SourcesPage;
