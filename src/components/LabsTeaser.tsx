import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';

const LabsTeaser: React.FC = () => {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-10 md:p-16 relative overflow-hidden group">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-accent-secondary/20 transition-colors duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-mono mb-4"
                        >
                            <Terminal size={14} />
                            <span>ENGINEERING LABS</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
                            Experimental <span className="text-accent-primary">Playground</span>
                        </h2>
                        <p className="text-text-secondary max-w-xl text-lg">
                            Dive into my collection of experimental UI components, clones, and interactive tools.
                        </p>
                    </div>

                    <Link to="/labs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-text-primary text-background-primary rounded-xl font-bold text-lg flex items-center gap-3 overflow-hidden"
                        >
                            <span className="relative z-10">Explore Labs</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />

                            {/* Hover Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LabsTeaser;
