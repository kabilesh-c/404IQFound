
import React, { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import QuizCard from '@/components/QuizCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDailyQuiz } from '@/data/quizData';
import { motion } from 'framer-motion';

const QuizListView: React.FC = () => {
  const { currentCategory, setCurrentQuiz } = useQuiz();

  if (!currentCategory) {
    return null;
  }

  // Check if this category has a direct quiz (no subcategories)
  React.useEffect(() => {
    if (currentCategory && currentCategory.directQuiz) {
      // Special handling for daily challenge
      if (currentCategory.id === 'daily-challenge') {
        const dailyQuiz = getDailyQuiz();
        setCurrentQuiz(dailyQuiz);
      } else {
        setCurrentQuiz(currentCategory.directQuiz);
      }
    }
  }, [currentCategory, setCurrentQuiz]);

  // If the category has a direct quiz, don't render the subcategories view
  if (currentCategory.directQuiz) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div id="quiz-list-section" className="container mx-auto p-4 animate-fade-in">
      <div className="mb-6">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 font-poppins dark:text-white bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
          {currentCategory.title} Quizzes
        </h1>
        <p className="text-gray-600 mt-2 dark:text-gray-300">{currentCategory.description}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentCategory.quizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={item}>
            <QuizCard
              id={quiz.id}
              title={quiz.title}
              description={`${quiz.questions.length} Questions`}
              icon={quiz.icon}
              difficulty={quiz.difficulty}
              estimatedTime={quiz.estimatedTime}
              onClick={() => {
                setCurrentQuiz(quiz);
              }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {currentCategory.quizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-open-sans dark:text-gray-400">No quizzes available for this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default QuizListView;
