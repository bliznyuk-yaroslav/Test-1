import React from 'react';
import s from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
    type: 'BOOLEAN' | 'TEXT' | 'CHECKBOX';
    options?: string;
  };
  answer: string | string[];
  onAnswer: (answer: string | string[]) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
}) => {
  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    const currentAnswers = Array.isArray(answer) ? [...answer] : [];
    
    if (isChecked) {
      currentAnswers.push(option);
    } else {
      const index = currentAnswers.indexOf(option);
      if (index > -1) {
        currentAnswers.splice(index, 1);
      }
    }
    
    onAnswer(currentAnswers);
  };

  return (
    <div className={s.questionContainer}>
      <h2 className={s.questionText}>{question.text}</h2>

      {question.type === 'BOOLEAN' && (
        <div className={s.booleanOptions}>
          <button
            type="button"
            className={`${s.option} ${answer === 'true' ? s.selected : ''}`}
            onClick={() => onAnswer('true')}
          >
            <span className={s.emoji}>✅</span>
            <span>True</span>
          </button>
          <button
            type="button"
            className={`${s.option} ${answer === 'false' ? s.selected : ''}`}
            onClick={() => onAnswer('false')}
          >
            <span className={s.emoji}>❌</span>
            <span>False</span>
          </button>
        </div>
      )}

      {question.type === 'TEXT' && (
        <div className={s.textAnswer}>
          <input
            type="text"
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && answer) {
                
                e.preventDefault();
              }
            }}
            placeholder="Type your answer..."
            className={s.textInput}
            autoFocus
          />
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className={s.checkboxOptions}>
          {(() => {
            try {
              let options: string[] = [];
              
              if (question.options) {
                if (typeof question.options === 'string') {
                  try {
                    options = JSON.parse(question.options);
                  } catch (e) {
                    console.error('Failed to parse options:', e);
                    return <div className={s.error}>Invalid options format</div>;
                  }
                } else if (Array.isArray(question.options)) {
                  options = question.options;
                }
              }
              
              if (!Array.isArray(options) || options.length === 0) {
                return <div className={s.error}>No options available</div>;
              }
              
              return options.map((option: string, i: number) => (
                <label key={i} className={s.checkboxOption}>
                  <input
                    type="checkbox"
                    checked={Array.isArray(answer) ? answer.includes(option) : false}
                    onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                  />
                  <span className={s.checkboxLabel}>{option}</span>
                </label>
              ));
            } catch (e) {
              console.error('Error rendering options:', e);
              return <div className={s.error}>Error loading options</div>;
            }
          })()}
        </div>
      )}
    </div>
  );
};
