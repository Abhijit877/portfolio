import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiPhone, FiLinkedin, FiCheckCircle } from 'react-icons/fi';

const RecruiterDashboard: React.FC = () => {
    return (
        <section className="section-padding bg-background-secondary min-h-screen">
            <div className="layout-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-bold uppercase tracking-widest mb-4">
                        Recruiter Access Granted
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
                        Quick Candidate Overview
                    </h1>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Welcome to the expedited view. Here is everything you need to evaluate my fit for your role in under 60 seconds.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Fixed unused import */}
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500" />
                            Availability & Fit
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-line pb-2">
                                <span className="text-text-secondary">Role Focus</span>
                                <span className="font-bold text-text-primary">Full Stack / Architect</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-line pb-2">
                                <span className="text-text-secondary">Start Date</span>
                                <span className="font-bold text-emerald-500">Immediate / 2 Weeks</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-line pb-2">
                                <span className="text-text-secondary">Location</span>
                                <span className="font-bold text-text-primary">Remote / Hybrid</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary">Experience</span>
                                <span className="font-bold text-text-primary">5+ Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Consumable Skills */}
                    <div className="glass-card p-6 rounded-2xl md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">Core Competency Matrix</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-text-secondary uppercase mb-2">Primary Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Node.js', '.NET Core', 'Azure', 'SQL Server'].map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded bg-accent-primary/10 text-accent-primary text-sm font-bold">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-secondary uppercase mb-2">Domain Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['SaaS Architecture', 'Cloud Native', 'Dynamics 365', 'Performance Optimization'].map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded bg-background-tertiary text-text-secondary text-sm">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Action Center */}
                    <div className="glass-card p-8 rounded-2xl border-l-4 border-l-accent-primary flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-6">Take Action</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="/resume.pdf" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-accent-primary text-white rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                                <FiDownload /> Download Resume
                            </a>
                            <a href="mailto:abhijitbehere877@gmail.com" className="flex items-center justify-center gap-2 p-4 bg-background-tertiary text-text-primary border border-line rounded-lg font-bold hover:bg-background-secondary transition-all">
                                <FiMail /> Email Me
                            </a>
                            <a href="tel:+1234567890" className="flex items-center justify-center gap-2 p-4 bg-background-tertiary text-text-primary border border-line rounded-lg font-bold hover:bg-background-secondary transition-all">
                                <FiPhone /> Schedule Call
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-[#0077b5] text-white rounded-lg font-bold hover:brightness-110 transition-all">
                                <FiLinkedin /> LinkedIn Profile
                            </a>
                        </div>
                    </div>

                    {/* Why Me? Elevator Pitch */}
                    <div className="glass-card p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-accent-secondary" />
                        <h3 className="text-xl font-bold mb-4">Why Consider Me?</h3>
                        <ul className="space-y-3 text-text-secondary">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-emerald-500"><FiCheckCircle /></span>
                                <span><strong>Direct Impact:</strong> I don't just write code; I conform technical solutions to business ROI.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-emerald-500"><FiCheckCircle /></span>
                                <span><strong>Zero Ramp-up:</strong> Extensive experience with enterprise-grade systems means I hit the ground running.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-emerald-500"><FiCheckCircle /></span>
                                <span><strong>Communication:</strong> I bridge the gap between stakeholders and engineering teams effortlessly.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecruiterDashboard;
