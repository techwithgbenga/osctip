
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Bot, Shield, DatabaseIcon, ChevronDown, TerminalSquare, Lock } from 'lucide-react';
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
import { AuthState } from '@/lib/authService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Chatot: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    toast.success("New conversation created", {
      description: "Started a fresh security analysis session"
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
      toast.error("Failed to send message", {
        description: "There was an error processing your request. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete a conversation
  const handleDeleteConversation = (conversation: Conversation) => {
    if (conversations.length <= 1) {
      toast.error("Cannot delete the only conversation", {
        description: "Create a new conversation first before deleting this one."
      });
      return;
    }
    
    const updatedConversations = deleteConversation(userId, conversation.id, conversations);
    setConversations(updatedConversations);
    
    // If the deleted conversation was active, set a new active conversation
    if (activeConversation && activeConversation.id === conversation.id) {
      setActiveConversation(updatedConversations[0]);
    }
    
    toast.success("Conversation deleted", {
      description: "The conversation has been permanently removed"
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
    
    toast.success("Conversation cleared", {
      description: "All previous messages have been removed from this conversation"
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
    
    toast.success("Conversation updated", {
      description: `Category changed to ${category}`
    });
  };

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-150px)]">
      <Tabs defaultValue="chatbot" className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">OSCTIP Security Assistant</h1>
          </div>
          <TabsList>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Chatbot
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chatbot" className="flex-1 flex overflow-hidden">
          {/* Conversations Sidebar */}
          <div className="w-64 border-r border-border h-full flex flex-col">
            <div className="p-3 border-b border-border flex justify-between items-center">
              <h3 className="font-medium text-sm">Security Analysis Sessions</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNewConversation}
                className="h-8 px-2"
              >
                New Chat
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-2">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-2 rounded-md cursor-pointer flex items-center justify-between group hover:bg-secondary/80 ${
                      activeConversation?.id === conversation.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <TerminalSquare className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate text-sm">{conversation.title}</span>
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
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          updateConversationCategory(conversation.id, 'threat-analysis');
                        }}>
                          Mark as Threat Analysis
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          updateConversationCategory(conversation.id, 'incident-response');
                        }}>
                          Mark as Incident Response
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          updateConversationCategory(conversation.id, 'vulnerability-assessment');
                        }}>
                          Mark as Vulnerability Assessment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          Delete Conversation
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
                  <span className="text-xs font-mono">ENCRYPTED</span>
                </div>
                <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-mono">
                  SECURE
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Window */}
          <div className="flex-1 h-full overflow-hidden">
            <ChatWindow 
              conversation={activeConversation}
              isProcessing={isProcessing}
              onSendMessage={handleSendMessage}
              onClearConversation={handleClearConversation}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="flex-1">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Conversation History</h2>
                  <p className="text-muted-foreground">
                    View and manage your security analysis conversations
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {conversations.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No conversations found</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <Card key={conversation.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                              {conversation.category === 'threat-analysis' && (
                                <div className="bg-destructive/10 text-destructive p-2 rounded-md">
                                  <Shield className="h-4 w-4" />
                                </div>
                              )}
                              {conversation.category === 'incident-response' && (
                                <div className="bg-warning/10 text-warning p-2 rounded-md">
                                  <RefreshCw className="h-4 w-4" />
                                </div>
                              )}
                              {conversation.category === 'vulnerability-assessment' && (
                                <div className="bg-info/10 text-info p-2 rounded-md">
                                  <TerminalSquare className="h-4 w-4" />
                                </div>
                              )}
                              {!conversation.category && (
                                <div className="bg-secondary p-2 rounded-md">
                                  <Bot className="h-4 w-4" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-medium">{conversation.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(conversation.updatedAt).toLocaleString()} · 
                                  {conversation.messages.length} messages
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSelectConversation(conversation)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteConversation(conversation)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-muted/40">
                            <p className="text-sm line-clamp-2">
                              {conversation.messages[conversation.messages.length - 1]?.content || 'No messages'}
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

export default Chatot;
