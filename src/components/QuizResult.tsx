import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Repeat, Share2, FileText, Trophy, ArrowRight, Sun, Moon } from "lucide-react";
import { toast } from '@/components/ui/sonner';
import { useQuiz } from '@/context/QuizContext';
import { LeaderboardService, LeaderboardEntry } from '@/services/LeaderboardService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type QuizResultProps = {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToQuizzes: () => void;
  quizTitle: string;
  timeTaken: number;
};

const QuizResult: React.FC<QuizResultProps> = ({ 
  score, 
  totalQuestions, 
  onRestart,
  onBackToQuizzes,
  quizTitle,
  timeTaken
}) => {
  const { playerName, currentQuiz, wrongTopics, darkMode, toggleDarkMode } = useQuiz();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const percentage = Math.round((score / totalQuestions) * 100);
  const uniqueWrongTopics = [...new Set(wrongTopics)];
  
  useEffect(() => {
    if (currentQuiz) {
      // Save score to leaderboard
      LeaderboardService.saveScore({
        name: playerName,
        score,
        totalQuestions,
        quizId: currentQuiz.id,
        quizTitle: quizTitle,
      });
      
      // Get updated leaderboard
      const topScores = LeaderboardService.getTopScores(currentQuiz.id, 5);
      setLeaderboard(topScores);
    }
  }, [currentQuiz, score, totalQuestions, quizTitle, playerName]);
  
  const getFeedbackMessage = () => {
    if (percentage === 100) {
      return "Perfect! You've mastered this topic. Excellent work! 🎉";
    }
    
    if (percentage >= 90) {
      return `Excellent! You've mastered most of this topic. Keep up the great work! ${
        uniqueWrongTopics.length > 0 ? `You might want to review ${uniqueWrongTopics.join(', ')}.` : ''
      }`;
    }
    
    if (percentage >= 70) {
      return `Great job! You have a solid understanding. ${
        uniqueWrongTopics.length > 0 ? `Focus a bit more on ${uniqueWrongTopics.join(', ')} to improve further.` : ''
      }`;
    }
    
    if (percentage >= 50) {
      return `Good effort! Keep practicing to improve. ${
        uniqueWrongTopics.length > 0 ? `We recommend reviewing ${uniqueWrongTopics.join(', ')}.` : ''
      }`;
    }
    
    return `Keep going! With more study, you'll improve. ${
      uniqueWrongTopics.length > 0 ? `Start by focusing on ${uniqueWrongTopics.join(', ')}.` : ''
    }`;
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getResultEmoji = () => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "😊";
    if (percentage >= 40) return "🤔";
    return "😌";
  };

  const handleShare = () => {
    // Use the production URL so share links always point to the live site
    const currentUrl = 'https://404iqfound.vercel.app';
    let message: string;
    // Low scores (<=40%)
    if (score <= Math.floor(totalQuestions * 0.4)) {
      message = `Oops, I scored ${score}/${totalQuestions} on the ${quizTitle} quiz at 404IQFound — join the ${score}/${totalQuestions} club 😂`;
    // High scores (>=90%)
    } else if (score >= Math.ceil(totalQuestions * 0.9)) {
      message = `I rocked ${score}/${totalQuestions} on the ${quizTitle} quiz at 404IQFound! Can you beat that? 🤩`;
    // Mid-range scores
    } else {
      message = `Not great, not terrible — I scored ${score}/${totalQuestions} on the ${quizTitle} quiz at 404IQFound 😎`;
    }
    const shareText = `${message} 👉 ${currentUrl}`;

    if (navigator.share) {
      navigator.share({
        text: shareText
      }).catch(() => {
        // Fallback: copy full share text to clipboard
        copyToClipboard(shareText);
      });
    } else {
      // Fallback: copy full share text to clipboard
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Result copied to clipboard! Share with your friends!");
    });
  };

  // Format time taken as MM:SS
  const formatTimeTaken = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  return (
    <div className="max-w-lg mx-auto p-4 animate-fade-in">
      <Card className="text-center dark:bg-gray-800">
        <CardHeader>
          <div className="w-20 h-20 rounded-full bg-quiz-light-purple flex items-center justify-center mx-auto mb-4">
            <Award className="h-10 w-10 text-quiz-purple" />
          </div>
          <CardTitle className="text-2xl dark:text-white">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1 dark:text-gray-400">Your score</p>
            <div className="text-5xl font-bold mb-2">{getResultEmoji()}</div>
            <h3 className={`text-4xl font-bold ${getScoreColor()}`}>
              {score}/{totalQuestions}
            </h3>
            <p className="text-xl font-medium mt-1 dark:text-white">{percentage}%</p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-4 rounded-lg">
            <p>{getFeedbackMessage()}</p>
          </div>
          
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-gray-300">Player:</span>
                  <span className="dark:text-white">{playerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-gray-300">Time Taken:</span>
                  <span className="dark:text-white">{formatTimeTaken(timeTaken)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-gray-300">Date:</span>
                  <span className="dark:text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="leaderboard" className="pt-4">
              {leaderboard.length > 0 ? (
                <Table className="w-full">
                  <TableCaption>Top 5 scores for this quiz</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((entry, index) => (
                      <TableRow key={index} className={entry.name === playerName && entry.score === score ? 'bg-quiz-light-purple/30' : ''}>
                        <TableCell className="font-medium">
                          {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 inline mr-1" />}
                          {index + 1}
                        </TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right">{entry.score}/{entry.totalQuestions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 dark:text-gray-300">
                  No leaderboard entries yet
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full bg-quiz-purple hover:bg-quiz-deep-purple"
            onClick={onRestart}
          >
            <Repeat className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline"
            className="w-full border-quiz-purple text-quiz-purple hover:bg-quiz-light-purple/20 dark:text-quiz-purple"
            onClick={onBackToQuizzes}
          >
            Back to Quizzes
          </Button>
          <div className="flex w-full gap-2">
            <Button 
              variant="ghost"
              className="flex-1 text-quiz-purple hover:bg-quiz-light-purple/20"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Result
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;
