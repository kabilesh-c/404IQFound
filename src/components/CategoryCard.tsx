import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Code, FlaskConical, Lightbulb, Star } from "lucide-react";

type CategoryCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
  customIcon?: React.ReactNode;
  questionCount?: string;
  isActive?: boolean;
  onClick: () => void;
};

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'code':
      return <Code className="h-8 w-8" />;
    case 'book':
      return <Book className="h-8 w-8" />;
    case 'flask-conical':
      return <FlaskConical className="h-8 w-8" />;
    case 'lightbulb':
      return <Lightbulb className="h-8 w-8" />;
    default:
      return <Star className="h-8 w-8" />;
  }
};

const getCategoryColor = (id: string) => {
  switch (id) {
    case 'technology':
      return 'border-quiz-blue';
    case 'science':
      return 'border-green-500';
    case 'ai':
      return 'border-quiz-purple';
    case 'generalknowledge':
      return 'border-orange-500';
    default:
      return 'border-quiz-purple';
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  id, 
  title, 
  description, 
  icon, 
  customIcon, 
  questionCount,
  isActive = false,
  onClick 
}) => {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${isActive ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-quiz-purple ring-opacity-50' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} overflow-hidden border-t-4 ${getCategoryColor(id)} h-full`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${isActive ? 'bg-quiz-purple text-white' : 'bg-quiz-light-purple text-black dark:bg-quiz-purple dark:text-white'}`}>
          {customIcon || <IconComponent icon={icon} />}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="dark:text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {questionCount && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {questionCount}
            </div>
          )}
          <div className="text-sm font-medium text-quiz-deep-purple dark:text-quiz-deep-purple ml-auto">
            {id === 'ai' || id === 'generalknowledge' ? 'Start Quiz →' : 'Explore →'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
