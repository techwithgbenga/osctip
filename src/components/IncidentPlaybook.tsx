
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Clock, ChevronRight, CheckCircle, XCircle, Server, HardDrive, Network, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IncidentPlaybookProps {
  onClose: () => void;
  incidentType?: string;
}

const IncidentPlaybook: React.FC<IncidentPlaybookProps> = ({ onClose, incidentType = 'data-breach' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex === activeStep) {
      setActiveStep(activeStep + 1);
    }
  };

  const dataBreachSteps = [
    {
      title: 'Initial Assessment',
      description: 'Conduct preliminary analysis to confirm the breach and assess its scope.',
      tasks: [
        { id: 1, description: 'Verify breach indicators and determine if incident is still active' },
        { id: 2, description: 'Identify affected systems and data types' },
        { id: 3, description: 'Document initial findings and establish incident severity' },
      ],
      commands: [
        { name: 'Network Traffic Analysis', command: 'sudo tcpdump -i eth0 -n "port 80 or port 443"' },
        { name: 'System Log Inspection', command: 'grep -i "failed password\|authentication failure" /var/log/auth.log' },
        { name: 'Process Analysis', command: 'ps -aux | grep -i suspicious' },
      ]
    },
    {
      title: 'Containment',
      description: 'Isolate affected systems to prevent further damage or data loss.',
      tasks: [
        { id: 1, description: 'Disconnect compromised systems from network' },
        { id: 2, description: 'Block suspicious IP addresses and domains' },
        { id: 3, description: 'Reset compromised credentials' },
        { id: 4, description: 'Implement additional access controls' },
      ],
      commands: [
        { name: 'Isolate Host', command: 'iptables -A INPUT -s x.x.x.x -j DROP' },
        { name: 'Block Suspicious IPs', command: 'for ip in $(cat suspicious_ips.txt); do iptables -A INPUT -s $ip -j DROP; done' },
        { name: 'Password Reset', command: 'passwd username' },
      ]
    },
    {
      title: 'Evidence Collection',
      description: 'Gather forensic evidence while maintaining chain of custody.',
      tasks: [
        { id: 1, description: 'Capture volatile data (memory dumps, network connections)' },
        { id: 2, description: 'Create forensic images of affected systems' },
        { id: 3, description: 'Collect and preserve relevant logs' },
        { id: 4, description: 'Document timeline of events' },
      ],
      commands: [
        { name: 'Memory Dump', command: 'sudo lime -p -f lime.dump' },
        { name: 'Disk Image', command: 'dd if=/dev/sda of=/path/to/image.dd bs=512 conv=noerror,sync' },
        { name: 'Log Collection', command: 'tar -czvf logs.tar.gz /var/log/' },
      ]
    },
    {
      title: 'Root Cause Analysis',
      description: 'Identify how the breach occurred and what vulnerabilities were exploited.',
      tasks: [
        { id: 1, description: 'Analyze forensic evidence to determine attack vectors' },
        { id: 2, description: 'Identify vulnerabilities that were exploited' },
        { id: 3, description: 'Determine timeline of the attack' },
        { id: 4, description: 'Assess if threat actors still have access' },
      ],
      commands: [
        { name: 'Find Modified Files', command: 'find /var -mtime -2 -type f -ls' },
        { name: 'Check for Persistence', command: 'crontab -l && ls -la /etc/cron*' },
        { name: 'Review Auth Logs', command: 'journalctl _SYSTEMD_UNIT=sshd.service | grep -i "accepted"' },
      ]
    },
    {
      title: 'Remediation',
      description: 'Fix vulnerabilities and remove any remaining threat actor presence.',
      tasks: [
        { id: 1, description: 'Patch exploited vulnerabilities' },
        { id: 2, description: 'Remove malware and backdoors' },
        { id: 3, description: 'Restore systems from clean backups' },
        { id: 4, description: 'Implement additional security controls' },
      ],
      commands: [
        { name: 'Update System', command: 'sudo apt update && sudo apt upgrade -y' },
        { name: 'Malware Scan', command: 'clamscan -r --remove=yes /var/www/' },
        { name: 'Restore from Backup', command: 'sudo rsync -avz --progress /backup/path /restore/path' },
      ]
    }
  ];

  const ransomwareSteps = [
    {
      title: 'Initial Detection & Isolation',
      description: 'Confirm ransomware infection and isolate affected systems to prevent spread.',
      tasks: [
        { id: 1, description: 'Identify infected systems showing encryption symptoms' },
        { id: 2, description: 'Disconnect affected systems from the network immediately' },
        { id: 3, description: 'Preserve ransom notes and encrypted file samples' },
      ],
      commands: [
        { name: 'Check File Extensions', command: 'find / -type f -name "*.encrypted" -o -name "*.locked" -o -name "*.crypt"' },
        { name: 'Network Disconnect', command: 'ifconfig eth0 down' },
        { name: 'Process Analysis', command: 'ps -aux | grep -i suspicious' },
      ]
    },
    {
      title: 'Impact Assessment',
      description: 'Determine the scope of the encryption and affected data.',
      tasks: [
        { id: 1, description: 'Catalog affected systems and encrypted data' },
        { id: 2, description: 'Identify ransomware variant if possible' },
        { id: 3, description: 'Assess backup integrity and availability' },
        { id: 4, description: 'Document business impact of affected systems' },
      ],
      commands: [
        { name: 'Count Encrypted Files', command: 'find /path -type f -name "*.encrypted" | wc -l' },
        { name: 'Check Ransom Notes', command: 'find / -type f -name "READ_ME.txt" -o -name "DECRYPT_INSTRUCTIONS.html"' },
        { name: 'Test Backup Access', command: 'sudo mount /dev/backup /mnt/backup && ls -la /mnt/backup' },
      ]
    },
    // Additional steps would continue here
  ];

  const phishingSteps = [
    {
      title: 'Initial Report Triage',
      description: 'Process phishing reports and confirm the threat.',
      tasks: [
        { id: 1, description: 'Review reported phishing emails and extract indicators' },
        { id: 2, description: 'Analyze suspicious URLs and attachments in sandbox' },
        { id: 3, description: 'Determine if any users have interacted with the phishing content' },
      ],
      commands: [
        { name: 'Extract Email Headers', command: 'cat email.eml | grep -i "^Received:\\|^From:\\|^Reply-To:\\|^Return-Path:"' },
        { name: 'URL Analysis', command: 'curl -I https://suspicious-domain.com' },
        { name: 'Check File Hash', command: 'sha256sum suspicious_attachment.pdf' },
      ]
    },
    {
      title: 'Containment & Blocking',
      description: 'Block the phishing campaign and prevent further exposure.',
      tasks: [
        { id: 1, description: 'Block malicious URLs in web proxies and firewalls' },
        { id: 2, description: 'Quarantine similar emails in mail system' },
        { id: 3, description: 'Report phishing sites to takedown services' },
        { id: 4, description: 'Block malicious sender domains in email gateway' },
      ],
      commands: [
        { name: 'Email Search & Quarantine', command: 'Search-Mailbox -Identity "All Users" -SearchQuery "subject:\'Urgent Action Required\'" -DeleteContent' },
        { name: 'Firewall Block', command: 'iptables -A OUTPUT -d malicious-ip -j DROP' },
        { name: 'DNS Sinkhole', command: 'echo "0.0.0.0 malicious-domain.com" >> /etc/hosts' },
      ]
    },
    // Additional steps would continue here
  ];

  // Select playbook based on incident type
  const activePlaybook = 
    incidentType === 'ransomware' ? ransomwareSteps :
    incidentType === 'phishing' ? phishingSteps :
    dataBreachSteps;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] overflow-auto border border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" /> 
              SecuriChat Incident Response Playbook
            </CardTitle>
            <CardDescription>
              Step-by-step procedures for cybersecurity incident handling
            </CardDescription>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="playbook" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="playbook" className="flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4" /> Playbook
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex gap-2 items-center">
                <Server className="h-4 w-4" /> Resources
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex gap-2 items-center">
                <Clock className="h-4 w-4" /> Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playbook" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border border-border/50 md:col-span-1">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Response Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="space-y-1 font-mono text-xs">
                      {activePlaybook.map((step, index) => (
                        <li 
                          key={index}
                          onClick={() => setActiveStep(index)}
                          className={`
                            p-2 cursor-pointer flex items-center
                            ${activeStep === index ? 'bg-primary/20 text-primary' : ''}
                            ${completedSteps.includes(index) ? 'text-primary/80' : 'text-muted-foreground'}
                            hover:bg-secondary/50
                          `}
                        >
                          {completedSteps.includes(index) ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <span className="h-4 w-4 flex items-center justify-center mr-2 rounded-full border border-current text-[10px]">
                              {index + 1}
                            </span>
                          )}
                          {step.title}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 md:col-span-3">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      {activePlaybook[activeStep].title}
                    </CardTitle>
                    <CardDescription>
                      {activePlaybook[activeStep].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                        Tasks to Complete
                      </h4>
                      <ul className="space-y-2">
                        {activePlaybook[activeStep].tasks.map(task => (
                          <li key={task.id} className="flex items-start gap-2 p-2 rounded hover:bg-secondary/30">
                            <input 
                              type="checkbox" 
                              id={`task-${task.id}`} 
                              className="mt-1"
                            />
                            <label htmlFor={`task-${task.id}`} className="text-sm">{task.description}</label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Terminal className="h-4 w-4 mr-2 text-primary" />
                        Recommended Commands
                      </h4>
                      <div className="space-y-2 font-mono text-xs">
                        {activePlaybook[activeStep].commands.map((cmd, i) => (
                          <div key={i} className="p-2 rounded bg-secondary/50 hover:bg-secondary">
                            <div className="text-muted-foreground mb-1"># {cmd.name}</div>
                            <div className="flex items-center justify-between">
                              <div className="text-primary-foreground">{cmd.command}</div>
                              <button className="text-primary hover:text-primary/80 text-xs" onClick={() => navigator.clipboard.writeText(cmd.command)}>
                                Copy
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button 
                        variant="outline" 
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Previous Step
                      </Button>
                      <div>
                        <Button 
                          onClick={() => markStepComplete(activeStep)} 
                          className="mr-2"
                        >
                          Mark as Complete
                        </Button>
                        <Button 
                          variant="default" 
                          disabled={activeStep === activePlaybook.length - 1}
                          onClick={() => setActiveStep(activeStep + 1)}
                        >
                          Next Step <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Server className="h-4 w-4 text-primary" />
                      Affected Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: 'DB-PROD-01', type: 'Database Server', ip: '10.0.1.15', status: 'Isolated' },
                        { name: 'WEB-PROD-02', type: 'Web Server', ip: '10.0.1.22', status: 'At Risk' },
                        { name: 'APP-PROD-03', type: 'Application Server', ip: '10.0.1.35', status: 'Compromised' },
                        { name: 'WKS-HR-104', type: 'Workstation', ip: '10.0.2.104', status: 'Isolated' },
                        { name: 'FW-EDGE-01', type: 'Firewall', ip: '10.0.0.1', status: 'Secure' },
                      ].map(system => (
                        <div key={system.name} className="flex items-center justify-between p-2 rounded hover:bg-secondary/50">
                          <div>
                            <div className="font-mono text-sm">{system.name}</div>
                            <div className="text-xs text-muted-foreground">{system.type} | {system.ip}</div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            system.status === 'Compromised' ? 'bg-red-500/20 text-red-500' :
                            system.status === 'At Risk' ? 'bg-yellow-500/20 text-yellow-500' :
                            system.status === 'Isolated' ? 'bg-orange-500/20 text-orange-500' :
                            'bg-green-500/20 text-green-500'
                          }`}>
                            {system.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Network className="h-4 w-4 text-primary" />
                      Incident Response Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: 'Jennifer Liu', role: 'Incident Commander', contact: '+1 555-1234', status: 'Active' },
                        { name: 'Michael Rodriguez', role: 'Forensic Analyst', contact: '+1 555-2345', status: 'On Call' },
                        { name: 'Sarah Johnson', role: 'Malware Analyst', contact: '+1 555-3456', status: 'Active' },
                        { name: 'David Kim', role: 'Network Security', contact: '+1 555-4567', status: 'Active' },
                        { name: 'Emma Thompson', role: 'Communications Lead', contact: '+1 555-5678', status: 'On Call' },
                      ].map(member => (
                        <div key={member.name} className="flex items-center justify-between p-2 rounded hover:bg-secondary/50">
                          <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                            <div className="text-xs font-mono">{member.contact}</div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            member.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {member.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-primary" />
                    Evidence Collection Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Memory Dumps', status: 'Completed', systems: 3, size: '12.4 GB' },
                        { name: 'Disk Images', status: 'In Progress', systems: 2, size: '450 GB' },
                        { name: 'Network Captures', status: 'Completed', systems: 5, size: '3.2 GB' },
                        { name: 'Log Collection', status: 'Completed', systems: 8, size: '5.7 GB' },
                        { name: 'Registry Hives', status: 'Pending', systems: 4, size: 'N/A' },
                        { name: 'Malware Samples', status: 'Completed', systems: 2, size: '450 MB' },
                      ].map(evidence => (
                        <Card key={evidence.name} className="border border-border/50">
                          <CardContent className="pt-6">
                            <div className="text-sm font-medium">{evidence.name}</div>
                            <div className="flex justify-between items-center mt-2">
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                evidence.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                                evidence.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                                'bg-yellow-500/20 text-yellow-500'
                              }`}>
                                {evidence.status}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {evidence.systems} systems | {evidence.size}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card className="border border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Incident Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    {[
                      { time: '2023-04-13 15:42:23', event: 'Initial detection: Antivirus alert on WKS-HR-104', category: 'Detection' },
                      { time: '2023-04-13 15:45:10', event: 'Security team notified of potential incident', category: 'Response' },
                      { time: '2023-04-13 15:52:37', event: 'WKS-HR-104 isolated from network', category: 'Containment' },
                      { time: '2023-04-13 16:05:18', event: 'Memory acquisition started on affected system', category: 'Evidence' },
                      { time: '2023-04-13 16:12:45', event: 'Malicious process identified: svchost32.exe', category: 'Analysis' },
                      { time: '2023-04-13 16:28:33', event: 'Lateral movement attempt detected to APP-PROD-03', category: 'Detection' },
                      { time: '2023-04-13 16:35:19', event: 'Additional systems isolated as precaution', category: 'Containment' },
                      { time: '2023-04-13 16:42:51', event: 'Command & control traffic identified to 203.0.113.45', category: 'Analysis' },
                      { time: '2023-04-13 17:05:22', event: 'Incident response team fully assembled', category: 'Response' },
                      { time: '2023-04-13 17:18:40', event: 'Log collection completed from all affected systems', category: 'Evidence' },
                      { time: '2023-04-13 17:36:15', event: 'Malware samples extracted and submitted for analysis', category: 'Analysis' },
                      { time: '2023-04-13 18:03:27', event: 'Initial findings report prepared for management', category: 'Response' },
                    ].map((item, i) => (
                      <div key={i} className="relative pl-7 pb-5 border-l-2 border-border last:border-0 last:pb-0">
                        <div className="absolute left-0 top-0 -ml-[7px] h-3 w-3 rounded-full bg-primary"></div>
                        <div className="text-xs font-mono text-muted-foreground">{item.time}</div>
                        <div className="text-sm mt-1">{item.event}</div>
                        <div className={`mt-1 inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          item.category === 'Detection' ? 'bg-blue-500/20 text-blue-500' :
                          item.category === 'Response' ? 'bg-primary/20 text-primary' :
                          item.category === 'Containment' ? 'bg-yellow-500/20 text-yellow-500' :
                          item.category === 'Evidence' ? 'bg-purple-500/20 text-purple-500' :
                          'bg-orange-500/20 text-orange-500'
                        }`}>
                          {item.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentPlaybook;
