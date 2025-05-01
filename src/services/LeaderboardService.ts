
export type LeaderboardEntry = {
  name: string;
  score: number;
  totalQuestions: number;
  quizId: string;
  quizTitle: string;
  date: string;
  percentage: number;
};

const LEADERBOARD_STORAGE_KEY = 'quizLeaderboard';

export const LeaderboardService = {
  saveScore: (entry: Omit<LeaderboardEntry, 'date' | 'percentage'>): void => {
    const leaderboard = LeaderboardService.getLeaderboard();
    
    const newEntry: LeaderboardEntry = {
      ...entry,
      date: new Date().toISOString(),
      percentage: Math.round((entry.score / entry.totalQuestions) * 100)
    };
    
    leaderboard.push(newEntry);
    
    // Save to localStorage
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(leaderboard));
  },
  
  getLeaderboard: (): LeaderboardEntry[] => {
    const leaderboardJson = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    return leaderboardJson ? JSON.parse(leaderboardJson) : [];
  },
  
  getTopScores: (quizId: string, limit: number = 5): LeaderboardEntry[] => {
    const leaderboard = LeaderboardService.getLeaderboard();
    
    return leaderboard
      .filter(entry => entry.quizId === quizId)
      .sort((a, b) => {
        // Sort by percentage first
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage;
        }
        // If percentages are equal, sort by date (most recent first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, limit);
  },
  
  clearLeaderboard: (): void => {
    localStorage.removeItem(LEADERBOARD_STORAGE_KEY);
  }
};
