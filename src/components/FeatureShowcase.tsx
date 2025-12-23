import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity SVGs with Electric Purple and Silver tones
const EngineeringSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="eng-grad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <filter id="glow-eng" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "100px" }}
        >
            <circle cx="100" cy="100" r="60" stroke="url(#eng-grad)" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="100" cy="100" r="45" stroke="#4B5563" strokeWidth="1" strokeOpacity="0.5" />
        </motion.g>
        <path d="M100 40 L100 160 M40 100 L160 100" stroke="url(#eng-grad)" strokeWidth="1" strokeOpacity="0.3" />
        <rect x="75" y="75" width="50" height="50" rx="4" stroke="#A855F7" strokeWidth="2" fill="none" filter="url(#glow-eng)" />
        <circle cx="100" cy="100" r="8" fill="#E2E8F0" />
    </svg>
);

const AISVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ai-grad" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <filter id="glow-ai" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <motion.g>
            {[...Array(6)].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={100 + Math.cos(i * 1.05) * 50}
                    cy={100 + Math.sin(i * 1.05) * 50}
                    r="6"
                    fill="#A855F7"
                    filter="url(#glow-ai)"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
            ))}
        </motion.g>
        <path d="M100 100 L150 100 M100 100 L50 100 M100 100 L75 143 M100 100 L125 143 M100 100 L75 57 M100 100 L125 57" stroke="url(#ai-grad)" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="15" fill="url(#ai-grad)" filter="url(#glow-ai)" />
        <circle cx="100" cy="100" r="25" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
    </svg>
);

const CloudSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        <motion.path
            d="M50 120 C30 120 20 100 35 90 C35 60 60 50 80 60 C90 30 130 30 140 60 C170 50 180 90 160 100 C180 120 160 140 130 140 L60 140 C40 140 30 130 50 120"
            stroke="url(#cloud-grad)"
            strokeWidth="2"
            fill="url(#cloud-grad)"
            fillOpacity="0.1"
            initial={{ y: 5 }}
            animate={{ y: -5 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <rect x="70" y="100" width="60" height="15" rx="2" fill="#1E293B" stroke="#64748B" />
        <rect x="70" y="80" width="60" height="15" rx="2" fill="#1E293B" stroke="#64748B" />
        <rect x="70" y="120" width="60" height="15" rx="2" fill="#1E293B" stroke="#64748B" />
        <motion.circle cx="150" cy="50" r="4" fill="#3B82F6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="40" cy="80" r="3" fill="#A855F7" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </svg>
);

const features = [
    {
        id: "engineering",
        title: "Engineering",
        visual: <EngineeringSVG />,
    },
    {
        id: "ai",
        title: "AI Development",
        visual: <AISVG />,
    },
    {
        id: "cloud",
        title: "Cloud Architecture",
        visual: <CloudSVG />,
    }
];

const FeatureShowcase: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % features.length);
        }, 2000); // 2 seconds per slide
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: { opacity: 0, x: 50, scale: 0.95 },
        center: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: -50, scale: 0.95 }
    };

    return (
        <div className="w-full flex-col flex items-center h-full">
            <div className="relative w-full h-full bg-[#000000] border border-transparent rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-8"
                style={{
                    borderImage: 'linear-gradient(to bottom right, #A855F7, #3B82F6) 1',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '16px' // Fallback/Constraint
                }}>

                {/* Floating Animation Wrapper for the SVG Content */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-[60%] flex items-center justify-center mb-4 relative z-10"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={currentIndex}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute inset-0 flex items-center justify-center"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50) {
                                    setCurrentIndex((prev) => (prev + 1) % features.length);
                                } else if (swipe > 50) {
                                    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
                                }
                            }}
                        >
                            <div className="w-48 h-48 md:w-64 md:h-64 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                {features[currentIndex].visual}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Indicators */}
                <div className="absolute bottom-6 flex gap-2">
                    {features.map((_, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                width: idx === currentIndex ? 32 : 8,
                                backgroundColor: idx === currentIndex ? '#A855F7' : '#334155'
                            }}
                            className="h-1.5 rounded-full"
                        />
                    ))}
                </div>

                {/* Title Label (Optional but good for context if the icon isn't clear) */}
                <div className="absolute top-6 right-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={features[currentIndex].title}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-xs font-mono tracking-widest text-[#A855F7] uppercase bg-white/5 px-2 py-1 rounded"
                        >
                            {features[currentIndex].title}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FeatureShowcase;
