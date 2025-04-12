
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Flag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ThreatsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence</h1>
        <p className="text-muted-foreground">
          Track and analyze the latest cybersecurity threats and vulnerabilities.
        </p>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Threats</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeThreats.map((threat) => (
                <Card key={threat.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {threat.name}
                    </CardTitle>
                    <div className={`p-1 rounded-full ${getThreatSeverityColor(threat.severity)}`}>
                      <AlertTriangle size={16} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-2">
                      Type: {threat.type} • First seen: {threat.firstSeen}
                    </div>
                    <p className="text-sm">{threat.description}</p>
                    <div className="flex mt-4 gap-2">
                      {threat.tags.map((tag) => (
                        <span key={tag} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentThreats.map((threat) => (
                <Card key={threat.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {threat.name}
                    </CardTitle>
                    <div className={`p-1 rounded-full ${getThreatSeverityColor(threat.severity)}`}>
                      <AlertTriangle size={16} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-2">
                      Type: {threat.type} • First seen: {threat.firstSeen}
                    </div>
                    <p className="text-sm">{threat.description}</p>
                    <div className="flex mt-4 gap-2">
                      {threat.tags.map((tag) => (
                        <span key={tag} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {criticalThreats.map((threat) => (
                <Card key={threat.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {threat.name}
                    </CardTitle>
                    <div className={`p-1 rounded-full ${getThreatSeverityColor(threat.severity)}`}>
                      <AlertTriangle size={16} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-2">
                      Type: {threat.type} • First seen: {threat.firstSeen}
                    </div>
                    <p className="text-sm">{threat.description}</p>
                    <div className="flex mt-4 gap-2">
                      {threat.tags.map((tag) => (
                        <span key={tag} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Helper function to get color based on threat severity
const getThreatSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/10 text-red-500';
    case 'high':
      return 'bg-orange-500/10 text-orange-500';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'low':
      return 'bg-green-500/10 text-green-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

// Sample data for threats
const activeThreats = [
  {
    id: 1,
    name: 'Log4j Vulnerability (Log4Shell)',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Critical remote code execution vulnerability in Log4j library affecting millions of Java applications.',
    firstSeen: '2023-11-10',
    tags: ['CVE-2021-44228', 'RCE', 'Java']
  },
  {
    id: 2,
    name: 'BlackCat Ransomware',
    type: 'Ransomware',
    severity: 'high',
    description: 'A sophisticated ransomware-as-a-service operation targeting enterprise networks worldwide.',
    firstSeen: '2023-12-01',
    tags: ['Ransomware', 'RaaS', 'Double Extortion']
  },
  {
    id: 3,
    name: 'DarkGate Malware Campaign',
    type: 'Malware',
    severity: 'high',
    description: 'Multi-stage infection chain delivering remote access trojans and information stealers.',
    firstSeen: '2024-01-15',
    tags: ['RAT', 'Malware', 'Phishing']
  },
  {
    id: 4,
    name: 'Scattered Spider BEC Campaign',
    type: 'Social Engineering',
    severity: 'medium',
    description: 'Business email compromise campaign targeting financial institutions with sophisticated social engineering.',
    firstSeen: '2024-02-20',
    tags: ['BEC', 'Phishing', 'Social Engineering']
  },
  {
    id: 5,
    name: 'Lazarus APT Campaign',
    type: 'Advanced Persistent Threat',
    severity: 'critical',
    description: 'Nation-state sponsored campaign targeting critical infrastructure and financial organizations.',
    firstSeen: '2024-01-05',
    tags: ['APT', 'Nation-state', 'Supply Chain']
  },
  {
    id: 6,
    name: 'VMware ESXi Zero-Day',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Unpatched vulnerability in VMware ESXi allowing guest-to-host escape and remote code execution.',
    firstSeen: '2024-03-01',
    tags: ['Zero-day', 'VMware', 'RCE']
  }
];

const recentThreats = [
  {
    id: 7,
    name: 'BlackCat Ransomware (New Variant)',
    type: 'Ransomware',
    severity: 'high',
    description: 'Updated variant with improved evasion techniques and faster encryption algorithms.',
    firstSeen: '2024-03-15',
    tags: ['Ransomware', 'RaaS', 'Evasion']
  },
  {
    id: 8,
    name: 'Emotet Botnet Resurgence',
    type: 'Botnet',
    severity: 'high',
    description: 'Return of the Emotet botnet infrastructure after coordinated takedown, with new C2 infrastructure.',
    firstSeen: '2024-03-10',
    tags: ['Botnet', 'Malware', 'Banking Trojan']
  },
  {
    id: 9,
    name: 'Spring4Shell Vulnerability',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Remote code execution vulnerability in Spring Framework allowing attackers to execute arbitrary code.',
    firstSeen: '2024-03-05',
    tags: ['CVE-2022-22965', 'RCE', 'Java']
  },
];

const criticalThreats = [
  {
    id: 1,
    name: 'Log4j Vulnerability (Log4Shell)',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Critical remote code execution vulnerability in Log4j library affecting millions of Java applications.',
    firstSeen: '2023-11-10',
    tags: ['CVE-2021-44228', 'RCE', 'Java']
  },
  {
    id: 5,
    name: 'Lazarus APT Campaign',
    type: 'Advanced Persistent Threat',
    severity: 'critical',
    description: 'Nation-state sponsored campaign targeting critical infrastructure and financial organizations.',
    firstSeen: '2024-01-05',
    tags: ['APT', 'Nation-state', 'Supply Chain']
  },
  {
    id: 6,
    name: 'VMware ESXi Zero-Day',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Unpatched vulnerability in VMware ESXi allowing guest-to-host escape and remote code execution.',
    firstSeen: '2024-03-01',
    tags: ['Zero-day', 'VMware', 'RCE']
  },
  {
    id: 9,
    name: 'Spring4Shell Vulnerability',
    type: 'Zero-day exploit',
    severity: 'critical',
    description: 'Remote code execution vulnerability in Spring Framework allowing attackers to execute arbitrary code.',
    firstSeen: '2024-03-05',
    tags: ['CVE-2022-22965', 'RCE', 'Java']
  }
];

export default ThreatsPage;
