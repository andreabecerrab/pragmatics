import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import welcomeImage from './assets/img/welcome.png';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import SessionPage from './pages/SessionPage';
import LiveSessionPage from './pages/LiveSessionPage';

function WelcomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-screen" aria-hidden="true">
      <img className="welcome-screen__image" src={welcomeImage} alt="" />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/' && <WelcomeIntro />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills/:personId" element={<SkillsPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/live/session" element={<LiveSessionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
