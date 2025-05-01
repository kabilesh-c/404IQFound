import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { Target, LineChart, Lightbulb, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
const LandingView: React.FC = () => {
  const {
    getAllCategories
  } = useQuiz();
  const categories = getAllCategories();
  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Apply animations with a staggered delay
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
    animatedElements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${0.1 * index}s`;
    });
  }, []);
  return <div className="min-h-screen font-open-sans">
      {/* Logo and Brand Name */}
      <div className="absolute top-8 left-8 flex items-center">
        <img src="/favicon.ico" alt="404IQFound logo" className="h-10 w-10 object-contain" />
        <span className="ml-2 text-lg font-semibold text-white">404IQFound</span>
      </div>
      {/* Hero Section with improved gradient background */}
      <div className="bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 dark:from-gray-900 dark:via-teal-900 dark:to-gray-900 text-white min-h-[90vh] flex flex-col items-center justify-center px-4 py-[140px]">
        <h1 className="font-poppins text-5xl md:text-7xl font-bold mb-4 animate-fade-in text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-teal-100">
          404IQFound
        </h1>
        <p className="text-xl md:text-2xl mb-16 opacity-90 animate-fade-in text-center">
          Learn by testing yourself!
        </p>
        
        {/* Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-16 px-4">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-50">Learn Actively</h3>
              <p className="text-sm text-gray-200">
                Engage with content through quizzes designed to challenge your knowledge and enhance retention.
              </p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-6 w-6 text-teal-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-50">Track Progress</h3>
              <p className="text-sm text-gray-200">
                Monitor your improvement over time with detailed statistics and performance insights.
              </p>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-50">Get Explanation</h3>
              <p className="text-sm text-gray-200">
                Learn from mistakes with detailed explanations for each question to deepen your understanding.
              </p>
            </div>
          </Card>
        </div>
        
        <Button onClick={scrollToCategories} className="bg-white text-teal-900 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105 animate-fade-in flex items-center" style={{
        animationDelay: '0.4s'
      }}>
          Explore Categories
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Categories Grid with improved styling */}
      <div id="categories" className="px-4 bg-cyan-300 py-[60px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12 text-gray-800 dark:text-gray-100 animate-fade-in">
            Choose a Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Categories will be rendered here by the CategoryView component */}
          </div>
        </div>
      </div>
    </div>;
};
export default LandingView;