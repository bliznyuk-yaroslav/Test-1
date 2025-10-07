import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./QuizList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  selectCatalogError,
  selectCatalogItems,
  selectCatalogLoading,
} from "../../redux/item/selector";
import { fetchItem } from "../../redux/item/operation";
import QuizCard from "../QuizCard/QuizCard";
import Button from "../Button/Button";

const QuizList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCatalogItems);
  const isLoading = useSelector(selectCatalogLoading);
  const error = useSelector(selectCatalogError);

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  if (isLoading) return <div className={s.loading}>Loading...</div>;
  if (error) return <div className={s.error}>Error: {error}</div>;

  if (items.length === 0) {
    return (
      <div className={s.emptyState}>
        <h2 className={s.emptyTitle}>No quizzes found</h2>
        <p className={s.emptyText}>Create your first quiz to get started!</p>
        <Button
          onClick={() => navigate("/quizCreation")}
          className={s.createButton}
        >
          Create Quiz
        </Button>
      </div>
    );
  }

  return (
    <ul className={s.container}>
      {items.map((item) => (
        <li key={item.id} className={s.listItem}>
          <QuizCard item={item} />
        </li>
      ))}
    </ul>
  );
};

export default QuizList;
