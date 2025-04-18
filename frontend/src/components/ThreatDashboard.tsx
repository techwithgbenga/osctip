
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Bug, FileText, Clock, Network, Lock, Activity } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ThreatDashboardProps {
  onClose: () => void;
}

const ThreatDashboard: React.FC<ThreatDashboardProps> = ({ onClose }) => {
  // Sample data for visualization
  const threatTrendData = [
    { name: 'Jan', malware: 65, phishing: 40, ddos: 24, zeroday: 10 },
    { name: 'Feb', malware: 59, phishing: 45, ddos: 18, zeroday: 8 },
    { name: 'Mar', malware: 80, phishing: 52, ddos: 29, zeroday: 15 },
    { name: 'Apr', malware: 81, phishing: 56, ddos: 23, zeroday: 12 },
    { name: 'May', malware: 56, phishing: 49, ddos: 20, zeroday: 5 },
    { name: 'Jun', malware: 55, phishing: 60, ddos: 15, zeroday: 14 }
  ];

  const vulnerabilityData = [
    { name: 'Critical', value: 12 },
    { name: 'High', value: 26 },
    { name: 'Medium', value: 38 },
    { name: 'Low', value: 54 }
  ];

  const COLORS = ['#FF5252', '#FF7E39', '#FFC107', '#4CAF50'];

  const mitreTacticData = [
    { name: 'Initial Access', count: 32 },
    { name: 'Execution', count: 25 },
    { name: 'Persistence', count: 18 },
    { name: 'Privilege Escalation', count: 15 },
    { name: 'Defense Evasion', count: 22 },
    { name: 'Credential Access', count: 19 }
  ];

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] overflow-auto border border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-primary" /> 
              SecuriChat Threat Intelligence Dashboard
            </CardTitle>
            <CardDescription>
              Real-time visualization of cybersecurity threats and vulnerabilities
            </CardDescription>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-2">
              <TabsTrigger value="overview" className="flex gap-2 items-center">
                <Shield className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="vulnerabilities" className="flex gap-2 items-center">
                <Bug className="h-4 w-4" /> Vulnerabilities
              </TabsTrigger>
              <TabsTrigger value="mitre" className="flex gap-2 items-center">
                <Network className="h-4 w-4" /> MITRE ATT&CK
              </TabsTrigger>
              <TabsTrigger value="incidents" className="flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4" /> Incidents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Active Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+5 in last 24h</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Bug className="h-4 w-4 text-yellow-500" />
                      Vulnerabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">130</div>
                    <p className="text-xs text-muted-foreground">12 critical</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      Security Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+2% from last scan</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Last Scan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1h 23m</div>
                    <p className="text-xs text-muted-foreground">ago</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Threat Trends (6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={threatTrendData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="malware" stroke="#FF5252" activeDot={{ r: 8 }} name="Malware" />
                      <Line type="monotone" dataKey="phishing" stroke="#FFC107" name="Phishing" />
                      <Line type="monotone" dataKey="ddos" stroke="#2196F3" name="DDoS" />
                      <Line type="monotone" dataKey="zeroday" stroke="#4CAF50" name="Zero-day" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vulnerabilities" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Bug className="h-4 w-4 text-primary" />
                      Vulnerabilities by Severity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vulnerabilityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {vulnerabilityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Top CVEs This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { id: 'CVE-2023-1234', severity: 'Critical', score: 9.8, name: 'Remote Code Execution in OpenSSL' },
                        { id: 'CVE-2023-5678', severity: 'High', score: 8.5, name: 'SQL Injection in PostgreSQL' },
                        { id: 'CVE-2023-9012', severity: 'Critical', score: 9.6, name: 'Memory Corruption in Linux Kernel' },
                        { id: 'CVE-2023-3456', severity: 'High', score: 7.9, name: 'Authentication Bypass in Apache' },
                        { id: 'CVE-2023-7890', severity: 'Medium', score: 6.4, name: 'Stored XSS in React Router' },
                      ].map(cve => (
                        <div key={cve.id} className="flex items-center justify-between p-2 rounded hover:bg-secondary/50">
                          <div>
                            <div className="font-mono text-sm">{cve.id}</div>
                            <div className="text-xs text-muted-foreground">{cve.name}</div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            cve.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                            cve.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {cve.severity} ({cve.score})
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mitre" className="space-y-4">
              <Card className="border border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Network className="h-4 w-4 text-primary" />
                    MITRE ATT&CK Tactics
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mitreTacticData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Recent MITRE Technique Detections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { id: 'T1566', name: 'Phishing', description: 'Spearphishing Attachment detected in email to finance@company.com', time: '12 mins ago' },
                      { id: 'T1059', name: 'Command and Scripting Interpreter', description: 'PowerShell execution with encoded command on endpoint WKSTN-234', time: '43 mins ago' },
                      { id: 'T1053', name: 'Scheduled Task/Job', description: 'Unusual scheduled task created on database server DB-001', time: '1.5 hours ago' },
                      { id: 'T1203', name: 'Exploitation for Client Execution', description: 'PDF exploit attempt detected on marketing user endpoint', time: '3 hours ago' },
                      { id: 'T1078', name: 'Valid Accounts', description: 'Multiple login attempts from unusual geography for admin account', time: '5 hours ago' },
                    ].map(technique => (
                      <div key={technique.id} className="flex items-start justify-between p-2 rounded hover:bg-secondary/50">
                        <div>
                          <div className="font-mono text-sm flex items-center gap-1">
                            {technique.id} <span className="text-muted-foreground">|</span> {technique.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{technique.description}</div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {technique.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border/50 md:col-span-2">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      Active Incidents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { id: 'INC-2023-045', title: 'Suspected Data Exfiltration', severity: 'Critical', status: 'In Progress', updated: '5 mins ago' },
                        { id: 'INC-2023-044', title: 'Brute Force Authentication Attack', severity: 'High', status: 'Investigating', updated: '35 mins ago' },
                        { id: 'INC-2023-043', title: 'Unusual Network Traffic to C2 Server', severity: 'Critical', status: 'Remediating', updated: '1.2 hours ago' },
                        { id: 'INC-2023-042', title: 'Malware Detected on Engineering Workstation', severity: 'Medium', status: 'In Progress', updated: '3 hours ago' },
                      ].map(incident => (
                        <div key={incident.id} className="flex items-start justify-between p-3 rounded border border-border/30 hover:bg-secondary/30">
                          <div>
                            <div className="font-mono text-sm">{incident.id}</div>
                            <div className="font-medium mt-1">{incident.title}</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              incident.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                              incident.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {incident.severity}
                            </div>
                            <div className="text-xs mt-1">{incident.status}</div>
                            <div className="text-xs text-muted-foreground mt-1">Updated {incident.updated}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Incident Response Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { time: '09:42 AM', event: 'INC-2023-045 escalated to Critical', user: 'Sarah Chen' },
                        { time: '09:15 AM', event: 'New incident created: Suspected Data Exfiltration', user: 'SIEM Alert' },
                        { time: '08:53 AM', event: 'INC-2023-044 assigned to Security Team', user: 'Alex Morgan' },
                        { time: '08:30 AM', event: 'New incident created: Brute Force Authentication Attack', user: 'SIEM Alert' },
                        { time: '07:45 AM', event: 'INC-2023-043 containment actions approved', user: 'James Wilson' },
                      ].map((event, i) => (
                        <div key={i} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                          <div className="text-xs font-mono">{event.time}</div>
                          <div className="text-sm">{event.event}</div>
                          <div className="text-xs text-muted-foreground">by {event.user}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDashboard;
