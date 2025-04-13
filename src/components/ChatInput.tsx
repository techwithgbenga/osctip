
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Search, AlertTriangle, Shield, Server, FileCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'analysis' | 'search' | 'commands'>('analysis');
  const [searchScope, setSearchScope] = useState<string>('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      // Add mode prefix to messages
      let formattedMessage = message.trim();
      
      if (mode === 'search') {
        formattedMessage = `[SEARCH:${searchScope}] ${formattedMessage}`;
      } else if (mode === 'commands') {
        formattedMessage = `[COMMAND] ${formattedMessage}`;
      }
      
      onSendMessage(formattedMessage);
      setMessage('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Quick prompts for security analysis
  const quickPrompts = [
    { 
      text: "Analyze this threat", 
      prompt: "Analyze this threat indicator and provide information about associated threat actors:"
    },
    { 
      text: "Check CVE", 
      prompt: "Provide details about CVE-2023-"
    },
    { 
      text: "MITRE Tactics", 
      prompt: "List MITRE ATT&CK tactics used in this attack pattern:" 
    },
    { 
      text: "Incident Response", 
      prompt: "Recommend incident response steps for a potential breach involving:" 
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-3">
          <Tabs 
            defaultValue="analysis" 
            className="w-full"
            onValueChange={(value) => setMode(value as 'analysis' | 'search' | 'commands')}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                <span>Threat Search</span>
              </TabsTrigger>
              <TabsTrigger value="commands" className="flex items-center gap-1">
                <Terminal className="h-4 w-4" />
                <span>Commands</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {mode === 'search' && (
          <div className="mb-3 flex gap-2">
            <Select 
              defaultValue="all" 
              onValueChange={setSearchScope}
            >
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Search scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="cvelist">CVE Database</SelectItem>
                <SelectItem value="mitre">MITRE ATT&CK</SelectItem>
                <SelectItem value="threatIntel">Threat Intel</SelectItem>
                <SelectItem value="internal">Internal Database</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1 text-xs text-muted-foreground flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-warning" />
              <span>Search queries are logged and subject to security review</span>
            </div>
          </div>
        )}
        
        {mode === 'commands' && (
          <div className="mb-3 flex gap-2 text-xs text-muted-foreground items-center">
            <Server className="h-3 w-3 mr-1 text-primary" />
            <span>Available commands: /scan, /analyze, /report, /mitigate, /escalate, /help</span>
          </div>
        )}
        
        {mode === 'analysis' && (
          <div className="mb-3 flex gap-2 overflow-x-auto py-1">
            {quickPrompts.map((item, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessage(message => message ? message + ' ' + item.prompt : item.prompt)}
                className="whitespace-nowrap"
                disabled={disabled}
              >
                <FileCog className="h-3 w-3 mr-1" />
                {item.text}
              </Button>
            ))}
          </div>
        )}
        
        <div className="relative">
          <div className="absolute top-0 left-0 flex items-center h-full pl-3">
            {mode === 'analysis' && <Shield className="h-4 w-4 text-primary" />}
            {mode === 'search' && <Search className="h-4 w-4 text-primary" />}
            {mode === 'commands' && <Terminal className="h-4 w-4 text-primary" />}
          </div>
          <div className="flex items-end bg-secondary border border-border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                mode === 'analysis' 
                  ? "Enter security analysis query..." 
                  : mode === 'search' 
                  ? "Search threat intelligence databases..." 
                  : "Enter command (e.g., /scan <target>)"
              }
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 max-h-32 py-3 pl-10 pr-12 font-mono text-sm"
              disabled={disabled}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="m-1 bg-primary hover:bg-primary/90"
              disabled={!message.trim() || disabled}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-center text-muted-foreground mt-2 font-mono">
          SECURE_CONNECTION // ENCRYPTION_ENABLED // ACCESS_LEVEL: ANALYST
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
