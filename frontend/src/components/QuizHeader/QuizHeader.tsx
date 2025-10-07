import React from 'react';
import s from './QuizHeader.module.scss';

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  title, 
  currentQuestion, 
  totalQuestions 
}) => {
  return (
    <div className={s.header}>
      <h1>{title}</h1>
      <div className={s.questionCounter}>
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};
