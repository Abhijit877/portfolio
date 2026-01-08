import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Code2 } from 'lucide-react';

const DevNewsletterBanner: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="dev-inline-newsletter"
        >
            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 mb-4"
                >
                    <Code2 className="w-5 h-5 text-white" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight"
                >
                    Subscribe to the Engineering Newsletter
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-white/60 text-sm mb-6 max-w-md mx-auto"
                >
                    Weekly deep dives on D365, Azure architecture, and enterprise development patterns.
                </motion.p>

                {/* Form */}
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/30 transition-all duration-200"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitted}
                        className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSubmitted ? (
                            <>
                                <Check className="w-4 h-4" />
                                Subscribed!
                            </>
                        ) : (
                            <>
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </motion.section>
    );
};

export default DevNewsletterBanner;
