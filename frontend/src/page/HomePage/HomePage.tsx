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
          Ласкаво просимо до нашого додатку! Тут ти можеш створювати власні
          квізи, проходити цікаві тести, перевіряти свої знання та змагатися з
          друзями. Обирай тему, тренуйся та отримуй нові досягнення щодня!
        </p>
        <p className={s.description}>
          Наш додаток створений для того, щоб навчання було веселим та
          інтерактивним. Долучайся, розвивай свій інтелект та діліться
          результатами з іншими користувачами.
        </p>
        <button className={s.btn} onClick={goToQuizCreation}>
          Перейти до квізів
        </button>
      </div>
    </section>
  );
}
