'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Ayushkray",
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ayushkr-/",
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    {
      icon: Mail,
      href: "mailto:ayushrai2818@gmail.com",
      label: "Email",
      color: "hover:text-red-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const heartBeat = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
            {/* Brand Section */}
            <motion.div
            //   variants={itemVariants}
              className="text-center md:text-left"
            >
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ayush Kumar
              </motion.h3>
              <p className="text-sm text-muted-foreground">
                Full Stack Developer & Software Engineer
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
            //   variants={itemVariants}
              className="flex justify-center gap-6"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  whileHover={{ 
                    scale: 1.2,
                    y: -5
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-all duration-300 p-3 rounded-2xl bg-card border border-border hover:shadow-lg ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll to Top */}
            <motion.div
            //   variants={itemVariants}
              className="text-center md:text-right"
            >
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Back to Top
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            // variants={itemVariants}
            className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8"
          />

          {/* Bottom Section */}
          <motion.div
            // variants={itemVariants}
            className="text-center"
          >
            {/* Built with love */}
            <motion.p 
              className="text-muted-foreground text-sm mb-4 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Built with 
              <motion.span
                // animate={heartBeat}
                className="text-red-500"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.span>
              using
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-6"
              variants={containerVariants}
            >
              {['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].map((tech, index) => (
                <motion.span
                  key={tech}
                //   variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    color: 'hsl(var(--primary))'
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-card border border-border text-muted-foreground cursor-default transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.p
            //   variants={itemVariants}
              className="text-muted-foreground text-sm"
            >
              © {currentYear} Ayush Kumar. All rights reserved.
            </motion.p>

            {/* Quick Links */}
            <motion.div
            //   variants={itemVariants}
              className="flex justify-center gap-6 mt-4"
            >
              {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-4 left-10 w-2 h-2 bg-primary rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-8 right-20 w-1 h-1 bg-purple-500 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-6 left-1/4 w-1 h-1 bg-blue-500 rounded-full"
      />
    </footer>
  );
};