// components/Navigation.tsx
'use client';

import Link from 'next/link';
import { Home, User, Briefcase, BookOpen, Mail, Terminal, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export const Navigation = () => {
  const [imgError, setImgError] = useState(false);
  const { theme, setTheme } = useTheme();
  const githubAvatar = "https://avatars.githubusercontent.com/u/79525841?v=4";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark": return <Moon className="w-4 h-4" />;
      case "light": return <Sun className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden ring-2 ring-primary/20 transition-all group-hover:ring-primary/40">
              {!imgError ? (
                <img
                  src={githubAvatar}
                  alt="Ayush Kumar Avatar"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                "AK"
              )}
            </div>
            <span className="text-lg font-bold hidden sm:block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Ayush Kumar
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#home">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#about">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#projects">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#blog">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="#contact">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </Button>
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="gap-2"
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()}
              <span className="hidden sm:inline capitalize">{theme}</span>
            </Button>

            <Button size="sm" asChild className="gap-2 ml-2">
              <Link href="/terminal">
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">Terminal</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};