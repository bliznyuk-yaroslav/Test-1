import React from "react";
import s from "./QuizPage.module.scss";

import QuizList from "../../components/QuizList/QuizList";

const QuizPage: React.FC = () => {
  return (
    <div className={s.container}>
      <h1>Choose the quiz you need</h1>
      <QuizList />
    </div>
  );
};

export default QuizPage;
