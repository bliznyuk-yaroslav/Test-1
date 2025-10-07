import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import styles from "./CreateForm.module.scss";

type QuestionType = "BOOLEAN" | "CHECKBOX" | "TEXT";

interface Question {
  text: string;
  type: QuestionType;
  options?: string | null;
  correctAnswer?: string | null;
}

export interface QuizPayload {
  title: string;
  questions: Question[];
}

interface Props {
  onSubmit: (quiz: QuizPayload) => void;
  isLoading?: boolean;
}

const questionSchema = z
  .object({
    text: z.string().min(1, "Question cannot be empty."),
    type: z.enum(["BOOLEAN", "CHECKBOX", "TEXT"]),
    options: z.string().optional(),
    correctAnswer: z.string().optional(),
    correctCheckboxAnswers: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "TEXT" && !data.correctAnswer) {
        return false;
      }
      if (data.type === "BOOLEAN" && data.correctAnswer === undefined) {
        return false;
      }
      if (
        data.type === "CHECKBOX" &&
        (!data.correctCheckboxAnswers ||
          data.correctCheckboxAnswers.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please indicate the correct answer.",
      path: ["correctAnswer"],
    }
  );

const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required."),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required."),
});

type QuizFormValues = z.infer<typeof quizSchema>;

const CreateQuizForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  const handleAddQuestion = () => {
    append({ 
      text: "", 
      type: "BOOLEAN", 
      options: "", 
      correctAnswer: "true",
      correctCheckboxAnswers: []
    });
  };

  const submitForm = async (data: QuizFormValues) => {
    try {
      const payload: QuizPayload = {
        title: data.title,
        questions: data.questions.map((q) => {
          const question: any = {
            type: q.type,
            text: q.text
          };

          if (q.type === 'CHECKBOX') {
            const options = q.options
              ?.split(',')
              .map(o => o.trim())
              .filter(Boolean) || [];
            
            question.options = JSON.stringify(options);
            
            if (q.correctCheckboxAnswers?.length) {
              question.correctAnswer = JSON.stringify(
                options.filter(opt => q.correctCheckboxAnswers?.includes(opt))
              );
            }
          } else if (q.type === 'TEXT' && q.correctAnswer) {
            question.correctAnswer = q.correctAnswer;
          } else if (q.type === 'BOOLEAN' && q.correctAnswer) {
            question.correctAnswer = q.correctAnswer;
          }

          return question;
        }),
      };

      await onSubmit(payload);
      
      reset({
        title: '',
        questions: []
      });

      toast.success('Quiz created successfully!');
    } catch (error) {
      toast.error('Error creating quiz. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
      <h1 className={styles.title}>Create New Quiz</h1>

      <div className={styles.formGroup}>
        <label htmlFor="title">Quiz Title</label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Enter quiz title"
          disabled={isLoading}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </div>

      <h3>Questions</h3>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.questionCard}>
          <button
            type="button"
            onClick={() => remove(index)}
            className={styles.removeButton}
            disabled={isLoading}
          >
            ×
          </button>

          <div className={styles.formGroup}>
            <label htmlFor={`question-${index}`}>Question Text</label>
            <input
              id={`question-${index}`}
              type="text"
              {...register(`questions.${index}.text`)}
              placeholder="Enter question"
              disabled={isLoading}
            />
            {errors.questions?.[index]?.text && (
              <span className={styles.error}>
                {errors.questions[index]?.text?.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`type-${index}`}>Answer Type</label>
            <select
              id={`type-${index}`}
              {...register(`questions.${index}.type`)}
              disabled={isLoading}
            >
              <option value="BOOLEAN">True/False</option>
              <option value="CHECKBOX">Multiple Choice</option>
              <option value="TEXT">Text Answer</option>
            </select>
          </div>

          {watchQuestions?.[index]?.type === "CHECKBOX" ? (
            <>
              <div className={styles.optionsInput}>
                <label htmlFor={`options-${index}`}>
                  Answer Options (separate with commas)
                </label>
                <input
                  id={`options-${index}`}
                  type="text"
                  {...register(`questions.${index}.options`)}
                  placeholder="For example: Option 1, Option 2, Option 3"
                  disabled={isLoading}
                />
              </div>
              {watchQuestions[index]?.options && (
                <div className={styles.correctAnswerInput}>
                  <label>Mark the correct answers:</label>
                  <div className={styles.checkboxOptions}>
                    {watchQuestions[index]?.options
                      ?.split(',')
                      .map(option => option.trim())
                      .filter(Boolean)
                      .map((option, optionIndex) => (
                        <label key={optionIndex} className={styles.checkboxOption}>
                          <input
                            type="checkbox"
                            value={option}
                            {...register(`questions.${index}.correctCheckboxAnswers`)}
                            disabled={isLoading}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                  </div>
                  {errors.questions?.[index]?.correctCheckboxAnswers && (
                    <span className={styles.error}>
                      {errors.questions[index]?.correctCheckboxAnswers?.message}
                    </span>
                  )}
                </div>
              )}
            </>
          ) : watchQuestions?.[index]?.type === "BOOLEAN" ? (
            <div className={styles.correctAnswerInput}>
              <label>Correct Answer</label>
              <div className={styles.booleanOptions}>
                <label>
                  <input
                    type="radio"
                    value="true"
                    {...register(`questions.${index}.correctAnswer`)}
                    disabled={isLoading}
                  />
                  <span>True</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    {...register(`questions.${index}.correctAnswer`)}
                    disabled={isLoading}
                  />
                  <span>False</span>
                </label>
              </div>
              {errors.questions?.[index]?.correctAnswer && (
                <span className={styles.error}>
                  {errors.questions[index]?.correctAnswer?.message}
                </span>
              )}
            </div>
          ) : watchQuestions?.[index]?.type === "TEXT" && (
            <div className={styles.correctAnswerInput}>
              <label htmlFor={`correct-answer-${index}`}>
                Correct Answer
              </label>
              <input
                id={`correct-answer-${index}`}
                type="text"
                {...register(`questions.${index}.correctAnswer`)}
                placeholder="Enter correct answer"
                disabled={isLoading}
              />
              {errors.questions?.[index]?.correctAnswer && (
                <span className={styles.error}>
                  {errors.questions[index]?.correctAnswer?.message}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddQuestion}
        className={styles.addButton}
        disabled={isLoading}
      >
        + Add Question
      </button>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || fields.length === 0}
      >
        {isLoading ? "Saving..." : "Save Quiz"}
      </button>
    </form>
  );
};

export default CreateQuizForm;
