import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizRouter from "./routers/quiz.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quizzes", quizRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
