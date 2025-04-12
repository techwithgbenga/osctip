
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function SettingsGeneral() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                defaultValue="Security Analyst" 
                className="bg-cyber-primary/30 border-cyber-accent/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="analyst@osctip.org" 
                className="bg-cyber-primary/30 border-cyber-accent/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="analyst">
                <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="analyst">Threat Analyst</SelectItem>
                    <SelectItem value="researcher">Security Researcher</SelectItem>
                    <SelectItem value="engineer">Security Engineer</SelectItem>
                    <SelectItem value="manager">Security Manager</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input 
                id="organization" 
                defaultValue="OSCTIP Community" 
                className="bg-cyber-primary/30 border-cyber-accent/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              defaultValue="Security professional focused on cyber threat intelligence and analysis." 
              className="min-h-[120px] bg-cyber-primary/30 border-cyber-accent/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="cet">Central European Time (CET)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="mr-2">Cancel</Button>
          <Button type="submit" className="bg-cyber-secondary hover:bg-cyber-secondary/90">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
