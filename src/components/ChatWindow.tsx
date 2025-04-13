
import React, { useEffect, useRef } from 'react';
import { Conversation } from '@/lib/types';
import Message from './Message';
import ChatInput from './ChatInput';
import { RefreshCw, Shield, AlertTriangle, FileText, Download, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface ChatWindowProps {
  conversation: Conversation | null;
  isProcessing: boolean;
  onSendMessage: (content: string) => void;
  onClearConversation: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  isProcessing,
  onSendMessage,
  onClearConversation
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-6 rounded-lg border border-border">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-mono text-primary mb-2">// NO_ACTIVE_SESSION</h2>
          <p className="text-muted-foreground mb-4">Initialize a new threat analysis session or select an existing incident from the database.</p>
          <div className="inline-flex gap-2 justify-center">
            <div className="px-3 py-1 rounded bg-secondary text-xs font-mono text-primary">SYSTEM_READY</div>
            <div className="px-3 py-1 rounded bg-secondary text-xs font-mono text-primary">THREAT_SCAN_IDLE</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border py-3 px-4 flex items-center justify-between bg-secondary">
        <div className="flex items-center">
          <h2 className="text-lg font-mono ml-8">{conversation.title}</h2>
          {conversation.category && (
            <Badge variant="outline" className="ml-2 text-xs font-mono">
              {conversation.category.replace('-', ' ').toUpperCase()}
            </Badge>
          )}
          <div className="ml-4 px-2 py-0.5 rounded-sm bg-primary/20 text-primary text-xs font-mono">
            SECURE_CHANNEL
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Encryption
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>End-to-end encryption enabled</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export conversation log</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearConversation}
                  className="font-mono border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Terminal
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all messages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="p-3 bg-secondary/30 border-b border-border font-mono text-xs">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="text-primary">SYSTEM NOTIFICATION</span>
          </div>
          <p className="text-muted-foreground">OSCTIP Threat Intelligence System v2.1.4 // INITIALIZED</p>
          <p className="text-muted-foreground">Connected to: <span className="text-primary">MITRE ATT&CK, CVE Database, OSINT</span></p>
          <div className="flex gap-2 mt-2">
            <div className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-sm font-mono">
              CLEARANCE: ANALYST
            </div>
            <div className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-sm font-mono">
              SOURCES: VERIFIED
            </div>
          </div>
        </div>
        
        {conversation.messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLast={index === conversation.messages.length - 1 && isProcessing}
          />
        ))}
        
        {/* Loading indicator */}
        {isProcessing && (
          <div className="py-3">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <Shield className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center px-4 py-3 rounded-md bg-secondary border border-border/50">
                  <span className="font-mono text-xs text-primary mr-2">PROCESSING</span>
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary"></span>
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary mx-1"></span>
                  <span className="typing-dot h-2 w-2 rounded-full bg-primary"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} disabled={isProcessing} />
      
      {/* Security status bar */}
      <div className="py-1 px-4 border-t border-border bg-background/90 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Lock className="h-3 w-3 mr-1 text-success" />
            <span>ENCRYPTION:ENABLED</span>
          </div>
          <div className="flex items-center">
            <EyeOff className="h-3 w-3 mr-1 text-success" />
            <span>LOGS:ENCRYPTED</span>
          </div>
        </div>
        <div className="flex items-center">
          <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
          <span>{conversation.messages.length} MESSAGES</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
