import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './QuizResults.module.scss';

interface QuizResultsProps {
  score: number;
  onRestart?: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ score, onRestart }) => {
  const navigate = useNavigate();
  
  return (
    <div className={s.results}>
      <h2>Quiz Complete!</h2>
      <p className={s.score}>Your score: <span>{score.toFixed(0)}%</span></p>
      <div className={s.actions}>
        {onRestart && (
          <button 
            type="button"
            onClick={onRestart}
            className={s.actionButton}
          >
            Try Again
          </button>
        )}
        <button 
          type="button"
          onClick={() => navigate('/quiz')}
          className={`${s.actionButton} ${s.primaryButton}`}
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
};
