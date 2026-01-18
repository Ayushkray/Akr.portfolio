'use client';

import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Core Java", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Node.js", level: 82 },
      { name: "Express", level: 78 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 65 },
      // { name: "RabbitMQ", level: 70 },
      { name: "Postman", level: 88 },
    ],
  },
];

// Animated Progress Bar Component
const AnimatedProgress = ({ value, className }: { value: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="h-full bg-green-600 rounded-full relative overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.div>
    </div>
  );
};

export const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20" ref={containerRef}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Skills & Technologies</h2>
          <p className="text-sm text-muted-foreground">
            Technologies I work with to build robust and scalable applications
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              className="space-y-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-lg font-bold mb-4 text-center group-hover:text-green-600 transition-colors">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + skillIndex * 0.05 }}
                    className="space-y-2 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium group-hover:text-green-600 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <AnimatedProgress value={skill.level} className="h-1.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-6"
        >
          <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-base font-bold mb-1">Continuous Learning</h3>
            <p className="text-muted-foreground text-xs mb-2">
              Always expanding my skill set with new technologies
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">4+</div>
                <div className="text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">15+</div>
                <div className="text-muted-foreground">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">80%</div>
                <div className="text-muted-foreground">Average</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};