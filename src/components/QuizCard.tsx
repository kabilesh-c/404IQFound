import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, FlaskConical, Lightbulb, Star, Timer } from "lucide-react";

type QuizCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  onClick: () => void;
};

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'code':
      return <Code className="h-6 w-6" />;
    case 'book':
      return <Book className="h-6 w-6" />;
    case 'flask-conical':
      return <FlaskConical className="h-6 w-6" />;
    case 'lightbulb':
      return <Lightbulb className="h-6 w-6" />;
    case 'science':
      return <FlaskConical className="h-6 w-6" />;
    default:
      return <Star className="h-6 w-6" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-orange-100 text-orange-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDifficultyEmoji = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return '🌱';
    case 'medium':
      return '🔥';
    case 'hard':
      return '💀';
    default:
      return '🔍';
  }
};

const QuizCard: React.FC<QuizCardProps> = ({ 
  id, 
  title, 
  description, 
  icon,
  difficulty,
  estimatedTime,
  onClick 
}) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px] bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-quiz-light-purple dark:bg-quiz-purple flex items-center justify-center text-black dark:text-white">
            <IconComponent icon={icon} />
          </div>
          <Badge className={`${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="dark:text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Timer className="h-4 w-4 mr-1" />
            {estimatedTime}
          </div>
          <div className="text-sm font-medium text-quiz-purple">
            Start Quiz →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
