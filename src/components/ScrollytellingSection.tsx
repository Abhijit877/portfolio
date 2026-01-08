import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollytellingStep {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
}

interface ScrollytellingSectionProps {
    steps: ScrollytellingStep[];
    title?: string;
    subtitle?: string;
}

const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
    steps,
    title = "The Journey",
    subtitle = "Scroll to explore"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Image sequence effect - interpolate between different visual states
    const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, -5]);
    const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1.1, 1.2]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    // Visual overlay color shift
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

    // Progress indicator
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] bg-background-secondary"
        >
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-line/20 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                    style={{ width: progressWidth }}
                />
            </div>

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                {/* Background Layer with Parallax */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary"
                    style={{ y: backgroundY }}
                />

                {/* Noise Texture */}
                <div className="absolute inset-0 noise-texture opacity-20" />

                {/* Animated Glow Orbs - Apple style */}
                <motion.div
                    className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(91, 141, 239, 0.3) 0%, transparent 70%)',
                        opacity: overlayOpacity,
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                        opacity: overlayOpacity,
                    }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Animated Visual */}
                    <motion.div
                        className="relative aspect-square max-h-[50vh] lg:max-h-[60vh] rounded-3xl overflow-hidden"
                        style={{
                            scale: imageScale,
                            opacity: imageOpacity,
                            rotateZ: imageRotate,
                        }}
                    >
                        {/* Glass Card Container */}
                        <div className="absolute inset-0 glass-premium rounded-3xl border border-glass-border">
                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

                            {/* Gradient Overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/20"
                                style={{ opacity: overlayOpacity }}
                            />

                            {/* Center Visual Element */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="relative"
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 60,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    {/* Orbital rings */}
                                    <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 border border-accent-primary/20 rounded-full" />
                                    <div className="absolute inset-4 w-40 h-40 md:w-56 md:h-56 border border-accent-secondary/30 rounded-full" style={{ transform: 'rotate(45deg)' }} />
                                    <div className="absolute inset-8 w-32 h-32 md:w-48 md:h-48 border border-accent-primary/40 rounded-full" style={{ transform: 'rotate(-30deg)' }} />
                                </motion.div>

                                {/* Center Logo */}
                                <motion.div
                                    className="absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow-strong"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <span className="text-3xl md:text-4xl font-bold text-white">AB</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <div className="relative space-y-8">
                        {/* Section Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-sm font-medium text-accent-primary uppercase tracking-widest mb-3">
                                {subtitle}
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                                {title}
                            </h2>
                        </motion.div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <StepItem
                                    key={step.id}
                                    step={step}
                                    index={index}
                                    scrollProgress={scrollYProgress}
                                    totalSteps={steps.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Individual Step Component
interface StepItemProps {
    step: ScrollytellingStep;
    index: number;
    scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    totalSteps: number;
}

const StepItem: React.FC<StepItemProps> = ({
    step,
    index,
    scrollProgress,
    totalSteps
}) => {
    const stepStart = index / totalSteps;
    const stepEnd = (index + 1) / totalSteps;

    const isActive = useTransform(
        scrollProgress,
        (progress) => progress >= stepStart && progress < stepEnd
    );

    const opacity = useTransform(
        scrollProgress,
        [stepStart - 0.1, stepStart, stepEnd - 0.05, stepEnd + 0.1],
        [0.3, 1, 1, 0.3]
    );

    const x = useTransform(
        scrollProgress,
        [stepStart - 0.1, stepStart],
        [20, 0]
    );

    return (
        <motion.div
            style={{ opacity, x }}
            className="relative pl-8 border-l-2 border-line/30 hover:border-accent-primary/50 transition-colors duration-300"
        >
            {/* Step Indicator Dot */}
            <motion.div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-accent-primary transition-colors duration-300"
                style={{
                    backgroundColor: useTransform(isActive, (active) => active ? 'var(--accent-primary)' : 'transparent'),
                }}
            />

            {/* Content */}
            <div>
                {step.subtitle && (
                    <p className="text-xs font-semibold text-accent-primary uppercase tracking-wider mb-1">
                        {step.subtitle}
                    </p>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                    {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

export default ScrollytellingSection;
