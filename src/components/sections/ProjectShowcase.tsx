import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../react-bits/TiltedCard';
import Magnet from '../react-bits/Magnet';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';

// Projects data from CV with impact metrics
const projects = [
    {
        id: 1,
        title: 'Sales Automation Platform',
        subtitle: 'Enterprise CRM Transformation',
        description: 'Full Sales module transformation covering Lead, Opportunity, Quote, and Proposal stages with SAP/CPQ integration for real-time pricing.',
        metrics: [
            { value: '45%', label: 'Cycle Reduction' },
            { value: '20%', label: 'Forecast Accuracy' },
        ],
        tech: ['D365 CE', 'PCF', 'Power Automate', 'C# Plugin'],
        github: 'https://github.com/Abhijit877',
        gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        accentColor: 'text-blue-400',
    },
    {
        id: 2,
        title: 'CRM Modernization',
        subtitle: 'Concrete Recyclers',
        description: 'Modernized end-to-end quotation lifecycle by mapping legacy processes to D365 CE OOB features with custom C# plugins for automation.',
        metrics: [
            { value: '60%', label: 'Pipeline Visibility' },
            { value: '70%', label: 'Admin Reduction' },
        ],
        tech: ['D365 CE', 'Power Automate', 'Plugins', 'JavaScript'],
        github: 'https://github.com/Abhijit877',
        gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
        accentColor: 'text-purple-400',
    },
    {
        id: 3,
        title: 'FileUploader PCF',
        subtitle: 'Open Source Component',
        description: 'Modern drag-and-drop file uploader with multiple file types, size checks, and async Web API integration with D365 Notes/Attachments.',
        metrics: [
            { value: '50%', label: 'Upload Speed' },
        ],
        tech: ['PCF', 'TypeScript', 'React', 'Web API'],
        github: 'https://github.com/Abhijit877/d365-fileuploader-pcf',
        gradient: 'from-orange-500/20 via-yellow-500/10 to-transparent',
        accentColor: 'text-orange-400',
    },
    {
        id: 4,
        title: 'Enhanced Input Control',
        subtitle: 'Reusable PCF Library',
        description: 'Dynamic, configurable input control designed for high-volume data entry with built-in validation rules, formatting options, and cross-form reusability.',
        metrics: [
            { value: '30%', label: 'Productivity Boost' },
        ],
        tech: ['PCF', 'TypeScript', 'Fluent UI'],
        github: 'https://github.com/Abhijit877',
        gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
        accentColor: 'text-green-400',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

const ProjectShowcase: React.FC = () => {
    return (
        <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-background-secondary">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-primary)_1px,_transparent_1px)] bg-[length:32px_32px]" />
            </div>

            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-primary mb-4 block">
                        Selected Works
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                        Impact-Driven Projects
                    </h2>
                    <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                        Enterprise implementations delivering measurable business outcomes through Dynamics 365 and PCF innovation.
                    </p>
                </motion.div>
            </div>

            {/* Projects Grid */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={cardVariants}>
                        <TiltedCard
                            tiltMaxAngleX={8}
                            tiltMaxAngleY={8}
                            scale={1.02}
                            className="h-full"
                        >
                            <div className={`relative h-full p-8 rounded-2xl bg-background-primary border border-line/50 overflow-hidden group`}>
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className={`font-mono text-xs uppercase tracking-wider ${project.accentColor}`}>
                                                {project.subtitle}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mt-2">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <Magnet magnetStrength={4}>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300"
                                            >
                                                <FiGithub size={18} />
                                            </a>
                                        </Magnet>
                                    </div>

                                    {/* Description */}
                                    <p className="text-text-secondary text-base leading-relaxed mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex gap-4 mb-6">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className={`text-2xl font-bold ${project.accentColor}`}>{metric.value}</span>
                                                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{metric.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-text-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FiArrowUpRight className={`text-2xl ${project.accentColor}`} />
                                    </div>
                                </div>
                            </div>
                        </TiltedCard>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ProjectShowcase;
