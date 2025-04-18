
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Link as LinkIcon, 
  Hash, 
  Mail, 
  File, 
  Globe, 
  Server
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Indicator {
  id: string;
  value: string;
  type: 'ip' | 'domain' | 'url' | 'hash' | 'email' | 'file';
  confidence: number;
  lastSeen: string;
  source: string;
  tags: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const indicators: Indicator[] = [
  {
    id: "IOC-001",
    value: "185.147.37.162",
    type: "ip",
    confidence: 85,
    lastSeen: "2023-04-12",
    source: "AlienVault OTX",
    tags: ["C2", "Cobalt Strike"],
    severity: "high"
  },
  {
    id: "IOC-002",
    value: "evil-domain.com",
    type: "domain",
    confidence: 90,
    lastSeen: "2023-04-11",
    source: "MISP",
    tags: ["Phishing", "Emotet"],
    severity: "high"
  },
  {
    id: "IOC-003",
    value: "https://malicious-site.com/download.php",
    type: "url",
    confidence: 75,
    lastSeen: "2023-04-10",
    source: "Community Reports",
    tags: ["Malware", "Drive-by"],
    severity: "medium"
  },
  {
    id: "IOC-004",
    value: "44d88612fea8a8f36de82e1278abb02f",
    type: "hash",
    confidence: 95,
    lastSeen: "2023-04-12",
    source: "VirusTotal",
    tags: ["Ransomware", "Lockbit"],
    severity: "critical"
  },
  {
    id: "IOC-005",
    value: "evil@malicious-domain.com",
    type: "email",
    confidence: 80,
    lastSeen: "2023-04-09",
    source: "Twitter OSINT",
    tags: ["Phishing", "BEC"],
    severity: "medium"
  },
  {
    id: "IOC-006",
    value: "malicious_document.docx",
    type: "file",
    confidence: 70,
    lastSeen: "2023-04-08",
    source: "MISP",
    tags: ["Malicious Document", "Macro"],
    severity: "high"
  },
  {
    id: "IOC-007",
    value: "91.121.87.10",
    type: "ip",
    confidence: 65,
    lastSeen: "2023-04-11",
    source: "Shodan",
    tags: ["Scanner", "Vulnerable"],
    severity: "low"
  },
  {
    id: "IOC-008",
    value: "cdn.fake-updates.com",
    type: "domain",
    confidence: 85,
    lastSeen: "2023-04-10",
    source: "AlienVault OTX",
    tags: ["Malware", "Fake Updates"],
    severity: "high"
  }
];

const typeIcons = {
  ip: <Server className="h-4 w-4" />,
  domain: <Globe className="h-4 w-4" />,
  url: <LinkIcon className="h-4 w-4" />,
  hash: <Hash className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  file: <File className="h-4 w-4" />
};

const severityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
};

const Indicators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  // Extract unique sources for filtering
  const sources = [...new Set(indicators.map(indicator => indicator.source))];

  // Filter indicators based on search query and filters
  const filteredIndicators = indicators.filter(indicator => {
    // Apply search query
    const matchesSearch = searchQuery === "" || 
      indicator.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply type filter
    const matchesType = typeFilter === null || indicator.type === typeFilter;
    
    // Apply source filter
    const matchesSource = sourceFilter === null || indicator.source === sourceFilter;
    
    // Apply severity filter
    const matchesSeverity = severityFilter === null || indicator.severity === severityFilter;
    
    return matchesSearch && matchesType && matchesSource && matchesSeverity;
  });

  // Reset all filters
  const resetFilters = () => {
    setTypeFilter(null);
    setSourceFilter(null);
    setSeverityFilter(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Indicators of Compromise</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Indicators</CardTitle>
          <CardDescription>
            Search and analyze indicators of compromise (IOCs) from various sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by indicator value or tag..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    Type
                    {typeFilter && <Badge variant="secondary" className="ml-2">{typeFilter}</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setTypeFilter('ip')}>
                      <Server className="mr-2 h-4 w-4" />
                      <span>IP Address</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter('domain')}>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Domain</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter('url')}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <span>URL</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter('hash')}>
                      <Hash className="mr-2 h-4 w-4" />
                      <span>Hash</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter('email')}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeFilter('file')}>
                      <File className="mr-2 h-4 w-4" />
                      <span>File</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    Source
                    {sourceFilter && <Badge variant="secondary" className="ml-2">{sourceFilter}</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {sources.map(source => (
                      <DropdownMenuItem key={source} onClick={() => setSourceFilter(source)}>
                        <span>{source}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    Severity
                    {severityFilter && <Badge variant="secondary" className="ml-2">{severityFilter}</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSeverityFilter('critical')}>
                      <span>Critical</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSeverityFilter('high')}>
                      <span>High</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSeverityFilter('medium')}>
                      <span>Medium</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSeverityFilter('low')}>
                      <span>Low</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {(typeFilter || sourceFilter || severityFilter) && (
                <Button variant="ghost" onClick={resetFilters}>
                  Reset Filters
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndicators.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No indicators found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIndicators.map((indicator) => (
                    <TableRow key={indicator.id}>
                      <TableCell className="font-medium">{indicator.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {typeIcons[indicator.type]}
                          <span className="capitalize">{indicator.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs">{indicator.value}</span>
                      </TableCell>
                      <TableCell>{indicator.confidence}%</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColors[indicator.severity]}`}>
                          {indicator.severity}
                        </span>
                      </TableCell>
                      <TableCell>{indicator.source}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {indicator.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{indicator.lastSeen}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Indicators;
