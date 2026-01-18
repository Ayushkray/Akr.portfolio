"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "MuscleSharks Website",
    description:
      "E-commerce platform with comprehensive product catalog, order tracking, and seamless payment integration.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    featured: true,
    demoLink: "https://ms-server-six.vercel.app/",
    githubLink: "https://github.com/Ayushkray/MuscleSharks",
    emoji: "💪",
    image: "https://i.postimg.cc/vTRpPhZY/Screenshot-2025-10-26-at-5-06-40-PM.png",
    gradient: "from-green-500/20 to-blue-500/20",
    delay: 0.2,
  },
  {
    title: "Fashion Consultation Platform",
    description:
      "A platform where users can book fashion design consultations, video calls, and real meetings for personalized fashion guidance.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "React",
      "Booking System",
    ],
    featured: true,
    demoLink: "https://fashion-platform-nine.vercel.app/",
    githubLink: "https://github.com/Ayushkray/StyleConnect",
    emoji: "🎨",
    image: "https://i.postimg.cc/2STBdXS5/Screenshot-2025-10-26-at-4-51-56-PM.png",
    gradient: "from-purple-500/20 to-pink-500/20",
    delay: 0.3,
  },
  {
    title: "Republic News Portal",
    description:
      "Client project - News portal website with article management, categories, and modern UI design.",
    tags: ["Next.js", "JavaScript", "CSS", "Vercel", "News API"],
    featured: false,
    demoLink: "https://www.republicmirror.com/",
    githubLink: "https://github.com/Ayushkray/Republic-Mirror",
    emoji: "📰",
    image: "https://i.postimg.cc/PqxK1Dhb/Screenshot-2025-10-26-at-5-00-10-PM.png",
    gradient: "from-orange-500/20 to-red-500/20",
    delay: 0.5,
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProjectExpansion = (index: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const isExpanded = (index: number) => expandedProjects.has(index);

  return (
    <section
      id="projects"
      className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-5 w-24 h-24 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-5 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
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
          <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I&apos;ve used to
            bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -5,
              }}
              className="group relative"
            >
              <div 
                className="bg-white dark:bg-gray-900 border border-green-500/10 rounded-xl overflow-hidden hover:border-green-500/30 transition-all duration-300 group-hover:shadow-md relative h-full flex flex-col cursor-pointer"
                onClick={() => toggleProjectExpansion(index)}
              >
                <div className="relative overflow-hidden flex-grow-0">
                  {project.image ? (
                    <div className="aspect-video relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = `absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`;
                            fallback.innerHTML = `<div class="text-4xl opacity-70">${project.emoji}</div>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div
                          className="flex gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 backdrop-blur-sm text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Preview
                            </a>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-4xl opacity-70"
                      >
                        {project.emoji}
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div
                          className="flex gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 backdrop-blur-sm text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Preview
                            </a>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                <div className="p-4 space-y-3 relative flex-grow">
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge className="gap-1 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 text-xs">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐
                        </motion.div>
                        Featured
                      </Badge>
                    </motion.div>
                  )}

                  <h3 className="text-lg font-bold group-hover:text-green-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags Section */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, isExpanded(index) ? project.tags.length : 4).map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + tagIndex * 0.05 }}
                        >
                          <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 group-hover:border-green-500/40">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Show More/Less Button */}
                    {project.tags.length > 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 text-green-600 hover:text-green-700 hover:bg-green-500/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProjectExpansion(index);
                          }}
                        >
                          {isExpanded(index) ? (
                            <>
                              Show Less
                              <ChevronUp className="w-3 h-3 ml-1" />
                            </>
                          ) : (
                            <>
                              +{project.tags.length - 4} more
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs h-8"
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="gap-1 text-xs h-8 bg-green-600 hover:bg-green-700"
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
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
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-lg p-4 mb-4">
            <h3 className="text-base font-bold mb-1">
              Building Real Solutions
            </h3>
            <p className="text-muted-foreground text-xs mb-2">
              Creating practical applications that solve real-world problems
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">
                  {projects.filter((p) => p.featured).length}
                </div>
                <div className="text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">
                  {projects.reduce((acc, proj) => acc + proj.tags.length, 0)}
                </div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">100%</div>
                <div className="text-muted-foreground">Functional</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-500">
                  {projects.length}
                </div>
                <div className="text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-green-500/20 hover:border-green-500/40"
          >
            <span>View All Projects</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};