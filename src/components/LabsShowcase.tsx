import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FiCpu, FiMessageSquare, FiTerminal, FiArrowRight, FiFileText, FiActivity, FiCode } from 'react-icons/fi';
import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';

const labs = [
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        subtitle: 'GPT-4o Stream',
        description: 'Interactive AI companion capable of answering questions about my portfolio and skills.',
        icon: <FiMessageSquare />,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'hover:border-green-500',
        link: '/labs/assistant',
        cta: 'Open Playground'
    },
    {
        id: 'minimax',
        title: 'Minimax Game',
        subtitle: 'Unbeatable AI',
        description: 'A classic game implementation using the Minimax algorithm. Challenge the AI if you dare.',
        icon: <FiCpu />,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'hover:border-accent-secondary',
        link: '/labs/minimax',
        cta: 'Play Game'
    },
    {
        id: 'doc-converter',
        title: 'Doc Converter',
        subtitle: 'img/html into PDF',
        description: 'Client-side utility to convert HTML and Images into standard PDF documents.',
        icon: <FiFileText />,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'hover:border-blue-500',
        link: '/labs/converter',
        cta: 'Convert Files'
    },
    {
        id: 'typing-test',
        title: 'Typing Test',
        subtitle: 'Code Speed & Accuracy',
        description: 'Test your coding speed with real snippet challenges.',
        icon: <FiActivity />,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        border: 'hover:border-purple-500',
        link: '/labs/typing-test',
        cta: 'Start Test'
    },
    {
        id: 'markdown-preview',
        title: 'Markdown Preview',
        subtitle: 'Live & Sanitized',
        description: 'Real-time markdown editor with secure HTML rendering.',
        icon: <FiCode />,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        border: 'hover:border-yellow-500',
        link: '/labs/markdown',
        cta: 'Open Editor'
    }
];

const RolodexCard = ({ data, index, progress, total }: { data: any, index: number, progress: MotionValue<number>, total: number }) => {
    const ui = useUI();

    // Calculate the 'phase' for this card based on scroll progress
    // We want the card to be 'active' (0deg rotation) when progress is at a specific point
    const step = 1 / total;
    const center = step * index;

    // Transform props based on distance from center
    // Input range: [center - step, center, center + step]
    // We expand the range slightly to make transitions smoother

    // Rotation: Tilted away when above/below, flat when center
    const rotateX = useTransform(progress,
        [center - step * 1.5, center, center + step * 1.5],
        [45, 0, -45] // Enters from bottom (45deg), flat at center, exits top (-45deg)
    );

    // Opacity: Fades in/out
    const opacity = useTransform(progress,
        [center - step, center, center + step],
        [0.3, 1, 0.3]
    );

    // Scale: Small when away, full when center
    const scale = useTransform(progress,
        [center - step, center, center + step],
        [0.8, 1, 0.8]
    );

    // Z-Index: Active card on top
    // const zIndex = useTransform(progress, [center - 0.1, center, center + 0.1], [0, 10, 0]); // Motion value for z-index tricky, CSS Better?
    // We'll use a manually calculated z-index shim or just reliance on DOM order + pointer-events

    // Y Position: Moves up the screen
    // But in a pure sticky setup, we might purely rely on rotation or absolute positioning.
    // Let's create a "Visual Y" offset to separate them even if they are stacked
    const y = useTransform(progress,
        [center - step * 2, center, center + step * 2],
        ['100%', '0%', '-100%']
    );

    return (
        <motion.div
            style={{
                rotateX,
                scale,
                opacity,
                y,
                transformPerspective: 1000,
                zIndex: index // DOM order usually sufficient if we managing visibility
            }}
            className={`absolute w-full max-w-3xl h-[400px] p-10 rounded-3xl border border-line bg-background-primary/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden ${data.border} transition-colors duration-300 origin-center`}
        >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-80 h-80 ${data.bg} blur-[100px] rounded-full opacity-30`} />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className={`p-5 rounded-2xl ${data.bg} ${data.color} text-4xl`}>
                        {data.icon}
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-50">Experiment 0{index + 1}</span>
                    </div>
                </div>

                <h3 className="text-4xl font-bold mb-3 text-text-primary">{data.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${data.color}`}>{data.subtitle}</p>

                <p className="text-text-secondary text-xl leading-relaxed max-w-xl">
                    {data.description}
                </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-line/50">
                {data.link ? (
                    <Link
                        to={data.link}
                        className={`group inline-flex items-center space-x-3 text-lg font-bold ${data.color} hover:opacity-80 transition-opacity`}
                    >
                        <span>{data.cta}</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <button
                        onClick={() => data.action && data.action(ui)}
                        className={`group inline-flex items-center space-x-3 text-lg font-bold ${data.color} hover:opacity-80 transition-opacity`}
                    >
                        <span>{data.cta}</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const LabsShowcase: React.FC = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative bg-background-secondary/30 pb-20 mt-20">
            {/* Height determines scroll length - longer for smoother rolodex */}
            <div className="h-[400vh] relative">

                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden perspective-container">

                    {/* Header */}
                    <div className="absolute top-10 z-20 text-center">
                        <h2 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3 mb-4">
                            <FiTerminal className="text-accent-primary" />
                            Engineering Labs <span className="px-3 py-1 rounded-full bg-accent-primary text-xs text-white uppercase tracking-wider">Beta</span>
                        </h2>
                        <p className="text-lg text-text-secondary">Scroll to cycle through experiments</p>
                    </div>

                    {/* Rolodex Container use CSS perspective */}
                    <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
                        {labs.map((lab, i) => (
                            <RolodexCard
                                key={i}
                                index={i}
                                data={lab}
                                progress={scrollYProgress}
                                total={labs.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LabsShowcase;
