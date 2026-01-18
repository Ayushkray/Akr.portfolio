'use client';

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight, Building2, Rocket } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: "Software Engineer",
    company: "Hoping Minds Technologies Pvt. Ltd.",
    location: "New Delhi, India",
    period: "Aug 2024 – Feb 2025",
    tags: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Docker"],
    achievements: [
      "Developed B2B products like E-RUPI, HRMS, and Vistaar from ground up",
      "Built REST APIs from scratch with 20% reduction in response time",
      "Created React frontends with lazy loading (30% faster page loads)",
      "Integrated Bank APIs with zero downtime deployments",
      "Implemented comprehensive testing and CI/CD pipelines"
    ],
    icon: Rocket,
    gradient: "from-green-500 to-blue-500",
    delay: 0.1
  },
  {
    title: "Software Engineer Intern",
    company: "Ansh Infotech",
    location: "New Delhi, India",
    period: "October 2022 – March 2023",
    tags: ["React", "Express", "MongoDB", "JavaScript", "CSS", "Git"],
    achievements: [
      "Built MuscleSharks e-commerce platform from scratch",
      "Developed real-time analytics dashboards for business intelligence",
      "Created secure REST APIs with authentication and authorization",
      "Implemented responsive designs and cross-browser compatibility",
      "Collaborated with design and product teams for feature development"
    ],
    icon: Building2,
    gradient: "from-green-500 to-blue-500",
    delay: 0.2
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-5 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-5 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Professional Experience</h2>
          <p className="text-sm text-muted-foreground">
            My journey through the world of software development and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-green-500 transform origin-top"
          />
          
          <div className="space-y-6 relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -3,
                  scale: 1.01,
                }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="absolute left-0 top-6 w-10 h-10 rounded-full bg-background border-2 border-green-500 flex items-center justify-center z-10 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`p-1.5 rounded-full bg-gradient-to-br ${exp.gradient} text-white`}
                  >
                    <exp.icon className="w-3 h-3" />
                  </motion.div>
                </motion.div>

                <div className="ml-16">
                  <div className="p-6 bg-white dark:bg-gray-900 border border-green-500/10 rounded-xl hover:border-green-500/30 transition-all duration-300 group-hover:shadow-md relative overflow-hidden">
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Left Column - Basic Info */}
                      <div className="space-y-3">
                        <motion.h3 
                          className="text-xl font-bold group-hover:text-green-600 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {exp.title}
                        </motion.h3>
                        
                        <div className="text-green-600 font-semibold">
                          {exp.company}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Details */}
                      <div className="md:col-span-2 space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + tagIndex * 0.05 }}
                            >
                              <Badge 
                                className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 group-hover:border-green-500/40 transition-colors"
                              >
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>

                        {/* Achievements */}
                        <div>
                          <motion.p 
                            className="font-semibold mb-3 text-sm flex items-center gap-1.5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                          >
                            <span>Key Achievements</span>
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <ArrowRight className="w-3 h-3" />
                            </motion.div>
                          </motion.p>
                          
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <motion.li 
                                key={achievementIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + achievementIndex * 0.1 }}
                                className="flex items-start gap-2 text-xs text-muted-foreground group/achievement"
                                whileHover={{ x: 2 }}
                              >
                                <motion.span 
                                  className="text-green-600 mt-0.5 flex-shrink-0"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  ✓
                                </motion.span>
                                <span className="group-hover/achievement:text-foreground transition-colors duration-300">
                                  {achievement}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mt-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all duration-300 group cursor-pointer"
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀
            </motion.span>
            <span className="text-xs text-muted-foreground group-hover:text-foreground">
              Ready for the next challenge
            </span>
            <motion.div
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};