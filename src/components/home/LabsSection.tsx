import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Zap, Code2, Palette } from 'lucide-react';

// Floating Mini Card Component
interface FloatingCardProps {
    children: React.ReactNode;
    depth: number; // 0 = front, 1 = middle, 2 = back
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
    isHovered: boolean;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, depth, mouseX, mouseY, isHovered }) => {
    const depthMultiplier = [1, 0.6, 0.3][depth];
    const baseOffset = [0, 20, 40][depth];
    const baseRotation = [0, 5, 10][depth];
    const blurAmount = [0, 1, 2][depth];

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const springConfig = { stiffness: 150, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    return (
        <motion.div
            style={{
                rotateX: isHovered ? springRotateX : 0,
                rotateY: isHovered ? springRotateY : 0,
                filter: `blur(${blurAmount}px)`,
            }}
            animate={{
                y: isHovered ? -10 * depthMultiplier : baseOffset,
                x: isHovered ? 10 * depthMultiplier : 0,
                rotate: isHovered ? 0 : baseRotation,
                scale: isHovered ? 1 + (0.05 * (2 - depth)) : 1 - (0.05 * depth),
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="absolute"
        >
            {children}
        </motion.div>
    );
};

// Code Snippet Card
const CodeSnippetCard: React.FC = () => (
    <div className="w-56 h-36 rounded-xl bg-slate-900/90 border border-slate-700/50 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[10px] text-slate-500 font-mono">component.tsx</span>
        </div>
        <div className="space-y-1 font-mono text-[10px]">
            <div><span className="text-violet-400">const</span> <span className="text-cyan-400">Button</span> <span className="text-slate-400">=</span> <span className="text-slate-400">()</span> <span className="text-violet-400">=&gt;</span> <span className="text-slate-400">{'{'}</span></div>
            <div className="pl-3"><span className="text-violet-400">return</span> <span className="text-slate-400">(</span></div>
            <div className="pl-6"><span className="text-cyan-400">&lt;motion.button</span></div>
            <div className="pl-9"><span className="text-green-400">whileHover</span><span className="text-slate-400">=</span><span className="text-amber-400">{'{'}scale: 1.05{'}'}</span></div>
            <div className="pl-6"><span className="text-cyan-400">/&gt;</span></div>
        </div>
    </div>
);

// Color Palette Card
const ColorPaletteCard: React.FC = () => (
    <div className="w-48 h-32 rounded-xl bg-slate-800/90 border border-slate-600/50 p-3 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
            <Palette className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-slate-400 font-mono">theme.config</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-inner" />
            <div className="aspect-square rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-inner" />
        </div>
    </div>
);

// Pulsing Icon Card
const PulsingIconCard: React.FC = () => (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/90 to-cyan-600/90 border border-white/20 flex items-center justify-center shadow-2xl shadow-violet-500/30 backdrop-blur-sm relative overflow-hidden">
        {/* Pulse rings */}
        <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
        />
        <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            className="absolute inset-0 rounded-2xl border-2 border-violet-400/50"
        />
        <Zap className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
    </div>
);

const LabsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Massive Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[400px] bg-violet-900/20 rounded-full blur-[120px]" />
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="max-w-6xl mx-auto relative"
            >
                {/* Main Card Container */}
                <div className="relative rounded-3xl border border-violet-500/30 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 backdrop-blur-xl p-8 md:p-12 lg:p-16 overflow-hidden group">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                    {/* Animated border glow on hover */}
                    <motion.div
                        animate={{ opacity: isHovered ? 0.8 : 0.3 }}
                        className="absolute inset-0 rounded-3xl border border-violet-400/20 pointer-events-none"
                        style={{
                            boxShadow: 'inset 0 0 60px rgba(139, 92, 246, 0.1)',
                        }}
                    />

                    {/* Grid Layout */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Content (40%) */}
                        <div className="lg:col-span-2 text-center lg:text-left">
                            {/* Glowing Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-6"
                                style={{
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)',
                                }}
                            >
                                <Terminal size={14} className="animate-pulse" />
                                <span>ENGINEERING LABS</span>
                            </motion.div>

                            {/* Gradient Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                            >
                                Experimental{' '}
                                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-violet-500 bg-clip-text text-transparent">
                                    Playground
                                </span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-400 text-lg max-w-md mx-auto lg:mx-0 mb-8"
                            >
                                Dive into my collection of experimental UI components, interactive tools, and creative code experiments.
                            </motion.p>

                            {/* Magnetic Shimmer Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/labs">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group relative px-8 py-4 bg-slate-900 border border-slate-700 hover:border-violet-500/50 text-white rounded-xl font-semibold text-lg flex items-center gap-3 overflow-hidden transition-colors duration-300 mx-auto lg:mx-0"
                                    >
                                        <Code2 className="w-5 h-5 text-violet-400" />
                                        <span className="relative z-10">Explore Labs</span>
                                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-violet-400" />

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-violet-500/10 to-transparent skew-x-12" />

                                        {/* Border glow on hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            style={{
                                                boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                                            }}
                                        />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Side - Floating UI Mockup (60%) */}
                        <div className="lg:col-span-3 relative h-72 lg:h-80 perspective-1000">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Card Stack Container */}
                                <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
                                    {/* Back Card - Code Snippet */}
                                    <FloatingCard depth={2} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered}>
                                        <div className="translate-x-[-30px] translate-y-[-20px]">
                                            <CodeSnippetCard />
                                        </div>
                                    </FloatingCard>

                                    {/* Middle Card - Color Palette */}
                                    <FloatingCard depth={1} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered}>
                                        <div className="translate-x-[60px] translate-y-[10px]">
                                            <ColorPaletteCard />
                                        </div>
                                    </FloatingCard>

                                    {/* Front Card - Pulsing Icon */}
                                    <FloatingCard depth={0} mouseX={mouseX} mouseY={mouseY} isHovered={isHovered}>
                                        <div className="translate-x-[-40px] translate-y-[40px]">
                                            <PulsingIconCard />
                                        </div>
                                    </FloatingCard>
                                </div>
                            </div>

                            {/* Decorative particles/dots */}
                            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                            <div className="absolute bottom-20 right-32 w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute top-24 left-10 w-1 h-1 rounded-full bg-pink-400/60 animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default LabsSection;
