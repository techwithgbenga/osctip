
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database, Globe, Users, FileText, Calendar, ArrowUpRight, Star, PenTool, Tag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface IntelligenceReport {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  sourceIcon?: string;
  publishedDate: string;
  confidence: number;
  threatActors: string[];
  ttps: string[];
  tags: string[];
  isFavorited: boolean;
}

const IntelligencePage = () => {
  const [reports, setReports] = useState<IntelligenceReport[]>(sampleReports);

  const toggleFavorite = (id: number) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, isFavorited: !report.isFavorited } : report
    ));
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Intelligence Library</h1>
        <p className="text-muted-foreground">
          Access and analyze threat intelligence reports from various sources.
        </p>
        
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="apt">APT Groups</TabsTrigger>
              <TabsTrigger value="malware">Malware</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <PenTool className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
              <Button variant="outline" size="sm">
                <Tag className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <ReportCard 
                  key={report.id} 
                  report={report} 
                  toggleFavorite={() => toggleFavorite(report.id)} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="apt" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports
                .filter(report => report.category === 'APT')
                .map((report) => (
                  <ReportCard 
                    key={report.id} 
                    report={report} 
                    toggleFavorite={() => toggleFavorite(report.id)} 
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="malware" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports
                .filter(report => report.category === 'Malware')
                .map((report) => (
                  <ReportCard 
                    key={report.id} 
                    report={report} 
                    toggleFavorite={() => toggleFavorite(report.id)} 
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vulnerabilities" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports
                .filter(report => report.category === 'Vulnerability')
                .map((report) => (
                  <ReportCard 
                    key={report.id} 
                    report={report} 
                    toggleFavorite={() => toggleFavorite(report.id)} 
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface ReportCardProps {
  report: IntelligenceReport;
  toggleFavorite: () => void;
}

const ReportCard = ({ report, toggleFavorite }: ReportCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={report.sourceIcon} />
              <AvatarFallback>{report.source.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{report.source}</span>
          </div>
          <Badge variant={getConfidenceBadgeVariant(report.confidence)}>
            {report.confidence}% Confidence
          </Badge>
        </div>
        <CardTitle className="mt-2 text-lg">{report.title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          {report.publishedDate}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{report.description}</p>
        
        {report.threatActors.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs text-muted-foreground mb-1">Threat Actors</h4>
            <div className="flex flex-wrap gap-1">
              {report.threatActors.map((actor) => (
                <span key={actor} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-2 py-0.5 rounded">
                  {actor}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {report.tags.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {report.tags.map((tag) => (
                <span key={tag} className="bg-gray-200/20 text-gray-100 text-xs px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="link" className="p-0 h-auto" asChild>
          <a href="#" className="flex items-center text-cyber-secondary">
            <span>Read full report</span>
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleFavorite}
        >
          <Star
            className={`h-4 w-4 ${report.isFavorited ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to get badge variant based on confidence
const getConfidenceBadgeVariant = (confidence: number) => {
  if (confidence >= 80) return 'default';
  if (confidence >= 60) return 'secondary';
  if (confidence >= 40) return 'outline';
  return 'destructive';
};

// Sample data
const sampleReports: IntelligenceReport[] = [
  {
    id: 1,
    title: 'Analysis of Lazarus APT 2024 Campaign',
    description: 'A comprehensive analysis of the latest campaign by North Korean state-sponsored group Lazarus, targeting financial institutions and cryptocurrency exchanges.',
    category: 'APT',
    source: 'Mandiant',
    publishedDate: 'March 15, 2024',
    confidence: 85,
    threatActors: ['Lazarus Group', 'APT38'],
    ttps: ['T1566', 'T1027', 'T1486'],
    tags: ['North Korea', 'Financial', 'Cryptocurrency'],
    isFavorited: true
  },
  {
    id: 2,
    title: 'BlackCat Ransomware: Technical Deep Dive',
    description: 'Technical analysis of the BlackCat (ALPHV) ransomware, including infection vectors, encryption methods, and attribution to the REvil ransomware group.',
    category: 'Malware',
    source: 'CrowdStrike',
    publishedDate: 'March 10, 2024',
    confidence: 92,
    threatActors: ['REvil Associate'],
    ttps: ['T1486', 'T1490', 'T1082'],
    tags: ['Ransomware', 'Double Extortion', 'Rust'],
    isFavorited: false
  },
  {
    id: 3,
    title: 'Spring4Shell Vulnerability (CVE-2022-22965)',
    description: 'Analysis of remote code execution vulnerability in Spring Framework allowing attackers to execute arbitrary code via specially crafted web requests.',
    category: 'Vulnerability',
    source: 'CISA',
    publishedDate: 'March 05, 2024',
    confidence: 100,
    threatActors: [],
    ttps: ['T1190'],
    tags: ['CVE-2022-22965', 'RCE', 'Java'],
    isFavorited: true
  },
  {
    id: 4,
    title: 'Emerging Threat: DarkGate Malware Campaign',
    description: 'Investigation of the DarkGate malware campaign using phishing emails with malicious attachments to deploy remote access trojans.',
    category: 'Malware',
    source: 'Recorded Future',
    publishedDate: 'February 28, 2024',
    confidence: 75,
    threatActors: ['TA551'],
    ttps: ['T1566.001', 'T1204.002'],
    tags: ['RAT', 'Malware', 'Phishing'],
    isFavorited: false
  },
  {
    id: 5,
    title: 'APT29 Campaign Targeting Government Entities',
    description: 'Analysis of Russian state-sponsored APT29 campaign using sophisticated techniques to target government and diplomatic entities.',
    category: 'APT',
    source: 'Microsoft',
    publishedDate: 'February 20, 2024',
    confidence: 88,
    threatActors: ['APT29', 'Cozy Bear'],
    ttps: ['T1078', 'T1105', 'T1571'],
    tags: ['Russia', 'Government', 'Espionage'],
    isFavorited: false
  },
  {
    id: 6,
    title: 'Analysis of VMware ESXi Zero-Day Exploitation',
    description: 'Technical analysis of actively exploited zero-day vulnerability in VMware ESXi allowing guest-to-host escape and remote code execution.',
    category: 'Vulnerability',
    source: 'VMware',
    publishedDate: 'February 15, 2024',
    confidence: 96,
    threatActors: [],
    ttps: ['T1190'],
    tags: ['Zero-day', 'VMware', 'RCE'],
    isFavorited: false
  }
];

export default IntelligencePage;
