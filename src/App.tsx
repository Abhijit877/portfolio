import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RecruiterProvider } from './context/RecruiterContext';
import Header from './components/Header';
import Footer from './components/Footer';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <ThemeProvider>
      <RecruiterProvider>
        <div className="min-h-screen bg-background-primary text-text-primary transition-colors duration-300 font-sans selection:bg-accent-primary selection:text-white">
          <Header />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-background-primary">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
            </div>
          }>
            <main>
              <section id="hero"><Hero /></section>
              <section id="about"><About /></section>
              <section id="skills"><Skills /></section>
              <section id="projects"><Projects /></section>
              <section id="experience"><Experience /></section>
              <section id="contact"><Contact /></section>
            </main>
          </Suspense>
          <Footer />
        </div>
      </RecruiterProvider>
    </ThemeProvider>
  );
}

export default App;
