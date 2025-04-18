
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { FileText, Calendar, Clock, Shield, AlertTriangle, Lock, Database } from "lucide-react";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit 
}) => {
  const [reportType, setReportType] = useState("vulnerability");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    frequency: "once",
    dataSources: {
      mitre: true,
      cve: true,
      osint: true,
      internalDatasets: false,
    },
    schedule: {
      date: "",
      time: "",
    }
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 
    { name: string; value: string | boolean | Record<string, boolean> }
  ) => {
    const target = 'target' in e ? e.target : { name: e.name, value: e.value };
    const name = target.name;
    const value = target.value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSwitchChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      dataSources: {
        ...prev.dataSources,
        [name]: !prev.dataSources[name as keyof typeof prev.dataSources]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Report title is required", {
        description: "Please provide a title for the report"
      });
      return;
    }

    // Success notification
    toast.success("Report created", {
      description: "Your report has been successfully created"
    });

    // Close the dialog
    onOpenChange(false);
    
    // Call the submit callback if provided
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Create New Security Report
          </DialogTitle>
          <DialogDescription>
            Generate comprehensive security analysis and intelligence reports
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="details">Report Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="data">Data Sources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="e.g., Quarterly Vulnerability Assessment"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Describe the purpose and scope of this report..."
                  className="h-24 resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <Select 
                    value={reportType} 
                    onValueChange={(value) => setReportType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vulnerability">Vulnerability Assessment</SelectItem>
                      <SelectItem value="threat">Threat Intelligence</SelectItem>
                      <SelectItem value="incident">Incident Analysis</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="custom">Custom Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    name="priority"
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange({ name: 'priority', value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="critical">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-700 mr-2"></div>
                          Critical
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Report Frequency</Label>
                <Select 
                  name="frequency"
                  value={formData.frequency}
                  onValueChange={(value) => handleInputChange({ name: 'frequency', value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </Label>
                  <Input 
                    id="date"
                    name="schedule.date"
                    type="date"
                    value={formData.schedule.date}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Time
                  </Label>
                  <Input 
                    id="time"
                    name="schedule.time"
                    type="time"
                    value={formData.schedule.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <div>
                      <Label>MITRE ATT&CK</Label>
                      <p className="text-xs text-muted-foreground">Tactics, techniques and procedures</p>
                    </div>
                  </div>
                  <Switch 
                    checked={formData.dataSources.mitre}
                    onCheckedChange={() => handleSwitchChange('mitre')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <div>
                      <Label>CVE Database</Label>
                      <p className="text-xs text-muted-foreground">Common Vulnerabilities and Exposures</p>
                    </div>
                  </div>
                  <Switch 
                    checked={formData.dataSources.cve}
                    onCheckedChange={() => handleSwitchChange('cve')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <div>
                      <Label>OSINT</Label>
                      <p className="text-xs text-muted-foreground">Open Source Intelligence feeds</p>
                    </div>
                  </div>
                  <Switch 
                    checked={formData.dataSources.osint}
                    onCheckedChange={() => handleSwitchChange('osint')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-primary" />
                    <div>
                      <Label>Internal Datasets</Label>
                      <p className="text-xs text-muted-foreground">Organization's proprietary threat data</p>
                    </div>
                  </div>
                  <Switch 
                    checked={formData.dataSources.internalDatasets}
                    onCheckedChange={() => handleSwitchChange('internalDatasets')}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
