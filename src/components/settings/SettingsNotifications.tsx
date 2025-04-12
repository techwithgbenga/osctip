
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function SettingsNotifications() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how and when you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="critical-alerts" className="font-medium">Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications for critical threats and vulnerabilities</p>
                </div>
                <Switch id="critical-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-alerts" className="font-medium">High Severity Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications for high severity threats</p>
                </div>
                <Switch id="high-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="medium-alerts" className="font-medium">Medium Severity Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications for medium severity threats</p>
                </div>
                <Switch id="medium-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="low-alerts" className="font-medium">Low Severity Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications for low severity threats</p>
                </div>
                <Switch id="low-alerts" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-reports" className="font-medium">New Reports</Label>
                  <p className="text-sm text-muted-foreground">When new intelligence reports are available</p>
                </div>
                <Switch id="new-reports" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-updates" className="font-medium">Data Source Updates</Label>
                  <p className="text-sm text-muted-foreground">When connected data sources have updates</p>
                </div>
                <Switch id="data-updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="community-activity" className="font-medium">Community Activity</Label>
                  <p className="text-sm text-muted-foreground">Responses to your posts or comments</p>
                </div>
                <Switch id="community-activity" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-updates" className="font-medium">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Platform updates and announcements</p>
                </div>
                <Switch id="system-updates" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Notification Delivery Method</Label>
            <Select defaultValue="both">
              <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30 w-full max-w-xs">
                <SelectValue placeholder="Select delivery method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">In-app only</SelectItem>
                <SelectItem value="email">Email only</SelectItem>
                <SelectItem value="both">Both in-app and email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Summary Email Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30 w-full max-w-xs">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="mr-2">Reset to Default</Button>
          <Button type="submit" className="bg-cyber-secondary hover:bg-cyber-secondary/90">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
