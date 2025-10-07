import React, { useEffect } from "react";
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

const QuizList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCatalogItems);
  const isLoading = useSelector(selectCatalogLoading);
  const error = useSelector(selectCatalogError);

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(items);
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
