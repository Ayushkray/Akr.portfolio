'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "ayushrai2818@gmail.com",
      href: "mailto:ayushrai2818@gmail.com",
      color: "text-blue-500 dark:text-blue-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8920148880",
      href: "tel:+918920148880",
      color: "text-green-500 dark:text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, India",
      href: "#",
      color: "text-red-500 dark:text-red-400"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Ayushkray",
      label: "GitHub",
      color: "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ayushkr-/",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements - GitHub जैसा */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-green-500/5 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center"
          >
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? Let&apos;s work together to build something amazing
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left Content - Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div 
            // variants={itemVariants}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Let&apos;s Connect</h3>
              <motion.p 
                className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                Send me a message and let&apos;s create something extraordinary together!
              </motion.p>
            </motion.div>

            {/* Contact Items */}
            <motion.div variants={containerVariants} className="space-y-4 sm:space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  // variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    x: 5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <motion.div
                    // animate={floatingAnimation}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                    <a 
                      href={item.href} 
                      className="text-foreground font-medium hover:text-blue-600 transition-colors text-sm sm:text-base"
                    >
                      {item.value}
                    </a>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-blue-600"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              // variants={itemVariants}
              className="pt-4 sm:pt-6"
            >
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Follow me on</p>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className={`rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 border-2 border-blue-500/20 ${social.color}`}
                      asChild
                    >
                      <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div 
            // variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Background Decoration */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-3 -right-3 -bottom-3 -left-3 sm:-top-4 sm:-right-4 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl blur-xl -z-10"
            />
            
            <motion.div
              whileHover={{ 
                y: -3,
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  opacity: [0.03, 0.08, 0.03]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -z-10"
              />
              
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block text-foreground">Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    className="rounded-lg sm:rounded-xl border-2 border-blue-500/20 focus:border-blue-500 transition-colors h-10 sm:h-12 bg-white/50 dark:bg-gray-800/50"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block text-foreground">Email</label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com" 
                    className="rounded-lg sm:rounded-xl border-2 border-blue-500/20 focus:border-blue-500 transition-colors h-10 sm:h-12 bg-white/50 dark:bg-gray-800/50"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block text-foreground">Message</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..." 
                    rows={4} 
                    className="rounded-lg sm:rounded-xl border-2 border-blue-500/20 focus:border-blue-500 transition-colors resize-none bg-white/50 dark:bg-gray-800/50 text-sm sm:text-base"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full rounded-lg sm:rounded-xl h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </motion.div>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
              
              {/* Success Message */}
              {!formData.name && !formData.email && !formData.message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-4 sm:mt-6"
                >
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    I typically respond within 24 hours
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};