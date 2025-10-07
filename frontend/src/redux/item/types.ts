export interface QuizItem {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
}
export interface QuizPayload {
  title: string;
  questions: {
    text: string;
    type: "BOOLEAN" | "CHECKBOX" | "TEXT";
    options?: string | null;
    correctAnswer?: string;
  }[];
}
export interface Question {
  id: number;
  quizId: number;
  type: "BOOLEAN" | "CHECKBOX" | "TEXT";
  text: string;
  options: string[] | null;
  correctAnswer?: string | null;
  createdAt: string;
}
export interface QuizFull {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}
