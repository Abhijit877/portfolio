import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LabCard from '../components/LabCard';
import { MessageSquare, Cpu, FileText, Activity, Code, Box, Layers, Terminal } from 'lucide-react';

// Categories: All, UI, 3D, Clones
const FILTERS = ['All', 'UI', '3D', 'Clones'];

const LAB_ITEMS = [
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        description: 'Interactive AI companion capable of answering questions about my portfolio and skills. Uses OpenAI streams.',
        tags: ['UI', 'AI', 'Streaming'],
        link: '/labs/assistant',
        category: 'UI', // mapped to filter
        size: 'large',
        icon: <MessageSquare />
    },
    {
        id: 'minimax',
        title: 'Minimax Game',
        description: 'Unbeatable Tic-Tac-Toe AI using the Minimax algorithm with alpha-beta pruning.',
        tags: ['Game', 'Algorithm', 'UI'],
        link: '/labs/minimax',
        category: 'Clones', // fitting as a game clone
        size: 'small',
        icon: <Cpu />
    },
    {
        id: 'doc-converter',
        title: 'Doc Converter',
        description: 'Client-side utility to convert HTML and Images into standard PDF documents without server storage.',
        tags: ['Tool', 'PDF', 'Client-side'],
        link: '/labs/converter',
        category: 'UI',
        size: 'small',
        icon: <FileText />
    },
    {
        id: 'gravity-sim',
        title: 'Gravity Sim',
        description: 'Experimental 2D physics engine using Matter.js to simulate gravity wells and planetary orbits.',
        tags: ['Physics', 'Canvas', 'Simulation'],
        link: '/', // Placeholder or link to home for now as it's a "playground"
        category: '3D', // Close enough for physics
        size: 'tall',
        icon: <Box />
    },
    {
        id: 'typing-test',
        title: 'Speed Typer',
        description: 'Test your coding speed with real snippet challenges. Tracks WPM and accuracy.',
        tags: ['Game', 'Typing', 'React'],
        link: '/labs/typing-test',
        category: 'UI',
        size: 'small',
        icon: <Activity />
    },
    {
        id: 'markdown-preview',
        title: 'Markdown Live',
        description: 'Real-time markdown editor with secure HTML rendering and syntax highlighting.',
        tags: ['Tool', 'Editor', 'Marked'],
        link: '/labs/markdown',
        category: 'Clones', // Clone of standard editors
        size: 'large',
        icon: <Code />
    }
];

const Labs: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredItems = activeFilter === 'All'
        ? LAB_ITEMS
        : LAB_ITEMS.filter(item => item.category === activeFilter);

    return (
        <div className="min-h-screen bg-background-primary pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-accent-primary mb-2"
                        >
                            <Terminal size={24} />
                            <span className="font-mono text-sm tracking-wider uppercase">Engineering Labs</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-text-primary"
                        >
                            Digital <span className="text-accent-primary underline decoration-accent-primary/30 underline-offset-8">Playground</span>
                        </motion.h1>
                    </div>

                    {/* Animated Filters */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-white/10 flex gap-1"
                    >
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 z-10
                                    ${activeFilter === filter ? 'text-white' : 'text-text-secondary hover:text-text-primary'}
                                `}
                            >
                                {activeFilter === filter && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-accent-primary rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {filter}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={item.size === 'large' ? 'md:col-span-2' : item.size === 'tall' ? 'row-span-2' : ''}
                            >
                                <LabCard
                                    {...item}
                                    size={item.size as any}
                                    className="h-full"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="py-20 text-center text-text-secondary">
                        <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No experiments found in this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Labs;
