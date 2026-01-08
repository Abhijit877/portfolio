import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiArrowRight, FiClock } from 'react-icons/fi';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

// Latest 2 posts - in production this would be imported from a centralized data source
const latestPosts: BlogPostMeta[] = [
    {
        slug: 'building-scalable-crm-architecture',
        title: 'Building Scalable CRM Architecture: Lessons from $10M Pipeline Systems',
        date: '2024-12-15',
        excerpt: 'How I architected a real-time lead engine using Next.js and WebSockets.',
        tags: ['System Design', 'D365', 'Architecture'],
        readTime: '8 min read',
    },
    {
        slug: 'react-three-fiber-experiments',
        title: 'Exploring WebGL: A React Three Fiber Research Lab',
        date: '2024-11-28',
        excerpt: 'A deep dive into creating immersive 3D experiences on the web.',
        tags: ['React', 'WebGL', 'Three.js'],
        readTime: '6 min read',
    },
];

const LatestThoughtsBentoCard: React.FC = () => {
    return (
        <section className="section-padding px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-accent-primary/10">
                                <FiBookOpen className="w-5 h-5 text-accent-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                                    Latest Thoughts
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    Engineering insights & deep dives
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/blog"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-accent-primary hover:bg-accent-primary/10 transition-colors text-sm font-medium"
                        >
                            View all posts
                            <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {latestPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <Link to={`/blog/${post.slug}`}>
                                    <div className="relative h-full p-6 md:p-8 rounded-2xl bg-background-secondary border border-line hover:border-accent-primary/30 transition-all duration-300 overflow-hidden">
                                        {/* Subtle glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/0 via-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            {/* Tag */}
                                            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-accent-primary/10 text-accent-primary">
                                                {post.tags[0]}
                                            </span>

                                            {/* Title */}
                                            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-line">
                                                <div className="flex items-center gap-3 text-xs text-text-secondary">
                                                    <span>{formatDate(post.date)}</span>
                                                    <span className="flex items-center gap-1">
                                                        <FiClock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                <FiArrowRight className="w-4 h-4 text-accent-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* Mobile View All Link */}
                    <Link
                        to="/blog"
                        className="md:hidden flex items-center justify-center gap-2 mt-6 px-4 py-3 rounded-xl bg-background-secondary border border-line text-accent-primary hover:bg-accent-primary/10 transition-colors text-sm font-medium"
                    >
                        View all posts
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default LatestThoughtsBentoCard;
