
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Terminal, Shield, DatabaseIcon, ChevronDown, TerminalSquare, Lock, PanelLeft, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Conversation, Message } from '@/lib/types';
import ChatWindow from '@/components/ChatWindow';
import { 
  createNewConversation, 
  sendMessage, 
  initializeConversations, 
  getActiveConversationId, 
  setActiveConversationId,
  clearConversation, 
  deleteConversation,
  saveConversations
} from '@/lib/chatService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userId = "security-analyst-1"; // In a real app, this would come from auth context
  
  // Initialize conversations on component mount
  useEffect(() => {
    const initialConversations = initializeConversations(userId);
    setConversations(initialConversations);
    
    // Get active conversation from storage
    const activeId = getActiveConversationId(userId);
    if (activeId) {
      const active = initialConversations.find(c => c.id === activeId);
      if (active) {
        setActiveConversation(active);
      } else if (initialConversations.length > 0) {
        setActiveConversation(initialConversations[0]);
        setActiveConversationId(userId, initialConversations[0].id);
      }
    } else if (initialConversations.length > 0) {
      setActiveConversation(initialConversations[0]);
      setActiveConversationId(userId, initialConversations[0].id);
    }
  }, []);

  // Create a new conversation
  const handleNewConversation = () => {
    const newConversation = createNewConversation(userId, conversations);
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation);
    
    toast.success("New security session initiated", {
      description: "Terminal initialized with encrypted connection"
    });
  };

  // Select a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setActiveConversationId(userId, conversation.id);
  };

  // Send a message
  const handleSendMessage = async (content: string) => {
    if (!activeConversation || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Add security context to user queries
      const securityEnhancedContent = enhanceQueryWithSecurityContext(content);
      
      const updatedConversations = await sendMessage(
        userId,
        activeConversation.id,
        securityEnhancedContent,
        conversations
      );
      
      setConversations(updatedConversations);
      
      // Update active conversation with the latest version
      const updatedActive = updatedConversations.find(c => c.id === activeConversation.id);
      if (updatedActive) {
        setActiveConversation(updatedActive);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Connection interrupted", {
        description: "Secure channel connection failure. Retry transmission."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete a conversation
  const handleDeleteConversation = (conversation: Conversation) => {
    if (conversations.length <= 1) {
      toast.error("System Error: #45291", {
        description: "Cannot terminate only active terminal. Initialize new session first."
      });
      return;
    }
    
    const updatedConversations = deleteConversation(userId, conversation.id, conversations);
    setConversations(updatedConversations);
    
    // If the deleted conversation was active, set a new active conversation
    if (activeConversation && activeConversation.id === conversation.id) {
      setActiveConversation(updatedConversations[0]);
    }
    
    toast.success("Terminal session terminated", {
      description: "All session data securely archived in encrypted storage"
    });
  };

  // Clear the current conversation
  const handleClearConversation = () => {
    if (!activeConversation) return;
    
    const updatedConversations = clearConversation(userId, activeConversation.id, conversations);
    setConversations(updatedConversations);
    
    // Update active conversation with cleared version
    const clearedConversation = updatedConversations.find(c => c.id === activeConversation.id);
    if (clearedConversation) {
      setActiveConversation(clearedConversation);
    }
    
    toast.success("Terminal buffer cleared", {
      description: "Memory wiped. New secure session initialized."
    });
  };

  // Helper function to add security context to user queries
  const enhanceQueryWithSecurityContext = (query: string): string => {
    // In a production app, you would analyze the query and add relevant security context
    // For now, we'll just return the original query
    return query;
  };

  // Update conversation category
  const updateConversationCategory = (conversationId: string, category: Conversation['category']) => {
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex === -1) return;
    
    const updatedConversations = [...conversations];
    updatedConversations[conversationIndex] = {
      ...updatedConversations[conversationIndex],
      category
    };
    
    setConversations(updatedConversations);
    saveConversations(userId, updatedConversations);
    
    if (activeConversation && activeConversation.id === conversationId) {
      setActiveConversation(updatedConversations[conversationIndex]);
    }
    
    toast.success("Session classification updated", {
      description: `Protocol set to ${category}`
    });
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-[calc(100vh-50px)] flex flex-col">
      <Tabs defaultValue="chatbot" className="h-full flex flex-col">
        <div className="px-4 py-2 bg-muted/30 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
            <Shield className="h-6 w-6 text-primary security-pulse" />
            <h1 className="text-xl font-mono font-bold">Terminal</h1>
            <div className="text-xs bg-muted px-2 py-1 rounded font-mono flex items-center text-primary">
              <div className="mr-1 h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              SECURE CONNECTION
            </div>
          </div>
          <TabsList className="bg-muted/40">
            <TabsTrigger value="chatbot" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
              <Terminal className="h-4 w-4" />
              Terminal
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
              <DatabaseIcon className="h-4 w-4" />
              Archives
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chatbot" className="flex-1 flex overflow-hidden">
          {/* Conversations Sidebar */}
          <div className={`border-r border-border h-full flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0 md:w-16 md:opacity-100' : 'w-64'}`}>
            {!sidebarCollapsed && (
              <>
                <div className="p-3 border-b border-border flex justify-between items-center">
                  <h3 className="font-mono text-xs">ACTIVE SESSIONS</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNewConversation}
                    className="h-8 px-2 bg-muted/60 hover:bg-primary/20 font-mono text-xs"
                  >
                    + NEW
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        className={`p-2 rounded cursor-pointer flex items-center justify-between group hover:bg-secondary/50 ${
                          activeConversation?.id === conversation.id ? 'bg-secondary/80 border-l-2 border-primary' : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <TerminalSquare className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate text-xs font-mono">{conversation.title}</span>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="font-mono text-xs">SESSION OPTIONS</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              updateConversationCategory(conversation.id, 'threat-analysis');
                            }} className="font-mono text-xs">
                              MARK: THREAT ANALYSIS
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              updateConversationCategory(conversation.id, 'incident-response');
                            }} className="font-mono text-xs">
                              MARK: INCIDENT RESPONSE
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              updateConversationCategory(conversation.id, 'vulnerability-assessment');
                            }} className="font-mono text-xs">
                              MARK: VULNERABILITY ASSESSMENT
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conversation);
                              }}
                              className="text-destructive focus:text-destructive font-mono text-xs"
                            >
                              TERMINATE SESSION
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-xs font-mono">ENCRYPTION_ACTIVE</span>
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-sm font-mono flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      CLASSIFIED
                    </div>
                  </div>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="h-full flex flex-col items-center py-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSidebar}
                  className="mb-4"
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    size="icon"
                    className={`mb-2 ${activeConversation?.id === conversation.id ? 'bg-primary/20' : ''}`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <TerminalSquare className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat Window */}
          <div className="flex-1 h-full overflow-hidden relative">
            {!sidebarCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="absolute top-2 left-2 hidden md:flex"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            )}
            <ChatWindow 
              conversation={activeConversation}
              isProcessing={isProcessing}
              onSendMessage={handleSendMessage}
              onClearConversation={handleClearConversation}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="flex-1">
          <Card className="h-full bg-muted/10">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-mono font-bold">INTELLIGENCE ARCHIVE</h2>
                  <p className="text-muted-foreground font-mono text-sm">
                    Access classified cyber intelligence records
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8 font-mono">
                      <p className="text-muted-foreground">NO RECORDS FOUND IN DATABASE</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <Card key={conversation.id} className="overflow-hidden transition-all hover:shadow-md bg-secondary/20 border-border/50">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-4 border-b border-border/30">
                            <div className="flex items-center gap-3">
                              {conversation.category === 'threat-analysis' && (
                                <div className="bg-destructive/10 text-destructive p-2 rounded-md">
                                  <Shield className="h-4 w-4" />
                                </div>
                              )}
                              {conversation.category === 'incident-response' && (
                                <div className="bg-yellow-400/10 text-yellow-400 p-2 rounded-md">
                                  <RefreshCw className="h-4 w-4" />
                                </div>
                              )}
                              {conversation.category === 'vulnerability-assessment' && (
                                <div className="bg-primary/10 text-primary p-2 rounded-md">
                                  <TerminalSquare className="h-4 w-4" />
                                </div>
                              )}
                              {!conversation.category && (
                                <div className="bg-muted p-2 rounded-md">
                                  <Terminal className="h-4 w-4" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-mono font-medium text-sm">{conversation.title}</h3>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {new Date(conversation.updatedAt).toLocaleString()} · 
                                  {conversation.messages.length} entries
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSelectConversation(conversation)}
                                className="font-mono text-xs"
                              >
                                ACCESS
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteConversation(conversation)}
                                className="font-mono text-xs"
                              >
                                PURGE
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-background/40 border-t border-border/10">
                            <p className="text-xs line-clamp-2 font-mono text-muted-foreground">
                              {conversation.messages[conversation.messages.length - 1]?.content || 'No data available'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chat;
