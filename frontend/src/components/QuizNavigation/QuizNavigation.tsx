import React from 'react';
import s from './QuizNavigation.module.scss';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  isTextOrCheckbox: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  isNextDisabled,
  isTextOrCheckbox,
}) => {
  return (
    <div className={s.navigationButtons}>
      {currentQuestion > 0 && (
        <button 
          type="button"
          onClick={onPrevious} 
          className={s.navButton}
        >
          ← Previous
        </button>
      )}
      
      {isTextOrCheckbox && (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={`${s.navButton} ${s.nextButton}`}
        >
          {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next →'}
        </button>
      )}
    </div>
  );
};
