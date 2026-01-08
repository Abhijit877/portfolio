import React, { useState, useEffect } from 'react';
import LocationDisplay from './LocationDisplay';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const location = useLocation();
    if (location.pathname === '/labs/assistant') return null;

    const currentYear = new Date().getFullYear();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time for India (Asia/Kolkata)
    const formattedTime = time.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com/Abhijit877", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/abhijit-behera", label: "LinkedIn" },
        { icon: <Twitter size={20} />, href: "https://x.com/", label: "Twitter" },
        { icon: <Mail size={20} />, href: "mailto:abhijitbehere877@gmail.com", label: "Email" }
    ];

    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/#projects" },
        { label: "Experience", href: "/#experience" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/#contact" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <footer className="relative bg-background-primary overflow-hidden">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />

                {/* Gradient Mesh */}
                <div className="absolute inset-0 gradient-mesh opacity-50" />

                {/* Noise Texture */}
                <div className="absolute inset-0 noise-texture opacity-30" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Animated Glow Orb */}
                <motion.div
                    className="absolute -bottom-[30%] -right-[10%] w-[400px] h-[400px] bg-accent-primary/15 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-12">

                {/* Main Footer Content - 3 Column Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 py-16 lg:py-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Column 1: Contact & Location */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-primary">
                            Contact
                        </h3>

                        <div className="space-y-4">
                            {/* Location */}
                            <div className="flex items-center gap-3 text-text-secondary">
                                <MapPin size={18} className="text-accent-primary/70 flex-shrink-0" />
                                <span className="text-sm font-medium text-text-primary">
                                    <LocationDisplay />
                                </span>
                            </div>

                            {/* Time with Status */}
                            <div className="flex items-center gap-3 text-text-secondary">
                                <Clock size={18} className="text-accent-primary/70 flex-shrink-0" />
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-sm font-mono tabular-nums text-text-primary">
                                        {formattedTime}
                                    </span>
                                </div>
                            </div>

                            {/* Email Link */}
                            <a
                                href="mailto:abhijitbehere877@gmail.com"
                                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors duration-300 group mt-2"
                            >
                                <Mail size={18} className="text-accent-primary/70 flex-shrink-0" />
                                <span className="group-hover:underline underline-offset-4">abhijitbehere877@gmail.com</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-primary">
                            Quick Links
                        </h3>

                        <nav className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {link.href.startsWith('/') && !link.href.includes('#') ? (
                                        <Link
                                            to={link.href}
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-accent-primary/50 group-hover:bg-accent-primary transition-colors" />
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-accent-primary/50 group-hover:bg-accent-primary transition-colors" />
                                            {link.label}
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Column 3: Connect (Social Icons) */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-primary">
                            Connect
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 rounded-xl bg-background-secondary/80 border border-line/30 hover:border-accent-primary/50 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    aria-label={link.label}
                                >
                                    <span className="text-text-secondary group-hover:text-accent-primary transition-colors duration-300">
                                        {link.icon}
                                    </span>

                                    {/* Tooltip */}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-background-tertiary border border-line/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        {link.label}
                                    </span>

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-xl bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA Link */}
                        <a
                            href="mailto:abhijitbehere877@gmail.com"
                            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors duration-300 group mt-4"
                        >
                            Let's work together
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar: Copyright & Tech Stack */}
                <div className="border-t border-line/20 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-xs text-text-secondary/70">
                            &copy; {currentYear} Abhijit Behera. All rights reserved.
                        </p>

                        {/* Tech Stack */}
                        <p className="text-xs text-text-secondary/50 font-mono">
                            Built with React & Framer Motion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
