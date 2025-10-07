import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizById } from "../../redux/item/operation";
import type { RootState } from "../../redux/store";
import { QuizHeader } from "../../components/QuizHeader/QuizHeader";
import { QuizNavigation } from "../../components/QuizNavigation/QuizNavigation";
import { QuizResults } from "../../components/QuizResults/QuizResults";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import s from "./QuizDetailPage.module.scss";

export interface Question {
  id: number;
  text: string;
  type: 'BOOLEAN' | 'TEXT' | 'CHECKBOX';
  options?: string;
  correctAnswer: string;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

const QuizDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
 
  
  const selectedQuiz = useSelector(
    (state: RootState) => state.catalog.selectedQuiz
  ) as Quiz | null;
  const isQuizLoading = useSelector(
    (state: RootState) => state.catalog.isQuizLoading as boolean
  );
  const error = useSelector(
    (state: RootState) => state.catalog.error as string | null
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

 
  useEffect(() => {
    if (id) {
      // @ts-ignore 
      dispatch(fetchQuizById(Number(id)));
    }
    
    return () => {
      dispatch({ type: 'quizItem/clearSelectedQuiz' });
    };
  }, [dispatch, id]);

 
  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: answer
    };
    setAnswers(newAnswers);

    if (!selectedQuiz) return;
    
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    
  
    if (currentQuestion.type === 'TEXT') {
      return;
    }
    
   
    moveToNextQuestion(newAnswers);
  };
  
  
  const moveToNextQuestion = (currentAnswers = answers) => {
    if (!selectedQuiz) return;
    
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore(currentAnswers);
      setShowResults(true);
    }
  };
  
 
  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = (answerMap: Record<number, string | string[]>) => {
    if (!selectedQuiz) return 0;
    
    let correctAnswers = 0;
    
    selectedQuiz.questions.forEach((question, index) => {
      const userAnswer = answerMap[index];
      if (!userAnswer) return;

      if (question.type === "CHECKBOX") {
        const correctOptions = question.correctAnswer 
          ? JSON.parse(question.correctAnswer) 
          : [];
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctOptions.length &&
          userAnswer.every(opt => correctOptions.includes(opt))
        ) {
          correctAnswers++;
        }
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = (correctAnswers / selectedQuiz.questions.length) * 100;
    setScore(calculatedScore);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (isQuizLoading || !selectedQuiz) {
    return <div className={s.loading}>Loading quiz...</div>;
  }

  if (error) {
    return <div className={s.error}>Error: {error}</div>;
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex] || (currentQuestion.type === 'CHECKBOX' ? [] : '');
  const isTextOrCheckbox = currentQuestion.type === 'TEXT' || currentQuestion.type === 'CHECKBOX';

  return (
    <div className={s.quizContainer}>
      {!showResults ? (
        <div className={s.quizContent}>
          <QuizHeader 
            title={selectedQuiz.title}
            currentQuestion={currentQuestionIndex}
            totalQuestions={selectedQuiz.questions.length}
          />
          
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
          
          <QuizNavigation
            currentQuestion={currentQuestionIndex}
            totalQuestions={selectedQuiz.questions.length}
            onPrevious={moveToPreviousQuestion}
            onNext={() => moveToNextQuestion()}
            isNextDisabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            isTextOrCheckbox={isTextOrCheckbox}
          />
        </div>
      ) : (
        <QuizResults 
          score={score} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default QuizDetailPage;
