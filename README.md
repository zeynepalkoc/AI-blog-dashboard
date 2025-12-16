# AI Blog Dashboard

A modern, full-screen **blog management dashboard** built with **React + Vite**.  
Designed for front-end developers who want to manage blog drafts, categories, and settings in a clean, professional dashboard interface.

This project focuses on **UI/UX, dashboard architecture, and product thinking**, with optional AI-assisted content generation.

---

## ✨ Features

- **Full-screen dashboard layout**
  - Fixed sidebar
  - Sticky topbar
  - Scrollable content area (real dashboard behavior)

- **Blog Draft Management**
  - Create, view, and manage blog drafts
  - Optimized for portfolio and technical blog workflows

- **Category Management**
  - Create, edit, and delete categories
  - Automatic slug generation
  - Color-coded categories
  - Stored in `localStorage`

- **Settings Panel**
  - Dark / Light theme toggle
  - Display name customization
  - Focus / motivation text
  - Persistent user preferences via `localStorage`

- **Modern UI**
  - Glassmorphism-inspired cards
  - Soft typography and spacing
  - Minimal dark dashboard design
  - Custom scrollbar styling

- **AI Integration (Optional)**
  - AI-assisted summary generation
  - Demo-safe fallback when API quota is unavailable

---

## 🧠 Project Purpose

This project is designed as a **portfolio-ready dashboard** to demonstrate:

- Component-based UI architecture
- State management with React hooks
- Dashboard layout patterns used in real products
- Clean, maintainable front-end code
- UX-focused design decisions

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **TypeScript**
- **CSS (custom, no UI library)**
- **localStorage**

---

The app will be available at:

http://localhost:5173

🔐 Environment Variables (Optional)

If you want to enable AI features, create a .env file:

VITE_OPENAI_API_KEY=your_api_key_here


⚠️ The project works without an API key using demo mode.

📁 Project Structure
src/
 ├─ pages/
 │   ├─ PostsPage.tsx
 │   ├─ CategoriesPage.tsx
 │   └─ SettingsPage.tsx
 ├─ components/
 ├─ services/
 ├─ App.tsx
 └─ App.css

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
npm install
npm run dev
