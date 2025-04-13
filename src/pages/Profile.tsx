
import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Key, 
  Lock, 
  Calendar, 
  FileText, 
  CreditCard,
  ChevronRight,
  ExternalLink,
  Fingerprint,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Senior Security Analyst",
    bio: "Experienced cybersecurity professional with expertise in threat intelligence and incident response."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically save the data to your backend
    toast.success("Profile updated successfully", {
      description: "Your profile changes have been saved"
    });
    setIsEditing(false);
  };

  const handleAvatarUpload = () => {
    // Simulate file upload
    toast.success("Avatar updated", {
      description: "Your profile picture has been changed"
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Analyst Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and security preferences
          </p>
        </div>
        <Button variant="default" className="bg-primary/80 hover:bg-primary">
          <Shield className="mr-2 h-4 w-4" /> 
          Security Dashboard
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security & Access</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal profile and contact details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-muted">
                    <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=5E35B1&color=fff" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="absolute -bottom-2 -right-2"
                      onClick={handleAvatarUpload}
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Change
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center h-10 px-3 bg-secondary/50 rounded-md">
                          <User className="text-muted-foreground h-4 w-4 mr-2" />
                          <span>{formData.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input 
                          id="email" 
                          name="email"
                          value={formData.email} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center h-10 px-3 bg-secondary/50 rounded-md">
                          <Mail className="text-muted-foreground h-4 w-4 mr-2" />
                          <span>{formData.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      {isEditing ? (
                        <Input 
                          id="role" 
                          name="role"
                          value={formData.role} 
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="flex items-center h-10 px-3 bg-secondary/50 rounded-md">
                          <Shield className="text-muted-foreground h-4 w-4 mr-2" />
                          <span>{formData.role}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joined">Account Created</Label>
                      <div className="flex items-center h-10 px-3 bg-secondary/50 rounded-md">
                        <Calendar className="text-muted-foreground h-4 w-4 mr-2" />
                        <span>April 10, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <textarea 
                        id="bio" 
                        name="bio"
                        className="w-full min-h-[100px] p-3 bg-background border border-input rounded-md resize-none"
                        value={formData.bio} 
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="px-3 py-2 bg-secondary/50 rounded-md">
                        {formData.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
              <CardDescription>Your cybersecurity expertise and credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Threat Intelligence</Badge>
                    <Badge variant="secondary">Incident Response</Badge>
                    <Badge variant="secondary">Malware Analysis</Badge>
                    <Badge variant="secondary">Network Security</Badge>
                    <Badge variant="secondary">OSINT</Badge>
                    <Badge variant="secondary">Forensics</Badge>
                    <Badge variant="secondary">Penetration Testing</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Certifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-md">
                      <div className="flex items-center">
                        <Shield className="text-primary h-4 w-4 mr-2" />
                        <span>Certified Information Systems Security Professional (CISSP)</span>
                      </div>
                      <Badge>Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-md">
                      <div className="flex items-center">
                        <Shield className="text-primary h-4 w-4 mr-2" />
                        <span>Certified Ethical Hacker (CEH)</span>
                      </div>
                      <Badge>Verified</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Fingerprint className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="text-sm font-medium">Biometric Authentication</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Use your device's biometric capabilities</p>
                  </div>
                  <Switch checked={false} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Password</h3>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Change Password</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Security Questions</h3>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Update Security Questions</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">API Access Keys</h3>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Manage API Keys</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-md">
                  <div>
                    <div className="flex items-center">
                      <Shield className="text-green-500 h-4 w-4 mr-2" />
                      <span className="font-medium">Current Device</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Last active: Now</p>
                  </div>
                  <Badge variant="outline">Chrome / Windows</Badge>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-md">
                  <div>
                    <span className="font-medium">iOS Device</span>
                    <p className="text-xs text-muted-foreground mt-1">Last active: 2 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">Sign Out All Devices</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent security and account activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: "Login Successful", date: "Apr 13, 2025 09:43 AM", icon: <User />, detail: "Chrome on Windows" },
                  { event: "Report Generated", date: "Apr 12, 2025 03:21 PM", icon: <FileText />, detail: "Monthly Threat Assessment" },
                  { event: "Password Changed", date: "Apr 10, 2025 11:05 AM", icon: <Key />, detail: "Via Account Settings" },
                  { event: "New Device Login", date: "Apr 08, 2025 08:30 PM", icon: <Shield />, detail: "Safari on iOS" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 py-2">
                    <div className="h-8 w-8 rounded-full bg-secondary/70 flex items-center justify-center text-primary">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.event}</h4>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Complete Activity History</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Security Alerts</h3>
                    <p className="text-xs text-muted-foreground">Critical security notifications</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Threat Intelligence Updates</h3>
                    <p className="text-xs text-muted-foreground">New threat intelligence reports</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">System Notifications</h3>
                    <p className="text-xs text-muted-foreground">Updates, maintenance and system changes</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Marketing Communications</h3>
                    <p className="text-xs text-muted-foreground">Product updates and announcements</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
