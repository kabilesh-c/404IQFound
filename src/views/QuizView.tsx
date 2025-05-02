import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Timer, Clock, AlertTriangle, Sun, Moon, Shuffle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Quiz, QuizQuestion as QuizQuestionType } from '@/data/quizData';
import { motion } from 'framer-motion';

// New function to persistently store quiz questions for the current session
const storeCurrentQuizQuestions = (quizId: string, questions: QuizQuestionType[]) => {
  try {
    localStorage.setItem('current_quiz_questions', JSON.stringify(questions));
    localStorage.setItem('current_quiz_id', quizId);
  } catch (e) {
    console.error('Error saving current quiz questions', e);
  }
};

// New function to retrieve stored questions for the current quiz
const getCurrentQuizQuestions = (quizId: string): QuizQuestionType[] | null => {
  try {
    const storedQuizId = localStorage.getItem('current_quiz_id');
    if (storedQuizId === quizId) {
      const questions = localStorage.getItem('current_quiz_questions');
      if (questions) {
        return JSON.parse(questions);
      }
    }
    return null;
  } catch (e) {
    console.error('Error retrieving current quiz questions', e);
    return null;
  }
};

// Generate a consistent 20-question pool by repeating or sampling
const generateQuestionPool = (allQuestions: QuizQuestionType[]): QuizQuestionType[] => {
  if (!allQuestions || allQuestions.length === 0) return [];
  const pool: QuizQuestionType[] = [];
  // Keep adding shuffled questions until we reach 20
  while (pool.length < 20) {
    const toAdd = shuffleArray(allQuestions);
    const remaining = 20 - pool.length;
    pool.push(...toAdd.slice(0, remaining));
  }
  return pool;
};

// Function to shuffle an array using Fisher-Yates algorithm for consistent shuffling
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizView: React.FC = () => {
  const { 
    currentQuiz, 
    score, 
    setScore, 
    currentQuestionIndex, 
    setCurrentQuestionIndex,
    quizStarted,
    setQuizStarted,
    quizCompleted,
    setQuizCompleted,
    resetQuiz,
    backToQuizzes,
    backToCategories,
    quizMode,
    setQuizMode,
    setHintsRemaining,
    resetWrongTopics,
    playerName,
    setPlayerName,
    darkMode,
    toggleDarkMode
  } = useQuiz();
  
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestionType[] | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  // Ensure we have the current quiz stored for this component's lifecycle
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);

  // Track if we've initialized questions to prevent reshuffling on re-renders
  const [questionsInitialized, setQuestionsInitialized] = useState(false);

  useEffect(() => {
    // When component mounts and we have a quiz, prompt for name
    if (currentQuiz && !quizStarted && !quizCompleted && !showNamePrompt && !showModeSelection) {
      setShowNamePrompt(true);
      if (currentQuiz.id !== currentQuizId) {
        setCurrentQuizId(currentQuiz.id);
        // Reset questions initialization flag when quiz changes
        setQuestionsInitialized(false);
      }
    }
  }, [currentQuiz, quizStarted, quizCompleted, showNamePrompt, showModeSelection, currentQuizId]);

  useEffect(() => {
    // When we have a quiz and player name is set, but haven't selected mode yet
    if (currentQuiz && playerName && !quizStarted && !quizCompleted && !showModeSelection && !showNamePrompt) {
      setShowModeSelection(true);
    }
  }, [currentQuiz, playerName, quizStarted, quizCompleted, showModeSelection, showNamePrompt]);

  useEffect(() => {
    // Initialize questions when starting a new quiz
    if (currentQuiz?.id && quizStarted && !questionsInitialized) {
      const stored = getCurrentQuizQuestions(currentQuiz.id);
      if (stored) {
        setShuffledQuestions(stored);
      } else if (currentQuiz.questions && currentQuiz.questions.length > 0) {
        const shuffled = shuffleArray(currentQuiz.questions);
        setShuffledQuestions(shuffled);
        if (currentQuiz.id) storeCurrentQuizQuestions(currentQuiz.id, shuffled);
      }
      setQuestionsInitialized(true);
    }
  }, [currentQuiz, quizStarted, questionsInitialized]);

  useEffect(() => {
    // When starting a quiz, reset everything
    if (quizStarted) {
      setScore(0); // Reset score
      setCurrentQuestionIndex(0); // Reset question index
      // Record the quiz start time and reset time taken
      setQuizStartTime(Date.now());
      setTimeTaken(0);
      // Set hints based on question count (more questions = more hints)
      const questionCount = shuffledQuestions?.length || currentQuiz?.questions.length || 0;
      const hintCount = questionCount <= 5 ? 1 : 3;
      setHintsRemaining(hintCount);
      resetWrongTopics();
    }
  }, [quizStarted]);

  // This is the critical function that needs fixing to advance to the next question
  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      // Increment score if the answer is correct
      setScore(prevScore => prevScore + 1);
    }

    // Advance to the next question based on the original quiz length
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (shuffledQuestions && nextQuestionIndex < displayCount) {
      setCurrentQuestionIndex(nextQuestionIndex);
      console.log(`Moving to question ${nextQuestionIndex + 1} of ${displayCount}`);
    } else {
      // Record quiz end time and calculate duration
      const takenSeconds = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0;
      setTimeTaken(takenSeconds);
      // Quiz completed
      setQuizCompleted(true);
      setQuizStarted(false);
      console.log('Quiz completed');
    }
  };

  const handleExitQuiz = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    // Clear the stored questions to ensure fresh start next time
    localStorage.removeItem('current_quiz_questions');
    localStorage.removeItem('current_quiz_id');
    
    // Reset question initialization status
    setQuestionsInitialized(false);
    
    // Navigate back to home categories instead of quiz selection
    exitToCategories();
    setShowExitConfirmation(false);
    setShuffledQuestions(null);
  };

  const handleNameSubmit = () => {
    if (nameInput.trim() === '') {
      setPlayerName('Guest');
    } else {
      setPlayerName(nameInput);
    }
    setShowNamePrompt(false);
  };

  const handleModeSelection = () => {
    setShowModeSelection(false);
    setQuizStarted(true);
  };

  // Reset and reshuffle questions
  const reshuffleQuestions = () => {
    if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) return;
    
    // Shuffle the original questions for a unique set
    const shuffled = shuffleArray(currentQuiz.questions);
    setShuffledQuestions(shuffled);
    
    // Save the shuffled questions for consistent access
    if (currentQuiz.id) {
      storeCurrentQuizQuestions(currentQuiz.id, shuffled);
    }
    
    // Reset the current question index to show the first question of the new shuffled array
    setCurrentQuestionIndex(0);
    
    toast.success("Questions have been reshuffled!");
  };

  // Function to exit to categories from any screen
  const exitToCategories = () => {
    // Clear the stored questions
    localStorage.removeItem('current_quiz_questions');
    localStorage.removeItem('current_quiz_id');
    
    // Reset questions initialization status
    setQuestionsInitialized(false);
    
    // Navigate back to categories
    backToCategories();
    setShowNamePrompt(false);
    setShowModeSelection(false);
    setShuffledQuestions(null);
  };

  // Determine how many questions to actually show (original quiz length)
  const displayCount = currentQuiz?.questions.length || 0;

  if (!currentQuiz) {
    return null;
  }

  if (showNamePrompt) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-4"
      >
        <Card className="shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden border-t-4 border-quiz-purple">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {currentQuiz.title} Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="playerName" className="text-gray-700 dark:text-gray-300">Enter your name to continue:</Label>
              <Input
                id="playerName"
                placeholder="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="mt-2 bg-white dark:bg-gray-700"
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={handleNameSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              Continue
            </Button>
            <Button 
              variant="outline" 
              onClick={exitToCategories} 
              className="w-full border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Exit Quiz
            </Button>
          </CardFooter>
        </Card>
        
        <div className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </motion.div>
    );
  }

  if (showModeSelection) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-4"
      >
        <Card className="shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden border-t-4 border-quiz-purple">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Select Quiz Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={quizMode} 
              onValueChange={(value) => setQuizMode(value as 'practice' | 'timed')}
              className="space-y-4"
            >
              <div 
                className={`flex items-center space-x-3 rounded-md border p-4 cursor-pointer transition-all ${
                  quizMode === 'practice' 
                  ? 'border-quiz-purple bg-quiz-light-purple/20 shadow-md' 
                  : 'border-gray-200 hover:border-quiz-purple hover:bg-gray-50'
                }`}
                onClick={() => setQuizMode('practice')}
              >
                <RadioGroupItem value="practice" id="mode-practice" />
                <Label htmlFor="mode-practice" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-quiz-purple" />
                    <span className="font-medium text-lg">Practice Mode</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Take your time, no pressure. Perfect for learning.
                  </p>
                </Label>
              </div>
              
              <div 
                className={`flex items-center space-x-3 rounded-md border p-4 cursor-pointer transition-all ${
                  quizMode === 'timed' 
                  ? 'border-quiz-purple bg-quiz-light-purple/20 shadow-md' 
                  : 'border-gray-200 hover:border-quiz-purple hover:bg-gray-50'
                }`}
                onClick={() => setQuizMode('timed')}
              >
                <RadioGroupItem value="timed" id="mode-timed" />
                <Label htmlFor="mode-timed" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-quiz-purple" />
                    <span className="font-medium text-lg">Timed Mode</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Answer questions within time limits. Challenge yourself!
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={handleModeSelection}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              Start Quiz
            </Button>
            <Button 
              variant="outline" 
              onClick={exitToCategories} 
              className="w-full border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Exit Quiz
            </Button>
          </CardFooter>
        </Card>
        
        <div className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!quizStarted && !quizCompleted) {
    // Quiz intro screen
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-4"
      >
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={backToQuizzes} className="mb-4 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Quizzes
          </Button>
          
          <h1 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            {currentQuiz.title} Quiz
          </h1>
          <p className="text-gray-600 font-open-sans dark:text-gray-300">{currentQuiz.description}</p>
        </div>
        
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md p-6 mb-6 border-t-4 border-quiz-purple">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="font-medium dark:text-white">Questions:</span>
              <span className="ml-2 text-quiz-purple">{currentQuiz.questions.length}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium dark:text-white">Difficulty:</span>
              <span className={`ml-2 capitalize ${
                currentQuiz.difficulty === 'easy' ? 'text-green-600' :
                currentQuiz.difficulty === 'medium' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {currentQuiz.difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium dark:text-white">Estimated Time:</span>
            <div className="flex items-center ml-2 text-quiz-purple">
              <Timer className="h-4 w-4 mr-1" />
              {currentQuiz.estimatedTime}
            </div>
          </div>
        </Card>
        
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity text-white px-6 py-2 text-lg shadow-lg"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </Button>
        </div>
        
        <div className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </motion.div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizResult 
        score={score} 
        totalQuestions={displayCount}
        onRestart={resetQuiz}
        onBackToQuizzes={exitToCategories}
        quizTitle={currentQuiz.title}
        timeTaken={timeTaken}
      />
    );
  }

  // Show the current question
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={handleExitQuiz} className="hover:bg-red-100 hover:text-red-600 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Exit Quiz
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={reshuffleQuestions} 
            className="flex items-center text-quiz-purple border-quiz-purple hover:bg-quiz-light-purple/20"
          >
            <Shuffle className="h-4 w-4 mr-1" />
            Reshuffle
          </Button>

          {quizMode === 'timed' && (
            <span className="text-sm font-medium flex items-center">
              <Timer className="h-4 w-4 mr-1 text-quiz-purple" />
              Timed Mode
            </span>
          )}
          {quizMode === 'practice' && (
            <span className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1 text-quiz-purple" />
              Practice Mode
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      {shuffledQuestions && currentQuestionIndex < displayCount && (
        <QuizQuestion
          key={currentQuestionIndex}
          question={shuffledQuestions[currentQuestionIndex]}
          onAnswer={handleAnswerQuestion}
          totalQuestions={displayCount}
          currentQuestionIndex={currentQuestionIndex}
          isTimedMode={quizMode === 'timed'}
        />
      )}

      <AlertDialog open={showExitConfirmation} onOpenChange={setShowExitConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Exit Quiz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your progress in this quiz will be lost. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit} className="bg-red-500 hover:bg-red-600 text-white">
              Exit Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizView;
