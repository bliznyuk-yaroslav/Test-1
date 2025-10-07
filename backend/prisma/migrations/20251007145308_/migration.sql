-- AlterEnum
ALTER TYPE "QuestionType" ADD VALUE 'TEXT';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctAnswer" TEXT;
