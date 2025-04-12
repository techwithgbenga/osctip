
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Heart, Share2, PlusCircle, Calendar, Users, ThumbsUp, Eye } from 'lucide-react';

const CommunityPage = () => {
  const [discussionType, setDiscussionType] = useState<'discussions' | 'announcements'>('discussions');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">
              Collaborate with the threat intelligence community to share insights and knowledge.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search discussions..." className="w-full pl-8" />
              </div>
            </div>
            
            <Tabs defaultValue="recent" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    variant={discussionType === 'discussions' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setDiscussionType('discussions')}
                  >
                    Discussions
                  </Button>
                  <Button 
                    variant={discussionType === 'announcements' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setDiscussionType('announcements')}
                  >
                    Announcements
                  </Button>
                </div>
              </div>
              
              <TabsContent value="recent" className="space-y-4">
                {discussions
                  .filter(d => discussionType === 'discussions' ? !d.isAnnouncement : d.isAnnouncement)
                  .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
                  .map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
              </TabsContent>
              
              <TabsContent value="trending" className="space-y-4">
                {discussions
                  .filter(d => discussionType === 'discussions' ? !d.isAnnouncement : d.isAnnouncement)
                  .sort((a, b) => b.likes - a.likes)
                  .map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
              </TabsContent>
              
              <TabsContent value="following" className="space-y-4">
                {discussions
                  .filter(d => d.following && (discussionType === 'discussions' ? !d.isAnnouncement : d.isAnnouncement))
                  .map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyber-secondary" />
                    <span className="text-sm">Members</span>
                  </div>
                  <span className="font-bold">2,458</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-cyber-secondary" />
                    <span className="text-sm">Discussions</span>
                  </div>
                  <span className="font-bold">578</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyber-secondary" />
                    <span className="text-sm">Active Today</span>
                  </div>
                  <span className="font-bold">124</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{contributor.contributions}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trending Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Badge key={tag.name} variant="outline" className="cursor-pointer hover:bg-accent">
                      {tag.name}
                      <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{event.name}</h3>
                      <Badge variant="outline">{event.date}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  postedAt: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isAnnouncement: boolean;
  following?: boolean;
}

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        {discussion.isAnnouncement && (
          <Badge variant="default" className="w-fit mb-2">Announcement</Badge>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={discussion.author.avatar} />
              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{discussion.author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{discussion.author.role}</span>
                <span className="mx-1">•</span>
                <span>{discussion.postedAt}</span>
              </div>
            </div>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">
          {discussion.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {discussion.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {discussion.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 h-7 px-2"
            onClick={() => setLiked(!liked)}
          >
            <Heart 
              className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
            />
            <span className="text-xs">{liked ? discussion.likes + 1 : discussion.likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 h-7 px-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{discussion.comments}</span>
          </Button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{discussion.views}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Sample data for discussions
const discussions: Discussion[] = [
  {
    id: 1,
    title: "BlackCat Ransomware: New Extortion Techniques",
    content: "We've observed new extortion techniques used by the BlackCat ransomware group. In addition to the standard encryption and data exfiltration approach, they are now launching DDoS attacks against victims who refuse to pay, and are even contacting customers of the victims to apply additional pressure. Has anyone else observed these new TTPs?",
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "Security Researcher"
    },
    postedAt: "2 hours ago",
    tags: ["ransomware", "blackcat", "ttps", "extortion"],
    likes: 24,
    comments: 12,
    views: 156,
    isAnnouncement: false,
    following: true
  },
  {
    id: 2,
    title: "Detecting Spring4Shell Exploitation Attempts",
    content: "I've put together some Sigma rules to detect Spring4Shell exploitation attempts in web server logs. The rules look for specific patterns in HTTP requests that indicate attempts to exploit CVE-2022-22965. I've tested them against known malicious traffic and they seem to work well, but I'd appreciate additional eyes on them.",
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/100?img=2",
      role: "Threat Hunter"
    },
    postedAt: "5 hours ago",
    tags: ["spring4shell", "detection", "sigma", "cve-2022-22965"],
    likes: 36,
    comments: 18,
    views: 245,
    isAnnouncement: false
  },
  {
    id: 3,
    title: "[OFFICIAL] New STIX/TAXII Feed Available",
    content: "We're excited to announce that we've added a new STIX/TAXII feed from the Financial Services ISAC to our platform. This feed provides high-quality threat intelligence specific to the financial services sector, including indicators related to banking trojans, targeted ransomware, and APTs known to target financial institutions.",
    author: {
      name: "Admin",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "Platform Administrator"
    },
    postedAt: "1 day ago",
    tags: ["announcement", "stix", "taxii", "feed", "financial"],
    likes: 52,
    comments: 7,
    views: 412,
    isAnnouncement: true
  },
  {
    id: 4,
    title: "Analysis of Lazarus Group's Latest Campaign",
    content: "I've been analyzing the latest campaign attributed to the Lazarus Group targeting cryptocurrency exchanges and financial institutions. They're using a new initial access vector involving compromised npm packages that are commonly used in financial web applications. I've extracted IOCs and mapped the TTPs to MITRE ATT&CK.",
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/100?img=4",
      role: "Threat Intelligence Analyst"
    },
    postedAt: "2 days ago",
    tags: ["apt", "lazarus", "cryptocurrency", "north-korea"],
    likes: 41,
    comments: 23,
    views: 320,
    isAnnouncement: false,
    following: true
  },
  {
    id: 5,
    title: "[IMPORTANT] Platform Maintenance Scheduled",
    content: "We will be performing scheduled maintenance on the platform this Saturday, March 25th, from 2:00 AM to 6:00 AM UTC. During this time, the platform will be in read-only mode. We'll be upgrading our database infrastructure and deploying several performance improvements.",
    author: {
      name: "System",
      role: "System"
    },
    postedAt: "3 days ago",
    tags: ["announcement", "maintenance", "downtime"],
    likes: 8,
    comments: 4,
    views: 389,
    isAnnouncement: true
  },
  {
    id: 6,
    title: "Observed Overlap Between Scattered Spider and Black Basta",
    content: "We've identified technical overlaps between Scattered Spider BEC campaigns and Black Basta ransomware operations. Specifically, we've seen shared infrastructure, similar post-exploitation tools, and even identical PowerShell scripts used for lateral movement. This suggests possible collaboration or resource sharing between these groups.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/100?img=5",
      role: "Senior Threat Researcher"
    },
    postedAt: "4 days ago",
    tags: ["scattered-spider", "black-basta", "ransomware", "attribution"],
    likes: 29,
    comments: 15,
    views: 203,
    isAnnouncement: false
  }
];

// Sample data for top contributors
const topContributors = [
  { 
    name: "Sarah Johnson", 
    role: "Senior Threat Researcher", 
    avatar: "https://i.pravatar.cc/100?img=5", 
    contributions: 78 
  },
  { 
    name: "Michael Chen", 
    role: "Threat Intelligence Analyst", 
    avatar: "https://i.pravatar.cc/100?img=4", 
    contributions: 65 
  },
  { 
    name: "John Smith", 
    role: "Security Researcher", 
    avatar: "https://i.pravatar.cc/100?img=1", 
    contributions: 52 
  },
  { 
    name: "Jane Doe", 
    role: "Threat Hunter", 
    avatar: "https://i.pravatar.cc/100?img=2", 
    contributions: 47 
  }
];

// Sample data for trending tags
const trendingTags = [
  { name: "ransomware", count: 58 },
  { name: "zero-day", count: 42 },
  { name: "apt", count: 37 },
  { name: "detection", count: 31 },
  { name: "spring4shell", count: 28 },
  { name: "blackcat", count: 24 },
  { name: "lazarus", count: 21 },
  { name: "iocs", count: 19 }
];

// Sample data for upcoming events
const upcomingEvents = [
  {
    name: "Threat Hunting Workshop",
    date: "Mar 28",
    description: "Interactive workshop on advanced threat hunting techniques using open source tools."
  },
  {
    name: "Ransomware Panel Discussion",
    date: "Apr 05",
    description: "Expert panel discussing the evolving ransomware landscape and defense strategies."
  },
  {
    name: "OSCTIP Community Meetup",
    date: "Apr 12",
    description: "Virtual community meetup with presentations from members and Q&A session."
  }
];

export default CommunityPage;
