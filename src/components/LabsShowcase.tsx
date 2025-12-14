import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiMessageSquare, FiTerminal, FiArrowRight } from 'react-icons/fi';
import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';

const LabsShowcase: React.FC = () => {
    const { setChatOpen } = useUI();

    return (
        <section className="py-12 bg-background-secondary/30 relative overflow-hidden backdrop-blur-sm">
            {/* Subtle tech background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Header Side */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent-primary/10 rounded-lg border border-accent-primary/20">
                            <FiTerminal className="text-2xl text-accent-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                Engineering Labs <span className="px-2 py-0.5 rounded-full bg-accent-primary text-[10px] text-white uppercase tracking-wider">Beta</span>
                            </h2>
                            <p className="text-sm text-text-secondary">Experimental features and AI playgrounds.</p>
                        </div>
                    </div>

                    {/* Interactive List Side */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setChatOpen(true)}
                            className="flex items-center gap-3 p-3 pl-4 pr-6 bg-background-secondary border border-line rounded-lg hover:border-accent-primary transition-all group flex-1"
                        >
                            <div className="p-2 bg-green-500/10 text-green-500 rounded-md">
                                <FiMessageSquare />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors">AI Assistant</div>
                                <div className="text-xs text-text-secondary">GPT-4o Stream</div>
                            </div>
                            <FiArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-accent-primary" />
                        </motion.button>

                        <Link to="/labs/round-cross-ai" className="flex-1">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 p-3 pl-4 pr-6 bg-background-secondary border border-line rounded-lg hover:border-accent-secondary transition-all group h-full"
                            >
                                <div className="p-2 bg-red-500/10 text-red-500 rounded-md">
                                    <FiCpu />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-text-primary group-hover:text-accent-secondary transition-colors">Minimax Game</div>
                                    <div className="text-xs text-text-secondary">Unbeatable AI</div>
                                </div>
                                <FiArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-accent-secondary" />
                            </motion.div>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LabsShowcase;
