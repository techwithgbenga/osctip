
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
import { AlertCircle, Shield, Lock, Smartphone, Key, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SettingsSecurity() {
  const { toast } = useToast();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setPasswordChanged(true);
    setShowChangePassword(false);
  };

  const handleEnableMFA = () => {
    toast({
      title: "2FA Setup",
      description: "Setting up two-factor authentication...",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage passwords and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium flex items-center">
                  <Lock className="h-4 w-4 mr-2" /> Password
                </h3>
                <p className="text-sm text-muted-foreground">
                  Last changed: {passwordChanged ? "Just now" : "30 days ago"}
                </p>
              </div>
              <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleChangePassword}>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your current password and a new password.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input 
                          id="current" 
                          type="password" 
                          required
                          className="bg-cyber-primary/30 border-cyber-accent/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input 
                          id="new" 
                          type="password" 
                          required
                          className="bg-cyber-primary/30 border-cyber-accent/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm New Password</Label>
                        <Input 
                          id="confirm" 
                          type="password" 
                          required
                          className="bg-cyber-primary/30 border-cyber-accent/30"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowChangePassword(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-cyber-secondary hover:bg-cyber-secondary/90">
                        Update Password
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" /> Two-Factor Authentication (2FA)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add an additional layer of security
                </p>
              </div>
              <Button 
                onClick={handleEnableMFA} 
                className="bg-cyber-secondary hover:bg-cyber-secondary/90"
              >
                Enable 2FA
              </Button>
            </div>
          </div>

          <Alert className="border border-amber-500/20 bg-amber-500/10 text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Security Recommendation</AlertTitle>
            <AlertDescription>
              Enable two-factor authentication to protect your account from unauthorized access.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Session Security</h3>
            
            <div className="space-y-2">
              <Label>Session Timeout</Label>
              <Select defaultValue="60">
                <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30 w-full max-w-xs">
                  <SelectValue placeholder="Select timeout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-logout on inactivity</h4>
                <p className="text-sm text-muted-foreground">Automatically log out when inactive</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Remember this device</h4>
                <p className="text-sm text-muted-foreground">Stay logged in on this device</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Login Activity
            </h3>
            
            <div className="bg-black/20 rounded-lg border border-cyber-accent/20 divide-y divide-cyber-accent/10">
              <div className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">192.168.1.105 • Chrome on MacOS</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                  Active Now
                </Badge>
              </div>
              <div className="p-3">
                <p className="font-medium">Previous Login</p>
                <p className="text-sm text-muted-foreground">192.168.1.105 • Chrome on MacOS • April 11, 2025 at 14:23</p>
              </div>
              <div className="p-3">
                <p className="font-medium">Previous Login</p>
                <p className="text-sm text-muted-foreground">203.0.113.42 • Firefox on Windows • April 10, 2025 at 09:17</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">View All Login Activity</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Advanced Security</CardTitle>
          <CardDescription>
            Configure additional security features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">IP Restriction</h4>
              <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">API Key Rotation</h4>
              <p className="text-sm text-muted-foreground">Auto-rotate API keys every 90 days</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Sensitive Data Access Logs</h4>
              <p className="text-sm text-muted-foreground">Log all access to sensitive data</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Failed Login Notifications</h4>
              <p className="text-sm text-muted-foreground">Send email alerts on failed login attempts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-cyber-secondary hover:bg-cyber-secondary/90">Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
