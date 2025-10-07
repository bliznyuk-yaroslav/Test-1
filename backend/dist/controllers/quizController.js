import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createQuiz = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
export const getAllQuizzes = async (_req, res) => {
    const quizzes = await prisma.quiz.findMany({
        include: { questions: true },
    });
    const summary = quizzes.map((q) => ({
        id: q.id,
        title: q.title,
        questionCount: q.questions.length,
    }));
    res.json(summary);
};
export const getQuizById = async (req, res) => {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
        where: { id: Number(id) },
        include: { questions: true },
    });
    if (!quiz)
        return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
};
export const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.status(204).send();
};
