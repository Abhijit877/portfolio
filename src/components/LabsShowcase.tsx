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
        border: 'hover:border-accent-secondary', // Using accent secondary for variety
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

const Card = ({ data, index, progress, total }: { data: any, index: number, progress: MotionValue<number>, total: number }) => {
    const ui = useUI();
    // Animation Logic
    // Each card occupies a segment of the scroll.
    // 0 to 1 range total.
    // index 0: 0.0 - 0.2
    // index 1: 0.2 - 0.4
    // etc.

    // We want a stacking card effect or a slide-in replacement.
    // "Card 1 pins, Card 2 slides in to replace it"

    // Simple approach: Cards are absolute. Their Y position is determined by scroll.
    // Start: Y = 100vh (below screen)
    // Active: Y = 0 (center)
    // End: Y = 0 (stays there? or moves up -100vh?)

    // User requested: "Card 1 pins... Card 2 slides in to replace it"
    // So Card 1 stays at 0, Card 2 slides over it.

    const rangeStart = index * (1 / total);
    const nextRangeStart = (index + 1) * (1 / total);

    const scale = useTransform(progress, [nextRangeStart, nextRangeStart + 0.1], [1, 0.9]);
    const opacity = useTransform(progress, [nextRangeStart, nextRangeStart + 0.1], [1, 0]);

    const dynamicY = useTransform(
        progress,
        [rangeStart - 0.15, rangeStart],
        ['110vh', '0vh']
    );

    const isFirst = index === 0;
    const finalY = isFirst ? useTransform(progress, [0, 0.1], ['0vh', '0vh']) : dynamicY;

    return (
        <motion.div
            style={{
                y: finalY,
                scale,
                opacity,
                zIndex: index
            }}
            className={`absolute top-0 w-full max-w-2xl h-[400px] p-8 rounded-2xl border border-line bg-background-primary/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden ${data.border} transition-colors duration-300`}
        >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${data.bg} blur-[80px] rounded-full opacity-20`} />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl ${data.bg} ${data.color} text-3xl`}>
                        {data.icon}
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary opacity-50">Lab {index + 1}</span>
                    </div>
                </div>

                <h3 className="text-3xl font-bold mb-2 text-text-primary">{data.title}</h3>
                <p className={`text-sm font-medium mb-6 ${data.color}`}>{data.subtitle}</p>

                <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                    {data.description}
                </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-line/50">
                {data.link ? (
                    <Link
                        to={data.link}
                        className={`group inline-flex items-center space-x-2 font-bold ${data.color} hover:opacity-80 transition-opacity`}
                    >
                        <span>{data.cta}</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <button
                        onClick={() => data.action && data.action(ui)}
                        className={`group inline-flex items-center space-x-2 font-bold ${data.color} hover:opacity-80 transition-opacity`}
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
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    return (
        <section className="relative bg-background-secondary/30">
            {/* Height determines scroll length */}
            <div ref={targetRef} className="h-[300vh] relative">
                {/* Sticky Container */}
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                    {/* Header */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                        className="absolute top-20 z-0 text-center"
                    >
                        <h2 className="text-xl font-bold text-text-primary flex items-center justify-center gap-2 mb-2">
                            <FiTerminal className="text-accent-primary" />
                            Engineering Labs <span className="px-2 py-0.5 rounded-full bg-accent-primary text-[10px] text-white uppercase tracking-wider">Beta</span>
                        </h2>
                        <p className="text-sm text-text-secondary">Scroll to explore experiments</p>
                    </motion.div>

                    {/* Cards Container */}
                    <div className="relative w-full max-w-2xl h-[400px]">
                        {labs.map((lab, index) => (
                            <Card
                                key={lab.id}
                                data={lab}
                                index={index}
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
