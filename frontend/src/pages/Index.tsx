
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Terminal, Lock, Database, Server, ShieldAlert, ChevronRight, Globe, FileCode, Users } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Text typing effect
  useEffect(() => {
    const typingElements = document.querySelectorAll('.terminal-typing');
    typingElements.forEach((element) => {
      element.classList.add('animate-typing');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="w-full py-4 px-8 flex justify-between items-center border-b border-border bg-secondary/30">
        <div className="font-bold text-xl text-primary flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="font-mono">OSCTIP</span>
          <div className="text-xs bg-primary/10 px-2 py-0.5 rounded font-mono ml-2 text-primary">
            BETA
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
          >
            <Lock className="mr-2 h-4 w-4" />
            SECURE LOGIN
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="flex-1 flex flex-col md:flex-row items-center justify-center p-8 gap-12 max-w-7xl mx-auto terminal-scanline"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="md:w-1/2 space-y-6"
          variants={fadeIn}
        >
          <div className="inline-block bg-primary/10 px-3 py-1 rounded-md font-mono text-primary text-sm mb-2">
            v1.0.235 // CLASSIFIED
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono">
            Open Source <span className="text-primary">Cyber Threat</span> Intelligence Platform
          </h1>
          <p className="text-lg text-muted-foreground font-mono">
            Advanced threat detection and analysis for security professionals. Identify, track, and neutralize cyber threats with military-grade intelligence tools.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group font-mono"
              onClick={() => navigate('/auth')}
            >
              ACCESS PLATFORM
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://github.com/osctip/docs', '_blank')}
              className="font-mono"
            >
              VIEW DOCUMENTATION
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-green-400" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center">
              <Server className="h-4 w-4 mr-1 text-green-400" />
              <span>Self-Hostable</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-green-400" />
              <span>Open Source</span>
            </div>
          </div>
        </motion.div>

        {/* Terminal preview */}
        <motion.div 
          className="md:w-1/2 bg-card border border-border rounded-lg shadow-lg w-full max-w-md overflow-hidden matrix-bg"
          variants={fadeIn}
        >
          <div className="bg-secondary/80 px-4 py-2 border-b border-border flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs font-mono text-muted-foreground">
              terminal@osctip ~ /threat-analysis
            </div>
          </div>

          <div className="p-4 font-mono text-sm h-[320px] overflow-y-auto space-y-4 bg-black/80">
            <div>
              <span className="text-primary">$</span> <span className="text-muted-foreground">initialize_threat_scan --target=enterprise-network</span>
            </div>
            
            <div className="text-primary">
              [OSCTIP] Initializing threat scanning module v3.5.2...
            </div>
            
            <div className="text-green-400">
              [+] Connected to global threat intelligence database
            </div>
            
            <div className="text-green-400">
              [+] Loading threat signatures: 15,234 patterns
            </div>
            
            <div className="text-yellow-400">
              [!] DETECTION: Unusual connection attempts from IP 192.168.1.243
            </div>
            
            <div className="text-muted-foreground">
              Analyzing pattern...
            </div>
            
            <div className="text-destructive">
              [WARNING] Potential brute force attack detected
              <br />
              Signature: CVE-2023-6345
              <br />
              Confidence: 87%
            </div>
            
            <div>
              <span className="text-primary">$</span> <span className="text-muted-foreground">isolate_threat --source=192.168.1.243</span>
            </div>
            
            <div className="text-primary">
              [OSCTIP] Executing containment protocol...
            </div>
            
            <div className="text-green-400">
              [+] Source IP isolated from critical systems
              <br />
              [+] Forensic data collection in progress
              <br />
              [+] Threat mitigation successful
            </div>
            
            <div>
              <span className="text-primary">$</span> <span className="text-white terminal-cursor">_</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section 
        className="py-20 px-8 bg-secondary/10 border-y border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-mono">PLATFORM CAPABILITIES</h2>
            <p className="text-muted-foreground mt-2 font-mono">Advanced cybersecurity tools for modern threat landscapes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Real-Time Threat Detection</h3>
              <p className="text-muted-foreground">
                Continuously monitor network traffic and endpoints for indicators of compromise using advanced heuristics and AI.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Global Threat Intelligence</h3>
              <p className="text-muted-foreground">
                Access continuously updated threat feeds from around the world, integrated with MITRE ATT&CK framework.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Leverage machine learning algorithms to identify patterns, predict attack vectors, and recommend countermeasures.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>

            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Vulnerability Database</h3>
              <p className="text-muted-foreground">
                Comprehensive repository of CVEs, zero-days, and emerging threats with severity ratings and patch information.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Incident Response</h3>
              <p className="text-muted-foreground">
                Automate incident response workflows with playbooks, forensic tools, and real-time collaboration features.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Collaborative Defense</h3>
              <p className="text-muted-foreground">
                Share threat intelligence securely with partner organizations and contribute to the global security community.
              </p>
              <Button variant="link" className="mt-4 p-0 text-primary font-mono">
                Learn More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-primary/10 px-3 py-1 rounded-md font-mono text-primary text-sm mb-4">
            SECURITY CLEARANCE REQUIRED
          </div>
          <h2 className="text-3xl font-bold mb-4 font-mono">Ready to enhance your cyber defense capabilities?</h2>
          <p className="text-lg text-muted-foreground mb-8 font-mono">
            Join the network of security professionals using OSCTIP to defend against evolving threats.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
          >
            <Lock className="mr-2 h-5 w-5" />
            REQUEST ACCESS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-12 px-8 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-mono">
              <Shield className="h-5 w-5 text-primary" />
              <span>OSCTIP</span>
            </h3>
            <p className="text-muted-foreground font-mono">
              Open Source Cyber Threat Intelligence Platform. Developed by the security community, for the security community.
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-muted-foreground font-mono">© 2025 OSCTIP // All rights reserved</p>
            <p className="text-muted-foreground mt-2 font-mono">
              <a href="#" className="hover:text-primary underline">Security Policy</a>
              {' • '}
              <a href="#" className="hover:text-primary underline">Terms of Use</a>
              {' • '}
              <a href="#" className="hover:text-primary underline">GitHub</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
