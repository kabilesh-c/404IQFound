import React, { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import LandingView from '@/views/LandingView';
import CategoryView from '@/views/CategoryView';
import QuizListView from '@/views/QuizListView';
import QuizView from '@/views/QuizView';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentCategory, currentQuiz, darkMode, toggleDarkMode } = useQuiz();

  // Auto-scroll functionality when components mount/unmount
  useEffect(() => {
    // Scroll to top when the quiz changes
    if (currentQuiz) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuiz]);

  // Determine which view to show based on the current state
  if (currentQuiz) {
    return <QuizView />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="transition-colors duration-300 bg-white dark:bg-gray-900 min-h-screen">
        <div className="fixed bottom-4 right-4 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <LandingView />
        <div className="container mx-auto p-4" id="categories">
          <CategoryView />
        </div>
        {currentCategory && <QuizListView />}
        {/* Footer with author credit */}
        <footer className="mt-8 p-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-teal-500">Made by Kabilesh C for every curious mind on Earth</p>
          <p className="text-purple-500">© 2025 | 404IQFound – Knowledge has no 404s.</p>
        </footer>
      </div>
    </div>
  );
};

export default AppContent;
