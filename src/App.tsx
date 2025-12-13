import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-metallic-silver">Loading...</div></div>}>
        <main>
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="experience"><Experience /></section>
          <section id="contact"><Contact /></section>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
