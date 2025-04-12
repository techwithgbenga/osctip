
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Clock, Users } from 'lucide-react';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const reports = [
    {
      id: 1,
      title: "Weekly Threat Intelligence Summary",
      description: "Overview of significant threats observed in the past week",
      date: "2025-04-08",
      type: "scheduled",
      author: "System"
    },
    {
      id: 2,
      title: "APT29 Campaign Analysis",
      description: "Detailed analysis of recent APT29 activities targeting financial institutions",
      date: "2025-04-05",
      type: "analysis",
      author: "Security Analyst"
    },
    {
      id: 3,
      title: "Ransomware Trends Q1 2025",
      description: "Quarterly report on ransomware evolution and impact",
      date: "2025-03-31",
      type: "scheduled",
      author: "Threat Research Team"
    },
    {
      id: 4,
      title: "Zero-day Vulnerability CVE-2025-1234",
      description: "Analysis of critical zero-day affecting major database systems",
      date: "2025-03-28",
      type: "alert",
      author: "Security Analyst"
    }
  ];

  const filteredReports = activeTab === "all" 
    ? reports 
    : reports.filter(report => report.type === activeTab);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-cyber-secondary">Reports</h1>
            <p className="text-muted-foreground">
              Access and generate threat intelligence reports
            </p>
          </div>
          <Button className="bg-cyber-secondary hover:bg-cyber-secondary/90">
            <FileText className="mr-2 h-4 w-4" /> Generate New Report
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scheduled" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analysis" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="alert" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface ReportCardProps {
  report: {
    id: number;
    title: string;
    description: string;
    date: string;
    type: string;
    author: string;
  };
}

const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Card className="overflow-hidden border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{report.title}</CardTitle>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            report.type === 'alert' ? 'bg-red-900/20 text-red-400' : 
            report.type === 'analysis' ? 'bg-blue-900/20 text-blue-400' : 
            'bg-green-900/20 text-green-400'
          }`}>
            {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-cyber-foreground/80">
          {report.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-cyber-foreground/70">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{report.author}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4 border-cyber-accent/20">
          <Download size={14} className="mr-2" /> Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportsPage;
