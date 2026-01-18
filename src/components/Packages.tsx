"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Code,
  Zap,
  Shield,
  RotateCcw,
  Download,
  ExternalLink,
  Star,
  Users,
  GitBranch,
  Copy,
  Check,
  Play,
  Square,
} from "lucide-react";
import { useState } from "react";

// Type definitions
interface LogMetadata {
  [key: string]: string | number | boolean | object | null | undefined;
}

interface LogExample {
  type: string;
  color: string;
  bgColor: string;
  borderColor: string;
  time: string;
  message: string;
  traceId: string;
  functionName: string;
  metadata: LogMetadata;
}

// Lucide icon type definition
type LucideIcon = React.ComponentType<{
  className?: string;
  size?: number | string;
}>;

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

interface CodeExample {
  language: string;
  code: string;
}

export const NpmPackage = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleLogPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Colorful log examples with proper formatting
  const logExamples: LogExample[] = [
    {
      type: "INFO",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      time: "2025-10-29T01:05:15.123Z",
      message: "Server started on port 3000",
      traceId: "c01b8cd6-c0df-4632-a880-24597a8a74d5",
      functionName: "Server/start",
      metadata: {},
    },
    {
      type: "DEBUG",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      time: "2025-10-29T01:05:15.234Z",
      message: "User registering Process",
      traceId: "d1f63ce0-12a5-4486-938d-d8f39e8a5ee7",
      functionName: "AuthController/registerUser",
      metadata: { body: { email: "invalid-email" } },
    },
    {
      type: "INFO",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      time: "2025-10-29T01:05:15.567Z",
      message: "POST /auth/register",
      traceId: "d1f63ce0-12a5-4486-938d-d8f39e8a5ee7",
      functionName: "HTTP_REQUEST",
      metadata: {
        method: "POST",
        url: "/auth/register",
        status: 400,
        responseTime: "10ms",
        ip: "::1",
        queries: "{}",
        sendData: '"Invalid email"',
      },
    },
    {
      type: "ERROR",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
      time: "2025-10-29T01:05:16.789Z",
      message: "Database connection failed",
      traceId: "e2g74df1-23b6-5597-a991-e4h50b9b6ff8",
      functionName: "Database/connect",
      metadata: { error: "Connection timeout", retryCount: 3 },
    },
    {
      type: "WARN",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
      time: "2025-10-29T01:05:17.123Z",
      message: "High memory usage detected",
      traceId: "f3h85eg2-34c7-6608-baa2-f5i61c0c7gg9",
      functionName: "SystemMonitor/checkMemory",
      metadata: { memoryUsage: "85%", threshold: "80%" },
    },
  ];

  const features: Feature[] = [
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Lightweight and optimized for production Node.js applications",
    },
    {
      icon: Shield,
      title: "Circuit Breaker",
      description:
        "Automatic log disabling during system failures to prevent overload",
    },
    {
      icon: RotateCcw,
      title: "Smart Log Rotation",
      description: "Size-based file rotation to prevent disk space issues",
    },
    {
      icon: Code,
      title: "TypeScript Ready",
      description: "Built with TypeScript for full type safety and better DX",
    },
  ];

  const stats: Stat[] = [
    {
      icon: Download,
      label: "Weekly Downloads",
      value: "500+",
      color: "text-green-500",
    },
    {
      icon: Star,
      label: "NPM Rating",
      value: "4.8/5",
      color: "text-yellow-500",
    },
    {
      icon: GitBranch,
      label: "Version",
      value: "v1.2.0",
      color: "text-blue-500",
    },
    {
      icon: Users,
      label: "Active Users",
      value: "100+",
      color: "text-purple-500",
    },
  ];

  const codeExamples: CodeExample[] = [
    {
      language: "JavaScript",
      code: `const { Logger } = require('patal-log');
const logger = new Logger();

logger.info('Application started successfully');
logger.error('Database connection failed', { error: err });`,
    },
    {
      language: "TypeScript",
      code: `import { Logger, LogLevel } from 'patal-log';

const logger = new Logger({
  level: LogLevel.INFO,
  enableColors: true
});

logger.debug('Debug message');
logger.warn('Warning message', { context: 'auth' });`,
    },
    {
      language: "Express Middleware",
      code: `import { expressMiddleware } from 'patal-log';

app.use(expressMiddleware({
  trackPerformance: true,
  logRequestBody: false
}));

// All HTTP requests automatically tracked`,
    },
  ];

  const formatMetadata = (metadata: LogMetadata) => {
    return JSON.stringify(metadata, null, 2);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <section
      id="npm-package"
      className="py-16 sm:py-20 px-3 sm:px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"
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
        className="absolute bottom-10 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center"
          >
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Patal Log
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed"
          >
            A powerful, production-ready logging library for Node.js with
            structured logging, circuit breaker protection, and automatic log
            rotation.
          </motion.p>

          {/* Package Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <div className="relative">
              <code className="bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm sm:text-base font-mono border border-gray-700">
                npm install patal-log ..
              </code>
              <motion.button
                onClick={() => copyToClipboard("npm install patal-log", -1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-2 rounded-md transition-colors"
                title="Copy to clipboard"
              >
                {copiedIndex === -1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </motion.button>
            </div>

            <div className="flex gap-3">
              <motion.a
                href="https://www.npmjs.com/package/patal-log"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View on NPM
              </motion.a>

              <motion.a
                href="https://github.com/Arbazkhanark/trace-logger"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Code className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 border border-green-500/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div
                    className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/5 mb-2 sm:mb-3 ${stat.color}`}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-1 ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
              Key Features
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-green-500/20 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Log Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Live Log Preview
              </h3>
              <motion.button
                onClick={toggleLogPlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                {isPlaying ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isPlaying ? "Stop" : "Play"} Demo
              </motion.button>
            </div>

            <div className="space-y-3">
              {logExamples.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${log.bgColor} ${log.borderColor} font-mono text-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${log.color} bg-black/20`}
                    >
                      {log.type}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatTime(log.time)}
                    </span>
                    <span
                      className="text-purple-400 text-xs flex-1 truncate"
                      title={log.traceId}
                    >
                      {log.traceId}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-white">{log.message}</span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div>
                      <span className="text-cyan-400">Function: </span>
                      <span className="text-yellow-300">
                        {log.functionName}
                      </span>
                    </div>

                    {Object.keys(log.metadata).length > 0 && (
                      <div>
                        <span className="text-cyan-400">Metadata: </span>
                        <pre className="text-green-300 inline-block">
                          {formatMetadata(log.metadata)}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Log Legend */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-white font-semibold mb-3 text-sm">
                Log Level Colors:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span className="text-blue-400">INFO</span>
                  <span className="text-gray-400">- General information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-green-400">DEBUG</span>
                  <span className="text-gray-400">- Debug details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span className="text-yellow-400">WARN</span>
                  <span className="text-gray-400">- Warnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span className="text-red-400">ERROR</span>
                  <span className="text-gray-400">- Errors</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
            Quick Start
          </h3>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {codeExamples.map((example, index) => (
              <motion.div
                key={example.language}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400 ml-2">
                      {example.language}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(example.code, index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    title="Copy code"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <pre className="p-4 sm:p-6 text-xs sm:text-sm text-green-400 overflow-x-auto font-mono">
                  {example.code}
                </pre>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16"
        >
          <Card className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                    Why Patal Log?
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>
                        Zero configuration setup with sensible defaults
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Supports both CommonJS and ESM modules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>
                        Built-in Express.js middleware for HTTP tracking
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Colorful console output for better debugging</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                    Perfect For
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Production Node.js applications</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Microservices architecture</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>API servers and backend systems</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Applications requiring robust logging</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              Ready to enhance your logging?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start using Patal Log in your Node.js projects today and
              experience production-ready logging with zero hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.npmjs.com/package/patal-log"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                Install via NPM
              </motion.a>

              <motion.a
                href="https://github.com/Arbazkhanark/trace-logger"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-semibold"
              >
                <Code className="w-5 h-5" />
                View Documentation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
