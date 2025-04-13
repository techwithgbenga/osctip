import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Users, Shield, Bug, BugOff } from 'lucide-react';

// Mock data for intelligence reports
const mockReports = [
  {
    id: "1",
    title: "APT29 New Campaign Targeting Healthcare Sector",
    category: "APT Groups",
    date: "2025-04-10",
    severity: "critical",
    summary: "APT29 (Cozy Bear) has launched a new phishing campaign targeting healthcare organizations with COVID-19 themed lures.",
    tags: ["APT29", "Phishing", "Healthcare"]
  },
  {
    id: "2",
    title: "Ransomware Analysis: BlackCat Evolution",
    category: "Malware",
    date: "2025-04-08",
    severity: "high",
    summary: "Analysis of the latest BlackCat ransomware variant shows new evasion techniques and enhanced encryption capabilities.",
    tags: ["Ransomware", "BlackCat", "Malware Analysis"]
  },
  {
    id: "3",
    title: "Critical Vulnerability in Apache Log4j",
    category: "Vulnerabilities",
    date: "2025-04-05",
    severity: "critical",
    summary: "A new zero-day vulnerability in Apache Log4j allows remote code execution. Patch immediately.",
    tags: ["CVE-2025-1234", "Log4j", "RCE"]
  },
  {
    id: "4",
    title: "Emotet Botnet Resurfaces with New Tactics",
    category: "Malware",
    date: "2025-04-02",
    severity: "medium",
    summary: "The Emotet botnet has resurfaced after a brief period of inactivity, now using new distribution techniques via compromised websites.",
    tags: ["Emotet", "Botnet", "Malware"]
  },
  {
    id: "5",
    title: "APT28 Campaign Targeting Government Entities",
    category: "APT Groups",
    date: "2025-03-30",
    severity: "high",
    summary: "APT28 (Fancy Bear) is conducting a spear-phishing campaign targeting government entities with malicious attachments.",
    tags: ["APT28", "Government", "Spear-phishing"]
  }
];

// Component for displaying a single intelligence report card
const IntelligenceCard = ({ report }: { report: typeof mockReports[0] }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{report.title}</CardTitle>
          <Badge 
            variant={
              report.severity === "critical" ? "destructive" : 
              report.severity === "high" ? "default" :
              report.severity === "medium" ? "secondary" : "outline"
            }
          >
            {report.severity}
          </Badge>
        </div>
        <CardDescription>Published on {report.date} • {report.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{report.summary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {report.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">View Full Report</Button>
      </CardFooter>
    </Card>
  );
};

const Intelligence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter reports based on search query and active category
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || report.category.toLowerCase().includes(activeCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Intelligence Library</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search intelligence reports..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>All Reports</span>
          </TabsTrigger>
          <TabsTrigger value="apt groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>APT Groups</span>
          </TabsTrigger>
          <TabsTrigger value="malware" className="flex items-center gap-2">
            <Bug className="h-4 w-4" />
            <span>Malware</span>
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <BugOff className="h-4 w-4" />
            <span>Vulnerabilities</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <IntelligenceCard key={report.id} report={report} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No intelligence reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="apt groups" className="mt-0">
          <div className="grid gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.filter(r => r.category === "APT Groups").map(report => (
                <IntelligenceCard key={report.id} report={report} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No APT group reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="malware" className="mt-0">
          <div className="grid gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.filter(r => r.category === "Malware").map(report => (
                <IntelligenceCard key={report.id} report={report} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No malware reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="vulnerabilities" className="mt-0">
          <div className="grid gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.filter(r => r.category === "Vulnerabilities").map(report => (
                <IntelligenceCard key={report.id} report={report} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No vulnerability reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Submit New Intelligence Report</span>
        </Button>
      </div>
    </div>
  );
};

export default Intelligence;
