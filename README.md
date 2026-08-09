<div align="center">

# 🌸 Muslima Radjabova — Portfolio

### Full-Stack Developer · UI/UX Designer · Creative Coder

A **modern, responsive, and visually polished** portfolio built with React 19, TypeScript, Tailwind CSS 4 & Vite — featuring a trilingual experience, a dreamy pastel interface, project showcases, and a fully functional admin panel powered by Firebase.

<img src="https://mradjabova-portfolio.vercel.app/website.png" alt="Muslima Radjabova Portfolio preview" width="820" />

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-mradjabova--portfolio.vercel.app-FF8FAB?style=for-the-badge&logo=vercel&logoColor=white)](https://mradjabova-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-m--radjabova-1A2036?style=for-the-badge&logo=github&logoColor=white)](https://github.com/m-radjabova)

<br/>

**✦ soft interface, confident engineering ✦**

</div>

---

## ✨ Features

| | |
|---|---|
| 🌍 **Trilingual** | Full **EN / RU / UZ** translation via `i18next` with browser-language detection & `localStorage` persistence |
| 🌙 **Light & Dark themes** | System-aware theme resolution, toggleable & remembered across visits |
| ⌨️ **Typewriter Hero** | Animated headline that cycles through the developer's roles |
| 🎠 **Skills Carousel** | 13 core skills with animated progress rings + secondary toolbelt |
| 🧩 **Projects hub** | Sections for both backend-connected & design-focused projects; rich detail pages with full-screen galleries |
| 📄 **Resume studio** | In-browser preview in **3 languages** with one-click **PDF & DOCX** downloads (`jspdf` + `docx`) |
| 📬 **Contact form** | Live email delivery through **EmailJS** with form validation (`react-hook-form`) & toast feedback |
| 🎬 **Motion & polish** | Lottie loading animation, scroll-to-top, custom 404 page, glassmorphism toasts |
| 🚀 **SEO-ready** | Meta tags, Open Graph, Twitter cards, canonical URL & JSON-LD Person schema |
| 📱 **Fully responsive** | Designed with a mobile-first approach on every route |

---

## 🧰 Tech Stack

<div align="center">

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=1A2036)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](#)
[![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](#)

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=1A2036)](#)
[![EmailJS](https://img.shields.io/badge/EmailJS-00C4CC?style=flat-square&logo=gmail&logoColor=white)](#)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat-square&logo=i18next&logoColor=white)](#)
[![jsPDF](https://img.shields.io/badge/jsPDF-E74C3C?style=flat-square&logo=adobeacrobatreader&logoColor=white)](#)
[![Lottie](https://img.shields.io/badge/Lottie-00D2FF?style=flat-square&logo=lottiefiles&logoColor=white)](#)

</div>

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 19, React Router 7, TypeScript, Tailwind CSS 4, Vite 7 |
| **Forms & UI** | react-hook-form, react-toastify, react-icons, lottie-react |
| **Localization** | i18next, react-i18next (EN / RU / UZ) |
| **Backend & Data** | Firebase Auth, Cloud Firestore |
| **Services** | EmailJS (contact), jsPDF + docx (resume exports) |
| **Tooling** | ESLint 9, TypeScript ESLint, Vercel |
---

## 📁 Project Structure

```text
muslima_portfolio/
├── public/                  # Static assets (favicon, OG image, webp)
├── src/
│   ├── assets/              # Flags, portraits, resume previews, project screenshots
│   ├── components/
│   │   ├── about/           # About section + education
│   │   ├── contact/         # EmailJS contact form
│   │   ├── hero/            # Typewriter hero
│   │   ├── projects/        # Project cards, with/without backend tabs
│   │   ├── resume/          # Resume preview & download actions
│   │   ├── skills/          # Skills carousel
│   │   ├── NotFound.tsx     # Custom 404
│   │   ├── ProtectedRoute.tsx
│   │   └── IsLoading.tsx    # Lottie loading screen
│   ├── data/                # Local projects, skills, resume content
│   ├── hooks/               # Theme, loading, projects, context
│   ├── layout/              # Main / Auth / Admin layouts
│   ├── locales/             # en / ru / uz translation resources
│   ├── pages/
│   │   ├── home/            # Home page
│   │   ├── projects/        # Projects list + detail with gallery
│   │   ├── resume/          # Resume page
│   │   ├── login/           # Admin sign-in
│   │   └── admin/           # Dashboard, Projects CRUD, Users
│   ├── utils/               # PDF & DOCX resume generators
│   ├── App.tsx              # Routes
│   ├── i18n.ts              # i18next setup
│   ├── firebase.tsx         # Firebase client init
│   └── main.tsx
├── index.html               # SEO / OG / JSON-LD meta
├── vercel.json              # SPA rewrite for client-side routing
└── vite.config.ts
```

---

## 🚀 Getting Started

> **Requirements:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/m-radjabova/muslima_portfolio.git
cd muslima_portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** ✨

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your keys — the app needs **Firebase** for auth/data and **EmailJS** for the contact form.

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firestore project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics ID |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_EMAILJS_RECIPIENT_EMAIL` | Contact form recipient address |

> ⚠️ `.env` is git-ignored — never commit real credentials.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b` and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
---

## ☁️ Deployment

The project is configured for **Vercel** — `vercel.json` rewrites every route to `index.html` so React Router works on deep links:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

```bash
npm run build      # builds to dist/
vercel deploy --prod
```

---

## 🤝 Contributing

Ideas, bug reports, and pull requests are always welcome — open an issue first so we can talk it through. For major changes, please start a discussion before coding.

---

## 📬 Let's Connect

<div align="center">

[![Visit Portfolio](https://img.shields.io/badge/Visit%20Portfolio-FF8FAB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://mradjabova-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-1A2036?style=for-the-badge&logo=github&logoColor=white)](https://github.com/m-radjabova)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hello@muslimaradjabova.uz)

</div>

---

<div align="center">

*Made with 💗, clean code, and far too much pastel palette.*

**© 2025 Muslima Radjabova**

</div>
