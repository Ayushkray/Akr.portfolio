'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: "AI Is Your Coding Partner, Not a Competitor",
    excerpt: "How embracing AI tools can make you a faster, smarter, and more creative developer",
    date: "6/20/2025",
    readTime: "4 min read",
    tags: ["AI", "Tech"],
  },
  {
    title: "Building Scalable React Applications: Lessons from...",
    excerpt: "After working on multiple large-scale React applications, I&apos;ve learned valuable lessons about architecture,…",
    date: "1/15/2024",
    readTime: "8 min read",
    tags: ["React", "Architecture", "Performance"],
  },
  {
    title: "The Future of Web3 Development: What to Expect in 2025",
    excerpt: "Exploring emerging web3 trends, new frameworks, and technologies that will shape web3 development in the comin…",
    date: "1/10/2024",
    readTime: "6 min read",
    tags: ["Web3 Dev", "Blockchain", "Ethereum"],
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Latest Blog Posts</h2>
          <p className="text-sm text-muted-foreground">
            Thoughts on web development, programming best practices, and lessons learned
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 border border-green-500/10 rounded-lg overflow-hidden hover:border-green-500/30 transition-all group hover:shadow-md"
            >
              <div className="aspect-video bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center">
                <div className="text-4xl opacity-60">
                  {index === 0 ? "🤖" : index === 1 ? "⚛️" : "⛓️"}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700 text-sm">
                  Read more →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            View All Posts →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};