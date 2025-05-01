import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { getDailyQuiz } from '@/data/quizData';
import CategoryCard from '@/components/CategoryCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Laptop, FlaskConical, Bot, Globe } from 'lucide-react';

const CategoryView: React.FC = () => {
  const { getAllCategories, setCurrentCategory, currentCategory } = useQuiz();
  const categories = getAllCategories();

  // Custom icons mapping by category ID
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'technology':
        return <Laptop className="h-8 w-8" />;
      case 'science':
        return <FlaskConical className="h-8 w-8" />;
      case 'ai':
        return <Bot className="h-8 w-8" />;
      case 'generalknowledge':
        return <Globe className="h-8 w-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="mb-6">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">
          Explore Categories
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            customIcon={getCategoryIcon(category.id)}
            questionCount={
              category.id === 'daily-challenge'
              ? `${getDailyQuiz().questions.length} Questions`
              : category.directQuiz 
                ? `${category.directQuiz.questions.length} Questions` 
                : `${category.quizzes.length} Quizzes`}
            isActive={currentCategory?.id === category.id}
            onClick={() => {
              setCurrentCategory(category);
              // Scroll to quiz list section after a short delay to allow for state update
              setTimeout(() => {
                document.getElementById('quiz-list-section')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }, 100);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
