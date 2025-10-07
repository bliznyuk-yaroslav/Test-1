import React from "react";
import s from "./QuizPage.module.scss";

import QuizList from "../../components/QuizList/QuizList";

const QuizPage: React.FC = () => {
  return (
    <div className={s.container}>
      <h1>Вибери потрібний тобі квіз</h1>
      <QuizList />
    </div>
  );
};

export default QuizPage;
