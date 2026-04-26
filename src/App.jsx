import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnrollPopup from './components/EnrollPopup';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Results from './pages/Results';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = useCallback(() => setShowPopup(true), []);
  const closePopup = useCallback(() => setShowPopup(false), []);

  return (
    <>
      {showPopup && <EnrollPopup onClose={closePopup} />}
      <div className="flex flex-col min-h-screen">
        <Navbar onEnroll={openPopup} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onEnroll={openPopup} />} />
            <Route path="/about" element={<About onEnroll={openPopup} />} />
            <Route path="/courses" element={<Courses onEnroll={openPopup} />} />
            <Route path="/results" element={<Results onEnroll={openPopup} />} />
            <Route path="/faculty" element={<Faculty onEnroll={openPopup} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact onEnroll={openPopup} />} />
          </Routes>
        </main>
        <Footer onEnroll={openPopup} />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

