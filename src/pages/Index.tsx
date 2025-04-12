
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type DataSource = {
  id: string;
  name: string;
  description: string;
  type: "feed" | "api" | "social" | "community" | "osint";
  status: string;
  lastUpdated: string;
  indicators: number;
  format: string;
};

const threatData = [
  {
    id: 'threat-1',
    name: 'Malicious Domain Campaign',
    type: 'Phishing',
    severity: 'High',
    lastSeen: '2h ago',
    count: 126,
    trend: 'increasing',
  },
  {
    id: 'threat-2',
    name: 'Ransomware Distribution Network',
    type: 'Malware',
    severity: 'Critical',
    lastSeen: '30m ago',
    count: 57,
    trend: 'stable',
  },
  {
    id: 'threat-3',
    name: 'Suspicious IP Activity',
    type: 'Reconnaissance',
    severity: 'Medium',
    lastSeen: '1d ago',
    count: 89,
    trend: 'decreasing',
  },
  {
    id: 'threat-4',
    name: 'Credential Harvesting Campaign',
    type: 'Phishing',
    severity: 'High',
    lastSeen: '4h ago',
    count: 42,
    trend: 'increasing',
  },
];

const dataSources: DataSource[] = [
  {
    id: 'source-1',
    name: 'AlienVault OTX',
    description: 'Open Threat Exchange feed',
    type: 'feed',
    status: 'Active',
    lastUpdated: '10m ago',
    indicators: 1543,
    format: 'STIX',
  },
  {
    id: 'source-2',
    name: 'MISP Instance',
    description: 'Malware Information Sharing Platform',
    type: 'api',
    status: 'Active',
    lastUpdated: '1h ago',
    indicators: 892,
    format: 'MISP',
  },
  {
    id: 'source-3',
    name: 'Twitter OSINT',
    description: 'Open Source Intelligence from Twitter',
    type: 'social',
    status: 'Warning',
    lastUpdated: '6h ago',
    indicators: 241,
    format: 'JSON',
  },
  {
    id: 'source-4',
    name: 'Community Reports',
    description: 'User submitted intelligence reports',
    type: 'community',
    status: 'Active',
    lastUpdated: '3d ago',
    indicators: 56,
    format: 'STIX',
  },
  {
    id: 'source-5',
    name: 'Shodan',
    description: 'Internet device search engine',
    type: 'osint',
    status: 'Error',
    lastUpdated: '1d ago',
    indicators: 328,
    format: 'JSON',
  },
];

export default function Index() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cyber-foreground">Threat Intelligence Dashboard</h1>
          <p className="text-cyber-foreground/70">Overview of current threat landscape and intelligence feeds</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus size={16} className="mr-2" />
            Add Source
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {threatData.map((threat) => (
          <Card key={threat.id} className="cyber-card backdrop-blur-sm border-cyber-accent/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant={
                  threat.severity === 'Critical' ? 'destructive' : 
                  threat.severity === 'High' ? 'default' : 
                  threat.severity === 'Medium' ? 'secondary' : 'outline'
                }>
                  {threat.severity}
                </Badge>
                <Badge variant="outline" className="text-xs">{threat.type}</Badge>
              </div>
              <CardTitle className="text-lg mt-2 text-cyber-foreground">{threat.name}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>Last seen: {threat.lastSeen}</span>
                <span className={`text-${
                  threat.trend === 'increasing' ? 'destructive' : 
                  threat.trend === 'decreasing' ? 'cyber-secondary' : 'cyber-foreground/70'
                }`}>
                  {threat.count} indicators
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="cyber-card col-span-2 backdrop-blur-sm border-cyber-accent/20 lg:row-span-2">
          <CardHeader>
            <CardTitle>Threat Map</CardTitle>
            <CardDescription>Geographic distribution of threat indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px] bg-cyber-primary/40 rounded-md border border-cyber-accent/10 flex items-center justify-center">
              <p className="text-cyber-foreground/50">Threat Map Visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card backdrop-blur-sm border-cyber-accent/20">
          <CardHeader>
            <CardTitle>Threat Timeline</CardTitle>
            <CardDescription>Recent activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[200px] bg-cyber-primary/40 rounded-md border border-cyber-accent/10 flex items-center justify-center">
              <p className="text-cyber-foreground/50">Timeline Visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card backdrop-blur-sm border-cyber-accent/20">
          <CardHeader>
            <CardTitle>Threat Trends</CardTitle>
            <CardDescription>Evolving patterns and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[200px] bg-cyber-primary/40 rounded-md border border-cyber-accent/10 flex items-center justify-center">
              <p className="text-cyber-foreground/50">Trend Visualization</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-card col-span-1 lg:col-span-3 backdrop-blur-sm border-cyber-accent/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>Active intelligence feeds and integrations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-2" />
              Add Source
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-cyber-foreground/90">
                <thead>
                  <tr className="border-b border-cyber-accent/10">
                    <th className="py-3 px-2 text-cyber-foreground/70">Name</th>
                    <th className="py-3 px-2 text-cyber-foreground/70">Type</th>
                    <th className="py-3 px-2 text-cyber-foreground/70">Status</th>
                    <th className="py-3 px-2 text-cyber-foreground/70">Last Updated</th>
                    <th className="py-3 px-2 text-cyber-foreground/70">Indicators</th>
                    <th className="py-3 px-2 text-cyber-foreground/70">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSources.map((source) => (
                    <tr key={source.id} className="border-b border-cyber-accent/5 hover:bg-cyber-accent/5">
                      <td className="py-3 px-2 font-medium">{source.name}</td>
                      <td className="py-3 px-2">{source.type}</td>
                      <td className="py-3 px-2">
                        <Badge variant={
                          source.status === 'Active' ? 'secondary' : 
                          source.status === 'Warning' ? 'default' : 'destructive'
                        } className="text-xs">
                          {source.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">{source.lastUpdated}</td>
                      <td className="py-3 px-2">{source.indicators}</td>
                      <td className="py-3 px-2">{source.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
