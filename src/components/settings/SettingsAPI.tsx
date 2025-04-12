
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Key, Eye, EyeOff } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export function SettingsAPI() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_osctip_7f4d5s8a9d8f7g4h5j6k7l8m9n0p1q2");

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleGenerateNewKey = () => {
    // In a real app, this would call an API to generate a new key
    const newKey = "sk_osctip_" + Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "New API key generated",
      description: "Your previous API key has been revoked.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for integrating with the OSCTIP platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="api-key">Your API Key</Label>
            <div className="mt-2 flex">
              <div className="relative flex-grow">
                <Input 
                  id="api-key"
                  value={showApiKey ? apiKey : "•".repeat(apiKey.length)}
                  readOnly
                  className="pr-10 font-mono bg-cyber-primary/30 border-cyber-accent/30"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyApiKey}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGenerateNewKey}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This key grants full access to the OSCTIP API. Keep it secure and never share it publicly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">API Access Controls</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="read-access" className="cursor-pointer">Read Access</Label>
                <Switch id="read-access" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="write-access" className="cursor-pointer">Write Access</Label>
                <Switch id="write-access" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="delete-access" className="cursor-pointer">Delete Access</Label>
                <Switch id="delete-access" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Recent API Activity</h3>
            <div className="rounded-md border border-cyber-accent/20">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2025-04-12 08:45:23</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>/api/v1/threats</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/30">
                        200 OK
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-04-12 08:44:12</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>/api/v1/indicators/search</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/30">
                        200 OK
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2025-04-12 08:40:55</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>/api/v1/reports/generate</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
                        403 Forbidden
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="flex items-center">
            <Key className="mr-2 h-4 w-4" />
            View API Documentation
          </Button>
          <Button className="bg-cyber-secondary hover:bg-cyber-secondary/90">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
          <CardDescription>
            View and manage your API rate limits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Requests per minute</h4>
                  <p className="text-sm text-muted-foreground">Current usage: 12/60</p>
                </div>
                <div className="w-32 h-2 bg-cyber-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-secondary" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Daily request limit</h4>
                  <p className="text-sm text-muted-foreground">Current usage: 845/10,000</p>
                </div>
                <div className="w-32 h-2 bg-cyber-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-secondary" style={{ width: '8.45%' }}></div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Bulk operations</h4>
                  <p className="text-sm text-muted-foreground">Current usage: 3/5</p>
                </div>
                <div className="w-32 h-2 bg-cyber-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-secondary" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
