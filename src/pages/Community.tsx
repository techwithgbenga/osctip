
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, Users, ThumbsUp, Share2, BookOpen, Filter, MessagesSquare, Bell, Shield } from 'lucide-react';

// Mock data for community discussions
const mockDiscussions = [
  {
    id: "1",
    title: "Recent APT29 Campaign Detection Methods",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg",
      role: "Security Analyst"
    },
    date: "2025-04-11",
    category: "Threat Detection",
    content: "I've been tracking the latest APT29 campaign and want to share some IoCs and detection methods that have been successful for our organization. Has anyone else implemented specific Sigma rules for this campaign?",
    replies: 12,
    views: 342,
    likes: 28,
    tags: ["APT29", "Detection", "Sigma Rules"]
  },
  {
    id: "2",
    title: "Best Practices for Implementing MITRE ATT&CK Framework",
    author: {
      name: "Sophia Williams",
      avatar: "/placeholder.svg",
      role: "Security Architect"
    },
    date: "2025-04-10",
    category: "Frameworks",
    content: "Our team is implementing the MITRE ATT&CK framework for threat modeling and detection. I'd like to hear from others who have successfully integrated this into their security operations.",
    replies: 17,
    views: 405,
    likes: 43,
    tags: ["MITRE ATT&CK", "Best Practices", "Threat Modeling"]
  },
  {
    id: "3",
    title: "Open Source Tools for OSINT Collection",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg",
      role: "Threat Intelligence Specialist"
    },
    date: "2025-04-09",
    category: "Tools",
    content: "I'm compiling a list of effective open-source tools for OSINT collection. So far I'm using SpiderFoot, TheHarvester, and Maltego CE. What are you all using successfully in your workflows?",
    replies: 21,
    views: 517,
    likes: 36,
    tags: ["OSINT", "Open Source", "Intelligence Collection"]
  },
  {
    id: "4",
    title: "Sharing IOCs for Recent Ransomware Campaign",
    author: {
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg",
      role: "Incident Responder"
    },
    date: "2025-04-08",
    category: "Indicators",
    content: "We're tracking a new ransomware campaign targeting healthcare organizations. I'd like to share some IOCs we've collected and hear if others have additional indicators to add to our collection.",
    replies: 15,
    views: 378,
    likes: 31,
    tags: ["Ransomware", "Healthcare", "IOCs"]
  },
  {
    id: "5",
    title: "Collaborative Phishing Campaign Analysis",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg",
      role: "Email Security Analyst"
    },
    date: "2025-04-07",
    category: "Phishing",
    content: "I'm starting a collaborative effort to analyze the latest spear-phishing campaign targeting financial institutions. If you've seen similar activity, please share your samples and analysis.",
    replies: 9,
    views: 291,
    likes: 19,
    tags: ["Phishing", "Collaboration", "Financial Sector"]
  }
];

// Component for displaying a single community discussion card
const DiscussionCard = ({ discussion }: { discussion: typeof mockDiscussions[0] }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{discussion.title}</CardTitle>
              <CardDescription>
                Posted by {discussion.author.name} • {discussion.date} • {discussion.category}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline">{discussion.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{discussion.content}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {discussion.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" /> 
            {discussion.replies} Replies
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" /> 
            {discussion.views} Views
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" /> 
            {discussion.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" /> 
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// New post dialog component
const NewPostDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
          <DialogDescription>
            Share your insights, questions, or findings with the community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input id="title" placeholder="Enter a concise, descriptive title" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium">
              <option value="Threat Detection">Threat Detection</option>
              <option value="Frameworks">Frameworks</option>
              <option value="Tools">Tools</option>
              <option value="Indicators">Indicators</option>
              <option value="Phishing">Phishing</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <Textarea 
              id="content" 
              placeholder="Share your insights, questions, or findings..."
              rows={5}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
            <Input id="tags" placeholder="e.g., APT29, Detection, MITRE" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Post Discussion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openNewPost, setOpenNewPost] = useState(false);
  
  // Filter discussions based on search query and active category
  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || discussion.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Community</h1>
        <Button onClick={() => setOpenNewPost(true)} className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>Start Discussion</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-[3fr_1fr] gap-6">
        <div>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessagesSquare className="h-4 w-4" />
                <span>All Discussions</span>
              </TabsTrigger>
              <TabsTrigger value="threat detection" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Threat Detection</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Tools</span>
              </TabsTrigger>
              <TabsTrigger value="indicators" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Indicators</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {filteredDiscussions.length > 0 ? (
                  filteredDiscussions.map(discussion => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No discussions found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {["threat detection", "tools", "indicators"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="space-y-4">
                  {filteredDiscussions.filter(d => 
                    d.category.toLowerCase() === category.toLowerCase()
                  ).length > 0 ? (
                    filteredDiscussions
                      .filter(d => d.category.toLowerCase() === category.toLowerCase())
                      .map(discussion => (
                        <DiscussionCard key={discussion.id} discussion={discussion} />
                      ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No discussions found in this category.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <span className="font-medium">2,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Discussions</span>
                  <span className="font-medium">873</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Replies</span>
                  <span className="font-medium">12,394</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Today</span>
                  <span className="font-medium">132</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Alex Chen", role: "Security Analyst", posts: 87 },
                  { name: "Sophia Williams", role: "Security Architect", posts: 64 },
                  { name: "Marcus Johnson", role: "Threat Intelligence", posts: 52 },
                  { name: "Elena Rodriguez", role: "Incident Responder", posts: 49 },
                  { name: "David Kim", role: "Email Security", posts: 41 },
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.role}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{contributor.posts} posts</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "APT29", count: 43 },
                  { name: "MITRE ATT&CK", count: 38 },
                  { name: "Ransomware", count: 35 },
                  { name: "IOCs", count: 31 },
                  { name: "Phishing", count: 29 },
                  { name: "Detection", count: 26 },
                  { name: "OSINT", count: 24 },
                  { name: "Threat Hunting", count: 22 },
                  { name: "Sigma Rules", count: 19 },
                  { name: "Best Practices", count: 17 },
                ].map((tag) => (
                  <Badge key={tag.name} variant="outline" className="flex items-center gap-1">
                    {tag.name}
                    <span className="text-xs text-muted-foreground">({tag.count})</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NewPostDialog open={openNewPost} setOpen={setOpenNewPost} />
    </div>
  );
};

export default Community;
