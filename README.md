🚀 AI Code Reviewer

An AI-powered code review platform built with React, Node.js, and OpenAI.
Paste your code → choose programming language → get instant, structured, professional feedback.

🔗 Live Demo: https://ai-codereviewer-green.vercel.app

---

📦 Backend: Node.js + Express
🧠 AI Model: OpenAI (GPT-based)
---
📌 Features

🧠 AI-generated code reviews

🔍 Detects bugs, code smells, anti-patterns

📦 Structured output: Summary, Issues, Improvements, Best Practices

✨ Monaco Editor for smooth coding experience

🚀 Modular Node.js backend

⚡ Easy environment configuration (.env)
---
🌐 Architecture

📁 Folder Structure
```
AI-CODEREVIEW/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axiosConfig.js
│       ├── assets/
│       ├── components/
│       │   ├── ActionBar.jsx
│       │   ├── CodeEditor.jsx
│       │   ├── Navbar.jsx
│       │   └── OutputBox.jsx
│       ├── pages/
│       │   └── Home.jsx
│       ├── utils/
│       │   └── aiParser.js
│       ├── App.jsx
│       ├── main.jsx
│       ├── App.css
│       └── index.css
│
├── server/                     # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── review.controller.js
│   │   ├── routes/
│   │   │   └── review.route.js
│   │   ├── services/
│   │   │   ├── language.service.js
│   │   │   └── openai.service.js
│   │   ├── app.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md
└── package.json
```
---
🛠️ Tech Stack
---
Frontend

React (Vite)

Tailwind CSS

Monaco Editor (@monaco-editor/react)

Axios

React Icons

React Toastify
---
Backend

Node.js

Express

OpenAI SDK

dotenv

Modular controllers + services architecture
---
🔧 Environment Variables
Backend (server/.env):
OPENAI_API_KEY=your_openai_api_key
PORT=5000

Frontend (client/.env):
VITE_BACKEND_URL=http://localhost:5000
---
🚀 Running Locally
git clone https://github.com/Sagardeep20/Ai-codereviewer.git
cd AI-CODEREVIEW
---
🖥 Backend Setup (server)
Install dependencies
cd server
npm install

Start backend
npm run dev


Backend will run on:
👉 http://localhost:5000
---
💻 Frontend Setup (client)
Install dependencies
cd client
npm install

Start frontend
npm run dev

---
Frontend will run on:
👉 http://localhost:5173
---
🔗 API Endpoint
POST /api/review
Body:
{
  "code": "your code here",
  "language": "javascript"
}

Returns structured AI review:

summary

issues

improvements

best practices
---
📘 Future Enhancements

Support for multi-file uploads

Code auto-fix / refactoring suggestions

GitHub PR integration

Dark/Light theme

Full project history for users
---
👤 Author

Sagardeep Choudhury
📧 Email: sagardeepchoudhury01@gmail.com
