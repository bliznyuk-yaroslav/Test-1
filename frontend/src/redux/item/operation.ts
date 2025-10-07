import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { QuizItem, QuizPayload, QuizFull } from "./types.ts";

axios.defaults.baseURL = "https://test-1-7j40.onrender.com";

export const fetchItem = createAsyncThunk<
  QuizItem[],
  void,
  { rejectValue: string }
>("quizItem/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<QuizItem[]>("/quizzes");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addQuiz = createAsyncThunk<
  QuizItem,
  QuizPayload,
  { rejectValue: string }
>("quizItem/addQuiz", async (quizData, thunkAPI) => {
  try {
    const response = await axios.post<QuizItem>("/quizzes", quizData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteQuiz = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("quizItem/deleteQuiz", async (quizId, thunkAPI) => {
  try {
    await axios.delete(`/quizzes/${quizId}`);
    return quizId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const fetchQuizById = createAsyncThunk<
  QuizFull,
  number,
  { rejectValue: string }
>("quizItem/fetchQuizById", async (quizId, thunkAPI) => {
  try {
    const response = await axios.get(`/quizzes/${quizId}`);
    const quiz = response.data;
    const parsedQuestions = quiz.questions.map((q: any) => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
    }));

    return { ...quiz, questions: parsedQuestions };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
