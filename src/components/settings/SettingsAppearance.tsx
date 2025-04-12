
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
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function SettingsAppearance() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-cyber-accent/20 bg-cyber-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme</Label>
            <RadioGroup defaultValue="dark" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Color Scheme</Label>
            <RadioGroup defaultValue="cyber" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cyber" id="cyber" />
                <Label htmlFor="cyber">Cybersecurity (Default)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hacker" id="hacker" />
                <Label htmlFor="hacker">Hacker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="highcontrast" id="highcontrast" />
                <Label htmlFor="highcontrast">High Contrast</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Font Size</Label>
            <Select defaultValue="medium">
              <SelectTrigger className="bg-cyber-primary/30 border-cyber-accent/30 w-full max-w-xs">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium (Default)</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="xlarge">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>Animation and Effects</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="cursor-pointer">Enable animations</Label>
                <Switch id="animations" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="transitions" className="cursor-pointer">Smooth transitions</Label>
                <Switch id="transitions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="blurEffects" className="cursor-pointer">Blur effects</Label>
                <Switch id="blurEffects" defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Dashboard Layout</Label>
            <RadioGroup defaultValue="grid" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grid" id="grid" />
                <Label htmlFor="grid">Grid (Default)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="list" id="list" />
                <Label htmlFor="list">List</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
              </div>
            </RadioGroup>
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
