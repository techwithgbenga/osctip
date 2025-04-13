
import { Conversation, Message } from './types';

// Mock storage keys
const CONVERSATIONS_STORAGE_KEY = 'osctip_conversations';
const ACTIVE_CONVERSATION_KEY = 'osctip_active_conversation';

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Initialize with sample conversation if none exists
export const initializeConversations = (userId: string): Conversation[] => {
  const storedConversations = localStorage.getItem(`${CONVERSATIONS_STORAGE_KEY}_${userId}`);
  
  if (storedConversations) {
    try {
      return JSON.parse(storedConversations);
    } catch (e) {
      console.error('Failed to parse stored conversations:', e);
      return createInitialConversation();
    }
  }
  
  return createInitialConversation();
};

// Create a default conversation
const createInitialConversation = (): Conversation[] => {
  const now = Date.now();
  const initialConversation: Conversation = {
    id: generateId(),
    title: 'New Security Session',
    messages: [
      {
        id: generateId(),
        content: "OSCTIP INITIALIZED // Welcome to the OSCTIP Security Assistant. I'm here to help with threat intelligence, vulnerability assessment, incident response, and security analysis. How can I assist you today?",
        role: 'assistant',
        timestamp: now
      }
    ],
    createdAt: now,
    updatedAt: now,
    category: 'general'
  };
  
  return [initialConversation];
};

// Save conversations to storage
export const saveConversations = (userId: string, conversations: Conversation[]): void => {
  localStorage.setItem(`${CONVERSATIONS_STORAGE_KEY}_${userId}`, JSON.stringify(conversations));
};

// Get active conversation id
export const getActiveConversationId = (userId: string): string | null => {
  return localStorage.getItem(`${ACTIVE_CONVERSATION_KEY}_${userId}`);
};

// Set active conversation id
export const setActiveConversationId = (userId: string, conversationId: string): void => {
  localStorage.setItem(`${ACTIVE_CONVERSATION_KEY}_${userId}`, conversationId);
};

// Create a new conversation
export const createNewConversation = (userId: string, conversations: Conversation[]): Conversation => {
  const now = Date.now();
  const newConversation: Conversation = {
    id: generateId(),
    title: 'New Security Session',
    messages: [
      {
        id: generateId(),
        content: "OSCTIP INITIALIZED // Welcome to the OSCTIP Security Assistant. I'm here to help with threat intelligence, vulnerability assessment, incident response, and security analysis. How can I assist you today?",
        role: 'assistant',
        timestamp: now
      }
    ],
    createdAt: now,
    updatedAt: now,
    category: 'general'
  };
  
  const updatedConversations = [newConversation, ...conversations];
  saveConversations(userId, updatedConversations);
  setActiveConversationId(userId, newConversation.id);
  
  return newConversation;
};

// Send a message and get a response
export const sendMessage = async (
  userId: string,
  conversationId: string,
  content: string,
  conversations: Conversation[]
): Promise<Conversation[]> => {
  // Find the conversation
  const conversationIndex = conversations.findIndex(c => c.id === conversationId);
  
  if (conversationIndex === -1) {
    throw new Error('Conversation not found');
  }
  
  const conversation = { ...conversations[conversationIndex] };
  const now = Date.now();
  
  // Add user message
  const userMessage: Message = {
    id: generateId(),
    content,
    role: 'user',
    timestamp: now
  };
  
  conversation.messages = [...conversation.messages, userMessage];
  conversation.updatedAt = now;
  
  // Generate a title for new conversations with only one message
  if (conversation.messages.length === 2 && conversation.title === 'New Security Session') {
    conversation.title = generateSecurityConversationTitle(content);
  }
  
  // Update conversations array
  const updatedConversations = [
    ...conversations.slice(0, conversationIndex),
    conversation,
    ...conversations.slice(conversationIndex + 1)
  ];
  
  // Save immediately with user message
  saveConversations(userId, updatedConversations);
  
  // Simulate API call to get assistant response
  try {
    // Generate AI response (this would be a real API call in production)
    const assistantResponse = await simulateSecurityAIResponse(conversation.messages);
    
    // Add assistant message
    const assistantMessage: Message = {
      id: generateId(),
      content: assistantResponse.content,
      role: 'assistant',
      timestamp: Date.now(),
      threatLevel: assistantResponse.threatLevel,
      metadata: assistantResponse.metadata
    };
    
    conversation.messages = [...conversation.messages, assistantMessage];
    conversation.updatedAt = Date.now();
    
    // Update conversation category based on content if not already set
    if (conversation.category === 'general') {
      conversation.category = detectConversationCategory(conversation.messages);
    }
    
    // Update conversations array again
    const finalConversations = [
      ...updatedConversations.slice(0, conversationIndex),
      conversation,
      ...updatedConversations.slice(conversationIndex + 1)
    ];
    
    // Save with assistant response
    saveConversations(userId, finalConversations);
    
    return finalConversations;
  } catch (error) {
    // In case of error, return conversations with only the user message
    console.error('Error getting AI response:', error);
    return updatedConversations;
  }
};

// Delete a conversation
export const deleteConversation = (
  userId: string,
  conversationId: string,
  conversations: Conversation[]
): Conversation[] => {
  const updatedConversations = conversations.filter(c => c.id !== conversationId);
  saveConversations(userId, updatedConversations);
  
  // If deleted the active conversation, set a new active one
  const activeId = getActiveConversationId(userId);
  if (activeId === conversationId && updatedConversations.length > 0) {
    setActiveConversationId(userId, updatedConversations[0].id);
  }
  
  return updatedConversations;
};

// Clear conversation history
export const clearConversation = (
  userId: string,
  conversationId: string,
  conversations: Conversation[]
): Conversation[] => {
  const conversationIndex = conversations.findIndex(c => c.id === conversationId);
  
  if (conversationIndex === -1) {
    return conversations;
  }
  
  const now = Date.now();
  const clearedConversation: Conversation = {
    ...conversations[conversationIndex],
    messages: [
      {
        id: generateId(),
        content: "OSCTIP RESET // System cleared and reinitialized. What security topic would you like to explore?",
        role: 'assistant',
        timestamp: now
      }
    ],
    title: 'New Security Session',
    updatedAt: now,
    category: 'general'
  };
  
  const updatedConversations = [
    ...conversations.slice(0, conversationIndex),
    clearedConversation,
    ...conversations.slice(conversationIndex + 1)
  ];
  
  saveConversations(userId, updatedConversations);
  return updatedConversations;
};

// Simulate AI response for security-focused chatbot
const simulateSecurityAIResponse = async (messages: Message[]): Promise<{
  content: string;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Message['metadata'];
}> => {
  // Simple delay to simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      const userMessage = messages[messages.length - 1].content.toLowerCase();
      
      // Check if this is a search query
      if (userMessage.startsWith('[search:')) {
        const searchScope = userMessage.substring(8, userMessage.indexOf(']'));
        const query = userMessage.substring(userMessage.indexOf(']') + 1).trim();
        
        return resolve({
          content: generateSearchResponse(query, searchScope),
          threatLevel: 'low',
          metadata: {
            source: ['OSINT', 'Internal Database'],
            tags: ['search', searchScope, 'intelligence']
          }
        });
      }
      
      // Check if this is a command
      if (userMessage.startsWith('[command]')) {
        const command = userMessage.substring(9).trim();
        
        return resolve({
          content: generateCommandResponse(command),
          metadata: {
            tags: ['command', 'system']
          }
        });
      }
      
      // Look for security-related keywords to determine the type of response
      const threatKeywords = ['threat', 'attack', 'malware', 'ransomware', 'breach', 'compromise'];
      const vulnerabilityKeywords = ['vulnerability', 'cve', 'exploit', 'patch', 'security flaw'];
      const threatActorKeywords = ['apt', 'threat actor', 'threat group', 'hacker', 'advanced persistent'];
      const incidentKeywords = ['incident', 'response', 'forensic', 'investigation', 'containment'];
      
      let responseType = 'general';
      let threatLevel: 'low' | 'medium' | 'high' | 'critical' | undefined = undefined;
      let metadata: Message['metadata'] = undefined;
      
      // Determine the response type based on keywords
      if (threatKeywords.some(keyword => userMessage.includes(keyword))) {
        responseType = 'threat';
        // Randomly assign a threat level for demo purposes
        const levels: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
        threatLevel = levels[Math.floor(Math.random() * levels.length)];
        
        metadata = {
          mitreTactics: ['Initial Access', 'Execution', 'Persistence'],
          tags: ['threat', 'malware']
        };
      } else if (vulnerabilityKeywords.some(keyword => userMessage.includes(keyword))) {
        responseType = 'vulnerability';
        threatLevel = 'medium';
        
        // If it mentions CVE, add some sample CVE references
        if (userMessage.includes('cve')) {
          metadata = {
            cveReferences: ['CVE-2023-12345', 'CVE-2024-23456'],
            tags: ['vulnerability', 'patch-available']
          };
        } else {
          metadata = {
            tags: ['vulnerability', 'security-advisory']
          };
        }
      } else if (threatActorKeywords.some(keyword => userMessage.includes(keyword))) {
        responseType = 'threatActor';
        threatLevel = 'high';
        
        metadata = {
          mitreTactics: ['Command and Control', 'Exfiltration', 'Impact'],
          tags: ['threat-actor', 'apt']
        };
      } else if (incidentKeywords.some(keyword => userMessage.includes(keyword))) {
        responseType = 'incident';
        threatLevel = 'high';
        
        metadata = {
          tags: ['incident-response', 'forensics']
        };
      }
      
      const response = generateSecurityResponse(responseType, userMessage);
      
      resolve({
        content: response,
        threatLevel,
        metadata
      });
    }, 1500);
  });
};

// Generate a title for a security conversation
const generateSecurityConversationTitle = (message: string): string => {
  // Truncate and clean up the message to create a title
  const maxLength = 30;
  let title = message.trim();
  
  // Remove special search/command prefixes
  if (title.startsWith('[SEARCH:')) {
    title = "Search: " + title.substring(title.indexOf(']') + 1);
  } else if (title.startsWith('[COMMAND]')) {
    title = "Command: " + title.substring(10);
  }
  
  // Add security prefix if not already present
  if (!title.toLowerCase().includes('threat') && 
      !title.toLowerCase().includes('security') && 
      !title.toLowerCase().includes('vuln')) {
    title = "Security: " + title;
  }
  
  // Remove special characters
  title = title.replace(/[^\w\s]/gi, '');
  
  // Truncate if too long
  if (title.length > maxLength) {
    title = title.substring(0, maxLength) + '...';
  }
  
  return title || 'New Security Session';
};

// Detect the category of a conversation based on its content
const detectConversationCategory = (messages: Message[]): Conversation['category'] => {
  const content = messages.map(m => m.content.toLowerCase()).join(' ');
  
  if (content.includes('threat') || content.includes('malware') || content.includes('attack')) {
    return 'threat-analysis';
  }
  
  if (content.includes('incident') || content.includes('breach') || content.includes('response')) {
    return 'incident-response';
  }
  
  if (content.includes('vulnerability') || content.includes('cve') || content.includes('exploit')) {
    return 'vulnerability-assessment';
  }
  
  return 'general';
};

// Generate security-focused responses
const generateSecurityResponse = (type: string, query: string): string => {
  switch (type) {
    case 'threat':
      return getRandomThreatResponse();
    case 'vulnerability':
      return getRandomVulnerabilityResponse();
    case 'threatActor':
      return getRandomThreatActorResponse();
    case 'incident':
      return getRandomIncidentResponse();
    default:
      return getRandomGeneralSecurityResponse();
  }
};

// Generate search-focused responses
const generateSearchResponse = (query: string, scope: string): string => {
  return `SEARCH RESULTS FOR: "${query}"\nSCOPE: ${scope.toUpperCase()}\n\nFound 3 relevant entries in the threat intelligence database:\n\n1. [HIGH CONFIDENCE] Indicators associated with ${query} suggest links to APT group "BlackMamba"\n2. [MEDIUM CONFIDENCE] Similar patterns observed in financial sector attacks in Q1 2024\n3. [HISTORICAL DATA] Related tactics documented in MITRE ATT&CK framework under T1566, T1027\n\nRecommended action: Continue investigation with the "analyze" command for deeper forensic assessment.`;
};

// Generate command-focused responses
const generateCommandResponse = (command: string): string => {
  if (command.startsWith('/scan')) {
    const target = command.substring(6).trim();
    return `SCAN INITIATED\nTARGET: ${target || "Not specified"}\n\nScanning for vulnerabilities and exposed services...\n\nPreliminary results:\n- Open ports detected: 22 (SSH), 80 (HTTP), 443 (HTTPS)\n- Service fingerprinting in progress\n- Vulnerability assessment initiated\n\nComplete results will be available in the Security Dashboard when finished.`;
  }
  
  if (command.startsWith('/analyze')) {
    const target = command.substring(9).trim();
    return `FORENSIC ANALYSIS\nTARGET: ${target || "Current threat indicators"}\n\nInitiating deep analysis of artifacts and indicators...\n\nPreliminary findings:\n- Suspicious PowerShell execution patterns detected\n- Evidence of persistence mechanism in registry\n- C2 communication attempts identified\n\nRecommendation: Escalate to incident response team for containment procedures.`;
  }
  
  if (command.startsWith('/help')) {
    return `AVAILABLE COMMANDS:\n\n/scan <target> - Scan a target for vulnerabilities\n/analyze <indicators> - Perform forensic analysis\n/report - Generate security report\n/mitigate <threat> - Get mitigation recommendations\n/escalate - Escalate to security team\n/help - Show this help message`;
  }
  
  return `COMMAND NOT RECOGNIZED: "${command}"\n\nType /help for a list of available commands.`;
};

// Helper functions for generating realistic security responses
const getRandomThreatResponse = (): string => {
  const responses = [
    "THREAT ANALYSIS COMPLETE\n\nThis appears to be a sophisticated multi-stage attack with characteristics of APT group activity. The initial infection vector uses a combination of spear-phishing and exploits targeting CVE-2024-1234 in outdated browser plugins.\n\nKey indicators:\n- PowerShell obfuscation techniques to evade detection\n- Fileless malware persistence using registry modifications\n- Beaconing to known malicious C2 infrastructure\n\nRecommendation: Implement containment procedures according to IR playbook section 3.4 and patch all systems against CVE-2024-1234.",
    
    "MALWARE CLASSIFICATION: RANSOMWARE\n\nThe indicators you've provided match patterns associated with the BlackCat/ALPHV ransomware family. This is a Ransomware-as-a-Service (RaaS) operation with sophisticated evasion techniques.\n\nBehavioral characteristics:\n- Double extortion tactics (encryption + data exfiltration)\n- Lateral movement leveraging compromised credentials\n- Self-propagation via exploitation of unpatched systems\n\nCritical mitigation steps:\n1. Isolate affected systems immediately\n2. Implement application whitelisting\n3. Restore from verified clean backups\n4. Update detection rules to identify BlackCat IOCs",
    
    "ATTACK CAMPAIGN IDENTIFIED\n\nThe pattern matches an ongoing campaign targeting critical infrastructure in the energy sector. Attribution analysis suggests nation-state affiliation with moderate confidence.\n\nTechnical details:\n- Initial access via VPN appliance vulnerability (CVE-2023-5678)\n- Deployment of custom backdoor (SHADOWTOOTH)\n- Credential harvesting and privilege escalation\n\nThreat intelligence has been shared with the appropriate ISACs and government agencies. Implement detection and mitigation guidance from US-CERT advisory AA24-086A."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const getRandomVulnerabilityResponse = (): string => {
  const responses = [
    "VULNERABILITY ASSESSMENT RESULTS\n\nCVE-2024-1234 (CVSS Score: 9.8 CRITICAL)\nRemote Code Execution vulnerability in Apache Struts\n\nDescription: A critical vulnerability in Apache Struts allows unauthenticated attackers to execute arbitrary code via crafted HTTP requests. This vulnerability is being actively exploited in the wild.\n\nAffected versions: Apache Struts 2.0.0 - 2.5.30\nFixed in: Apache Struts 2.5.31\n\nMitigation recommendations:\n1. Update all Struts instances to version 2.5.31 immediately\n2. Apply WAF rules to block exploitation attempts\n3. Monitor for suspicious HTTP traffic patterns\n\nNOTE: Exploitation attempts for this vulnerability have been observed from the following IPs: 192.0.2.1, 198.51.100.2",
    
    "SECURITY ADVISORY: ZERO-DAY EXPLOITATION\n\nMicrosoft has released an emergency out-of-band patch for a zero-day vulnerability (CVE-2024-5678) affecting Windows systems. This vulnerability is being actively exploited by threat actors.\n\nTechnical details:\n- Windows kernel privilege escalation vulnerability\n- Allows attackers to elevate privileges to SYSTEM level\n- Exploit requires local access but can be chained with other vulnerabilities\n\nRecommended actions:\n1. Apply Microsoft security update KB5025685 immediately\n2. Enable attack surface reduction rules\n3. Implement least privilege access controls\n4. Monitor for indicators of compromise as outlined in MS Security Advisory 220412",
    
    "VULNERABILITY INTELLIGENCE UPDATE\n\nMultiple critical vulnerabilities discovered in industrial control systems (ICS) used in manufacturing environments:\n\n1. CVE-2023-9876 - Authentication bypass in Siemens SIMATIC HMI panels\n2. CVE-2024-1122 - Buffer overflow in Rockwell Automation ControlLogix\n3. CVE-2024-3344 - Unauthenticated command injection in Schneider Electric EcoStruxure\n\nThese vulnerabilities could allow attackers to gain unauthorized access to industrial systems, potentially resulting in operational disruption or safety incidents.\n\nRecommendation: Apply vendor patches according to the advisories, implement network segmentation, and increase monitoring of ICS networks for suspicious activity."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const getRandomThreatActorResponse = (): string => {
  const responses = [
    "THREAT ACTOR PROFILE: APT29 (COZY BEAR)\n\nAttribution: Russian Foreign Intelligence Service (SVR)\n\nKnown for sophisticated cyber espionage campaigns targeting government entities, think tanks, and diplomatic organizations. Highly skilled and persistent threat actor with extensive resources.\n\nTactical profile:\n- Long-term intelligence gathering operations\n- Advanced custom malware including SUNBURST and NOBELIUM toolsets\n- Supply chain compromises and trusted relationship exploitation\n- Sophisticated operational security practices\n\nRecent campaigns have focused on diplomatic targets in Europe and North America. Uses legitimate cloud services for command and control to blend with normal traffic patterns.",
    
    "THREAT GROUP ANALYSIS: LAZARUS GROUP\n\nAttribution: North Korean state-sponsored (DPRK)\n\nPrimary motivation: Financial gain and intelligence collection to bypass international sanctions. Known for cryptocurrency theft, financial system intrusions, and intellectual property theft.\n\nTechnical capabilities:\n- Custom malware families including BLINDINGCAN and HOPLIGHT\n- Sophisticated social engineering operations\n- Bitcoin theft and cryptocurrency exchange targeting\n- Watering hole attacks against specific industries\n\nRecent shift to targeting COVID-19 research organizations and pharmaceutical companies. Employs anti-forensic techniques including timestomping and secure deletion tools to hamper attribution.",
    
    "EMERGING THREAT ACTOR: BLACKMAMBA\n\nAttribution: Financially motivated cybercriminal group\n\nNewly identified threat group specializing in ransomware operations against high-value targets in financial services and healthcare sectors. Estimated to have extorted over $35 million in the past 6 months.\n\nTechnical indicators:\n- Initial access through compromised VPN credentials and exposed RDP\n- Custom ransomware strain with sophisticated encryption implementation\n- Data exfiltration prior to encryption for double extortion tactics\n- Extensive use of legitimate tools (Living off the Land) for lateral movement\n\nCurrent operations primarily target North American and European organizations. Group communicates with victims through Tor hidden services and demands payment in Monero cryptocurrency."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const getRandomIncidentResponse = (): string => {
  const responses = [
    "INCIDENT RESPONSE PLAYBOOK: RANSOMWARE ATTACK\n\nContainment procedures:\n1. Isolate affected systems from the network immediately\n2. Disable inbound VPN access and external facing services\n3. Implement network filtering to block C2 communication\n4. Preserve forensic evidence including memory dumps and logs\n\nEradication steps:\n1. Identify and close initial access vector\n2. Scan for persistence mechanisms using EDR/forensic tools\n3. Reset all credentials across the environment\n4. Verify integrity of backup systems\n\nRecovery process:\n1. Restore critical systems from verified clean backups\n2. Implement additional security controls before reconnection\n3. Conduct thorough vulnerability assessment\n4. Monitor for re-infection attempts",
    
    "SECURITY INCIDENT ANALYSIS REPORT\n\nIncident classification: Data breach via web application compromise\n\nTimeline:\n- Day 1: Initial compromise through SQL injection vulnerability\n- Days 1-5: Lateral movement and privilege escalation\n- Days 5-12: Data exfiltration of customer records (estimated 500,000 records)\n- Day 13: Detection via anomalous database queries\n- Day 14: Containment and response initiated\n\nRoot cause analysis:\n- Unpatched vulnerability in customer-facing web application\n- Inadequate network segmentation allowing lateral movement\n- Insufficient logging and monitoring capabilities\n\nImpact assessment:\n- PII exposure including names, addresses, and partial payment information\n- Regulatory reporting requirements triggered under GDPR and state data breach laws\n- Potential financial impact estimated at $2.5M including remediation and notification costs",
    
    "INCIDENT RESPONSE: ACTIVE DIRECTORY COMPROMISE\n\nSituation summary: Threat actor has obtained Domain Admin privileges in the corporate Active Directory environment. Evidence suggests presence for approximately 18 days before detection.\n\nImmediate actions required:\n1. Initiate AD forest recovery procedures per playbook IR-AD-001\n2. Implement emergency credential rotation for all privileged accounts\n3. Deploy enhanced monitoring for Golden Ticket and DCSync attacks\n4. Isolate critical servers and implement temporary access controls\n\nForensic investigation priorities:\n- Determine initial access vector (current hypothesis: phishing campaign)\n- Identify all compromised accounts and access patterns\n- Establish timeline of attacker activity within the environment\n- Document affected systems and data access\n\nRestore operations via clean forest recovery rather than attempting remediation of compromised environment."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const getRandomGeneralSecurityResponse = (): string => {
  const responses = [
    "Based on your inquiry, I recommend implementing a defense-in-depth security strategy that combines technical controls, administrative policies, and regular security awareness training. For your specific environment, consider focusing on these key areas:\n\n1. Endpoint protection with advanced EDR capabilities\n2. Network segmentation to contain potential breaches\n3. Multi-factor authentication for all remote access\n4. Regular vulnerability scanning and penetration testing\n\nWould you like me to elaborate on any specific aspect of these security controls?",
    
    "I've analyzed your security question in the context of current threat intelligence. The approach you're considering aligns with security best practices, but there are some additional considerations to keep in mind:\n\n- Recent threat reports indicate an increase in supply chain attacks targeting your industry\n- The MITRE ATT&CK framework has recently updated tactics related to your area of concern\n- Regulatory requirements in your jurisdiction may require additional documentation and controls\n\nI recommend consulting the latest NIST Special Publication 800-53 Rev. 5 guidelines for comprehensive security controls applicable to your situation.",
    
    "Security analysis complete. Based on the information provided, here are my recommendations for enhancing your security posture:\n\n1. Implement continuous security monitoring with SIEM integration\n2. Develop and regularly test an incident response plan\n3. Conduct regular security assessments focusing on your critical assets\n4. Deploy application whitelisting on critical systems\n\nThese measures address the most common attack vectors observed in your industry sector based on current threat intelligence. Would you like a more detailed breakdown of implementation strategies for any of these recommendations?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
