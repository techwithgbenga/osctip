
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, Database, Globe, Shield, Clock } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend
} from "recharts";

const threatTrendsData = [
  { name: 'Jan', malware: 65, phishing: 42, ransomware: 28 },
  { name: 'Feb', malware: 59, phishing: 55, ransomware: 30 },
  { name: 'Mar', malware: 80, phishing: 40, ransomware: 35 },
  { name: 'Apr', malware: 81, phishing: 56, ransomware: 40 },
  { name: 'May', malware: 56, phishing: 68, ransomware: 45 },
  { name: 'Jun', malware: 55, phishing: 72, ransomware: 52 },
  { name: 'Jul', malware: 40, phishing: 63, ransomware: 58 },
];

const threatMapData = [
  { country: 'USA', attacks: 1245 },
  { country: 'Russia', attacks: 984 },
  { country: 'China', attacks: 876 },
  { country: 'Brazil', attacks: 654 },
  { country: 'India', attacks: 543 },
  { country: 'UK', attacks: 432 },
  { country: 'Germany', attacks: 321 },
];

const timelineData = [
  { date: '2023-04-10', events: 25 },
  { date: '2023-04-11', events: 18 },
  { date: '2023-04-12', events: 32 },
  { date: '2023-04-13', events: 15 },
  { date: '2023-04-14', events: 28 },
  { date: '2023-04-15', events: 40 },
  { date: '2023-04-16', events: 35 },
];

const dataSources = [
  { name: 'AlienVault OTX', type: 'feed', status: 'Active', lastUpdated: '10m ago', indicators: 1543, format: 'STIX' },
  { name: 'MISP Instance', type: 'api', status: 'Active', lastUpdated: '1h ago', indicators: 892, format: 'MISP' },
  { name: 'Twitter OSINT', type: 'social', status: 'Warning', lastUpdated: '6h ago', indicators: 241, format: 'JSON' },
  { name: 'Community Reports', type: 'community', status: 'Active', lastUpdated: '3d ago', indicators: 56, format: 'STIX' },
  { name: 'Shodan', type: 'osint', status: 'Error', lastUpdated: '1d ago', indicators: 328, format: 'JSON' },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Threat Intelligence Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,864</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Indicators</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,483</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-red-500">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 sources need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Threat Map</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="datasources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Summary</CardTitle>
              <CardDescription>Overview of current threat landscape</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="malware" fill="#8884d8" name="Malware" />
                    <Bar dataKey="phishing" fill="#82ca9d" name="Phishing" />
                    <Bar dataKey="ransomware" fill="#ffc658" name="Ransomware" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Threat Map</CardTitle>
              <CardDescription>Geographic distribution of cyber threats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive threat map will be displayed here</p>
                  <p className="text-xs text-muted-foreground mt-2">Top affected countries:</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 max-w-sm mx-auto">
                    {threatMapData.map(country => (
                      <div key={country.country} className="flex justify-between text-sm">
                        <span>{country.country}</span>
                        <span className="font-medium">{country.attacks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Timeline</CardTitle>
              <CardDescription>Recent security events and incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="events" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                      name="Security Events"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Trends</CardTitle>
              <CardDescription>Evolving threat patterns and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="malware" fill="#8884d8" name="Malware" />
                    <Bar dataKey="phishing" fill="#82ca9d" name="Phishing" />
                    <Bar dataKey="ransomware" fill="#ffc658" name="Ransomware" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Data Sources</CardTitle>
              <CardDescription>Active intelligence feeds and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Indicators</TableHead>
                    <TableHead>Format</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataSources.map((source) => (
                    <TableRow key={source.name}>
                      <TableCell className="font-medium">{source.name}</TableCell>
                      <TableCell>{source.type}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          source.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          source.status === 'Warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          source.status === 'Error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {source.status}
                        </span>
                      </TableCell>
                      <TableCell>{source.lastUpdated}</TableCell>
                      <TableCell>{source.indicators}</TableCell>
                      <TableCell>{source.format}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
