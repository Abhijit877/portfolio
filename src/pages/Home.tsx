import React, { lazy } from 'react';

const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const Contact = lazy(() => import('../components/Contact'));
import LabsShowcase from '../components/LabsShowcase';

const Home: React.FC = () => {
    return (
        <main>
            <section id="hero"><Hero /></section>
            <LabsShowcase />
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="experience"><Experience /></section>
            <section id="contact"><Contact /></section>
        </main>
    );
};

export default Home;
