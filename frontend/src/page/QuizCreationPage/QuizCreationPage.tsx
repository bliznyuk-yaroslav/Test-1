import React from "react";
import s from "./QuizCreationPage.module.scss";
import CreateForm from "../../components/CreateForm/CreateForm";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import type { QuizPayload } from "../../redux/item/types";
import { addQuiz } from "../../redux/item/operation";

const QuizCreationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (quiz: QuizPayload) => {
    dispatch(addQuiz(quiz));
  };
  return (
    <div className={s.container}>
      <CreateForm onSubmit={handleSubmit} />
    </div>
  );
};

export default QuizCreationPage;
