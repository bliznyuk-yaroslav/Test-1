import s from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const goToQuizCreation = () => {
    navigate("/quiz");
  };
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h1 className={s.header}>Quiz Master 🎉</h1>
        <p className={s.subtitle}>
          Welcome to our app! Here you can create your own quizzes, take
          interesting tests, test your knowledge and compete with your friends.
          Choose a topic, practice and get new achievements every day!
        </p>
        <p className={s.description}>
          Our app is designed to make learning fun and interactive. Join us,
          develop your intellect and share your results with other users.
        </p>
        <button className={s.btn} onClick={goToQuizCreation}>
          Go to Quizzes
        </button>
      </div>
    </section>
  );
}
