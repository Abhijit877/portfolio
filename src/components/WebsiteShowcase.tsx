import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const websites = [
    {
        id: 'crm',
        url: 'crm.dynamics-view.com',
        title: 'Enterprise CRM Dashboard',
        component: <CrmDashboard />
    },
    {
        id: 'saas',
        url: 'scale.io/landing',
        title: 'SaaS Landing Page',
        component: <SaasLanding />
    },
    {
        id: 'gallery',
        url: 'artisan.gallery',
        title: 'Digital Art Gallery',
        component: <GalleryGrid />
    },
    {
        id: 'kanban',
        url: 'taskflow.app/board',
        title: 'Project Kanban Board',
        component: <KanbanBoard />
    }
];

const WebsiteShowcase: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % websites.length);
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const currentSite = websites[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto h-[450px] flex flex-col perspective-1000"
        >
            {/* Browser Window Frame */}
            <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-full transform transition-all hover:scale-[1.01] duration-500">
                {/* Title Bar */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center space-x-4 border-b border-black/20 shrink-0">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 bg-[#1e1e1e] rounded-md px-3 py-1.5 text-xs text-gray-400 flex items-center justify-center font-mono relative overflow-hidden group">
                        <FiSearch className="absolute left-3 text-gray-600" />
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentSite.url}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                https://{currentSite.url}
                            </motion.span>
                        </AnimatePresence>
                        <div className="absolute right-3 w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                </div>

                {/* Viewport content */}
                <div className="flex-1 bg-white relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSite.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full bg-slate-50 overflow-hidden"
                        >
                            {currentSite.component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

// --- Sub-Components (Mock Websites) ---

function CrmDashboard() {
    return (
        <div className="flex h-full text-slate-800">
            {/* Sidebar */}
            <div className="w-16 bg-indigo-900 flex flex-col items-center py-4 space-y-6">
                <div className="w-8 h-8 rounded bg-indigo-500" />
                <div className="w-6 h-6 rounded bg-indigo-500/20" />
                <div className="w-6 h-6 rounded bg-indigo-500/20" />
                <div className="w-6 h-6 rounded bg-indigo-500/20" />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-slate-100 flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-xl text-slate-700">Analytics Review</h3>
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-slate-300" />
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                            <div className="w-8 h-8 bg-indigo-100 rounded mb-2" />
                            <div className="w-16 h-2 bg-slate-200 rounded mb-1" />
                            <div className="w-10 h-4 bg-slate-800 rounded" />
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex items-end space-x-4 pb-0">
                    {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex-1 bg-indigo-500 rounded-t-sm opacity-80"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SaasLanding() {
    return (
        <div className="h-full bg-white flex flex-col font-sans">
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10 sticky top-0">
                <div className="font-bold text-lg text-emerald-600">Scale.io</div>
                <div className="flex space-x-4 text-xs font-medium text-slate-500">
                    <span>Product</span>
                    <span>Pricing</span>
                    <span>Resources</span>
                </div>
            </div>

            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 bg-gradient-to-b from-emerald-50 to-white">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                >
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Grow your business <br />
                        <span className="text-emerald-500">without limits</span>
                    </h1>
                    <p className="text-sm text-slate-600 max-w-xs mx-auto">
                        The ultimate platform for modern teams to build, ship, and scale faster than ever.
                    </p>
                    <div className="flex justify-center space-x-3 pt-4">
                        <button className="px-5 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-lg shadow-emerald-200">Get Started</button>
                        <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 rounded-full text-xs font-bold">Demo</button>
                    </div>
                </motion.div>

                {/* Abstract Visual */}
                <div className="mt-8 w-full max-w-xs h-32 bg-white rounded-t-xl shadow-2xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-2 left-2 right-2 h-2 bg-slate-100 rounded-full" />
                    <div className="absolute top-8 left-2 w-1/3 h-16 bg-emerald-100 rounded" />
                    <div className="absolute top-8 right-2 w-1/2 h-16 bg-slate-50 rounded" />
                </div>
            </div>
        </div>
    );
}

function GalleryGrid() {
    return (
        <div className="h-full bg-neutral-900 text-white p-4 overflow-hidden">
            <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-2">
                <h2 className="text-lg font-light tracking-widest uppercase">Artisans</h2>
                <span className="text-xs text-neutral-500">Vol. 04</span>
            </div>

            <div className="grid grid-cols-2 gap-3 h-full pb-10">
                <div className="space-y-3">
                    <div className="aspect-[3/4] bg-neutral-800 rounded-sm relative overflow-hidden group">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-rose-500 opacity-60"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <div className="absolute bottom-2 left-2 text-xs font-bold">Abstract #99</div>
                    </div>
                    <div className="aspect-video bg-neutral-800 rounded-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-700" />
                    </div>
                </div>
                <div className="space-y-3 pt-6">
                    <div className="aspect-square bg-neutral-800 rounded-sm relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-blue-500 opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-2 border border-white/10" />
                    </div>
                    <div className="aspect-[3/4] bg-neutral-800 rounded-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-500 opacity-50" />
                        <div className="absolute bottom-2 right-2 text-xs text-right">
                            <div>Neon</div>
                            <div className="text-neutral-400">2024</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KanbanBoard() {
    return (
        <div className="h-full bg-slate-50 p-4 flex flex-col font-sans">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded box-content p-1 text-white flex items-center justify-center font-bold text-xs">TF</div>
                <h2 className="font-bold text-slate-700 text-sm">Sprint 42</h2>
            </div>

            <div className="flex space-x-3 flex-1 overflow-hidden">
                {/* Column 1 */}
                <div className="w-1/3 bg-slate-200/50 rounded-lg p-2 flex flex-col space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-1">To Do</div>
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200">
                        <div className="w-12 h-1 bg-amber-400 rounded-full mb-2" />
                        <div className="h-2 bg-slate-200 w-3/4 rounded mb-1" />
                        <div className="h-2 bg-slate-100 w-1/2 rounded" />
                    </div>
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200">
                        <div className="w-8 h-1 bg-blue-400 rounded-full mb-2" />
                        <div className="h-2 bg-slate-200 w-full rounded mb-1" />
                    </div>
                </div>

                {/* Column 2 */}
                <div className="w-1/3 bg-slate-200/50 rounded-lg p-2 flex flex-col space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-1">In Progress</div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-2 rounded shadow-md border-l-2 border-l-blue-500 border-t border-r border-b border-slate-200"
                    >
                        <div className="w-10 h-1 bg-red-400 rounded-full mb-2" />
                        <div className="h-2 bg-slate-200 w-5/6 rounded mb-1" />
                        <div className="flex justify-between items-center mt-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200" />
                            <div className="w-4 h-4 rounded-full bg-slate-100 text-[8px] flex items-center justify-center text-slate-400">2d</div>
                        </div>
                    </motion.div>
                </div>

                {/* Column 3 */}
                <div className="w-1/3 bg-slate-200/50 rounded-lg p-2 flex flex-col space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-1">Done</div>
                    <div className="bg-white p-2 rounded shadow-sm border border-slate-200 opacity-60">
                        <div className="w-12 h-1 bg-green-400 rounded-full mb-2" />
                        <div className="h-2 bg-slate-200 w-2/3 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WebsiteShowcase;
