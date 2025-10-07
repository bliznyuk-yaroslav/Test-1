import { createSlice } from "@reduxjs/toolkit";
import { fetchItem, addQuiz, deleteQuiz, fetchQuizById } from "./operation.ts";
import type { QuizItem, QuizFull } from "./types.ts";

interface CatalogState {
  items: QuizItem[];
  selectedQuiz: QuizFull | null;
  isLoading: boolean;
  isQuizLoading: boolean;
  error: string | null;
}

const initialState: CatalogState = {
  items: [],
  selectedQuiz: null,
  isLoading: false,
  isQuizLoading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: "quizItem",
  initialState,
  reducers: {
    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null;
      state.isQuizLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all quizzes
    builder
      .addCase(fetchItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch quizzes';
      });

    // Add new quiz
    builder
      .addCase(addQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to add quiz';
      });

    // Delete quiz
    builder
      .addCase(deleteQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to delete quiz';
      });

    // Fetch quiz by ID
    builder
      .addCase(fetchQuizById.pending, (state) => {
        state.isQuizLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.isQuizLoading = false;
        state.isLoading = false;
        state.selectedQuiz = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch quiz";
      });
  },
});

export const { clearSelectedQuiz } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
