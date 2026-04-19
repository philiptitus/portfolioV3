# Philip Titus | AI-Powered Portfolio Frontend

This is the frontend for the **Philip Titus Portfolio V3**, a modern, high-performance web application built with Next.js and TypeScript. It features a sleek, designer-inspired UI and integrates with a custom AI chatbot powered by Google Gemini.

## 🚀 Features

- **AI Chatbot**: Real-time conversational agent "Philip AI" powered by Gemini 2.5-Flash, maintaining session history via Redis.
- **Dynamic Portfolio**: Showcase of projects categorized by tier (S, A, B) and technical stack.
- **Technical Blog**: Integrated blog reader supporting technical articles and AI/ML insights.
- **Interactive Experience**: Smooth animations using Framer Motion and a "Behind the Screens" section for personal branding.
- **Modern UI/UX**: Clean aesthetic inspired by premium design patterns, featuring a violet-primary color scheme and responsive grid layouts.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [SWR](https://swr.vercel.app/) / Fetch API

## 📁 Project Structure

```text
frontend/
├── components/         # Reusable UI components (buttons, cards, etc.)
│   ├── ui/             # Radix-based primitives (Shadcn)
│   └── chatbot/        # AI Chatbot interface components
├── hooks/              # Custom React hooks (use-toast, use-chatbot, etc.)
├── app/                # Next.js App Router (pages & layouts)
│   ├── blogs/          # Blog listing and detail pages
│   ├── portfolios/     # Project showcase
│   └── api/            # Client-side API route handlers
├── data/               # Mock data for local development/testing
├── public/             # Static assets (images, icons, resumes)
└── lib/                # Utility functions and shared constants
```

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### 2. Installation
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of the frontend directory:

```env
NEXT_PUBLIC_LOCAL_URL=http://127.0.0.1:8000/api/
```

### 4. Development
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

## 🎨 Design Philosophy

The frontend follows the **Sruthi Designs** reference guide:
- **Color Palette**: Primary Purple (`#6B46C1`), Secondary Grays (`#1A1A1A`, `#666666`), and Clean White (`#FFFFFF`).
- **Typography**: High readability with a focus on line heights (1.6–1.8) and clear heading hierarchies.
- **Micro-interactions**: Subtle hover scales on cards (1.02x) and smooth transition effects to reduce perceived load times.

## 🤖 AI Chatbot Integration

The frontend communicates with the `portfolio_chatbot` service. 
- **Endpoint**: `/api/chatbot/chat/`
- **Session Management**: Uses UUIDs generated on the client and stored in Redis server-side to persist conversation history.

## 📊 Data & Mocking

During development, the frontend can use the static data located in `frontend/data/mock-data.ts`. This allows for UI building without a live connection to the Django backend.

## 🚢 Deployment

The application is optimized for deployment on **Vercel**:
```bash
npm run build
```
Ensure all environment variables are configured in the Vercel dashboard.

---
*Developed with ❤️ by Philip Titus*
<!-- 
[PROMPT_SUGGESTION]How can I improve the accessibility of my portfolio frontend components?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you help me write a useChatbot hook to handle the API calls to the Gemini backend?[/PROMPT_SUGGESTION]
-->