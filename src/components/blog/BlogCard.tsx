import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface BlogCardProps {
    post: BlogPostMeta;
    index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
    // Generate gradient based on primary tag
    const tagGradients: Record<string, string> = {
        'System Design': 'from-blue-400 via-purple-400 to-pink-400',
        'D365': 'from-purple-500 via-pink-400 to-orange-300',
        'Architecture': 'from-emerald-400 via-teal-400 to-cyan-400',
        'React': 'from-cyan-400 via-blue-400 to-purple-400',
        'WebGL': 'from-orange-400 via-red-400 to-pink-400',
        'Three.js': 'from-violet-500 via-purple-400 to-pink-400',
        'PCF': 'from-green-400 via-emerald-400 to-teal-400',
        'TypeScript': 'from-blue-500 via-indigo-400 to-purple-400',
        'Azure': 'from-sky-400 via-blue-400 to-indigo-400',
        'Integration': 'from-amber-400 via-orange-400 to-red-400',
    };

    const gradientClass = tagGradients[post.tags[0]] || 'from-purple-400 via-pink-400 to-orange-300';

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
                <div className="clickup-card h-full flex flex-col">
                    {/* Image Container */}
                    <div className={`article-image bg-gradient-to-br ${gradientClass}`}>
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 opacity-40">
                            <div className="absolute top-4 left-4 w-16 h-16 border border-white/50 rounded-xl rotate-12" />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border border-white/50 rounded-full" />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                            <span className="clickup-badge">{post.tags[0]}</span>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <span className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center shadow-lg">
                                <ArrowUpRight className="w-5 h-5 text-[var(--clickup-purple)]" />
                            </span>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col flex-grow p-5">
                        {/* Secondary Tags */}
                        {post.tags.length > 1 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {post.tags.slice(1, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-xs font-medium text-text-secondary bg-gray-100 dark:bg-zinc-800 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug group-hover:text-[var(--clickup-purple)] transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Meta Footer */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                            {/* Author */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                                    AB
                                </div>
                                <span className="text-xs font-medium text-text-primary">Abhijit</span>
                            </div>

                            <span className="text-text-secondary text-xs">•</span>

                            {/* Date */}
                            <span className="text-xs text-text-secondary">
                                {formatDate(post.date)}
                            </span>

                            <span className="text-text-secondary text-xs">•</span>

                            {/* Read Time */}
                            <span className="flex items-center gap-1 text-xs text-text-secondary">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;
