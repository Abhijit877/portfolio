import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import MagneticButton from './MagneticButton';

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

    // Format time for Hyderabad (Asia/Kolkata)
    const formattedTime = time.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const socialLinks = [
        { icon: <Github size={24} />, href: "https://github.com/Abhijit877", label: "Github" },
        { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/abhijit-behera", label: "LinkedIn" },
        { icon: <Twitter size={24} />, href: "https://twitter.com", label: "Twitter" }, // Replace with actual if known
        { icon: <Mail size={24} />, href: "mailto:abhijitbehere877@gmail.com", label: "Email" }
    ];

    return (
        <footer className="relative min-h-[500px] bg-background-primary flex flex-col justify-between overflow-hidden pt-20 pb-10 px-4 md:px-8">

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-line to-transparent opacity-50" />
                {/* Aurora / Grid Effect Placeholder - CSS Grid or animated blobs */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col flex-grow justify-between">

                {/* Massive CTA */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm md:text-base font-mono text-accent-primary mb-4 tracking-wider uppercase">
                            What's Next?
                        </h2>
                        <a
                            href="mailto:abhijitbehere877@gmail.com"
                            className="group block"
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter text-text-primary transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary">
                                LET'S WORK <br />
                                <span className="flex items-center gap-4">
                                    TOGETHER
                                    <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-accent-primary" />
                                </span>
                            </h1>
                        </a>
                    </motion.div>
                </div>

                {/* Bottom Bar: Time & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 border-t border-line/20 pt-8">

                    <div className="flex flex-col gap-2">
                        <div className="text-text-primary font-bold text-lg">
                            Hyderabad, IN
                        </div>
                        <div className="text-text-secondary font-mono text-sm tabular-nums flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {formattedTime}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {socialLinks.map((link, i) => (
                            <MagneticButton key={i} className="p-3 rounded-full bg-background-secondary border border-line hover:border-accent-primary/50 transition-colors group">
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary group-hover:text-accent-primary transition-colors"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            </MagneticButton>
                        ))}
                    </div>

                    <div className="text-text-secondary text-sm md:text-right">
                        <p>&copy; {currentYear} Abhijit Behera.</p>
                        <p className="text-xs opacity-50">Built with React & Framer Motion</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
