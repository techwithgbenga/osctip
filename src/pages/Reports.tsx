
import React, { useState } from "react";
import { FileText, Download, Search, Filter, Calendar, Bookmark, Share2, Plus, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ReportDialog from "@/components/ReportDialog";
import IntelligenceSubmitDialog from "@/components/IntelligenceSubmitDialog";
import { toast } from "sonner";

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isIntelligenceDialogOpen, setIsIntelligenceDialogOpen] = useState(false);
  
  const handleNewReport = () => {
    setIsReportDialogOpen(true);
  };

  const handleSubmitIntelligence = () => {
    setIsIntelligenceDialogOpen(true);
  };

  const handleReportSubmit = (data: any) => {
    console.log("New report data:", data);
    toast.success("Report created successfully", {
      description: "Your report has been scheduled"
    });
  };

  const handleIntelligenceSubmit = (data: any) => {
    console.log("New intelligence data:", data);
    toast.success("Intelligence submitted successfully", {
      description: "Your submission has been received"
    });
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Reports</h1>
          <p className="text-muted-foreground">
            View, generate, and manage security reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewReport}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
          <Button variant="outline" onClick={handleSubmitIntelligence}>
            <Shield className="h-4 w-4 mr-2" />
            Submit Intelligence
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search reports..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Report Name</SelectItem>
              <SelectItem value="type">Report Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {[
            { 
              id: 1, 
              title: "Monthly Executive Summary",
              type: "Scheduled",
              date: "Apr 1, 2025",
              status: "complete",
              description: "Monthly security posture and threat landscape overview."
            },
            { 
              id: 2, 
              title: "Vulnerability Assessment",
              type: "Custom",
              date: "Apr 5, 2025",
              status: "complete",
              description: "Comprehensive vulnerability scan and assessment report."
            },
            { 
              id: 3, 
              title: "Q2 Compliance Report",
              type: "Scheduled",
              date: "Apr 10, 2025",
              status: "pending",
              description: "Quarterly compliance status for regulatory requirements."
            },
            { 
              id: 4, 
              title: "Security Incident Analysis",
              type: "Custom",
              date: "Apr 8, 2025",
              status: "complete",
              description: "Analysis of recent security incidents and resolution status."
            }
          ].map(report => (
            <Card key={report.id} className="hover:bg-accent/50 cursor-pointer">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <Badge variant={report.status === "complete" ? "default" : "secondary"}>
                  {report.status === "complete" ? "Complete" : "Pending"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">{report.type}</Badge>
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{report.date}</span>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button>View Report</Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>All your scheduled recurring reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Scheduled reports would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>One-time custom reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Custom reports would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Your bookmarked and saved reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Saved reports would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Reusable report templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Templates would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Report Statistics</h3>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Total Reports</div>
            <div className="text-2xl font-bold">48</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Generated (30d)</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Scheduled</div>
            <div className="text-2xl font-bold">8</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Templates</div>
            <div className="text-2xl font-bold">15</div>
          </div>
        </div>
      </div>

      {/* Report Dialog */}
      <ReportDialog 
        open={isReportDialogOpen} 
        onOpenChange={setIsReportDialogOpen}
        onSubmit={handleReportSubmit}
      />

      {/* Intelligence Submission Dialog */}
      <IntelligenceSubmitDialog
        open={isIntelligenceDialogOpen}
        onOpenChange={setIsIntelligenceDialogOpen}
        onSubmit={handleIntelligenceSubmit}
      />
    </div>
  );
};

export default Reports;
