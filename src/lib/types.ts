export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'analyst' | 'admin' | 'supervisor';
  clearanceLevel?: 'basic' | 'advanced' | 'expert';
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: number;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: {
    source?: string[];
    tags?: string[];
    entities?: string[];
    cveReferences?: string[];
    mitreTactics?: string[];
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  category?: 'threat-analysis' | 'incident-response' | 'vulnerability-assessment' | 'general';
  status?: 'active' | 'resolved' | 'pending' | 'escalated';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  responseStyle: 'concise' | 'detailed' | 'technical' | 'actionable';
  modelVersion: string;
  dataSourcesEnabled: {
    mitre: boolean;
    cve: boolean;
    osint: boolean;
    internalThreatFeeds: boolean;
  };
}

export interface ThreatIntelligence {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  published: number;
  updated: number;
  cveIds?: string[];
  mitreTactics?: string[];
  indicators?: {
    type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
    value: string;
    confidence: number;
  }[];
  recommendations?: string[];
}

export interface IncidentResponse {
  id: string;
  title: string;
  status: 'open' | 'investigating' | 'contained' | 'eradicated' | 'recovered' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  created: number;
  updated: number;
  timeline: {
    timestamp: number;
    action: string;
    actor: string;
    details?: string;
  }[];
  affectedSystems?: string[];
  indicators?: string[];
  containmentActions?: string[];
  remediationSteps?: {
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo?: string;
  }[];
}
