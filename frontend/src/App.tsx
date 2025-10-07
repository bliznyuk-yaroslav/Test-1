import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import HomePage from "./page/HomePage/HomePage.tsx";
import QuizPage from "./page/QuizPage/QuizPage.tsx";
import QuizCreationPage from "./page/QuizCreationPage/QuizCreationPage.tsx";
import QuizDetailPage from "./page/QuizDetailPage/QuizDetailPage.tsx";
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
