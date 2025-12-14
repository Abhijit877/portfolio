import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RecruiterProvider } from './context/RecruiterContext';
import { UIProvider } from './context/UIContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import Home from './pages/Home';
import RoundCrossGame from './pages/RoundCrossGame';

function App() {
  return (
    <ThemeProvider>
      <RecruiterProvider>
        <UIProvider>
          <Router>
            <div className="min-h-screen bg-background-primary text-text-primary transition-colors duration-300 font-sans selection:bg-accent-primary selection:text-white">
              <Header />
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen bg-background-primary">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/labs/round-cross-ai" element={<RoundCrossGame />} />
                </Routes>
              </Suspense>
              <Footer />
              <AIChatWidget />
            </div>
          </Router>
        </UIProvider>
      </RecruiterProvider>
    </ThemeProvider>
  );
}

export default App;
