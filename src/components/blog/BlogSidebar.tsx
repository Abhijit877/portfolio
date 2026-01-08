import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiX, FiMail, FiHash, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface BlogSidebarProps {
    tags: string[];
    activeTag: string | null;
    onTagSelect: (tag: string | null) => void;
    isOpen: boolean;
    onClose: () => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
    tags,
    activeTag,
    onTagSelect,
    isOpen,
    onClose,
}) => {
    // Navigation items
    const navItems = [
        { label: 'All Posts', tag: null, icon: FiBookOpen },
        ...tags.map(tag => ({ label: tag, tag, icon: FiHash })),
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-line">
                <Link to="/blog" className="flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors">
                        <FiBookOpen className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">Engineering Insights</h2>
                        <p className="text-xs text-text-secondary">Thought Leadership</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="mb-6">
                    <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Categories
                    </p>
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = activeTag === item.tag;
                            const Icon = item.icon;

                            return (
                                <li key={item.label}>
                                    <button
                                        onClick={() => {
                                            onTagSelect(item.tag);
                                            if (window.innerWidth < 1024) onClose();
                                        }}
                                        className={`
                                            sidebar-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                                            transition-all duration-200 text-left relative group
                                            ${isActive
                                                ? 'bg-accent-primary/10 text-accent-primary font-medium'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
                                            }
                                        `}
                                    >
                                        {/* Active indicator - Microsoft Fluent style vertical bar */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-primary rounded-r-full"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}

                                        <Icon className={`w-4 h-4 ${isActive ? 'text-accent-primary' : ''}`} />
                                        <span className="flex-1 truncate">{item.label}</span>

                                        {isActive && (
                                            <FiChevronRight className="w-4 h-4 text-accent-primary opacity-60" />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Subscribe CTA */}
            <div className="p-4 border-t border-line">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-accent-primary/25">
                    <FiMail className="w-4 h-4" />
                    <span>Subscribe to Updates</span>
                </button>
                <p className="text-xs text-text-secondary text-center mt-3">
                    Get notified about new articles
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar - Fixed Left */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-background-secondary border-r border-line z-40 pt-20 flex-col">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={onClose}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-background-secondary z-50 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                            >
                                <FiX className="w-5 h-5 text-text-secondary" />
                            </button>

                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default BlogSidebar;
