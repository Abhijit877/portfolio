import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Zap } from 'lucide-react';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface DevFeaturedHeroProps {
    featuredPost: BlogPostMeta;
    trendingPosts: BlogPostMeta[];
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
    };
    return tagMap[tag] || 'dev-tech-tag dev-tech-tag-default';
};

const DevFeaturedHero: React.FC<DevFeaturedHeroProps> = ({ featuredPost, trendingPosts }) => {
    return (
        <section className="dev-blog-hero">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: Featured Article (8 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-8"
                    >
                        <Link to={`/blog/${featuredPost.slug}`} className="group block">
                            {/* Featured Image Placeholder */}
                            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                                    {/* Decorative code pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-6 left-6 font-mono text-white/40 text-xs">
                                            <div>const architecture = {'{'}</div>
                                            <div className="ml-4">scalable: true,</div>
                                            <div className="ml-4">enterprise: true</div>
                                            <div>{'}'}</div>
                                        </div>
                                        <div className="absolute bottom-6 right-6 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rounded-full" />
                                    </div>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                                {/* Tags */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {featuredPost.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/95 text-gray-900 shadow-lg backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                                    <Zap className="w-3 h-3" />
                                    Featured
                                </span>
                                <span className="dev-date-badge">{formatDate(featuredPost.date)}</span>
                                <span className="dev-read-time">
                                    <Clock className="w-3 h-3" />
                                    {featuredPost.readTime}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                {featuredPost.title}
                            </h1>

                            <p className="text-lg text-text-secondary leading-relaxed mb-6 max-w-2xl">
                                {featuredPost.excerpt}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="dev-author-avatar">AB</div>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">Abhijit Behera</p>
                                    <p className="text-xs text-text-secondary">D365 & Cloud Architecture</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Right: Newsletter + Trending (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Newsletter Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="dev-newsletter-card"
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
                                <p className="text-white/70 text-sm mb-4">
                                    Weekly insights on D365, Azure, and enterprise architecture.
                                </p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/40 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2.5 rounded-lg bg-white text-blue-700 font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Subscribe
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Trending Articles */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-4"
                        >
                            <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Trending</h4>
                            {trendingPosts.slice(0, 2).map((post, index) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    className="dev-trending-card group"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-semibold text-text-primary leading-snug mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {post.title}
                                        </h5>
                                        <div className="flex items-center gap-2">
                                            <span className={getTagClass(post.tags[0])}>
                                                {post.tags[0]}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevFeaturedHero;
