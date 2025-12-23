import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LabCardProps {
    title: string;
    description: string;
    tags: string[];
    link: string;
    size?: 'small' | 'large' | 'tall';
    icon?: React.ReactNode;
    image?: string;
    className?: string; // Allow passing external styles (like grid positioning)
}

const LabCard: React.FC<LabCardProps> = ({ title, description, tags, link, size = 'small', icon, image, className = '' }) => {
    // Determine grid span based on size
    const sizeClasses = {
        small: 'col-span-1 row-span-1',
        large: 'col-span-1 md:col-span-2 row-span-1',
        tall: 'col-span-1 row-span-2',
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={2000}
            className={`${sizeClasses[size]} ${className} group relative rounded-3xl overflow-hidden cursor-pointer`}
        >
            <Link to={link} className="block w-full h-full">
                {/* Background Glassmorphism */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]" />

                {/* Gradient Border Glow (Simulated with pseudo-element opacity) */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-6 z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-white/5 text-accent-primary group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:bg-accent-primary/10">
                            {icon || <Box className="w-6 h-6" />}
                        </div>
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="hidden group-hover:flex items-center gap-2 text-sm text-accent-primary font-mono"
                        >
                            <span className='hidden md:block'>View</span> <ArrowRight size={16} />
                        </motion.div>
                    </div>

                    {/* Image / Visualization Area (Optional) */}
                    {image && (
                        <div className="flex-grow mb-4 overflow-hidden rounded-lg relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 to-transparent z-10 opactiy-50" />
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                            />
                        </div>
                    )}

                    {/* Spacer if no image to push text to bottom for tall/large cards */}
                    {!image && <div className="flex-grow" />}

                    {/* Text Content */}
                    <div>
                        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-text-primary/80 transition-colors">
                            {description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-text-secondary font-mono group-hover:border-accent-primary/30 group-hover:text-accent-primary transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </Tilt>
    );
};

export default LabCard;
