
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, AlertTriangle, AlertCircle, Search } from "lucide-react";

const threatData = [
  {
    id: "THR-1001",
    name: "SolarWinds Supply Chain Attack",
    actor: "APT29",
    severity: "critical",
    category: "apt",
    targets: ["Government", "Technology"],
    status: "active",
    lastSeen: "2023-04-11",
    indicators: 146
  },
  {
    id: "THR-1002",
    name: "Emotet Banking Trojan Campaign",
    actor: "TA542",
    severity: "high",
    category: "malware",
    targets: ["Financial", "Healthcare"],
    status: "active",
    lastSeen: "2023-04-12",
    indicators: 92
  },
  {
    id: "THR-1003",
    name: "Ransomware Campaign",
    actor: "Wizard Spider",
    severity: "high",
    category: "ransomware",
    targets: ["Manufacturing", "Energy"],
    status: "active",
    lastSeen: "2023-04-10",
    indicators: 78
  },
  {
    id: "THR-1004",
    name: "Phishing Campaign Targeting COVID-19 Research",
    actor: "APT32",
    severity: "medium",
    category: "phishing",
    targets: ["Healthcare", "Research"],
    status: "recent",
    lastSeen: "2023-04-08",
    indicators: 53
  },
  {
    id: "THR-1005",
    name: "DDoS Attacks on Financial Institutions",
    actor: "Unknown",
    severity: "high",
    category: "ddos",
    targets: ["Financial"],
    status: "recent",
    lastSeen: "2023-04-09",
    indicators: 24
  },
  {
    id: "THR-1006",
    name: "Zero-day Exploitation in Browser",
    actor: "Unknown",
    severity: "critical",
    category: "zeroday",
    targets: ["General Public"],
    status: "active",
    lastSeen: "2023-04-11",
    indicators: 17
  },
  {
    id: "THR-1007",
    name: "Supply Chain Attack on Software Vendor",
    actor: "APT10",
    severity: "critical",
    category: "apt",
    targets: ["Technology", "Manufacturing"],
    status: "active",
    lastSeen: "2023-04-10",
    indicators: 67
  },
  {
    id: "THR-1008",
    name: "Credential Harvesting Campaign",
    actor: "FIN7",
    severity: "medium",
    category: "malware",
    targets: ["Retail", "Financial"],
    status: "recent",
    lastSeen: "2023-04-07",
    indicators: 41
  }
];

const Threats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterThreats = (threats: typeof threatData, status: string) => {
    return threats
      .filter(threat => threat.status === status)
      .filter(threat => 
        threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.targets.some(target => target.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  };

  const activeThreats = filterThreats(threatData, "active");
  const recentThreats = filterThreats(threatData, "recent");
  const criticalThreats = threatData
    .filter(threat => threat.severity === "critical")
    .filter(threat => 
      threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.targets.some(target => target.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Threats</h1>
      </div>
      
      <div className="flex mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search threats by name, actor, or category..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeThreats.length}</div>
            <p className="text-xs text-muted-foreground">Across {activeThreats.reduce((acc, threat) => acc + threat.indicators, 0)} indicators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentThreats.length}</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Threats</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalThreats.length}</div>
            <p className="text-xs text-red-500">Requiring immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Threats</TabsTrigger>
          <TabsTrigger value="recent">Recent Threats</TabsTrigger>
          <TabsTrigger value="critical">Critical Threats</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Threats</CardTitle>
              <CardDescription>Currently active threats in your environment</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatTable threats={activeThreats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Threats</CardTitle>
              <CardDescription>Threats observed in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatTable threats={recentThreats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Critical Threats</CardTitle>
              <CardDescription>High severity threats requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatTable threats={criticalThreats} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ThreatTable = ({ threats }: { threats: typeof threatData }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Actor</TableHead>
        <TableHead>Severity</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Targets</TableHead>
        <TableHead>Last Seen</TableHead>
        <TableHead>Indicators</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {threats.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
            No threats found matching your criteria
          </TableCell>
        </TableRow>
      ) : (
        threats.map((threat) => (
          <TableRow key={threat.id}>
            <TableCell className="font-medium">{threat.id}</TableCell>
            <TableCell>{threat.name}</TableCell>
            <TableCell>{threat.actor}</TableCell>
            <TableCell>
              <Badge variant={
                threat.severity === "critical" ? "destructive" :
                threat.severity === "high" ? "default" :
                "secondary"
              }>
                {threat.severity}
              </Badge>
            </TableCell>
            <TableCell>{threat.category}</TableCell>
            <TableCell>{threat.targets.join(", ")}</TableCell>
            <TableCell>{threat.lastSeen}</TableCell>
            <TableCell>{threat.indicators}</TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default Threats;
