// components/Hero.tsx
'use client';

import { Mail, Download, Eye, MapPin, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { ParticleBackground } from "./ParticleBackground";

// JSON Syntax Highlighting Component
const JSONViewer = ({ data }: { data: string }) => {
  const highlightJSON = (jsonString: string) => {
    return jsonString
      .replace(/"([^"]+)":/g, '<span class="text-blue-400">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-yellow-400">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>')
      .replace(/(\[[^\]]*\])/g, '<span class="text-pink-400">$1</span>')
      .replace(/(\{|\})/g, '<span class="text-gray-300">$1</span>')
      .replace(/(\[|\])/g, '<span class="text-gray-300">$1</span>')
      .replace(/(,)/g, '<span class="text-gray-300">$1</span>');
  };

  return (
    <div className="text-foreground font-mono text-sm leading-relaxed">
      <pre 
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ 
          __html: highlightJSON(data) 
        }} 
      />
    </div>
  );
};

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Ayush.pdf';
    link.download = 'Ayush_Kumar_Resume.pdf';
    link.click();
  };

  const handleViewResume = () => {
    window.open('/Ayush.pdf', '_blank');
  };

  const jsonData = `{
  "name": "Ayush Kumar",
  "title": "Software Engineer | Full Stack Developer",
  "location": "New Delhi, India",
  "experience": "1+ years",
  "email": "ayushrai2818@gmail.com",
  "phone": "+918920148880",
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Express",
    "Redis"
  ],
  }`;
  // "currentRole": "Software Engineer at Earnest Data Analytics"
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden bg-background">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-foreground"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Hello, I&apos;m
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              Ayush Kumar
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold"
            >
              Software Engineer | Full Stack Developer
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Having 1+ years of experience as a Full-Stack Developer with expertise in designing, developing, testing, and deploying web-based applications.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="gap-2" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleViewResume}>
                <Eye className="w-5 h-5" />
                View Resume Online
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>23 October, 2001</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {/* <span>Software Engineer at Earnest Data Analytics</span> */}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>ayushrai2818@gmail.com</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <a 
                href="https://www.linkedin.com/in/ayushkr-/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/Ayushkray" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - JSON Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
              {/* Window Header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                  </div>
                  <span className="text-sm text-gray-300 font-medium">AyushKr.json</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                </div>
              </div>
              
              {/* JSON Content */}
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <JSONViewer data={jsonData} />
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span>JSON</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Ln 14, Col 1</span>
                  <span>Spaces: 2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Fixed Positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center bg-background/80 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};