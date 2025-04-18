
import React from 'react';
import { Message as MessageType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { User, Shield, Terminal, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface MessageProps {
  message: MessageType;
  isLast: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "py-2",
        isUser ? "bg-background" : "bg-secondary/50"
      )}
    >
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="h-9 w-9 rounded-md bg-secondary text-primary flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
            )}
          </div>
          
          {/* Message content */}
          <Card className={cn(
            "flex-1 p-3 shadow-md border border-border/50",
            isUser ? "bg-secondary/70" : "bg-secondary",
            isLast && !isUser && "terminal-cursor"
          )}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Terminal className="h-4 w-4 mr-2 text-primary" />
                <p className="text-sm font-mono text-primary">
                  {isUser ? 'ANALYST@OSCTIP:~$' : 'SYSTEM@OSCTIP:~$'}
                </p>
              </div>
              
              {message.threatLevel && (
                <Badge 
                  variant={
                    message.threatLevel === 'critical' ? 'destructive' : 
                    message.threatLevel === 'high' ? 'destructive' : 
                    message.threatLevel === 'medium' ? 'secondary' : 'outline'
                  }
                  className="font-mono text-xs"
                >
                  {message.threatLevel === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {message.threatLevel === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {message.threatLevel === 'medium' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {message.threatLevel === 'low' && <CheckCircle className="h-3 w-3 mr-1" />}
                  THREAT: {message.threatLevel.toUpperCase()}
                </Badge>
              )}
            </div>
            
            <div className="prose prose-sm max-w-none dark:prose-invert font-mono">
              {message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            
            {/* Message metadata */}
            {message.metadata && (
              <div className="mt-3 pt-3 border-t border-border/40">
                {message.metadata.cveReferences && message.metadata.cveReferences.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs font-mono text-primary mb-1">CVE REFERENCES:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.metadata.cveReferences.map((cve, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-mono">
                          {cve}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {message.metadata.mitreTactics && message.metadata.mitreTactics.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs font-mono text-primary mb-1">MITRE ATT&CK:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.metadata.mitreTactics.map((tactic, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-mono">
                          {tactic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {message.metadata.tags && message.metadata.tags.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs font-mono text-primary mb-1">TAGS:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.metadata.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-mono bg-primary/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-2 text-xs text-muted-foreground flex justify-between items-center">
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              {!isUser && (
                <Badge variant="outline" className="text-xs font-mono">
                  AI-VERIFIED
                </Badge>
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
