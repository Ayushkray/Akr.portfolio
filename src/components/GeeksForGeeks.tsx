'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Trophy, Target, Clock, Zap, TrendingUp, CheckCircle, XCircle, Code, Star, Award, Calendar, BookOpen, Users, Lightbulb, School, User } from "lucide-react";
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ---------------- Types ----------------
interface GFGProblem {
  difficulty: string;
  count: number;
  solved: number;
}

interface GFGSubmission {
  problem: string;
  date: string;
  result: string;
  language: string;
  problemUrl: string;
}

interface GFGData {
  username: string;
  institute: string;
  languages: string[];
  overallCodingScore: number;
  totalProblemsSolved: number;
  monthlyCodingScore: number;
  schoolRank: number;
  problems: GFGProblem[];
  recentSubmissions: GFGSubmission[];
  streak: number;
  coursesCompleted: number;
  articlesPublished: number;
  fullName: string;
  profilePicture: string;
  maxStreak: number;
  solvedStats?: {
    basic: { count: number; questions: Array<{ question: string; questionUrl: string }> };
    easy: { count: number; questions: Array<{ question: string; questionUrl: string }> };
    medium: { count: number; questions: Array<{ question: string; questionUrl: string }> };
    hard: { count: number; questions: Array<{ question: string; questionUrl: string }> };
  };
}

interface GFGAPIResponse {
  info: {
    userName: string;
    fullName: string;
    profilePicture: string;
    institute: string;
    instituteRank: number;
    currentStreak: number;
    maxStreak: number;
    codingScore: number;
    monthlyScore: number;
    totalProblemsSolved: number;
  };
  solvedStats: {
    basic: {
      count: number;
      questions: Array<{
        question: string;
        questionUrl: string;
      }>;
    };
    easy: {
      count: number;
      questions: Array<{
        question: string;
        questionUrl: string;
      }>;
    };
    medium: {
      count: number;
      questions: Array<{
        question: string;
        questionUrl: string;
      }>;
    };
    hard: {
      count: number;
      questions: Array<{
        question: string;
        questionUrl: string;
      }>;
    };
  };
}

// Colors for charts
const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa"];
const DIFFICULTY_COLORS = {
  Basic: "#60a5fa",
  Easy: "#4ade80",
  Medium: "#facc15", 
  Hard: "#f87171"
};

// Progress Bar Component
const ProgressBar = ({ solved, total, color, difficulty }: { solved: number; total: number; color: string; difficulty: string }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  
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

export const GFGActivity = () => {
  const [data, setData] = useState<GFGData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const username = "arbaazkhanark23";

  useEffect(() => {
    const fetchGFGData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try direct API first
        const targetUrl = `https://geeks-for-geeks-api.vercel.app/${username}`;
        
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GFG data: ${response.status} ${response.statusText}`);
        }
        
        const apiData: GFGAPIResponse = await response.json();
        console.log("GFG API Data:", apiData);
        
        const transformedData: GFGData = {
          username: apiData.info.userName,
          fullName: apiData.info.fullName,
          profilePicture: apiData.info.profilePicture,
          institute: apiData.info.institute,
          languages: ["C++", "Java", "Python", "C", "JavaScript"],
          overallCodingScore: apiData.info.codingScore,
          totalProblemsSolved: apiData.info.totalProblemsSolved,
          monthlyCodingScore: apiData.info.monthlyScore,
          schoolRank: apiData.info.instituteRank,
          streak: apiData.info.currentStreak,
          maxStreak: apiData.info.maxStreak,
          coursesCompleted: 0,
          articlesPublished: 0,
          solvedStats: apiData.solvedStats,
          problems: [
            { 
              difficulty: "Basic", 
              count: Math.max(apiData.solvedStats.basic.count + 50, apiData.solvedStats.basic.count),
              solved: apiData.solvedStats.basic.count 
            },
            { 
              difficulty: "Easy", 
              count: Math.max(apiData.solvedStats.easy.count + 100, apiData.solvedStats.easy.count),
              solved: apiData.solvedStats.easy.count 
            },
            { 
              difficulty: "Medium", 
              count: Math.max(apiData.solvedStats.medium.count + 150, apiData.solvedStats.medium.count),
              solved: apiData.solvedStats.medium.count 
            },
            { 
              difficulty: "Hard", 
              count: Math.max(apiData.solvedStats.hard.count + 50, apiData.solvedStats.hard.count),
              solved: apiData.solvedStats.hard.count 
            }
          ],
          recentSubmissions: [
            ...(apiData.solvedStats.basic.questions?.slice(0, 2) || []).map(q => ({
              problem: q.question,
              date: new Date().toISOString().split('T')[0],
              result: "Solved",
              language: "C++",
              problemUrl: q.questionUrl
            })),
            ...(apiData.solvedStats.easy.questions?.slice(0, 2) || []).map(q => ({
              problem: q.question,
              date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
              result: "Solved",
              language: "Python",
              problemUrl: q.questionUrl
            })),
            ...(apiData.solvedStats.medium.questions?.slice(0, 1) || []).map(q => ({
              problem: q.question,
              date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
              result: "Solved",
              language: "Java",
              problemUrl: q.questionUrl
            })),
            ...(apiData.solvedStats.hard.questions?.slice(0, 1) || []).map(q => ({
              problem: q.question,
              date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
              result: "Solved",
              language: "C++",
              problemUrl: q.questionUrl
            }))
          ].slice(0, 5)
        };

        setData(transformedData);
      } catch (err) {
        console.error('Error fetching GFG data:', err);
        setError(`Failed to load GeeksforGeeks data: ${err instanceof Error ? err.message : 'Unknown error'}. Showing sample data.`);
        
        // Use comprehensive sample data
        const sampleData: GFGData = {
          username: username,
          fullName: "Ayush Kumar",
          profilePicture: "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg",
          institute: "Amity University Noida",
          languages: ["C++", "Java", "Python", "C", "JavaScript"],
          overallCodingScore: 368,
          totalProblemsSolved: 138,
          monthlyCodingScore: 4,
          schoolRank: 107,
          streak: 1,
          maxStreak: 1544,
          coursesCompleted: 0,
          articlesPublished: 0,
          problems: [
            { difficulty: "Basic", count: 68, solved: 18 },
            { difficulty: "Easy", count: 151, solved: 51 },
            { difficulty: "Medium", count: 209, solved: 59 },
            { difficulty: "Hard", count: 60, solved: 10 }
          ],
          recentSubmissions: [
            {
              problem: "Print Linked List Elements",
              date: new Date().toISOString().split('T')[0],
              result: "Solved",
              language: "C++",
              problemUrl: "https://practice.geeksforgeeks.org/problems/print-linked-list-elements"
            },
            {
              problem: "Queue using Linked List",
              date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
              result: "Solved",
              language: "Python",
              problemUrl: "https://practice.geeksforgeeks.org/problems/implement-queue-using-linked-list"
            },
            {
              problem: "Preorder Traversal",
              date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
              result: "Solved",
              language: "Java",
              problemUrl: "https://practice.geeksforgeeks.org/problems/preorder-traversal"
            },
            {
              problem: "Binary Search",
              date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
              result: "Solved",
              language: "C++",
              problemUrl: "https://practice.geeksforgeeks.org/problems/binary-search"
            }
          ]
        };
        setData(sampleData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGFGData();
  }, [username]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <section id="geeksforgeeks" className="py-12 px-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-lg text-muted-foreground">Loading GeeksforGeeks stats...</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="geeksforgeeks" className="py-12 px-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-3">
            Failed to load GeeksforGeeks data
          </p>
        </div>
      </section>
    );
  }

  // Chart data for pie chart
  const chartData = data.problems.map(problem => ({
    name: problem.difficulty,
    value: problem.solved,
    total: problem.count,
    color: DIFFICULTY_COLORS[problem.difficulty as keyof typeof DIFFICULTY_COLORS]
  }));

  // Main Stats Cards Data
  const statsCards = [
    { 
      title: "Problems Solved", 
      value: data.totalProblemsSolved, 
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Total questions solved"
    },
    { 
      title: "Coding Score", 
      value: data.overallCodingScore, 
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Overall performance score"
    },
    { 
      title: "Institute Rank", 
      value: data.schoolRank > 0 ? `#${data.schoolRank}` : 'N/A', 
      icon: School,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Rank in your institute"
    },
    { 
      title: "Current Streak", 
      value: `${data.streak} day${data.streak !== 1 ? 's' : ''}`, 
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Consistent coding days"
    },
  ];

  // Additional Stats - FIXED VALUES
  const additionalStats = [
    {
      title: "Max Streak",
      value: data.maxStreak,
      subtitle: "days",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Longest coding streak"
    },
    {
      title: "Monthly Score",
      value: data.monthlyCodingScore,
      subtitle: "points",
      icon: Calendar,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "This month's progress"
    },
    {
      title: "Languages",
      value: data.languages.length,
      subtitle: "languages",
      icon: Code,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      description: "Programming languages used"
    },
    {
      title: "Institute",
      value: data.institute.split(' ')[0],
      subtitle: data.institute.split(' ').slice(1).join(' '),
      icon: User,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      description: "Educational institution"
    }
  ];

  const totalProblems = data.problems.reduce((acc, curr) => acc + curr.count, 0);
  const totalSolved = data.problems.reduce((acc, curr) => acc + curr.solved, 0);
  const overallPercentage = totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0;

  const weeklyActivity = [
    { day: 'Mon', problems: Math.max(2, Math.floor(data.streak / 2)) },
    { day: 'Tue', problems: Math.max(3, Math.floor(data.streak / 1.5)) },
    { day: 'Wed', problems: Math.max(4, Math.floor(data.streak / 1.2)) },
    { day: 'Thu', problems: Math.max(3, Math.floor(data.streak / 1.5)) },
    { day: 'Fri', problems: Math.max(5, Math.floor(data.streak / 1.1)) },
    { day: 'Sat', problems: Math.max(6, data.streak) },
    { day: 'Sun', problems: Math.max(2, Math.floor(data.streak / 2)) },
  ];

  return (
    <section id="geeksforgeeks" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
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
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-700 text-sm"
          >
            <strong className="font-bold">Note: </strong>
            {error}
          </motion.div>
        )}

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            GeeksforGeeks Activity
          </h2>
          <p className="text-muted-foreground text-sm mb-3">
            Real-time coding statistics from my GFG profile
          </p>
          <div className="flex items-center justify-center gap-2">
            <img 
              src={data.profilePicture} 
              alt={data.fullName}
              className="w-10 h-10 rounded-full border-2 border-green-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg";
              }}
            />
            <div className="text-left">
              <p className="font-semibold text-sm">{data.fullName}</p>
              <p className="text-xs text-muted-foreground">@{data.username}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
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
        </motion.div>

        {/* Additional Stats - FIXED LAYOUT */}
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
              <Card className="hover:shadow-md transition-all duration-200 border border-green-500/10 h-full">
                <CardContent className="p-3 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                      <card.icon className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {card.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{card.title}</p>
                    </div>
                  </div>
                  {card.subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                      {card.subtitle}
                    </p>
                  )}
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
                      {totalSolved} / {totalProblems} 
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round(overallPercentage)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"
                      style={{ 
                        width: `${overallPercentage}%`,
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
                  Weekly Coding Activity
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
                {data.recentSubmissions.slice(0, 4).map((sub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group border border-transparent hover:border-green-500/20"
                  >
                    <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <a
                        href={sub.problemUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sm truncate hover:text-green-600 transition-colors group-hover:underline"
                      >
                        {sub.problem}
                      </a>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                          {sub.language}
                        </span>
                        <span>{sub.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Languages & Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card className="border-2 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="w-5 h-5 text-green-600" />
                Programming Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((language, index) => (
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full font-medium text-sm border border-green-500/20"
                  >
                    {language}
                  </motion.span>
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
                Continuous Learning Journey
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-2xl mx-auto">
                Every problem solved is a step forward in mastering Data Structures & Algorithms. 
                Consistency and practice are the keys to becoming a better problem solver.
              </p>
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{data.problems.find(p => p.difficulty === 'Basic')?.solved || 0}</div>
                  <div className="text-muted-foreground text-xs">Basic</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{data.problems.find(p => p.difficulty === 'Easy')?.solved || 0}</div>
                  <div className="text-muted-foreground text-xs">Easy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{data.problems.find(p => p.difficulty === 'Medium')?.solved || 0}</div>
                  <div className="text-muted-foreground text-xs">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{data.problems.find(p => p.difficulty === 'Hard')?.solved || 0}</div>
                  <div className="text-muted-foreground text-xs">Hard</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};