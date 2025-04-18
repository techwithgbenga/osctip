
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronDown, Database, FileUp, Shield, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface IntelligenceSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

const IntelligenceSubmitDialog: React.FC<IntelligenceSubmitDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    indicator: "",
    indicatorType: "domain",
    confidenceLevel: "medium",
    threatType: "malware",
    tags: [] as string[],
    isPrivate: false,
    attachments: [] as File[],
    ttl: "30"
  });

  const availableTags = [
    "APT", "Ransomware", "Phishing", "Zero-Day", "Botnet", "Data Exfiltration", 
    "Lateral Movement", "Initial Access", "Command & Control", "Exploitation"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTagToggle = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag)
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...fileArray]
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: updatedAttachments
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.indicator) {
      toast.error("Missing required fields", {
        description: "Please fill in all required fields"
      });
      return;
    }
    
    // Success notification
    toast.success("Intelligence submitted successfully", {
      description: "Your submission will be reviewed by the team"
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
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Submit Threat Intelligence
          </DialogTitle>
          <DialogDescription>
            Share discovered threats and indicators of compromise with the community
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">
              Intelligence Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., New Ransomware Campaign Targeting Healthcare"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the threat, its behavior, and potential impact..."
              className="min-h-24 resize-none"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="indicator-details">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Indicator Details
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="indicator">
                      Indicator <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="indicator"
                      name="indicator"
                      placeholder="e.g., malicious-domain.com, 192.168.1.1, hash value"
                      value={formData.indicator}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="indicatorType">Indicator Type</Label>
                      <Select 
                        name="indicatorType"
                        value={formData.indicatorType}
                        onValueChange={(value) => handleSelectChange("indicatorType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="domain">Domain</SelectItem>
                          <SelectItem value="ip">IP Address</SelectItem>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="md5">MD5 Hash</SelectItem>
                          <SelectItem value="sha1">SHA1 Hash</SelectItem>
                          <SelectItem value="sha256">SHA256 Hash</SelectItem>
                          <SelectItem value="filename">Filename</SelectItem>
                          <SelectItem value="email">Email Address</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confidenceLevel">Confidence Level</Label>
                      <Select 
                        name="confidenceLevel"
                        value={formData.confidenceLevel}
                        onValueChange={(value) => handleSelectChange("confidenceLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select confidence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="threatType">Threat Type</Label>
                      <Select 
                        name="threatType"
                        value={formData.threatType}
                        onValueChange={(value) => handleSelectChange("threatType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select threat type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="malware">Malware</SelectItem>
                          <SelectItem value="ransomware">Ransomware</SelectItem>
                          <SelectItem value="phishing">Phishing</SelectItem>
                          <SelectItem value="apt">APT</SelectItem>
                          <SelectItem value="vulnerability">Vulnerability</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ttl">Time-to-Live (days)</Label>
                      <Select 
                        name="ttl"
                        value={formData.ttl}
                        onValueChange={(value) => handleSelectChange("ttl", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select TTL" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="0">Permanent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="tags-classification">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags & Classification
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <Label>Relevant Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <div 
                        key={tag} 
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                          formData.tags.includes(tag) 
                            ? 'bg-primary/20 border-primary/30 text-primary' 
                            : 'bg-secondary/50 border-border hover:bg-secondary'
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        <Checkbox 
                          checked={formData.tags.includes(tag)}
                          className="h-3.5 w-3.5"
                        />
                        <span className="text-xs">{tag}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="isPrivate" 
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, isPrivate: checked as boolean })
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="isPrivate"
                        className="text-sm font-medium leading-none"
                      >
                        Private Intelligence
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Only share with your organization, not the community
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="attachments">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <FileUp className="h-4 w-4 mr-2" />
                  Attachments & Evidence
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop files here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Supported formats: PCAP, LOG, PDF, PNG, JPG, TXT (max 10MB)
                    </p>
                    <Input
                      id="attachments"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('attachments')?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files ({formData.attachments.length})</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {formData.attachments.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md"
                          >
                            <div className="flex items-center">
                              <FileUp className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                ({Math.round(file.size / 1024)} KB)
                              </span>
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Separator className="my-2" />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Intelligence</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IntelligenceSubmitDialog;
