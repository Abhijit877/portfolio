import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Code2,
    Sparkles,
    Github,
    ArrowUpRight,
    Zap,
    BookOpen,
    Briefcase
} from 'lucide-react';

// Bento Card Component with Glassmorphism
interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = '', href, delay = 0 }) => {
    const cardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`
                relative overflow-hidden rounded-3xl p-6 md:p-8
                bg-white/[0.03] dark:bg-white/[0.02]
                backdrop-blur-xl backdrop-saturate-150
                border border-white/[0.08] dark:border-white/[0.05]
                shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                hover:border-accent-primary/30 dark:hover:border-accent-primary/20
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                dark:hover:shadow-[0_0_60px_rgba(96,165,250,0.1)]
                transition-all duration-500 ease-out
                group cursor-pointer
                ${className}
            `}
        >
            {/* Gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Arrow indicator for links */}
            {href && (
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5 text-accent-primary" />
                </div>
            )}
        </motion.div>
    );

    if (href?.startsWith('/')) {
        return <Link to={href} className="block">{cardContent}</Link>;
    } else if (href) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="block">{cardContent}</a>;
    }

    return cardContent;
};

// Stats display component
const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{value}</div>
        <div className="text-xs md:text-sm text-text-secondary">{label}</div>
    </div>
);

const BentoGrid: React.FC = () => {
    return (
        <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                    What I{' '}
                    <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                        Bring
                    </span>
                </h2>
                <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                    Enterprise solutions architect with a passion for elegant code and scalable systems.
                </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                {/* Large Card - Skills/Expertise (2 cols, 2 rows on desktop) */}
                <BentoCard
                    className="md:col-span-2 md:row-span-2"
                    href="#skills"
                    delay={0.1}
                >
                    <div className="flex flex-col h-full min-h-[280px] md:min-h-[360px]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
                                <Sparkles className="w-5 h-5 text-accent-primary" />
                            </div>
                            <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">Expertise</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">
                            Dynamics 365 & <br className="hidden md:block" />
                            Power Platform
                        </h3>

                        <p className="text-text-secondary text-base md:text-lg mb-8 max-w-md leading-relaxed">
                            Architecting enterprise CRM solutions that drive revenue and transform business operations.
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="mt-auto flex flex-wrap gap-2">
                            {['C#', 'TypeScript', 'Azure', 'PCF', 'Power Automate'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-background-tertiary text-text-secondary border border-line"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                {/* GitHub Card */}
                <BentoCard
                    href="https://github.com/Abhijit877"
                    delay={0.2}
                >
                    <div className="flex flex-col h-full min-h-[160px]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-text-primary/10 border border-text-primary/20">
                                <Github className="w-5 h-5 text-text-primary" />
                            </div>
                            <span className="text-sm font-medium text-text-secondary">GitHub</span>
                        </div>
                        <div className="mt-auto">
                            <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">Open Source</div>
                            <p className="text-text-secondary text-sm">View my projects & contributions</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Labs Portal Card */}
                <BentoCard
                    href="/labs"
                    delay={0.3}
                >
                    <div className="flex flex-col h-full min-h-[160px]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
                                <Code2 className="w-5 h-5 text-violet-400" />
                            </div>
                            <span className="text-sm font-medium text-text-secondary">Labs</span>
                        </div>
                        <div className="mt-auto">
                            <div className="text-xl md:text-2xl font-bold text-text-primary mb-1">Experimental</div>
                            <p className="text-text-secondary text-sm">Interactive tools & experiments</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Stats Card */}
                <BentoCard
                    className="md:col-span-2"
                    delay={0.4}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <Zap className="w-5 h-5 text-emerald-500" />
                            </div>
                            <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">Impact</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 md:gap-8">
                            <StatItem value="5+" label="Years Experience" />
                            <StatItem value="$10M+" label="Pipeline Managed" />
                            <StatItem value="15+" label="Enterprise Projects" />
                        </div>
                    </div>
                </BentoCard>

                {/* Blog Card */}
                <BentoCard
                    href="/blog"
                    delay={0.5}
                >
                    <div className="flex flex-col h-full min-h-[140px]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <BookOpen className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-sm font-medium text-text-secondary">Blog</span>
                        </div>
                        <div className="mt-auto">
                            <div className="text-xl font-bold text-text-primary mb-1">Thoughts</div>
                            <p className="text-text-secondary text-sm">Articles & insights</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Experience Card */}
                <BentoCard
                    href="#experience"
                    className="md:col-span-2"
                    delay={0.6}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
                                <Briefcase className="w-6 h-6 text-accent-primary" />
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold text-text-primary">Work Experience</div>
                                <p className="text-text-secondary text-sm">View my professional journey</p>
                            </div>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-text-secondary group-hover:text-accent-primary transition-colors" />
                    </div>
                </BentoCard>
            </div>
        </section>
    );
};

export default BentoGrid;
