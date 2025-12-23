import React, { lazy, useEffect, useRef } from 'react';
import { useRecruiter } from '../context/RecruiterContext';
import RecruiterDashboard from '../components/RecruiterDashboard';

const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));
const Contact = lazy(() => import('../components/Contact'));
import LabsTeaser from '../components/LabsTeaser';
import { BootSequence } from '../components/BootSequence';

const Home: React.FC = () => {
    const { isRecruiterMode } = useRecruiter();
    const hasNotified = useRef(false);

    const [booted, setBooted] = React.useState(false);

    useEffect(() => {
        const sessionKey = 'visitor_notified';
        if (!sessionStorage.getItem(sessionKey) && !hasNotified.current) {
            hasNotified.current = true; // Prevent double firing in strict mode
            fetch('/api/telegram', { method: 'POST' })
                .then(() => sessionStorage.setItem(sessionKey, 'true'))
                .catch(err => console.error('Notify failed', err));
        }
    }, []);

    if (isRecruiterMode) {
        return (
            <main>
                <RecruiterDashboard />
                {/* Optional: Show selected sections below dashboard if needed, or just specific ones */}
                <section id="projects"><Projects /></section>
                <section id="skills"><Skills /></section>
            </main>
        );
    }

    return (
        <main>
            {!booted && <BootSequence onComplete={() => setBooted(true)} />}
            {booted && (
                <>
                    <section id="hero"><Hero /></section>
                    <LabsTeaser />
                    <section id="about"><About /></section>
                    <section id="skills"><Skills /></section>
                    <section id="projects"><Projects /></section>
                    <section id="experience"><Experience /></section>
                    <section id="contact"><Contact /></section>
                </>
            )}
        </main>
    );
};

export default Home;
