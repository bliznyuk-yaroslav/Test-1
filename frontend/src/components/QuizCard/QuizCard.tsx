import React  from "react";
import s from "./QuizCard.module.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { deleteQuiz } from "../../redux/item/operation";
import type { QuizItem } from "../../redux/item/types";
import { fetchItem } from "../../redux/item/operation";
import { useNavigate } from "react-router-dom";
interface QuizCardProps {
  item: QuizItem;
}
const QuizCard: React.FC<QuizCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    if (window.confirm("Ви впевнені, що хочете видалити цей квіз?")) {
      dispatch(deleteQuiz(item.id));
      dispatch(fetchItem());
    }
  };
  return (
    <div className={s.container}>
      <div>
        <h2>{item.title}</h2>
        <p className={s.text}>Question: {item.questionCount}</p>
      </div>
      <button className={s.btn} onClick={() => navigate(`/quizzes/${item.id}`)}>
        Start Quiz
      </button>
      <button className={s.btn} onClick={handleDelete}>
        Delete Quiz
      </button>
    </div>
  );
};

export default QuizCard;
