import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DevFeaturedHero from '../components/blog/DevFeaturedHero';
import DevBlogCard from '../components/blog/DevBlogCard';
import DevNewsletterBanner from '../components/blog/DevNewsletterBanner';
import { getUniqueTags, filterPostsByTag, sortPostsByDate } from '../lib/mdx';
import type { BlogPostMeta } from '../lib/mdx';

// Static blog posts data
const blogPosts: BlogPostMeta[] = [
    {
        slug: 'building-scalable-crm-architecture',
        title: 'Building Scalable CRM Architecture: Lessons from $10M Pipeline Systems',
        date: '2024-12-15',
        excerpt: 'How I architected a real-time lead engine using D365 CE and WebSockets that reduced response time by 40% and handled enterprise-scale pipeline volume.',
        tags: ['System Design', 'D365', 'Architecture'],
        readTime: '8 min read',
    },
    {
        slug: 'react-three-fiber-experiments',
        title: 'Exploring WebGL: A React Three Fiber Research Lab',
        date: '2024-11-28',
        excerpt: 'A deep dive into creating immersive 3D experiences on the web using React Three Fiber and GLSL shaders. Building the future of interactive interfaces.',
        tags: ['React', 'WebGL', 'Three.js'],
        readTime: '6 min read',
    },
    {
        slug: 'pcf-component-mastery',
        title: 'PCF Component Mastery: Building Reusable D365 Controls',
        date: '2024-11-10',
        excerpt: 'A comprehensive guide to creating Power Apps Component Framework controls that scale across enterprise implementations.',
        tags: ['PCF', 'D365', 'TypeScript'],
        readTime: '10 min read',
    },
    {
        slug: 'azure-middleware-patterns',
        title: 'Azure Middleware Patterns for CRM Integration',
        date: '2024-10-20',
        excerpt: 'Implementing robust middleware using Azure Logic Apps and Functions to bridge D365 with SAP, Salesforce, and custom ERPs.',
        tags: ['Azure', 'Integration', 'D365'],
        readTime: '7 min read',
    },
];

// Map tags to CSS class names for filter pills
const getTagClass = (tag: string, isActive: boolean): string => {
    if (isActive) return 'dev-filter-pill active';
    return 'dev-filter-pill';
};

const Blog: React.FC = () => {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const allTags = useMemo(() => getUniqueTags(blogPosts), []);

    const filteredPosts = useMemo(() => {
        let posts = filterPostsByTag(blogPosts, activeTag);

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return sortPostsByDate(posts);
    }, [activeTag, searchQuery]);

    // Featured post (most recent)
    const featuredPost = blogPosts[0];

    // Trending posts (2nd and 3rd most recent)
    const trendingPosts = blogPosts.slice(1, 3);

    // Grid posts (all except featured if no filter, otherwise filtered)
    const gridPosts = activeTag || searchQuery
        ? filteredPosts
        : filteredPosts.filter(post => post.slug !== featuredPost.slug);

    return (
        <div className="min-h-screen bg-background-primary">
            {/* Featured Hero Section */}
            <DevFeaturedHero
                featuredPost={featuredPost}
                trendingPosts={trendingPosts}
            />

            {/* Filter Bar */}
            <section className="sticky-filter-bar py-4 border-b border-line">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Category Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 pills-scroll">
                            <button
                                onClick={() => setActiveTag(null)}
                                className={getTagClass('All', activeTag === null)}
                            >
                                All
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                                    className={getTagClass(tag, activeTag === tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative md:ml-auto">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="blog-search-input pl-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h2 className="dev-section-title">
                        {activeTag ? `Articles on ${activeTag}` : 'Latest Articles'}
                    </h2>
                </motion.div>

                {/* Articles Grid */}
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            <svg className="w-8 h-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-text-secondary text-lg mb-2">No articles found</p>
                        <p className="text-text-secondary text-sm">Try adjusting your search or filter criteria</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Article Grid */}
                        <section className="mb-16">
                            <div className="dev-article-grid">
                                {gridPosts.map((post, index) => (
                                    <DevBlogCard key={post.slug} post={post} index={index} />
                                ))}
                            </div>
                        </section>

                        {/* Newsletter Banner */}
                        {gridPosts.length >= 2 && (
                            <section className="mb-16">
                                <DevNewsletterBanner />
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Blog;
