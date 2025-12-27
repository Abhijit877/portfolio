import { Suspense, useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { RecruiterProvider } from './context/RecruiterContext';
import { UIProvider } from './context/UIContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import Home from './pages/Home';
import RoundCrossGame from './pages/RoundCrossGame';
import DocumentConverter from './pages/DocumentConverter';
import TypingTest from './pages/TypingTest';
import MarkdownConverter from './pages/MarkdownConverter';
import Assistant from './pages/Assistant';
import Labs from './pages/Labs';
import ScrollToTop from './components/ScrollToTop';
import RecruiterMode from './pages/RecruiterMode';
import SmoothScroll from './components/SmoothScroll';

function App() {
  useEffect(() => {
    clarity.init('us0a7x7gzy');
  }, []);

  return (
    <ThemeProvider>
      <RecruiterProvider>
        <UIProvider>
          <Router>
            <ScrollToTop />
            <SmoothScroll />
            <LayoutGroup>
              <div className="min-h-screen bg-background-primary text-text-primary transition-colors duration-300 font-sans selection:bg-accent-primary selection:text-white">
                <Header />
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen bg-background-primary">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/labs" element={<Labs />} />
                    <Route path="/labs/assistant" element={<Assistant />} />
                    <Route path="/labs/minimax" element={<RoundCrossGame />} />
                    <Route path="/labs/converter" element={<DocumentConverter />} />
                    <Route path="/labs/typing-test" element={<TypingTest />} />
                    <Route path="/labs/markdown" element={<MarkdownConverter />} />
                    <Route path="/recruiter" element={<RecruiterMode />} />

                  </Routes>
                </Suspense>
                <Footer />
                <AIChatWidget />
              </div>
            </LayoutGroup>
          </Router>
        </UIProvider>
      </RecruiterProvider>
    </ThemeProvider>
  );
}

export default App;
