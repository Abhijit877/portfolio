import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../react-bits/SpotlightCard';
import { FiLayers, FiCode, FiZap, FiDatabase, FiCpu, FiGitBranch } from 'react-icons/fi';
import { SiTypescript, SiReact, SiJavascript, SiSharp } from 'react-icons/si';
import { BsMicrosoft } from 'react-icons/bs';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';
import { DiMsqlServer } from 'react-icons/di';

// Marquee animation styles
const marqueeStyles = `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}
.animate-marquee { animation: marquee 25s linear infinite; }
.animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
.marquee-container:hover .animate-marquee,
.marquee-container:hover .animate-marquee-reverse { animation-play-state: paused; }
`;

// All skills for marquee
const allSkills = [
    { name: 'Dynamics 365 CE', icon: <BsMicrosoft />, color: '#00A4EF' },
    { name: 'C# .NET', icon: <SiSharp />, color: '#512BD4' },
    { name: 'Power Automate', icon: <VscAzure />, color: '#0066FF' },
    { name: 'SQL Server', icon: <DiMsqlServer />, color: '#CC2927' },
    { name: 'PCF Controls', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Azure DevOps', icon: <VscAzureDevops />, color: '#0078D7' },
];

// Skills data organized by category from CV
const skillCategories = [
    {
        title: 'Architecture',
        subtitle: 'System Design & CRM Foundations',
        icon: <FiLayers className="text-blue-500" />,
        color: 'rgba(59, 130, 246, 0.15)',
        skills: [
            { name: 'Dynamics 365 CE', icon: <BsMicrosoft /> },
            { name: 'CRM SDK', icon: <FiDatabase /> },
            { name: 'Custom Entities', icon: <FiCpu /> },
            { name: 'Solution Deployment', icon: <FiGitBranch /> },
        ],
        span: 'lg:col-span-2 lg:row-span-2',
    },
    {
        title: 'Frontend Innovation',
        subtitle: 'Modern UI Engineering',
        icon: <FiCode className="text-purple-500" />,
        color: 'rgba(168, 85, 247, 0.15)',
        skills: [
            { name: 'React', icon: <SiReact /> },
            { name: 'TypeScript', icon: <SiTypescript /> },
            { name: 'PCF Controls', icon: <FiCode /> },
            { name: 'Fluent UI', icon: <BsMicrosoft /> },
        ],
        span: 'lg:col-span-2',
    },
    {
        title: 'System Automation',
        subtitle: 'Workflow & Integration',
        icon: <FiZap className="text-orange-500" />,
        color: 'rgba(249, 115, 22, 0.15)',
        skills: [
            { name: 'Power Automate', icon: <VscAzure /> },
            { name: 'Cloud Flows', icon: <FiZap /> },
            { name: 'C# Plugins', icon: <FiCpu /> },
            { name: 'REST APIs', icon: <FiDatabase /> },
        ],
        span: 'lg:col-span-2',
    },
];

// Skill Item for marquee
const SkillItem = ({ skill }: { skill: typeof allSkills[0] }) => (
    <div className="flex items-center gap-3 px-6 py-3 mx-3 bg-background-secondary/80 backdrop-blur-sm border border-line rounded-full hover:border-accent-primary/50 hover:bg-background-secondary transition-all duration-300 cursor-default group whitespace-nowrap">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
            {skill.icon}
        </span>
        <span className="text-sm font-medium text-text-primary">{skill.name}</span>
    </div>
);

// Marquee Row
const MarqueeRow = ({ skills, reverse = false }: { skills: typeof allSkills, reverse?: boolean }) => {
    const doubledSkills = [...skills, ...skills];
    return (
        <div className="marquee-container overflow-hidden py-2">
            <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {doubledSkills.map((skill, index) => (
                    <SkillItem key={`${skill.name}-${index}`} skill={skill} />
                ))}
            </div>
        </div>
    );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const BentoSkillsGrid: React.FC = () => {
    const firstRowSkills = allSkills.slice(0, 4);
    const secondRowSkills = allSkills.slice(4);

    return (
        <section className="relative py-24 overflow-hidden bg-background-primary">
            {/* Inject marquee styles */}
            <style>{marqueeStyles}</style>

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-primary mb-4 block">
                        Technical Landscape
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                        Expertise Stack
                    </h2>
                </motion.div>
            </div>

            {/* Auto-Scroll Marquee */}
            <div className="relative mb-16">
                <MarqueeRow skills={firstRowSkills} />
                <MarqueeRow skills={secondRowSkills} reverse />
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10" />
            </div>

            {/* Bento Grid */}
            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        variants={itemVariants}
                        className={category.span}
                    >
                        <SpotlightCard
                            className="h-full p-8 hover:scale-[1.02] transition-transform duration-300"
                            spotlightColor={category.color}
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary">{category.title}</h3>
                                    <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                                        {category.subtitle}
                                    </span>
                                </div>
                            </div>

                            {/* Skills Grid */}
                            <div className="grid gap-3 grid-cols-2">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/5 hover:border-accent-primary/30 transition-colors duration-200"
                                    >
                                        <span className="text-lg text-accent-primary">{skill.icon}</span>
                                        <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative gradient for Architecture card */}
                            {index === 0 && (
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent-primary/10 to-transparent rounded-tl-full pointer-events-none" />
                            )}
                        </SpotlightCard>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default BentoSkillsGrid;
