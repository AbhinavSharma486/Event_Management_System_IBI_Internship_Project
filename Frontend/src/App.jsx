import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from "./components/Navbar";
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateEventPage from './pages/CreateEventPage';
import CalendarPage from "./pages/CalendarPage";
import { checkAuth } from './slices/authSlice';

const fadeUpVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

function ProtectedRoute({ children, loading }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = !!currentUser;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

// scrollToTop component 
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector(state => state.auth);
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    // only check authentication on first mount
    dispatch(checkAuth());
    // eslint-disable-next-line
  }, [dispatch]);

  // show loading only when checking auth and not authenticated yet
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col relative font-sans overflow-x-hidden">
      {/* Blurred background */}
      <div className="fixed inset-0 z-[-1] backdrop-blur-2xl bg-gradient-to-br from-blue-200/60 via-pink-200/60 to-purple-200/60 dark:from-gray-900/80 dark:via-gray-950/80 dark:to-gray-900/80" />

      <Navbar />
      <div className="flex-grow relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={
            <ProtectedRoute loading={loading}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute loading={loading}>
              <EventsPage />
            </ProtectedRoute>
          } />
          <Route path="/events/:id" element={
            <ProtectedRoute loading={loading}>
              <EventDetailsPage />
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={
            <ProtectedRoute loading={loading}>
              <CreateEventPage />
            </ProtectedRoute>
          } />
          <Route path="/create-event/:id" element={
            <ProtectedRoute loading={loading}>
              <CreateEventPage />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute loading={loading}>
              <CalendarPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer className="relative z-10" />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: '10px',
          fontSize: '14px',
          width: '350px',
          maxWidth: '90vw',
        }}
        bodyStyle={{
          wordBreak: 'break-word',
        }}
        className="custom-toast-responsive"
      />
    </div>
  );
}

export default App;