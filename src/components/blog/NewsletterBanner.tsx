import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Check } from 'lucide-react';

const NewsletterBanner: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Simulate newsletter signup
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
            className="relative newsletter-banner p-8 md:p-12 lg:p-16"
        >
            {/* Background decorative elements handled by CSS ::before */}

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Icon Badge */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 mb-6"
                >
                    <Mail className="w-6 h-6 text-white" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                    Join 5,000+ Engineers
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-white/70 text-lg mb-8 max-w-xl mx-auto"
                >
                    Get weekly insights on system design, cloud architecture, and enterprise development.
                </motion.p>

                {/* Newsletter Form */}
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    <div className="relative flex-1">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-200"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitted}
                        className="px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSubmitted ? (
                            <>
                                <Check className="w-5 h-5" />
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

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-6 flex items-center justify-center gap-2 text-white/50 text-sm"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>No spam, unsubscribe anytime</span>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default NewsletterBanner;
