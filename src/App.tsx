import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SoundPlayer from "./utils/sounds";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Challenges from "./pages/Challenges";
import Leaderboards from "./pages/Leaderboards";
import Badges from "./pages/Badges";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import PointsShop from "./pages/PointsShop";
import TeacherPortal from "./pages/TeacherPortal";
import Contact from "./pages/Contact";
import ProfileEdit from "./pages/ProfileEdit";
import Demo from "./pages/Demo";
import SignUp from "./pages/SignUp";
import { StudentProvider } from "./contexts/StudentContext";
import { initializeData } from "./data/sampleData";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeData();
    SoundPlayer.preloadSounds();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-[#F8D991] text-xl font-semibold backdrop-blur-md bg-white/10 px-6 py-3 rounded-full">
          Loading PrismWorlds Platform...
        </div>
      </div>
    );
  }

  return (
    <StudentProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/demo" element={<Demo />} />
            <Route
              path="/teacher"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <main className="container mx-auto px-4 py-6">
                    <TeacherPortal />
                  </main>
                </div>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route
              path="/dashboard"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Dashboard />
                  </main>
                </div>
              }
            />
            <Route
              path="/lessons"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Lessons />
                  </main>
                </div>
              }
            />
            <Route
              path="/lessons/:id"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <LessonDetail />
                  </main>
                </div>
              }
            />
            <Route
              path="/challenges"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Challenges />
                  </main>
                </div>
              }
            />
            <Route
              path="/leaderboards"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Leaderboards />
                  </main>
                </div>
              }
            />
            <Route
              path="/badges"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Badges />
                  </main>
                </div>
              }
            />
            <Route
              path="/shop"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <PointsShop />
                  </main>
                </div>
              }
            />
            <Route
              path="/analytics"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Analytics />
                  </main>
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Profile />
                  </main>
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Router>
    </StudentProvider>
  );
}

export default App;
