import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, Timer, HelpCircle } from "lucide-react";
import { QuizQuestion as QuestionType } from '@/data/quizData';
import { useQuiz } from '@/context/QuizContext';
import { Progress } from '@/components/ui/progress';

type QuizQuestionProps = {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  totalQuestions: number;
  currentQuestionIndex: number;
  isTimedMode: boolean;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer, 
  totalQuestions,
  currentQuestionIndex,
  isTimedMode
}) => {
  const { hintsRemaining, setHintsRemaining, addWrongTopic } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(isTimedMode ? 15 : 0);
  const [excludedOptions, setExcludedOptions] = useState<string[]>([]);
  const [timerActive, setTimerActive] = useState(isTimedMode);
  const [timedOut, setTimedOut] = useState(false);

  // Reset state when question changes (using question.id to detect)
  useEffect(() => {
    setTimeRemaining(isTimedMode ? 15 : 0);
    setTimerActive(isTimedMode);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsAnswerSubmitted(false);
    setExcludedOptions([]);
    setTimedOut(false);
  }, [question.id, isTimedMode]);

  // Timer countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimedMode && timerActive && timeRemaining > 0 && !showFeedback) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimedMode, timerActive, timeRemaining, showFeedback]);

  // Handle time running out
  useEffect(() => {
    if (isTimedMode && timeRemaining === 0 && !showFeedback) {
      setTimerActive(false);
      setShowFeedback(true);
      setIsAnswerSubmitted(true);
      setTimedOut(true);
    }
  }, [timeRemaining, isTimedMode, showFeedback]);

  const handleOptionSelect = (option: string) => {
    if (isAnswerSubmitted) return; // Prevent selection after submitting
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption && !isTimedMode) return;
    
    // First submission logic - shows feedback but doesn't proceed to next question
    setShowFeedback(true);
    setIsAnswerSubmitted(true);
    setTimerActive(false);
    
    // If incorrect, add to wrong topics
    if (selectedOption !== question.correctAnswer && question.topic) {
      addWrongTopic(question.topic);
    }
  };

  const handleNext = () => {
    // For timed mode with no selection and time expired
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Call onAnswer to move to the next question
    onAnswer(isCorrect);
  };

  // Calculate maximum hints based on total question count
  const getMaxHints = () => {
    if (!totalQuestions) return 3;
    return totalQuestions <= 5 ? 1 : 3;
  };

  const useHint = () => {
    if (hintsRemaining > 0 && !showFeedback && !isAnswerSubmitted) {
      // Find incorrect options that haven't been excluded yet
      const incorrectOptions = question.options.filter(opt => 
        opt !== question.correctAnswer && !excludedOptions.includes(opt)
      );
      
      // Randomly select up to 2 options to exclude
      const numToExclude = Math.min(2, incorrectOptions.length);
      const shuffled = [...incorrectOptions].sort(() => 0.5 - Math.random());
      const newExcludedOptions = shuffled.slice(0, numToExclude);
      
      setExcludedOptions(prev => [...prev, ...newExcludedOptions]);
      setHintsRemaining(hintsRemaining - 1);
    }
  };

  const getOptionClass = (option: string) => {
    // Base styling
    let baseClass = "p-4 border rounded-lg cursor-pointer transition-all duration-200 ";
    
    // Handle excluded options from hint
    if (excludedOptions.includes(option)) {
      return baseClass + "opacity-50 bg-gray-100 cursor-not-allowed";
    }
    
    if (!showFeedback) {
      return baseClass + (selectedOption === option 
        ? 'bg-quiz-purple text-white' 
        : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white');
    }
    
    if (option === question.correctAnswer) {
      return baseClass + 'bg-quiz-success text-green-800';
    }
    
    if (selectedOption === option && option !== question.correctAnswer) {
      return baseClass + 'bg-quiz-error text-red-800';
    }
    
    return baseClass + 'bg-white opacity-50 dark:bg-gray-800 dark:text-gray-400';
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    return `00:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Calculate timer progress percentage
  const timerProgress = timeRemaining > 0 ? (timeRemaining / 15) * 100 : 0;

  // Get color for timer based on time remaining
  const getTimerColor = () => {
    const maxTime = 15;
    if (timeRemaining < maxTime * 0.25) return "bg-red-500";
    if (timeRemaining < maxTime * 0.5) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Keyboard handling: submit answer or move to next question on Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!isAnswerSubmitted) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnswerSubmitted, selectedOption]);

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <div className="flex items-center">
            {isTimedMode && (
              <div className={`flex items-center text-sm font-medium ${
                timeRemaining < 10 ? 'text-red-500' : 'text-quiz-purple'
              }`}>
                <Timer className="h-4 w-4 mr-1" />
                {formatTime(timeRemaining)}
              </div>
            )}
            <p className="text-sm font-medium text-quiz-purple ml-4">
              Quiz Progress
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className="bg-quiz-purple h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
        
        {isTimedMode && (
          <div className="w-full mt-2">
            <Progress 
              value={timerProgress} 
              indicatorColor={getTimerColor()} 
              className="bg-gray-200 dark:bg-gray-700" 
            />
          </div>
        )}
      </div>
      
      <Card className="mb-6 shadow-md dark:bg-gray-800 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl dark:text-white">{question.question}</CardTitle>
          {question.topic && (
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Topic: {question.topic}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`${getOptionClass(option)} ${excludedOptions.includes(option) ? 'pointer-events-none' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex justify-between items-center">
                <span className="dark:text-white">{option}</span>
                {showFeedback && option === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {showFeedback && selectedOption === option && option !== question.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          {showFeedback && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm animate-scale-in">
              <p className="font-medium mb-1 dark:text-white">
                {timedOut
                  ? `Time's Up - Correct Answer: ${question.correctAnswer}`
                  : selectedOption === question.correctAnswer
                    ? "Correct!"
                    : "Incorrect"}
              </p>
              <p className="dark:text-gray-300">{question.explanation}</p>
            </div>
          )}
          
          <div className="flex w-full gap-2">
            {!isAnswerSubmitted ? (
              <>
                {hintsRemaining > 0 && (
                  <Button 
                    variant="outline"
                    className="flex-1 border-quiz-purple text-quiz-purple hover:bg-quiz-light-purple/20"
                    onClick={useHint}
                    disabled={showFeedback || excludedOptions.length >= 2}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Use Hint ({hintsRemaining})
                  </Button>
                )}
                <Button 
                  className="flex-1 bg-quiz-purple hover:bg-quiz-deep-purple"
                  onClick={handleSubmit}
                  disabled={!selectedOption && !timeRemaining}
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-quiz-purple hover:bg-quiz-deep-purple flex items-center justify-center"
                onClick={handleNext}
              >
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizQuestion;
