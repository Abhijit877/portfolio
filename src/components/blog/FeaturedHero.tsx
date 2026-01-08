import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface FeaturedHeroProps {
    post: BlogPostMeta;
}

const FeaturedHero: React.FC<FeaturedHeroProps> = ({ post }) => {
    // Generate a gradient based on tags for the feature image
    const tagGradients: Record<string, string> = {
        'System Design': 'from-blue-500 via-purple-500 to-pink-500',
        'D365': 'from-purple-600 via-pink-500 to-orange-400',
        'Architecture': 'from-emerald-500 via-teal-500 to-cyan-500',
        'React': 'from-cyan-500 via-blue-500 to-purple-500',
        'WebGL': 'from-orange-500 via-red-500 to-pink-500',
        'Three.js': 'from-violet-600 via-purple-500 to-pink-500',
        'PCF': 'from-green-500 via-emerald-500 to-teal-500',
        'TypeScript': 'from-blue-600 via-indigo-500 to-purple-500',
        'Azure': 'from-sky-500 via-blue-500 to-indigo-500',
        'Integration': 'from-amber-500 via-orange-500 to-red-500',
    };

    const gradientClass = tagGradients[post.tags[0]] || 'from-purple-500 via-pink-500 to-orange-400';

    return (
        <section className="relative mesh-gradient-hero py-16 md:py-24 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="order-2 lg:order-1"
                    >
                        {/* Featured Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="featured-pill">
                                <Sparkles className="w-3.5 h-3.5" />
                                Featured
                            </span>
                        </motion.div>

                        {/* Title */}
                        <Link to={`/blog/${post.slug}`} className="group">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-6 group-hover:text-[var(--clickup-purple)] transition-colors duration-300">
                                {post.title}
                            </h1>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
                            {post.excerpt}
                        </p>

                        {/* Author & Meta Row */}
                        <div className="flex items-center gap-4 flex-wrap">
                            {/* Author Avatar */}
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white dark:ring-zinc-800 shadow-lg">
                                    AB
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">Abhijit Behera</p>
                                    <p className="text-xs text-text-secondary">Software Engineer</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-zinc-700" />

                            {/* Date & Read Time */}
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        {/* Read Article Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8"
                        >
                            <Link
                                to={`/blog/${post.slug}`}
                                className="clickup-btn-gradient inline-flex items-center gap-2"
                            >
                                Read Article
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: Feature Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="order-1 lg:order-2"
                    >
                        <Link to={`/blog/${post.slug}`} className="block group">
                            <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${gradientClass} shadow-2xl`}>
                                {/* Decorative Elements */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-8 left-8 w-24 h-24 border-2 border-white/40 rounded-2xl rotate-12" />
                                    <div className="absolute bottom-8 right-8 w-20 h-20 border-2 border-white/40 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-white/30 rotate-45" />
                                </div>

                                {/* Category Tags */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="clickup-badge">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedHero;
