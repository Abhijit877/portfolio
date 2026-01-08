import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import type { BlogPostMeta } from '../../lib/mdx';
import { formatDate } from '../../lib/mdx';

interface ArticleCardProps {
    post: BlogPostMeta;
    index?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, index = 0 }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link to={`/blog/${post.slug}`}>
                <div className="article-card h-full flex flex-col">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="tag-pill-outline text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-line">
                            {/* Date & Read Time */}
                            <div className="flex items-center gap-4 text-xs text-text-secondary">
                                <span>{formatDate(post.date)}</span>
                                <span className="read-time">
                                    <FiClock className="w-3 h-3" />
                                    {post.readTime}
                                </span>
                            </div>

                            {/* Arrow */}
                            <motion.span
                                className="text-accent-primary"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default ArticleCard;
