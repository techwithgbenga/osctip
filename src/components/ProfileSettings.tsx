
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { UserSettings } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  open,
  onOpenChange,
  settings,
  onUpdateSettings
}) => {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preferences" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="datasources">Data Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="py-4 space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Theme</Label>
                <RadioGroup
                  value={localSettings.theme}
                  onValueChange={(value) => setLocalSettings({
                    ...localSettings,
                    theme: value as 'light' | 'dark' | 'system'
                  })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">Response Style</Label>
                <RadioGroup
                  value={localSettings.responseStyle}
                  onValueChange={(value) => setLocalSettings({
                    ...localSettings,
                    responseStyle: value as 'concise' | 'detailed' | 'technical' | 'actionable'
                  })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="concise" id="style-concise" />
                    <Label htmlFor="style-concise">Concise</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="technical" id="style-technical" />
                    <Label htmlFor="style-technical">Technical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="detailed" id="style-detailed" />
                    <Label htmlFor="style-detailed">Detailed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="actionable" id="style-actionable" />
                    <Label htmlFor="style-actionable">Actionable</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="model" className="py-4 space-y-4">
            <div>
              <Label className="text-base" htmlFor="model-version">Model Version</Label>
              <Select
                value={localSettings.modelVersion}
                onValueChange={(value) => setLocalSettings({
                  ...localSettings,
                  modelVersion: value
                })}
              >
                <SelectTrigger id="model-version" className="mt-2">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                Select the AI model that powers your conversations.
                Higher-numbered models are generally more capable but may have different pricing.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="datasources" className="py-4 space-y-4">
            <div>
              <Label className="text-base">Threat Intelligence Sources</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="mitre" 
                    checked={localSettings.dataSourcesEnabled?.mitre}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      dataSourcesEnabled: {
                        ...localSettings.dataSourcesEnabled,
                        mitre: e.target.checked
                      }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="mitre">MITRE ATT&CK</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="cve" 
                    checked={localSettings.dataSourcesEnabled?.cve}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      dataSourcesEnabled: {
                        ...localSettings.dataSourcesEnabled,
                        cve: e.target.checked
                      }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="cve">CVE Database</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="osint" 
                    checked={localSettings.dataSourcesEnabled?.osint}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      dataSourcesEnabled: {
                        ...localSettings.dataSourcesEnabled,
                        osint: e.target.checked
                      }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="osint">OSINT Feeds</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="internalThreatFeeds" 
                    checked={localSettings.dataSourcesEnabled?.internalThreatFeeds}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      dataSourcesEnabled: {
                        ...localSettings.dataSourcesEnabled,
                        internalThreatFeeds: e.target.checked
                      }
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="internalThreatFeeds">Internal Threat Feeds</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
