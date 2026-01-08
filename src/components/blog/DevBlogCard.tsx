import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface DevBlogCardProps {
    post: BlogPostMeta;
    index?: number;
}

// Map tags to CSS class names
const getTagClass = (tag: string): string => {
    const tagMap: Record<string, string> = {
        'D365': 'dev-tech-tag dev-tech-tag-d365',
        'Azure': 'dev-tech-tag dev-tech-tag-azure',
        '.NET': 'dev-tech-tag dev-tech-tag-dotnet',
        'PCF': 'dev-tech-tag dev-tech-tag-pcf',
        'Architecture': 'dev-tech-tag dev-tech-tag-architecture',
        'TypeScript': 'dev-tech-tag dev-tech-tag-typescript',
        'React': 'dev-tech-tag dev-tech-tag-react',
        'System Design': 'dev-tech-tag dev-tech-tag-system-design',
        'Integration': 'dev-tech-tag dev-tech-tag-integration',
        'Three.js': 'dev-tech-tag dev-tech-tag-react',
        'WebGL': 'dev-tech-tag dev-tech-tag-architecture',
    };
    return tagMap[tag] || 'dev-tech-tag dev-tech-tag-default';
};

// Generate gradient based on primary tag
const getGradientClass = (tag: string): string => {
    const gradientMap: Record<string, string> = {
        'D365': 'from-purple-600 via-purple-500 to-indigo-600',
        'Azure': 'from-blue-600 via-blue-500 to-cyan-500',
        'System Design': 'from-pink-600 via-rose-500 to-orange-500',
        'Architecture': 'from-orange-500 via-amber-500 to-yellow-500',
        'React': 'from-cyan-500 via-blue-500 to-indigo-500',
        'TypeScript': 'from-blue-600 via-indigo-500 to-purple-500',
        'PCF': 'from-emerald-500 via-green-500 to-teal-500',
        'WebGL': 'from-orange-500 via-red-500 to-pink-500',
        'Three.js': 'from-violet-600 via-purple-500 to-pink-500',
        'Integration': 'from-amber-500 via-orange-500 to-red-500',
    };
    return gradientMap[tag] || 'from-purple-600 via-blue-500 to-indigo-600';
};

const DevBlogCard: React.FC<DevBlogCardProps> = ({ post, index = 0 }) => {
    const gradientClass = getGradientClass(post.tags[0]);

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
                <div className="dev-blog-card h-full flex flex-col">
                    {/* Image/Gradient Header */}
                    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradientClass}`}>
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-4 left-4 w-12 h-12 border border-white/40 rounded-lg rotate-12" />
                            <div className="absolute bottom-4 right-4 w-10 h-10 border border-white/40 rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="font-mono text-white/30 text-[10px] text-center">
                                    {'< / >'}
                                </div>
                            </div>
                        </div>

                        {/* Primary Tag Badge */}
                        <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 text-gray-900 shadow-sm">
                                {post.tags[0]}
                            </span>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <span className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                                <ArrowUpRight className="w-4 h-4 text-gray-900" />
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-5">
                        {/* Secondary Tags */}
                        {post.tags.length > 1 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {post.tags.slice(1, 3).map((tag) => (
                                    <span key={tag} className={getTagClass(tag)}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-base font-bold text-text-primary mb-2 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
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
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                                    AB
                                </div>
                                <span className="text-xs font-medium text-text-primary">Abhijit</span>
                            </div>

                            <span className="text-text-secondary/50">•</span>

                            {/* Date */}
                            <span className="dev-date-badge">{formatDate(post.date)}</span>

                            <span className="text-text-secondary/50">•</span>

                            {/* Read Time */}
                            <span className="dev-read-time">
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

export default DevBlogCard;
