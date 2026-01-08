import React, { useEffect, useRef, useState } from 'react';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { FiMessageCircle, FiDownload, FiArrowRight } from 'react-icons/fi';
import Button from '../Button';
import ProfileSketch from '../ProfileSketch';
import DecayText from '../react-bits/DecayText';
import Particles from '../react-bits/Particles';
import Magnet from '../react-bits/Magnet';

// Metrics from CV
const metrics = [
    { value: '45%', label: 'Quote Cycle Reduction' },
    { value: '60%', label: 'Pipeline Visibility' },
    { value: '30%', label: 'Efficiency Boost' },
];

const EliteHero: React.FC = () => {
    const { setHeroInView } = useUI();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setHeroInView(isInView);
    }, [isInView, setHeroInView]);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const { scrollY } = useScroll();
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background-primary"
        >
            {/* Particles Background */}
            <Particles
                className="absolute inset-0 z-0"
                quantity={60}
                staticity={30}
                ease={80}
                size={0.5}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-primary/50 to-background-primary z-[1]" />

            {/* Main Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-7xl px-6 md:px-12 py-8 md:py-12">

                {/* LEFT - Text Content */}
                <div className="flex flex-col justify-center items-center lg:items-start space-y-5 order-2 lg:order-1">

                    {/* Mono Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-mono text-xs uppercase tracking-[0.3em] text-accent-primary"
                    >
                        Dynamics 365 CE Specialist
                    </motion.span>

                    {/* Main Headline with DecayText */}
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center lg:text-left leading-[1.05]">
                        <DecayText
                            text="Engineering"
                            className="text-text-primary"
                        />
                        <DecayText
                            text="Enterprise-Grade"
                            className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                        />
                        <DecayText
                            text="CRM Architecture"
                            className="text-text-primary"
                        />
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-text-secondary text-lg md:text-xl max-w-lg text-center lg:text-left leading-relaxed"
                    >
                        3+ years crafting high-performance CRM solutions, PCF components, and automation workflows that drive measurable business impact.
                    </motion.p>

                    {/* Metrics Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                    >
                        {metrics.map((metric, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center lg:items-start px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <span className="text-2xl md:text-3xl font-bold text-accent-primary">{metric.value}</span>
                                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{metric.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons with Magnet */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
                    >
                        <Magnet magnetStrength={3}>
                            <Button
                                href="/Abhijit-Behera-CV.pdf"
                                variant="primary"
                                icon={<FiDownload />}
                            >
                                Download Resume
                            </Button>
                        </Magnet>
                        <Magnet magnetStrength={3}>
                            <Button
                                href="#contact"
                                variant="secondary"
                                icon={<FiMessageCircle />}
                            >
                                Let's Connect
                            </Button>
                        </Magnet>
                    </motion.div>
                </div>

                {/* RIGHT - ProfileSketch SVG (Kept from original) */}
                <motion.div
                    className="flex justify-center items-center order-1 lg:order-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] aspect-square flex items-center justify-center">
                        <ProfileSketch />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-secondary z-20"
            >
                <span className="text-xs font-mono uppercase tracking-[0.2em]">Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center w-6 h-10 rounded-full border border-line/50"
                >
                    <FiArrowRight className="rotate-90 text-accent-primary" />
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(to bottom, transparent, var(--bg-primary))'
                }}
            />
        </section>
    );
};

export default EliteHero;
