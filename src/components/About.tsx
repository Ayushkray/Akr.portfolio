'use client';

import { Target, Lightbulb, Rocket } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const aboutCards = [
  {
    icon: Target,
    title: "Mission",
    description: "Code is poetry written for machines but read by humans.",
    color: "from-green-500 to-blue-500",
    delay: 0.1
  },
  {
    icon: Lightbulb,
    title: "Approach", 
    description: "I believe in writing clean, maintainable code and creating user-centric experiences that solve real problems.",
    color: "from-green-500 to-blue-500",
    delay: 0.2
  },
  {
    icon: Rocket,
    title: "Goals",
    description: "Continuously learning and exploring new technologies while mentoring others and contributing to the developer community.",
    color: "from-green-500 to-blue-500",
    delay: 0.3
  }
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">About Me</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            I&apos;m all about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
              }}
              className="text-center space-y-4 p-6 rounded-xl bg-white dark:bg-gray-900 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/5 relative"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-2 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-md`}
                >
                  <card.icon className="w-5 h-5" />
                </motion.div>
              </motion.div>

              <motion.h3 
                className="text-lg font-bold group-hover:text-green-600 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
              >
                {card.title}
              </motion.h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Floating particles */}
              <motion.div
                className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500/40 rounded-full"
                animate={{
                  y: [0, -6, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-1 h-1 bg-blue-500/40 rounded-full"
                animate={{
                  y: [0, 5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.7,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Animated Elements */}
        <motion.div
          className="flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <motion.div
            className="flex gap-1.5"
            animate={{
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="w-1.5 h-1.5 bg-green-600 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </motion.div>
          <span className="text-xs text-muted-foreground">
            Always evolving, always learning
          </span>
        </motion.div>
      </div>
    </section>
  );
};