import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const { currentCategory, currentQuiz, backToCategories, backToQuizzes } = useQuiz();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="text-gray-600 dark:text-gray-400">
        <BreadcrumbItem>
          <BreadcrumbLink onClick={backToCategories} className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Home className="h-4 w-4 mr-1" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {currentCategory && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentQuiz ? (
                <BreadcrumbLink onClick={backToQuizzes} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {currentCategory.title}
                </BreadcrumbLink>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">{currentCategory.title}</span>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentQuiz && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-gray-900 dark:text-white font-medium">{currentQuiz.title}</span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
