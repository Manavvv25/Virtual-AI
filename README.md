# 🧠 Virtual AI (MERN Stack)

**Virtual AI** is a full-stack intelligent assistant built using the **MERN stack** (MongoDB, Express, React, Node.js).
It integrates **Gemini AI** (or other LLMs) to enable conversational and contextual interactions, allowing users to chat, customize responses, and experience an AI companion interface — all powered by modern web technologies.

---

## 🚀 Features

* 💬 **Conversational AI:** Integrated with Gemini API for intelligent, context-aware replies.
* 🧍‍♂️ **User Authentication:** Secure login and registration using JWT and bcrypt.
* 📸 **Media Handling:** File upload via Multer and Cloudinary for cloud storage.
* 🌐 **Frontend (React):** Interactive and responsive UI using React, Context API, and Vite.
* ⚙️ **Backend (Node + Express):** REST API for authentication, AI endpoints, and user data management.
* 🧾 **Database (MongoDB):** Stores user profiles, chat history, and configurations.

---

## 🗂️ Project Structure

```
Virtual-AI/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── token.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Manavvv25/Virtual-AI.git
cd Virtual-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret
```

Then run:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧩 Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Frontend      | React, Vite, Context API       |
| Backend       | Node.js, Express.js            |
| Database      | MongoDB (Mongoose)             |
| Cloud Storage | Cloudinary                     |
| AI Model      | Gemini API / LLM integration   |
| Auth          | JWT, bcrypt                    |
| Middleware    | Multer, Custom Auth Middleware |

---

## 🛠️ Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm start`   | Run backend server              |
| `npm run dev` | Run frontend development server |
| `npm install` | Install dependencies            |

---

## 🧑‍💻 Author

**Manav Nathani**
🌐 [GitHub](https://github.com/Manavvv25)

---

## 📜 License
This project is licensed under the **MIT License** — feel free to modify and use it for learning or development.
