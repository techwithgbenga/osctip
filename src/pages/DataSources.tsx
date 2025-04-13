import React, { useState } from "react";
import { Database, Server, RefreshCw, Plus, Trash2, ExternalLink, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AddSourceDialog from "@/components/AddSourceDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const DataSources = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [deleteSourceId, setDeleteSourceId] = useState<number | null>(null);
  const [sources, setSources] = useState([
    { id: 1, name: "SIEM Integration", type: "Log Source", status: "active", lastSync: "10 minutes ago", description: "Splunk enterprise integration" },
    { id: 2, name: "AlienVault OTX", type: "Threat Feed", status: "active", lastSync: "25 minutes ago", description: "Open Threat Exchange feed" },
    { id: 3, name: "Network IDS", type: "Log Source", status: "active", lastSync: "5 minutes ago", description: "Suricata Network IDS" },
    { id: 4, name: "MISP Instance", type: "Threat Feed", status: "inactive", lastSync: "3 days ago", description: "Malware Information Sharing Platform" }
  ]);

  const handleAddSource = (newSource: any) => {
    setSources([...sources, newSource]);
  };

  const handleDeleteSource = (id: number) => {
    setDeleteSourceId(id);
  };

  const confirmDelete = () => {
    if (deleteSourceId) {
      setSources(sources.filter(source => source.id !== deleteSourceId));
      toast({
        title: "Source deleted",
        description: "The data source has been successfully removed.",
      });
      setDeleteSourceId(null);
    }
  };

  const handleToggleStatus = (id: number, checked: boolean) => {
    setSources(sources.map(source => {
      if (source.id === id) {
        return {
          ...source,
          status: checked ? "active" : "inactive"
        };
      }
      return source;
    }));
  };

  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const refreshSources = () => {
    toast({
      title: "Refreshing data sources",
      description: "Checking for updates from all connected sources..."
    });
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage and monitor all connected security data sources
          </p>
        </div>
        <Button onClick={() => setIsAddSourceOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Source
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search data sources..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={refreshSources}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Sources</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="feeds">Threat Feeds</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.map(source => (
              <Card key={source.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </div>
                  <Badge variant={source.status === "active" ? "default" : "secondary"}>
                    {source.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Source Type</div>
                    <div>{source.type}</div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div>{source.lastSync}</div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`source-${source.id}`} 
                      defaultChecked={source.status === "active"}
                      onCheckedChange={(checked) => handleToggleStatus(source.id, checked)}
                    />
                    <Label htmlFor={`source-${source.id}`}>Enabled</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.filter(source => source.status === "active").map(source => (
              <Card key={source.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </div>
                  <Badge variant="default">Active</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Source Type</div>
                    <div>{source.type}</div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div>{source.lastSync}</div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`source-active-${source.id}`} 
                      defaultChecked={true}
                      onCheckedChange={(checked) => handleToggleStatus(source.id, checked)}
                    />
                    <Label htmlFor={`source-active-${source.id}`}>Enabled</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.filter(source => source.status === "inactive").map(source => (
              <Card key={source.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">Inactive</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Source Type</div>
                    <div>{source.type}</div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div>{source.lastSync}</div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`source-inactive-${source.id}`} 
                      defaultChecked={false}
                      onCheckedChange={(checked) => handleToggleStatus(source.id, checked)}
                    />
                    <Label htmlFor={`source-inactive-${source.id}`}>Enabled</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.filter(source => source.type === "Log Source").map(source => (
              <Card key={source.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </div>
                  <Badge variant={source.status === "active" ? "default" : "secondary"}>
                    {source.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Source Type</div>
                    <div>{source.type}</div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div>{source.lastSync}</div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`source-logs-${source.id}`} 
                      defaultChecked={source.status === "active"}
                      onCheckedChange={(checked) => handleToggleStatus(source.id, checked)}
                    />
                    <Label htmlFor={`source-logs-${source.id}`}>Enabled</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feeds" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSources.filter(source => source.type === "Threat Feed").map(source => (
              <Card key={source.id}>
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </div>
                  <Badge variant={source.status === "active" ? "default" : "secondary"}>
                    {source.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Source Type</div>
                    <div>{source.type}</div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div>{source.lastSync}</div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`source-feeds-${source.id}`} 
                      defaultChecked={source.status === "active"}
                      onCheckedChange={(checked) => handleToggleStatus(source.id, checked)}
                    />
                    <Label htmlFor={`source-feeds-${source.id}`}>Enabled</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Connection Statistics</h3>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Total Sources</div>
            <div className="text-2xl font-bold">{sources.length}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Active</div>
            <div className="text-2xl font-bold">{sources.filter(s => s.status === "active").length}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Data Received</div>
            <div className="text-2xl font-bold">1.2 TB</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Uptime</div>
            <div className="text-2xl font-bold">99.8%</div>
          </div>
        </div>
      </div>

      <AddSourceDialog 
        open={isAddSourceOpen} 
        onOpenChange={setIsAddSourceOpen} 
        onAddSource={handleAddSource} 
      />

      <AlertDialog open={!!deleteSourceId} onOpenChange={() => setDeleteSourceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this data source and remove all associated connections.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataSources;
