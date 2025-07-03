import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateEventPage from './pages/CreateEventPage';
import CalendarPage from "./pages/CalendarPage";

const fadeUpVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

function App() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
