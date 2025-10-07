# Quiz Builder Application

A full-stack quiz creation platform built with React, TypeScript, Express, and PostgreSQL.

## 🚀 Features

- **Create quizzes** with different question types (Boolean, Text, Checkbox)
- **View all quizzes** in a clean, responsive dashboard
- **Delete quizzes** with a single click
- **Responsive design** that works on all devices
- **Form validation** using React Hook Form and Zod

## 🛠 Tech Stack

### Frontend

- React with TypeScript
- Vite (Build Tool)
- React Router (Routing)
- Redux Toolkit (State Management)
- React Hook Form + Zod (Form Handling & Validation)
- SCSS Modules (Styling)

### Backend

- Node.js with Express
- TypeScript
- Prisma (ORM)
- PostgreSQL (Database)
- CORS & Helmet (Security)

## 📦 Prerequisites

- Node.js
- npm
- PostgreSQL

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bliznyuk-yaroslav/Test-1.git
cd Test-1
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 Environment Variables

### Backend (`.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quiz_db?schema=public"
PORT=5000
```

#### Start Backend

```bash
cd backend
npm install
npm run dev
```

#### Start Frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗 Project Structure

```
quiz-builder/
├── backend/               # Express backend
│   ├── prisma/           # Database schema & migrations
│   ├── src/              # Source code
│   │   ├── controllers/  # Request handlers
│   │   ├── routers/      # API routes
│   │   └── app.ts        # Express app setup
│   └── package.json
│
├── frontend/             # React frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   └── App.tsx       # Main app component
│   └── package.json
│
└── README.md
```

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies

### Examples of backend queries

All Quiz
GET: http://localhost:5000/quizzes

Quiz ID
GET:http://localhost:5000/quizzes/{id}

Delete quiz
DELETE:http://localhost:5000/quizzes/{id}

Creating a quiz
POST: http://localhost:5000/quizzes


####Expamle JSON Body:

```
{
  "title": "Programming Basics",
  "questions": [
    {
      "type": "BOOLEAN",
      "text": "JavaScript is a programming language?",
      "correctAnswer": "true"
    },
    {
      "type": "TEXT",
      "text": "What is the operator for assigning a value to a variable?",
      "correctAnswer": "="
    },
    {
      "type": "CHECKBOX",
      "text": "Which of these are programming languages?",
      "options": "[\"Python\", \"HTML\", \"C++\"]",
      "correctAnswer": "[\"Python\",\"C++\"]"
    }
  ]
}
```
