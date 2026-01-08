import React, { lazy, useEffect, useRef, useState } from 'react';
import { useRecruiter } from '../context/RecruiterContext';
import RecruiterDashboard from '../components/RecruiterDashboard';
import FuzzyOverlay from '../components/react-bits/FuzzyOverlay';

// Elite sections
const EliteHero = lazy(() => import('../components/sections/EliteHero'));
const BentoSkillsGrid = lazy(() => import('../components/sections/BentoSkillsGrid'));
const ProjectShowcase = lazy(() => import('../components/sections/ProjectShowcase'));

// Retained original sections
const Experience = lazy(() => import('../components/Experience'));
const Contact = lazy(() => import('../components/Contact'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));

import LatestThoughtsBentoCard from '../components/home/LatestThoughtsBentoCard';
import { BootSequence } from '../components/BootSequence';

const Home: React.FC = () => {
    const { isRecruiterMode } = useRecruiter();
    const hasNotified = useRef(false);

    const [booted, setBooted] = useState(false);

    useEffect(() => {
        const sessionKey = 'visitor_notified';
        if (!sessionStorage.getItem(sessionKey) && !hasNotified.current) {
            hasNotified.current = true;
            fetch('/api/telegram', { method: 'POST' })
                .then(() => sessionStorage.setItem(sessionKey, 'true'))
                .catch(err => console.error('Notify failed', err));
        }
    }, []);

    if (isRecruiterMode) {
        return (
            <main>
                <RecruiterDashboard />
                <section id="projects"><Projects /></section>
                <section id="skills"><Skills /></section>
            </main>
        );
    }

    return (
        <main className="relative">
            {/* Global Film Grain Texture */}
            <FuzzyOverlay />

            {!booted && <BootSequence onComplete={() => setBooted(true)} />}
            {booted && (
                <>
                    {/* Elite Hero with Particles & DecayText */}
                    <section id="hero">
                        <EliteHero />
                    </section>

                    {/* Bento Skills Grid with SpotlightCards */}
                    <section id="skills">
                        <BentoSkillsGrid />
                    </section>

                    {/* Project Showcase with TiltedCards */}
                    <section id="projects">
                        <ProjectShowcase />
                    </section>

                    {/* Experience Section */}

                    <section id="experience" className="py-32">
                        <Experience />
                    </section>

                    {/* Latest Blog Thoughts */}
                    <section className="py-32">
                        <LatestThoughtsBentoCard />
                    </section>

                    <section id="contact" className="py-32">
                        <Contact />
                    </section>
                </>
            )}
        </main>
    );
};

export default Home;
