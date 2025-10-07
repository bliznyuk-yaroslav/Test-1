import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface QuizWithQuestions {
  id: number;
  title: string;
  questions: { id: number; text: string }[];
}
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllQuizzes = async (_req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });
  const summary = quizzes.map((q: QuizWithQuestions) => ({
    id: q.id,
    title: q.title,
    questionCount: q.questions.length,
  }));
  res.json(summary);
};

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: { questions: true },
  });
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quizId = Number(id);
    
  
    await prisma.question.deleteMany({
      where: { quizId }
    });
    
  
    await prisma.quiz.delete({ 
      where: { id: quizId } 
    });
    
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
    
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.error('Error deleting quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: 'Error deleting quiz', error: errorMessage });
  }
};
