
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Search, Filter, DownloadCloud, Copy } from 'lucide-react';
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
} from '@/components/ui/dialog';

type IndicatorType = 'ip' | 'domain' | 'url' | 'hash' | 'email' | 'file';

interface Indicator {
  id: number;
  value: string;
  type: IndicatorType;
  confidence: number;
  source: string;
  dateAdded: string;
  tags: string[];
}

const IndicatorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredIndicators = indicators.filter((indicator) => 
    indicator.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRowClick = (indicator: Indicator) => {
    setSelectedIndicator(indicator);
    setShowDetails(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Threat Indicators</h1>
        <p className="text-muted-foreground">
          Search and analyze indicators of compromise (IOCs) from various sources.
        </p>

        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search indicators by value, type, source, or tag..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Filter by IP</DropdownMenuItem>
              <DropdownMenuItem>Filter by Domain</DropdownMenuItem>
              <DropdownMenuItem>Filter by URL</DropdownMenuItem>
              <DropdownMenuItem>Filter by Hash</DropdownMenuItem>
              <DropdownMenuItem>Filter by Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <DownloadCloud className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndicators.map((indicator) => (
                <TableRow 
                  key={indicator.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(indicator)}
                >
                  <TableCell className="font-medium">{indicator.type}</TableCell>
                  <TableCell>{indicator.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getConfidenceColor(indicator.confidence)}`} 
                          style={{ width: `${indicator.confidence}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs">{indicator.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{indicator.source}</TableCell>
                  <TableCell>{indicator.dateAdded}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {indicator.tags.map((tag) => (
                        <span key={tag} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Indicator Details</DialogTitle>
              <DialogDescription>
                Detailed information about this indicator of compromise.
              </DialogDescription>
            </DialogHeader>
            
            {selectedIndicator && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedIndicator.value}</h3>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedIndicator.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="font-medium">{selectedIndicator.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <p className="font-medium">{selectedIndicator.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date Added</p>
                    <p className="font-medium">{selectedIndicator.dateAdded}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedIndicator.tags.map((tag) => (
                      <span key={tag} className="bg-cyber-accent/10 text-cyber-secondary text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Related Threats</p>
                  <div className="mt-1 space-y-1">
                    <div className="text-sm p-2 border rounded-md">
                      Log4j Vulnerability (CVE-2021-44228)
                    </div>
                    <div className="text-sm p-2 border rounded-md">
                      BlackCat Ransomware Campaign
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Additional Context</p>
                  <p className="text-sm mt-1">
                    This indicator was first observed in attacks targeting financial institutions in January 2024.
                    It has been associated with the Lazarus APT group and is commonly used in their initial access operations.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

// Helper function to get color based on confidence
const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return 'bg-green-500';
  if (confidence >= 60) return 'bg-yellow-500';
  if (confidence >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

// Sample data for indicators
const indicators: Indicator[] = [
  {
    id: 1,
    value: '185.147.14.44',
    type: 'ip',
    confidence: 95,
    source: 'AlienVault OTX',
    dateAdded: '2024-03-15',
    tags: ['C2', 'Malware', 'BlackCat']
  },
  {
    id: 2,
    value: 'malicious-domain.com',
    type: 'domain',
    confidence: 87,
    source: 'MISP',
    dateAdded: '2024-03-10',
    tags: ['Phishing', 'Emotet']
  },
  {
    id: 3,
    value: 'http://malicious-download.xyz/payload.exe',
    type: 'url',
    confidence: 92,
    source: 'VirusTotal',
    dateAdded: '2024-03-05',
    tags: ['Malware', 'Distribution']
  },
  {
    id: 4,
    value: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    type: 'hash',
    confidence: 100,
    source: 'Crowdstrike',
    dateAdded: '2024-03-01',
    tags: ['Ransomware', 'BlackCat']
  },
  {
    id: 5,
    value: 'malicious-sender@attacker.com',
    type: 'email',
    confidence: 78,
    source: 'PhishLabs',
    dateAdded: '2024-02-28',
    tags: ['Phishing', 'BEC']
  },
  {
    id: 6,
    value: 'evil-payload.dll',
    type: 'file',
    confidence: 82,
    source: 'Hybrid Analysis',
    dateAdded: '2024-02-25',
    tags: ['Malware', 'Dropper']
  },
  {
    id: 7,
    value: '192.168.1.254',
    type: 'ip',
    confidence: 45,
    source: 'Internal SIEM',
    dateAdded: '2024-02-23',
    tags: ['Suspicious', 'Recon']
  },
  {
    id: 8,
    value: 'badactor.ru',
    type: 'domain',
    confidence: 91,
    source: 'Recorded Future',
    dateAdded: '2024-02-20',
    tags: ['APT', 'Lazarus']
  }
];

export default IndicatorsPage;
