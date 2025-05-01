
import React from 'react';
import { QuizProvider } from '@/context/QuizContext';
import AppContent from '@/components/AppContent';

const Index = () => {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
};

export default Index;
