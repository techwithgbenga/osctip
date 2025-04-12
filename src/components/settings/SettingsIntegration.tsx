import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { 
  AlertCircle, 
  Link, 
  Github, 
  Slack, 
  Cloud, 
  Database, 
  Shield, 
  Globe,
  Check,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected?: boolean;
  onClick: () => void;
}

const IntegrationCard = ({ 
  title, 
  description, 
  icon, 
  connected = false, 
  onClick 
}: IntegrationCardProps) => (
  <Card className="overflow-hidden border border-cyber-accent/20">
    <CardHeader className="bg-cyber-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-cyber-primary/50 p-2 rounded-md">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <Badge 
          variant={connected ? "default" : "outline"}
          className={connected ? "bg-green-600/20 text-green-400 border-green-400/30" : "bg-transparent text-muted-foreground"}
        >
          {connected ? (
            <span className="flex items-center">
              <Check className="h-3 w-3 mr-1" /> Connected
            </span>
          ) : (
            <span className="flex items-center">
              <X className="h-3 w-3 mr-1" /> Not Connected
            </span>
          )}
        </Badge>
      </div>
    </CardHeader>
    <CardFooter className="bg-cyber-primary/10 flex justify-end py-3">
      <Button 
        onClick={onClick}
        variant={connected ? "outline" : "default"}
        className={connected ? "" : "bg-cyber-secondary hover:bg-cyber-secondary/90"}
      >
        {connected ? "Manage" : "Connect"}
      </Button>
    </CardFooter>
  </Card>
);

export function SettingsIntegration() {
  const { toast } = useToast();

  const handleConnect = (service: string) => {
    toast({
      title: `Connecting to ${service}`,
      description: "Redirecting to authorization page...",
    });
  };

  const handleManage = (service: string) => {
    toast({
      title: `Managing ${service}`,
      description: "Opening configuration panel...",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="threat-feeds" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="threat-feeds">Threat Feeds</TabsTrigger>
          <TabsTrigger value="tools">Security Tools</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="threat-feeds" className="mt-6 space-y-4">
          <IntegrationCard
            title="AlienVault OTX"
            description="Open Threat Exchange for crowd-sourced threat data"
            icon={<Globe className="h-5 w-5 text-cyber-secondary" />}
            connected={true}
            onClick={() => handleManage("AlienVault OTX")}
          />
          
          <IntegrationCard
            title="MISP"
            description="Malware Information Sharing Platform"
            icon={<Shield className="h-5 w-5 text-cyber-secondary" />}
            connected={true}
            onClick={() => handleManage("MISP")}
          />
          
          <IntegrationCard
            title="VirusTotal"
            description="File and URL analysis"
            icon={<AlertCircle className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("VirusTotal")}
          />
          
          <IntegrationCard
            title="Shodan"
            description="Internet-wide scanner and search engine"
            icon={<Globe className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("Shodan")}
          />
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6 space-y-4">
          <IntegrationCard
            title="Malware Sandbox"
            description="Automated malware analysis environment"
            icon={<Shield className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("Malware Sandbox")}
          />
          
          <IntegrationCard
            title="Network IDS"
            description="Network Intrusion Detection System"
            icon={<AlertCircle className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("Network IDS")}
          />
        </TabsContent>
        
        <TabsContent value="collaboration" className="mt-6 space-y-4">
          <IntegrationCard
            title="Slack"
            description="Real-time alerts and notifications"
            icon={<Slack className="h-5 w-5 text-cyber-secondary" />}
            connected={true}
            onClick={() => handleManage("Slack")}
          />
          
          <IntegrationCard
            title="GitHub"
            description="Code repository and issue tracking"
            icon={<Github className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("GitHub")}
          />
        </TabsContent>
        
        <TabsContent value="cloud" className="mt-6 space-y-4">
          <IntegrationCard
            title="AWS Security Hub"
            description="Centralized security findings"
            icon={<Cloud className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("AWS Security Hub")}
          />
          
          <IntegrationCard
            title="Azure Sentinel"
            description="Cloud-native SIEM and SOAR"
            icon={<Database className="h-5 w-5 text-cyber-secondary" />}
            connected={false}
            onClick={() => handleConnect("Azure Sentinel")}
          />
        </TabsContent>
      </Tabs>

      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>
            Global settings for data integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-sync</h4>
                <p className="text-sm text-muted-foreground">Automatically pull data from connected integrations</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Real-time alerts</h4>
                <p className="text-sm text-muted-foreground">Receive immediate notifications for critical findings</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data enrichment</h4>
                <p className="text-sm text-muted-foreground">Automatically enrich IoCs with data from other sources</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Share intelligence</h4>
                <p className="text-sm text-muted-foreground">Contribute back to community intelligence feeds</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-cyber-secondary hover:bg-cyber-secondary/90">Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
