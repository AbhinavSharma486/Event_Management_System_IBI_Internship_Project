import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from "./components/Navbar";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
