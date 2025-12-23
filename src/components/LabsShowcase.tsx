import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCpu, FiMessageSquare, FiTerminal, FiArrowRight, FiFileText, FiActivity, FiCode } from 'react-icons/fi';
import Button from './Button';

const labs = [
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        subtitle: 'GPT-4o Stream',
        description: 'Interactive AI companion capable of answering questions about my portfolio and skills.',
        icon: <FiMessageSquare />,
        color: 'text-green-500',
        bg: 'from-green-500/20 to-transparent',
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
        bg: 'from-red-500/20 to-transparent',
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
        bg: 'from-blue-500/20 to-transparent',
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
        color: 'text-cyan-500',
        bg: 'from-cyan-500/20 to-transparent',
        border: 'hover:border-cyan-500',
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
        bg: 'from-yellow-500/20 to-transparent',
        border: 'hover:border-yellow-500',
        link: '/labs/markdown',
        cta: 'Open Editor'
    }
];

const LabItem = ({ data, index }: { data: any, index: number }) => {
    return (
        <div className="relative w-[80vw] md:w-[60vw] h-[70vh] flex-shrink-0 flex flex-col justify-end p-8 md:p-12 border-r border-line/10 group overflow-hidden">
            {/* Ambient Background - Parallax candidate if we could pass scroll here, but keeping simple for now */}
            <div className={`absolute inset-0 bg-gradient-to-b ${data.bg} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

            {/* Big Background Number */}
            <div className="absolute top-0 right-4 text-[20vw] md:text-[15vw] font-bold text-text-primary/5 leading-none select-none pointer-events-none">
                0{index + 1}
            </div>

            <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-text-primary/5 border border-text-primary/10 text-3xl text-accent-primary backdrop-blur-md">
                    {data.icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary mt-4">{data.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${data.color}`}>{data.subtitle}</p>
                <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-8">
                    {data.description}
                </p>

                <div>
                    {data.link ? (
                        <Button to={data.link} variant="lab" icon={<FiArrowRight />}>
                            {data.cta}
                        </Button>
                    ) : (
                        <Button onClick={() => data.action && data.action(null as any)} variant="lab" icon={<FiArrowRight />}>
                            {data.cta}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const LabsShowcase: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-white dark:bg-[#050505] transition-colors duration-300">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Header */}
                <div className="absolute top-8 left-8 z-20 md:left-12">
                    <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                        <FiTerminal className="text-accent-primary" />
                        Engineering Labs <span className="px-2 py-0.5 rounded-full bg-accent-primary/20 text-accent-primary text-xs uppercase tracking-wider">Stream</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-0">
                    {/* Intro Card */}
                    <div className="w-[80vw] md:w-[40vw] h-[70vh] flex-shrink-0 flex flex-col justify-center p-12 border-r border-line/10">
                        <h3 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary">Explore <br /> <span className="text-accent-primary">Experiments</span></h3>
                        <p className="text-xl text-text-secondary max-w-md">
                            A collection of interactive tools, games, and utilities built to push the boundaries of web capability.
                        </p>
                        <div className="mt-8 flex items-center gap-4 text-sm font-mono text-text-secondary">
                            <FiArrowRight className="animate-pulse" />
                            <span>Scroll to Navigate</span>
                        </div>
                    </div>

                    {labs.map((lab, i) => (
                        <LabItem key={i} data={lab} index={i} />
                    ))}

                    {/* End Spacer */}
                    <div className="w-[20vw] flex-shrink-0" />
                </motion.div>
            </div>
        </section>
    );
};

export default LabsShowcase;
