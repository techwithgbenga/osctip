
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronDown, Download, Filter, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("last-30-days");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Visualize and analyze threat intelligence data and trends.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateRange(dateRange)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setDateRange("last-7-days")}>
                  Last 7 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("last-30-days")}>
                  Last 30 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("last-90-days")}>
                  Last 90 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("year-to-date")}>
                  Year to Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
                  <Badge variant="outline">+12.5%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">
                    +156 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                  <Badge variant="destructive">+32%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">
                    +22 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">IOC Count</CardTitle>
                  <Badge>+8.2%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23,591</div>
                  <p className="text-xs text-muted-foreground">
                    +1,782 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                  <Badge variant="secondary">+2</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-muted-foreground">
                    2 new sources added
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Threat Trends</CardTitle>
                  <CardDescription>Threats detected over time by severity</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={threatTrendsData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCritical)" />
                      <Area type="monotone" dataKey="high" stroke="#f97316" fillOpacity={1} fill="url(#colorHigh)" />
                      <Area type="monotone" dataKey="medium" stroke="#eab308" fillOpacity={1} fill="url(#colorMedium)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Threat Types</CardTitle>
                  <CardDescription>Distribution of threats by category</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {threatTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {threatTypesData.map((type, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-xs">{type.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Indicators by Type</CardTitle>
                <CardDescription>Monthly indicators detected by type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={indicatorsByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ip" stackId="a" fill="#8884d8" />
                    <Bar dataKey="domain" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="url" stackId="a" fill="#ffc658" />
                    <Bar dataKey="hash" stackId="a" fill="#ff8042" />
                    <Bar dataKey="email" stackId="a" fill="#0088fe" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="threats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Threat Severity Distribution</CardTitle>
                <CardDescription>Distribution of threats by severity over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={threatSeverityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" />
                    <Line type="monotone" dataKey="high" stroke="#f97316" />
                    <Line type="monotone" dataKey="medium" stroke="#eab308" />
                    <Line type="monotone" dataKey="low" stroke="#22c55e" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="indicators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indicators Confidence</CardTitle>
                <CardDescription>Confidence level distribution for indicators</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={indicatorConfidenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Source Contributions</CardTitle>
                <CardDescription>Number of indicators contributed by each source</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceContributionsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Helper function to format date range
const formatDateRange = (range: string) => {
  switch (range) {
    case "last-7-days":
      return "Last 7 Days";
    case "last-30-days":
      return "Last 30 Days";
    case "last-90-days":
      return "Last 90 Days";
    case "year-to-date":
      return "Year to Date";
    default:
      return "Last 30 Days";
  }
};

// Helper function for pie chart labels
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Sample colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

// Sample data for threat trends
const threatTrendsData = [
  { date: 'Jan', critical: 4, high: 12, medium: 18 },
  { date: 'Feb', critical: 6, high: 15, medium: 20 },
  { date: 'Mar', critical: 8, high: 17, medium: 22 },
  { date: 'Apr', critical: 10, high: 20, medium: 25 },
  { date: 'May', critical: 7, high: 18, medium: 23 },
  { date: 'Jun', critical: 9, high: 21, medium: 28 },
  { date: 'Jul', critical: 12, high: 24, medium: 30 }
];

// Sample data for threat types
const threatTypesData = [
  { name: 'Malware', value: 35 },
  { name: 'Phishing', value: 25 },
  { name: 'Ransomware', value: 15 },
  { name: 'Zero-day', value: 10 },
  { name: 'APT', value: 8 },
  { name: 'Other', value: 7 }
];

// Sample data for indicators by type
const indicatorsByTypeData = [
  { name: 'Jan', ip: 65, domain: 45, url: 38, hash: 28, email: 15 },
  { name: 'Feb', ip: 75, domain: 50, url: 42, hash: 30, email: 18 },
  { name: 'Mar', ip: 85, domain: 55, url: 45, hash: 35, email: 20 },
  { name: 'Apr', ip: 80, domain: 48, url: 40, hash: 32, email: 17 },
  { name: 'May', ip: 90, domain: 58, url: 48, hash: 38, email: 22 },
  { name: 'Jun', ip: 95, domain: 60, url: 50, hash: 40, email: 25 },
  { name: 'Jul', ip: 100, domain: 65, url: 55, hash: 45, email: 30 }
];

// Sample data for threat severity
const threatSeverityData = [
  { date: 'Jan', critical: 5, high: 15, medium: 25, low: 40 },
  { date: 'Feb', critical: 8, high: 18, medium: 28, low: 42 },
  { date: 'Mar', critical: 10, high: 22, medium: 30, low: 45 },
  { date: 'Apr', critical: 12, high: 25, medium: 32, low: 48 },
  { date: 'May', critical: 9, high: 20, medium: 29, low: 44 },
  { date: 'Jun', critical: 11, high: 24, medium: 31, low: 46 },
  { date: 'Jul', critical: 14, high: 28, medium: 34, low: 50 }
];

// Sample data for indicator confidence
const indicatorConfidenceData = [
  { range: '0-20%', count: 120 },
  { range: '21-40%', count: 250 },
  { range: '41-60%', count: 580 },
  { range: '61-80%', count: 720 },
  { range: '81-100%', count: 890 }
];

// Sample data for source contributions
const sourceContributionsData = [
  { name: 'AlienVault OTX', count: 4500 },
  { name: 'MISP', count: 3800 },
  { name: 'VirusTotal', count: 3200 },
  { name: 'Crowdstrike', count: 2900 },
  { name: 'Recorded Future', count: 2600 },
  { name: 'PhishLabs', count: 2100 },
  { name: 'IBM X-Force', count: 1800 },
  { name: 'Shodan', count: 1500 }
];

export default AnalyticsPage;
