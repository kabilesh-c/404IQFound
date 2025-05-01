
import React, { createContext, useContext, useState } from 'react';
import { Quiz, Category, categories } from '@/data/quizData';

type QuizMode = 'practice' | 'timed';

type LeaderboardEntry = {
  name: string;
  score: number;
  quizId: string;
  quizTitle: string;
  date: string;
};

type QuizContextType = {
  currentCategory: Category | null;
  setCurrentCategory: (category: Category | null) => void;
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  score: number;
  setScore: (score: number | ((prevScore: number) => number)) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  quizStarted: boolean;
  setQuizStarted: (started: boolean) => void;
  quizCompleted: boolean;
  setQuizCompleted: (completed: boolean) => void;
  resetQuiz: () => void;
  backToCategories: () => void;
  backToQuizzes: () => void;
  getAllCategories: () => Category[];
  quizMode: QuizMode;
  setQuizMode: (mode: QuizMode) => void;
  hintsRemaining: number;
  setHintsRemaining: (hints: number) => void;
  wrongTopics: string[];
  addWrongTopic: (topic: string) => void;
  resetWrongTopics: () => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('practice');
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [wrongTopics, setWrongTopics] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState('Guest');
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('quizDarkMode');
    return savedPreference ? savedPreference === 'true' : false;
  });
  
  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setQuizStarted(true); // Start the quiz again immediately
    setHintsRemaining(3);
    resetWrongTopics();
  };

  const backToCategories = () => {
    setCurrentCategory(null);
    setCurrentQuiz(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setHintsRemaining(3);
    resetWrongTopics();
    
    // Clear any saved quiz questions when going back to categories
    localStorage.removeItem('current_quiz_questions');
    localStorage.removeItem('current_quiz_id');
  };

  const backToQuizzes = () => {
    setCurrentQuiz(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setHintsRemaining(3);
    resetWrongTopics();
    
    // Clear any saved quiz questions when going back to quizzes
    localStorage.removeItem('current_quiz_questions');
    localStorage.removeItem('current_quiz_id');
  };

  const getAllCategories = () => {
    return categories;
  };

  const addWrongTopic = (topic: string) => {
    setWrongTopics(prevTopics => {
      if (!prevTopics.includes(topic)) {
        return [...prevTopics, topic];
      }
      return prevTopics;
    });
  };

  const resetWrongTopics = () => {
    setWrongTopics([]);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('quizDarkMode', String(newDarkMode));
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize dark mode on mount
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QuizContext.Provider
      value={{
        currentCategory,
        setCurrentCategory,
        currentQuiz,
        setCurrentQuiz,
        score,
        setScore,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        quizStarted,
        setQuizStarted,
        quizCompleted,
        setQuizCompleted,
        resetQuiz,
        backToCategories,
        backToQuizzes,
        getAllCategories,
        quizMode,
        setQuizMode,
        hintsRemaining,
        setHintsRemaining,
        wrongTopics,
        addWrongTopic,
        resetWrongTopics,
        playerName,
        setPlayerName,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
};
