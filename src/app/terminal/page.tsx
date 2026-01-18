'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const commands = {
  help: `Available commands:
  - about    : Learn more about me
  - skills   : View my technical skills
  - projects : See my featured projects
  - experience: View my work experience
  - contact  : Get my contact information
  - theme    : Change theme (light/dark/system)
  - clear    : Clear the terminal
  - exit     : Return to main site`,
  
  about: `Ayush kumar - Software Engineer & Full Stack Developer

With 1+ years of experience building scalable applications,
I specialize in fullstack development, system design, and
seamless API integrations. I focus on performance,
maintainability, and solving real-world problems through code.

Location: New Delhi, India`,

  skills: `Technical Skills:

Languages: JavaScript, TypeScript, Core Java, HTML/CSS
Frameworks & Libraries: React, Next.js, Node.js, Express
Databases: MongoDB, PostgreSQL, Redis
Tools & Technologies: Git, Docker, RabbitMQ, Postman
Computer Science: Data Structures, Algorithms, OOP, REST APIs`,

  projects: `Featured Projects:

1. Anime Merch E-Commerce Platform
   Full-stack e-commerce for anime merchandise sales
   Tech: Next.js, Node.js, MongoDB, Vercel

2. MuscleSharks Website
   E-commerce platform with comprehensive features
   Tech: React, Node.js, Express, MongoDB`,

  experience: `Work Experience:

1. Software Engineer - Hoping Minds Technologies Pvt. Ltd. (Aug 2024 – Feb 2025)
   - Developed B2B products like E-RUPI, HRMS, and Vistaar
   - Built REST APIs with 20% reduction in response time
   - Created React frontends with lazy loading

2. Software Engineer Intern - Ansh Infotech (Oct 2022 – Mar 2023)
   - Built MuscleSharks e-commerce platform from scratch
   - Developed real-time analytics dashboards
   - Created secure REST APIs`,

  contact: `Contact Information:

Email: ayushrai2818@gmail.com
Phone: +91 8920148880
GitHub: github.com/Ayushkray
LinkedIn: https://www.linkedin.com/in/ayushkr-/
Location: New Delhi, India`,

  theme: `Theme Commands:
  - theme light : Switch to light mode
  - theme dark  : Switch to dark mode
  - theme system: Use system preference
  Current theme: `
};

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const welcomeMessage = `Ayush kumar — PORTFOLIO v2.0
Software Engineer | Full Stack Developer

Welcome to my interactive terminal!
Type &apos;help&apos; to see available commands or &apos;about&apos; to learn more about me.`;
    setHistory([welcomeMessage]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to command history for navigation
    if (trimmedCmd !== "clear" && trimmedCmd !== "exit") {
      setCommandHistory(prev => [...prev, cmd]);
    }

    setHistory((prev) => [...prev, `$ ${cmd}`]);

    if (trimmedCmd === "clear") {
      setHistory([]);
      setCurrentCommand("");
      return;
    }

    if (trimmedCmd === "exit") {
      window.location.href = "/";
      return;
    }

    if (trimmedCmd.startsWith("theme ")) {
      const themeArg = trimmedCmd.split(" ")[1];
      if (themeArg === "light" || themeArg === "dark" || themeArg === "system") {
        setTheme(themeArg);
        setHistory((prev) => [...prev, `Theme set to ${themeArg}`]);
      } else {
        setHistory((prev) => [...prev, `Invalid theme: ${themeArg}. Use light/dark/system`]);
      }
      return;
    }

    if (trimmedCmd in commands) {
      let response = commands[trimmedCmd as keyof typeof commands];
      if (trimmedCmd === "theme") {
        response += theme;
      }
      setHistory((prev) => [...prev, response]);
    } else {
      setHistory((prev) => [...prev, `Command not found: ${cmd}\nType &apos;help&apos; for available commands.`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(currentCommand);
    setCurrentCommand("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic autocomplete
      const matchingCommand = Object.keys(commands).find(command => 
        command.startsWith(currentCommand.toLowerCase())
      );
      if (matchingCommand) {
        setCurrentCommand(matchingCommand);
      }
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark": return <Moon className="w-4 h-4" />;
      case "light": return <Sun className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-mono transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between border-2 border-primary p-2 rounded">
          <span className="text-sm">ayushkr.vercel.app/terminal</span>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-foreground hover:bg-primary/10"
            >
              {getThemeIcon()}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              asChild
              className="text-foreground hover:text-destructive hover:bg-transparent"
            >
              <Link href="/">
                <X className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div 
          ref={terminalRef}
          className="border-2 border-primary rounded p-4 h-[70vh] overflow-y-auto mb-4 bg-card/50 backdrop-blur-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap mb-2 leading-relaxed">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-foreground caret-primary placeholder-muted-foreground"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Use ↑↓ for command history • Tab for autocomplete • Type &apos;help&apos; for commands
        </div>
      </div>
    </div>
  );
}