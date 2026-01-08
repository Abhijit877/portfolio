import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiList, FiX } from 'react-icons/fi';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentRef?: React.RefObject<HTMLElement>;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ contentRef }) => {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Extract headings from content
    useEffect(() => {
        const element = contentRef?.current || document.querySelector('.prose-elite');
        if (!element) return;

        const headingElements = element.querySelectorAll('h2, h3');
        const items: TOCItem[] = [];

        headingElements.forEach((heading, index) => {
            const id = heading.id || `heading-${index}`;
            if (!heading.id) {
                heading.id = id;
            }
            items.push({
                id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.charAt(1))
            });
        });

        setHeadings(items);
    }, [contentRef]);

    // Track active heading on scroll
    const handleScroll = useCallback(() => {
        const headingElements = headings.map(h => document.getElementById(h.id));

        let currentActive = '';
        for (const heading of headingElements) {
            if (heading) {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 150) {
                    currentActive = heading.id;
                }
            }
        }

        setActiveId(currentActive);
    }, [headings]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const y = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setIsMobileOpen(false);
        }
    };

    if (headings.length === 0) return null;

    return (
        <>
            {/* Desktop TOC - Sticky Sidebar */}
            <nav className="toc-sidebar hidden xl:block">
                <div className="sticky top-32">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
                        <FiList className="w-3.5 h-3.5" />
                        On this page
                    </h4>
                    <ul className="space-y-1">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <button
                                    onClick={() => scrollToHeading(heading.id)}
                                    className={`
                                        toc-link block w-full text-left text-sm py-1.5 transition-all duration-200
                                        ${heading.level === 3 ? 'pl-4' : 'pl-0'}
                                        ${activeId === heading.id
                                            ? 'text-accent-primary font-medium'
                                            : 'text-text-secondary hover:text-text-primary'
                                        }
                                    `}
                                >
                                    <span className={`
                                        relative inline-block
                                        ${activeId === heading.id ? 'toc-active' : ''}
                                    `}>
                                        {heading.text}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile TOC Toggle */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="xl:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-accent-primary text-white shadow-lg hover:shadow-xl transition-shadow"
            >
                <FiList className="w-4 h-4" />
                <span className="text-sm font-medium">Contents</span>
            </button>

            {/* Mobile TOC Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="xl:hidden fixed bottom-0 left-0 right-0 max-h-[70vh] bg-background-secondary rounded-t-3xl z-50 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-semibold text-text-primary">Contents</h4>
                                    <button
                                        onClick={() => setIsMobileOpen(false)}
                                        className="p-2 rounded-full hover:bg-background-tertiary transition-colors"
                                    >
                                        <FiX className="w-5 h-5 text-text-secondary" />
                                    </button>
                                </div>
                                <ul className="space-y-2 overflow-y-auto max-h-[50vh]">
                                    {headings.map((heading) => (
                                        <li key={heading.id}>
                                            <button
                                                onClick={() => scrollToHeading(heading.id)}
                                                className={`
                                                    block w-full text-left py-3 px-4 rounded-xl transition-all duration-200
                                                    ${heading.level === 3 ? 'ml-4' : ''}
                                                    ${activeId === heading.id
                                                        ? 'bg-accent-primary/10 text-accent-primary font-medium'
                                                        : 'text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                                                    }
                                                `}
                                            >
                                                {heading.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default TableOfContents;
