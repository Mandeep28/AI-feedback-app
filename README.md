# Insights-AI 🎤🤖

**Insights-AI** is a web application that allows users to upload interview recordings (audio or video) and get **AI-powered insights** to improve their performance.  
The app is designed to help both **candidates** and **recruiters** by analyzing interview recordings and providing meaningful feedback.

🔗 **Live Demo**: [https://insights-ai-app.vercel.app/](https://insights-ai-app.vercel.app/)

---

## 🚀 Project Overview

Insights-AI provides an intuitive interface where users can:
- Upload an **audio** or **video** recording of their interview.
- Select whether they are a **Candidate** or a **Recruiter**.
- Add optional **additional information** or context about the interview.
- Get **AI-generated insights** to enhance their preparation or evaluation process.

The platform is designed with a **clean, ChatGPT-like layout**:
- **Left Sidebar**: Shows previous chats/sessions.
- **Right Panel**: Contains the current chat interface with upload and input options.

---

## 🛠️ Tech Stack

- **Next.js** – React framework for building fast, modern web apps.
- **shadcn/ui** – Component library for accessible, styled UI.
- **React Hook Form + Zod** – Form handling and schema validation.
- **Sonner** – For beautiful toast notifications.
- **Vercel** – Hosting and deployment.

---

## ✨ Features

- 📂 File Upload (supports audio & video, up to 100MB).  
- ✅ Validation (only allows audio/video, size limit).  
- 📊 Role Selection (Candidate or Recruiter).  
- 📝 Additional information input.  
- 🔔 Real-time feedback with toast notifications.  
- 🔒 Private file storage with signed URL access (expiring links for security).  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/insights-ai.git
cd insights-ai
npm install -f
npm run dev