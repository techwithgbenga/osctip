
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AddSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSource: (source: any) => void;
}

const AddSourceDialog: React.FC<AddSourceDialogProps> = ({
  open,
  onOpenChange,
  onAddSource,
}) => {
  const { toast } = useToast();
  const [sourceData, setSourceData] = useState({
    name: "",
    description: "",
    type: "Log Source",
    enabled: true,
    url: "",
    apiKey: "",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSourceData({
      ...sourceData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!sourceData.name || !sourceData.type) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create a new source with generated ID and current timestamp
    const newSource = {
      ...sourceData,
      id: Math.floor(Math.random() * 10000),
      status: sourceData.enabled ? "active" : "inactive",
      lastSync: "Just now",
    };

    onAddSource(newSource);
    
    toast({
      title: "Source added successfully",
      description: `${sourceData.name} has been added to your data sources.`,
    });
    
    // Reset form and close dialog
    setSourceData({
      name: "",
      description: "",
      type: "Log Source",
      enabled: true,
      url: "",
      apiKey: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Data Source</DialogTitle>
          <DialogDescription>
            Connect to a new security data source or threat intelligence feed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Source Name *</Label>
              <Input
                id="name"
                value={sourceData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter source name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Source Type *</Label>
              <Select
                value={sourceData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Log Source">Log Source</SelectItem>
                  <SelectItem value="Threat Feed">Threat Feed</SelectItem>
                  <SelectItem value="SIEM Integration">SIEM Integration</SelectItem>
                  <SelectItem value="Vulnerability Scanner">Vulnerability Scanner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={sourceData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter a brief description of this data source"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Connection URL</Label>
            <Input
              id="url"
              value={sourceData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="https://"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key / Authentication Token</Label>
            <Input
              id="apiKey"
              type="password"
              value={sourceData.apiKey}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              placeholder="Enter API key"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="source-enabled"
              checked={sourceData.enabled}
              onCheckedChange={(checked) => handleChange("enabled", checked)}
            />
            <Label htmlFor="source-enabled">Enable this source immediately</Label>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Source</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceDialog;
