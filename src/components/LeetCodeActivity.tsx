'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Trophy, Target, Clock, Zap, TrendingUp, CheckCircle, XCircle, Code, Star, Award, Calendar, Users } from "lucide-react";
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ---------------- Types ----------------
interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  matchedUser?: {
    profile: {
      ranking: number;
      reputation: number;
      userAvatar: string;
    };
    submitStats: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
        submissions: number;
      }>;
    };
  };
}

// Colors for charts
const COLORS = ["#4ade80", "#facc15", "#f87171"];
const DIFFICULTY_COLORS = {
  Easy: "#4ade80",
  Medium: "#facc15", 
  Hard: "#f87171"
};

// Mock data for testing
const mockData: LeetCodeData = {
  totalSolved: 187,
  totalQuestions: 2800,
  easySolved: 95,
  mediumSolved: 80,
  hardSolved: 12,
  totalEasy: 700,
  totalMedium: 1500,
  totalHard: 600,
  ranking: 42356,
  contributionPoints: 245,
  reputation: 320,
  submissionCalendar: {},
  matchedUser: {
    profile: {
      ranking: 42356,
      reputation: 320,
      userAvatar: ""
    },
    submitStats: {
      acSubmissionNum: [
        { difficulty: "Easy", count: 95, submissions: 120 },
        { difficulty: "Medium", count: 80, submissions: 150 },
        { difficulty: "Hard", count: 12, submissions: 25 }
      ]
    }
  }
};

// Progress Bar Component
const ProgressBar = ({ solved, total, color, difficulty }: { solved: number; total: number; color: string; difficulty: string }) => {
  const percentage = (solved / total) * 100;
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium text-xs">{difficulty}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {solved} / {total}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-muted rounded-full" />
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full relative"
          style={{ 
            backgroundColor: color,
            width: `${percentage}%`,
            transformOrigin: 'left'
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
      
      <div className="text-right">
        <span className="text-xs text-muted-foreground">
          {Math.round(percentage)}% completed
        </span>
      </div>
    </div>
  );
};

export const LeetCodeActivity = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const username = "arbazkhanark23";

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Try multiple LeetCode API endpoints
    const apiEndpoints = [
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      `https://leetcodestats.cyclic.app/${username}`
    ];

    const fetchData = async () => {
      for (const endpoint of apiEndpoints) {
        try {
          console.log(`Trying API: ${endpoint}`);
          const response = await fetch(endpoint);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const apiData = await response.json();
          console.log("Success with API:", endpoint);
          console.log("API Data:", apiData);
          
          // Transform API data to our format
          const transformedData = transformApiData(apiData);
          setData(transformedData);
          setIsLoading(false);
          return;
          
        } catch (err) {
          console.warn(`Failed with ${endpoint}:`, err);
          continue;
        }
      }
      
      // If all APIs fail, use mock data
      console.log("All APIs failed, using mock data");
      setError("All API endpoints failed. Using demo data.");
      setData(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Transform different API responses to our format
  const transformApiData = (apiData: unknown): LeetCodeData => {
    // Helper to safely parse numbers from unknown values
    const getNumber = (value: unknown, fallback = 0): number => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) return Number(value);
      return fallback;
    };

    const asRecord = (data: unknown): Record<string, unknown> =>
      (typeof data === 'object' && data !== null) ? (data as Record<string, unknown>) : {};

    const obj = asRecord(apiData);

    const totalSolved = getNumber(obj['totalSolved'], mockData.totalSolved);
    const totalEasy = getNumber(obj['totalEasy'], mockData.totalEasy);
    const totalMedium = getNumber(obj['totalMedium'], mockData.totalMedium);
    const totalHard = getNumber(obj['totalHard'], mockData.totalHard);

    const easySolved = getNumber(obj['easySolved'], Math.min(totalEasy, totalSolved));
    const mediumSolved = getNumber(obj['mediumSolved'], Math.min(totalMedium, Math.max(0, totalSolved - easySolved)));
    const hardSolved = getNumber(obj['hardSolved'], Math.min(totalHard, Math.max(0, totalSolved - easySolved - mediumSolved)));

    const ranking = getNumber(obj['ranking'], mockData.ranking);
    const contributionPoints = getNumber(obj['contributionPoints'], getNumber(obj['contributionPoint'], mockData.contributionPoints));
    const reputation = getNumber(obj['reputation'], mockData.reputation);

    const submissionCalendar = (obj['submissionCalendar'] && typeof obj['submissionCalendar'] === 'object')
      ? (obj['submissionCalendar'] as Record<string, number>)
      : mockData.submissionCalendar;

    const matchedUser = (obj['matchedUser'] && typeof obj['matchedUser'] === 'object')
      ? (obj['matchedUser'] as LeetCodeData['matchedUser'])
      : undefined;

    const totalQuestions = getNumber(obj['totalQuestions'], (totalEasy + totalMedium + totalHard) || mockData.totalQuestions);

    return {
      totalSolved,
      totalQuestions,
      easySolved,
      mediumSolved,
      hardSolved,
      totalEasy,
      totalMedium,
      totalHard,
      ranking,
      contributionPoints,
      reputation,
      submissionCalendar,
      matchedUser
    };
  };

  // Use data or mockData as fallback
  const displayData = data || mockData;

  // Calculate acceptance rate safely
  const totalSubmissions = displayData.matchedUser?.submitStats?.acSubmissionNum?.reduce((sum, item) => sum + item.submissions, 0) || 250;
  const acceptanceRate = Math.round((displayData.totalSolved / totalSubmissions) * 100);

  // Stats Cards Data - FIXED
  const statsCards = [
    { 
      title: "Problems Solved", 
      value: displayData.totalSolved, 
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Total questions solved"
    },
    { 
      title: "Global Rank", 
      value: `#${displayData.ranking?.toLocaleString() || 'N/A'}`, 
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Among all LeetCode users"
    },
    { 
      title: "Acceptance Rate", 
      value: `${acceptanceRate}%`, 
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Success ratio"
    },
    { 
      title: "Reputation", 
      value: displayData.reputation || displayData.contributionPoints, 
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Community reputation"
    },
  ];

  const additionalStats = [
    {
      title: "Easy Solved",
      value: displayData.easySolved,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Easy problems"
    },
    {
      title: "Medium Solved",
      value: displayData.mediumSolved,
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Medium problems"
    },
    {
      title: "Hard Solved",
      value: displayData.hardSolved,
      icon: Award,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Hard problems"
    },
    {
      title: "Total Problems",
      value: displayData.totalEasy + displayData.totalMedium + displayData.totalHard,
      icon: Code,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Available problems"
    }
  ];

  const chartData = [
    { 
      name: "Easy", 
      value: displayData.easySolved, 
      total: displayData.totalEasy, 
      color: DIFFICULTY_COLORS.Easy 
    },
    { 
      name: "Medium", 
      value: displayData.mediumSolved, 
      total: displayData.totalMedium, 
      color: DIFFICULTY_COLORS.Medium 
    },
    { 
      name: "Hard", 
      value: displayData.hardSolved, 
      total: displayData.totalHard, 
      color: DIFFICULTY_COLORS.Hard 
    },
  ];

  // Mock data for weekly activity
  const weeklyActivity = [
    { day: 'Mon', problems: 4 },
    { day: 'Tue', problems: 6 },
    { day: 'Wed', problems: 3 },
    { day: 'Thu', problems: 7 },
    { day: 'Fri', problems: 5 },
    { day: 'Sat', problems: 8 },
    { day: 'Sun', problems: 2 },
  ];

  // Mock recent submissions
  const recentSubmissions = [
    {
      title: "Two Sum",
      titleSlug: "two-sum",
      timestamp: Math.floor(Date.now() / 1000) - 86400,
      statusDisplay: "Accepted",
      lang: "JavaScript"
    },
    {
      title: "Reverse Linked List",
      titleSlug: "reverse-linked-list",
      timestamp: Math.floor(Date.now() / 1000) - 172800,
      statusDisplay: "Accepted",
      lang: "TypeScript"
    },
    {
      title: "Binary Tree Inorder Traversal",
      titleSlug: "binary-tree-inorder-traversal",
      timestamp: Math.floor(Date.now() / 1000) - 259200,
      statusDisplay: "Accepted",
      lang: "Python"
    },
    {
      title: "Trapping Rain Water",
      titleSlug: "trapping-rain-water",
      timestamp: Math.floor(Date.now() / 1000) - 345600,
      statusDisplay: "Accepted",
      lang: "Java"
    }
  ];

  if (isLoading) {
    return (
      <section id="leetcode" className="py-12 px-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-lg text-muted-foreground">Loading LeetCode stats...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="leetcode" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"
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

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            LeetCode Activity
          </h2>
          <p className="text-muted-foreground text-sm mb-3">
            Real-time problem solving stats from my LeetCode profile
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Arbaz Khan</p>
              <p className="text-xs text-muted-foreground">@{username}</p>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-2 bg-yellow-100 border border-yellow-400 rounded-md text-yellow-700 text-xs max-w-md mx-auto"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </motion.div>

        {/* Key Statistics - FIXED GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -4,
                scale: 1.02,
              }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-green-500/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <motion.div
                    className={`inline-flex p-2 rounded-xl ${card.bgColor} ${card.color} mb-3`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon className="w-5 h-5" />
                  </motion.div>
                  <motion.p 
                    className="text-2xl font-bold mb-1 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                  >
                    {card.value}
                  </motion.p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Rest of your component remains the same... */}
        {/* Additional Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {additionalStats.map((card, index) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="hover:shadow-md transition-all duration-200 border border-green-500/10">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                      <card.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{card.value}</p>
                      <p className="text-xs text-muted-foreground">{card.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress by Difficulty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Card className="border-2 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Progress by Difficulty Level
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {chartData.map((difficulty, index) => (
                  <motion.div
                    key={difficulty.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProgressBar 
                      solved={difficulty.value}
                      total={difficulty.total}
                      color={difficulty.color}
                      difficulty={difficulty.name}
                    />
                  </motion.div>
                ))}
                
                {/* Overall Progress */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Overall Progress</span>
                    <span className="font-bold text-green-600 text-sm">
                      {displayData.totalSolved} / {displayData.totalEasy + displayData.totalMedium + displayData.totalHard} 
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round((displayData.totalSolved / (displayData.totalEasy + displayData.totalMedium + displayData.totalHard)) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      style={{ 
                        width: `${(displayData.totalSolved / (displayData.totalEasy + displayData.totalMedium + displayData.totalHard)) * 100}%`,
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Problems Solved by Difficulty - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PieChart className="w-5 h-5 text-green-600" />
                  Problems Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyActivity}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="problems" 
                      fill="#16a34a"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Card className="border-2 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-green-600" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentSubmissions.map((sub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group border border-transparent hover:border-green-500/20"
                  >
                    <div className={`p-2 rounded-full ${
                      sub.statusDisplay === "Accepted" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {sub.statusDisplay === "Accepted" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://leetcode.com/problems/${sub.titleSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sm truncate hover:text-green-600 transition-colors group-hover:underline"
                      >
                        {sub.title}
                      </a>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                          {sub.lang}
                        </span>
                        <span>{new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Continuous Growth Journey
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-2xl mx-auto">
                Every problem solved is a step forward in mastering Data Structures & Algorithms. 
                Consistency and practice are the keys to becoming a better problem solver.
              </p>
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{displayData.easySolved}</div>
                  <div className="text-muted-foreground text-xs">Easy Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{displayData.mediumSolved}</div>
                  <div className="text-muted-foreground text-xs">Medium Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{displayData.hardSolved}</div>
                  <div className="text-muted-foreground text-xs">Hard Solved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};