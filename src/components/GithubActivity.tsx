'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitPullRequest, GitMerge, Star, Calendar, TrendingUp, RefreshCw, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// ---------------- Types ----------------
interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface CommitChart {
  month: string;
  commits: number;
}

interface ContributionYear {
  year: string;
  total: number;
  range: {
    start: string;
    end: string;
  };
}

interface ContributionDay {
  date: string;
  count: number;
  color: string;
  intensity: string;
}

interface GitHubContributions {
  years: ContributionYear[];
  contributions: ContributionDay[];
}

export const GitHubActivity = () => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [stats, setStats] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<GitHubContributions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const username = "Arbazkhanark";
  const repo = "Namaste-DSA";

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch commits
      const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=100`);
      if (!commitsResponse.ok) throw new Error('Failed to fetch commits');
      const commitsData = await commitsResponse.json();
      setCommits(commitsData);

      // Fetch user stats
      const statsResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!statsResponse.ok) throw new Error('Failed to fetch user stats');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch GitHub contributions from your API endpoint
      const contributionsResponse = await fetch(`/api/github-contributions?username=${username}`);
      if (!contributionsResponse.ok) throw new Error('Failed to fetch contributions');
      const contributionsData: GitHubContributions = await contributionsResponse.json();
      
      setContributions(contributionsData);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Filter contributions for selected year
  const getFilteredContributions = () => {
    if (!contributions) return [];
    
    const selectedYearData = contributions.years.find(year => year.year === selectedYear);
    if (!selectedYearData) return [];
    
    const startDate = new Date(selectedYearData.range.start);
    const endDate = new Date(selectedYearData.range.end);
    
    return contributions.contributions.filter(contribution => {
      const contributionDate = new Date(contribution.date);
      return contributionDate >= startDate && contributionDate <= endDate;
    });
  };

  // Filter commits for selected year
  const getFilteredCommits = () => {
    return commits.filter(commit => {
      const commitDate = new Date(commit.commit.author.date);
      return commitDate.getFullYear().toString() === selectedYear;
    });
  };

  // Get commit data for chart (monthly breakdown for selected year)
  const getCommitChartData = () => {
    const filteredCommits = getFilteredCommits();
    const monthlyData: { [key: string]: number } = {};
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize all months with 0
    monthNames.forEach(month => {
      monthlyData[month] = 0;
    });
    
    // Count commits per month
    filteredCommits.forEach(commit => {
      const commitDate = new Date(commit.commit.author.date);
      const month = monthNames[commitDate.getMonth()];
      monthlyData[month]++;
    });
    
    return monthNames.map(month => ({
      month,
      commits: monthlyData[month]
    }));
  };

  const statCards = [
    { icon: GitCommit, label: "Public Repos", value: stats?.public_repos ?? "-", color: "text-blue-500" },
    { icon: GitPullRequest, label: "Followers", value: stats?.followers ?? "-", color: "text-green-500" },
    { icon: GitMerge, label: "Following", value: stats?.following ?? "-", color: "text-yellow-500" },
    { icon: Star, label: "Public Gists", value: stats?.public_gists ?? "-", color: "text-purple-500" },
  ];

  // Function to render exact GitHub-like contribution grid
  const renderGitHubContributionGrid = () => {
    const filteredContributions = getFilteredContributions();
    if (!filteredContributions.length) {
      return (
        <div className="text-center text-muted-foreground py-8">
          No contribution data available for {selectedYear}
        </div>
      );
    }

    // Create weeks array (each week has 7 days) - Full year data
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < filteredContributions.length; i += 7) {
      weeks.push(filteredContributions.slice(i, i + 7));
    }

    // Get month labels with proper positioning
    const getMonthLabels = () => {
      const months: { month: string; weekIndex: number }[] = [];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let lastMonth = '';
      
      // Find the position for each month's first occurrence
      weeks.forEach((week, weekIndex) => {
        const firstDay = week[0];
        if (firstDay) {
          const date = new Date(firstDay.date);
          const currentMonth = monthNames[date.getMonth()];
          
          if (currentMonth !== lastMonth) {
            months.push({ 
              month: currentMonth, 
              weekIndex: weekIndex
            });
            lastMonth = currentMonth;
          }
        }
      });
      
      return months;
    };

    const monthLabels = getMonthLabels();

    // GitHub color scheme based on intensity
    const getGitHubColor = (intensity: string) => {
      const colors = {
        '0': '#ebedf0', // No contributions
        '1': '#9be9a8', // 1-9 contributions
        '2': '#40c463', // 10-19 contributions
        '3': '#30a14e', // 20-29 contributions
        '4': '#216e39'  // 30+ contributions
      };
      return colors[intensity as keyof typeof colors] || colors['0'];
    };

    // Day names for the left side
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Month labels - Proper spacing without overlap */}
        <div className="flex ml-6 mr-1 justify-start w-full overflow-hidden">
          {monthLabels.map(({ month, weekIndex }, index) => {
            // Calculate width based on number of weeks in this month
            const nextMonthIndex = index < monthLabels.length - 1 ? monthLabels[index + 1].weekIndex : weeks.length;
            const weeksInMonth = nextMonthIndex - weekIndex;
            const monthWidth = weeksInMonth * 14; // 14px per week (12px dot + 2px gap)
            
            return (
              <div
                key={`${month}-${weekIndex}`}
                className="text-xs text-muted-foreground text-center shrink-0"
                style={{ 
                  width: `${monthWidth}px`,
                  minWidth: `${monthWidth}px`
                }}
              >
                {month}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 w-full">
          {/* Day labels column */}
          <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-0.5 shrink-0">
            {dayNames.map((day, index) => (
              <div key={day} className="h-3 flex items-center justify-end pr-2">
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>

          {/* Contribution grid - Full width with exact month alignment */}
          <div className="flex gap-1 overflow-x-auto w-full pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                    className="w-3 h-3 rounded-sm cursor-pointer relative group border border-gray-200/30 dark:border-gray-600/30 hover:scale-110 transition-transform duration-200"
                    style={{ 
                      backgroundColor: getGitHubColor(day.intensity)
                    }}
                    title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
                  >
                    {/* Tooltip on hover with high z-index */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-xl border border-gray-700">
                        <div className="font-semibold">{day.count} contribution{day.count !== 1 ? 's' : ''}</div>
                        <div className="text-gray-300">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-4 justify-center">
          <span className="text-xs">Less</span>
          <div className="flex gap-[2px]">
            {[0, 1, 2, 3, 4].map((intensity) => (
              <div
                key={intensity}
                className="w-3 h-3 rounded-sm border border-gray-200/30 dark:border-gray-600/30"
                style={{
                  backgroundColor: getGitHubColor(intensity.toString())
                }}
              />
            ))}
          </div>
          <span className="text-xs">More</span>
        </div>
      </div>
    );
  };

  // Calculate total contributions for selected year
  const selectedYearContributions = contributions?.years.find(year => year.year === selectedYear)?.total || 0;
  const totalContributions = contributions?.years.reduce((sum, year) => sum + year.total, 0) || 0;

  return (
    <section id="github" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto max-w-7xl">
        {/* Header with retry button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">GitHub Activity</h2>
            <button
              onClick={fetchGitHubData}
              disabled={loading}
              className="p-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Real-time contributions and activity from my GitHub profile
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
              <GitCommit className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Arbaz Khan</p>
              <p className="text-xs text-muted-foreground">@{username}</p>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center text-sm max-w-2xl mx-auto"
          >
            {error}
            <button 
              onClick={fetchGitHubData}
              className="ml-2 underline hover:no-underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-md transition-all duration-200 border border-green-500/10 h-full">
                <CardContent className="p-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/5 mb-2 ${stat.color}`}
                  >
                    <stat.icon className="w-4 h-4" />
                  </motion.div>
                  <p className="text-xl font-bold mb-0.5">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Card className="relative z-10">
            <CardHeader className="pb-3">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-base">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Contribution Activity
                  
                  {/* Year Dropdown */}
                  <div className="relative ml-3">
                    <button
                      onClick={() => setShowYearDropdown(!showYearDropdown)}
                      className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {selectedYear}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    
                    {showYearDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
                        {contributions?.years.map((year) => (
                          <button
                            key={year.year}
                            onClick={() => {
                              setSelectedYear(year.year);
                              setShowYearDropdown(false);
                            }}
                            className={`w-full px-2 py-1 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              selectedYear === year.year 
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                                : ''
                            }`}
                          >
                            {year.year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedYearContributions} contributions in {selectedYear}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : contributions ? (
                <div className="relative z-20">
                  {renderGitHubContributionGrid()}
                  
                  {/* Yearly Breakdown */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold mb-4 text-center">Yearly Contributions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {contributions.years.map((year) => (
                        <motion.div 
                          key={year.year}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`text-center p-3 rounded-lg bg-gradient-to-br from-green-500/5 to-blue-500/5 border transition-colors cursor-pointer ${
                            selectedYear === year.year 
                              ? 'border-green-500/50 bg-green-500/10' 
                              : 'border-green-500/10 hover:border-green-500/30'
                          }`}
                          onClick={() => setSelectedYear(year.year)}
                        >
                          <div className={`text-lg font-bold ${
                            selectedYear === year.year ? 'text-green-600' : 'text-green-500'
                          }`}>
                            {year.total}
                          </div>
                          <div className="text-xs text-muted-foreground">{year.year}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            {new Date(year.range.start).toLocaleDateString('en-US', { month: 'short' })} - 
                            {new Date(year.range.end).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No contribution data available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Commits + Chart - Horizontal scroll container */}
        <div className="overflow-x-auto pb-4">
          <div className="grid lg:grid-cols-2 gap-4 min-w-[800px]">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="min-w-[400px]"
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-1.5 text-base">
                    <Calendar className="w-3.5 h-3.5 text-green-600" />
                    Commit Activity - {selectedYear}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={getCommitChartData()}>
                      <XAxis 
                        dataKey="month" 
                        fontSize={12}
                      />
                      <YAxis 
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))',
                          fontSize: '12px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="commits"
                        stroke="#16a34c"
                        strokeWidth={2}
                        dot={{ 
                          fill: "#16a34a", 
                          r: 4,
                          stroke: "hsl(var(--background))",
                          strokeWidth: 1
                        }}
                        activeDot={{ 
                          r: 5,
                          fill: "#16a34a",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 1
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Commits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="min-w-[400px]"
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-base">
                    <div className="flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-green-600" />
                      Recent Commits - {selectedYear}
                    </div>
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full sm:ml-2">
                      {getFilteredCommits().length} commits
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getFilteredCommits().slice(0, 10).map((commit, index) => (
                      <motion.div
                        key={commit.sha}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-all group"
                      >
                        <div className="p-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 shrink-0">
                          <GitCommit className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs truncate group-hover:text-green-600 transition-colors">
                            {commit.commit.message}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-600 rounded-full">
                              {commit.commit.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(commit.commit.author.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {getFilteredCommits().length === 0 && (
                      <div className="text-center text-muted-foreground py-4 text-sm">
                        No commits found for {selectedYear}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-6"
        >
          <Card className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20 max-w-4xl mx-auto">
            <CardContent className="p-4">
              <h3 className="text-base font-bold mb-1">Open Source Contributions</h3>
              <p className="text-muted-foreground text-xs mb-2">
                Building and contributing to open source projects
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">{stats?.public_repos || 0}</div>
                  <div className="text-muted-foreground">Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{stats?.followers || 0}</div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{totalContributions}</div>
                  <div className="text-muted-foreground">Total Contributions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">{selectedYearContributions}</div>
                  <div className="text-muted-foreground">{selectedYear} Contributions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};




















