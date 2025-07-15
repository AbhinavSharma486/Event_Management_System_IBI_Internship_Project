# Event Management System – Frontend

This is the frontend for the Event Management System, built with React, Redux Toolkit, Tailwind CSS, and Vite. It provides a modern, responsive UI for event creation, management, and participation.

---

## Tech Stack
- **React** (with hooks)
- **Redux Toolkit** (state management)
- **Tailwind CSS** (styling)
- **Vite** (build tool)
- **Framer Motion, React Router, React Toastify, Recharts** (UI/UX)

---

## Directory Structure
```
Frontend/
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── eslint.config.js        # ESLint config
├── index.html              # App entry point
├── src/
│   ├── App.jsx             # Main app component
│   ├── App.css, index.css  # Global styles
│   ├── main.jsx            # React entry point
│   ├── store.js            # Redux store setup
│   ├── lib/
│   │   └── axios.js        # Axios instance for API
│   ├── slices/
│   │   ├── authSlice.js    # Auth state
│   │   └── eventSlice.js   # Event state
│   ├── pages/
│   │   ├── CalendarPage.jsx
│   │   ├── CreateEventPage.jsx
│   │   ├── EventDetailsPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── RegisterPage.jsx
│   └── components/
│       ├── Navbar.jsx, Footer.jsx
│       ├── Events/
│       │   ├── EventCard.jsx
│       │   └── DeleteConfirmationModal.jsx
│       └── LandingPage/
│           └── CTASection.jsx
```

---

## Setup & Installation

1. **Install dependencies:**
   ```bash
   cd Frontend
   npm install
   ```
2. **Set up environment variables (if needed):**
   - Create a `.env` file in the Frontend directory:
     ```env
     VITE_API_URL=http://localhost:5000
     ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## Scripts (package.json)
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code

---

## Main Dependencies
- react, react-dom, react-router-dom, redux, @reduxjs/toolkit, react-redux, axios, tailwindcss, framer-motion, date-fns, lucide-react, react-toastify, recharts, redux-persist, zustand
- dev: vite, eslint, tailwindcss, postcss, autoprefixer, @vitejs/plugin-react, @eslint/js, etc.

---

## State Management
- **Redux Toolkit**: All state is managed in `src/slices/` (authSlice.js, eventSlice.js)
- **Store**: Configured in `src/store.js` with redux-persist for persistence

---

## API Setup
- **Axios Instance**: `src/lib/axios.js` sets up the base URL and credentials for API calls
- All API endpoints are called via this instance

---

## Key Files
- **App.jsx**: Main app layout and routes
- **store.js**: Redux store setup
- **slices/**: Auth and event state logic
- **pages/**: Main app pages (events, calendar, profile, etc.)
- **components/**: Reusable UI components
- **lib/axios.js**: API setup

---

## Configuration Files
- **vite.config.js**: Vite build and plugin config
- **tailwind.config.js**: Tailwind CSS setup (dark mode, content paths)
- **postcss.config.js**: PostCSS plugins (tailwindcss, autoprefixer)
- **eslint.config.js**: ESLint rules for code quality

---

## Troubleshooting & Tips
- **API errors**: Check VITE_API_URL and backend server status
- **Styling issues**: Ensure Tailwind is built and imported
- **Redux errors**: Check slices and store setup
- **Port conflicts**: Default Vite port is 5173

---

## Contributing & Support
- PRs welcome! For major changes, open an issue first.
- For full-stack context, see the root [README.md](../README.md) and [Backend/README.md](../Backend/README.md)
- For questions, open an issue or contact the maintainer.

---