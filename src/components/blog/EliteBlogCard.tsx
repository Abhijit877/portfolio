import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface EliteBlogCardProps {
    post: BlogPostMeta;
    index?: number;
}

const EliteBlogCard: React.FC<EliteBlogCardProps> = ({ post, index = 0 }) => {
    // Generate a gradient based on tags for thumbnail placeholder
    const tagColors: Record<string, string> = {
        'System Design': 'from-blue-500/20 to-cyan-500/20',
        'D365': 'from-purple-500/20 to-pink-500/20',
        'Architecture': 'from-emerald-500/20 to-teal-500/20',
        'React': 'from-sky-500/20 to-blue-500/20',
        'WebGL': 'from-orange-500/20 to-red-500/20',
        'Three.js': 'from-violet-500/20 to-purple-500/20',
        'PCF': 'from-green-500/20 to-emerald-500/20',
        'TypeScript': 'from-blue-600/20 to-indigo-500/20',
        'Azure': 'from-sky-600/20 to-blue-600/20',
        'Integration': 'from-amber-500/20 to-orange-500/20',
    };

    const gradientClass = tagColors[post.tags[0]] || 'from-accent-primary/20 to-accent-secondary/20';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="group h-full"
        >
            <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="elite-card h-full flex flex-col">
                    {/* Thumbnail Placeholder */}
                    <div className={`relative h-40 md:h-48 rounded-xl mb-5 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-4 left-4 w-20 h-20 border border-current rounded-lg opacity-20 rotate-12" />
                            <div className="absolute bottom-4 right-4 w-16 h-16 border border-current rounded-full opacity-20" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-current opacity-10 rotate-45" />
                        </div>

                        {/* Primary tag badge */}
                        <div className="absolute bottom-3 left-3">
                            <span className="elite-tag-primary">
                                {post.tags[0]}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                        {/* Secondary Tags */}
                        {post.tags.length > 1 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.slice(1, 3).map((tag) => (
                                    <span key={tag} className="elite-tag-outline">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3 leading-snug group-hover:text-accent-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-2 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-line/50">
                            <div className="flex items-center gap-3 text-xs text-text-secondary">
                                <span className="font-medium">{formatDate(post.date)}</span>
                                <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-background-tertiary">
                                    <FiClock className="w-3 h-3" />
                                    {post.readTime}
                                </span>
                            </div>

                            {/* Read Arrow */}
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                                <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default EliteBlogCard;
