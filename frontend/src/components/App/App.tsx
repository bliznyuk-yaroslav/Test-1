import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import HomePage from "../../page/HomePage/HomePage";
import QuizPage from "../../page/QuizPage/QuizPage";
import QuizCreationPage from "../../page/QuizCreationPage/QuizCreationPage.tsx";
import QuizDetailPage from "../../page/QuizDetailPage/QuizDetailPage.tsx";
function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quizCreation" element={<QuizCreationPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
