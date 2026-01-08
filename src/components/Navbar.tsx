import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, MessageSquare, Cpu, FileText, Type, Code, Briefcase } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { useRecruiter } from '../context/RecruiterContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar: React.FC = () => {
    const { heroInView } = useUI();
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLabsMobileOpen, setIsLabsMobileOpen] = useState(false);
    const [isLabsHovered, setIsLabsHovered] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Track scroll direction for smart show/hide
    const lastScrollY = useRef(0);
    const scrollThreshold = 100; // Hide after scrolling down this much

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;

            // Always show at very top of page
            if (currentScrollY < 50) {
                setIsVisible(true);
            }
            // Hide when scrolling down past threshold
            else if (scrollingDown && currentScrollY > scrollThreshold) {
                setIsVisible(false);
            }
            // Show immediately when scrolling up
            else if (!scrollingDown) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
            setIsScrolled(currentScrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#hero' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/#about' },
        { name: 'Contact', href: '/#contact' },
    ];

    const labsItems = [
        { name: 'AI Assistant', path: '/labs/assistant', icon: MessageSquare },
        { name: 'Minimax Engine', path: '/labs/minimax', icon: Cpu },
        { name: 'Doc Converter', path: '/labs/converter', icon: FileText },
        { name: 'Typing Test', path: '/labs/typing-test', icon: Type },
        { name: 'Markdown Live', path: '/labs/markdown', icon: Code },
    ];

    const showFullName = !heroInView || location.pathname !== '/';

    const handleRecruiterToggle = () => {
        toggleRecruiterMode();
        setIsMobileMenuOpen(false);
        if (!isRecruiterMode) navigate('/recruiter');
        else navigate('/');
    };

    return (
        <>
            {/* Full-Width Navbar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <nav
                    className={`
                        w-full flex items-center justify-between
                        px-6 md:px-12 lg:px-16 py-4
                        backdrop-blur-xl
                        bg-background-primary/80 dark:bg-zinc-900/80
                        border-b border-line/30 dark:border-zinc-700/40
                        transition-all duration-300
                        ${isScrolled ? 'py-3 bg-background-primary/95 dark:bg-zinc-900/95 shadow-lg shadow-black/5 dark:shadow-black/20' : ''}
                    `}
                >

                    {/* LEFT: Logo */}
                    <Logo showFullName={showFullName} />

                    {/* CENTER: Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        {/* Labs Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsLabsHovered(true)}
                            onMouseLeave={() => setIsLabsHovered(false)}
                        >
                            <motion.button
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200 flex items-center gap-1"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Labs
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLabsHovered ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {isLabsHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-56 pt-2"
                                    >
                                        <div className="glass-premium rounded-xl shadow-lifted overflow-hidden p-2">
                                            {labsItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent-primary/10 transition-all duration-200 group"
                                                >
                                                    <div className="p-2 rounded-lg bg-background-tertiary text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-200">
                                                        <item.icon size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium text-text-primary">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Recruiter Toggle - Desktop */}
                        <motion.button
                            onClick={handleRecruiterToggle}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${isRecruiterMode
                                ? 'bg-accent-primary text-white border-accent-primary shadow-glow'
                                : 'bg-transparent text-text-secondary border-line hover:border-accent-primary hover:text-accent-primary'
                                }`}
                        >
                            <Briefcase size={14} />
                            <span className="hidden lg:inline">{isRecruiterMode ? 'Mode: ON' : 'Recruit Me'}</span>
                        </motion.button>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* CTA Button - Desktop */}
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="hidden md:flex px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:shadow-glow transition-all duration-300"
                        >
                            Let's Talk
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-text-primary hover:bg-background-secondary rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background-primary/98 backdrop-blur-xl lg:hidden pt-20"
                    >
                        <div className="flex flex-col p-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-3 text-lg font-medium text-text-primary hover:bg-background-secondary rounded-xl transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Labs Accordion */}
                            <div className="border-t border-line pt-4 mt-4">
                                <button
                                    onClick={() => setIsLabsMobileOpen(!isLabsMobileOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-text-primary hover:bg-background-secondary rounded-xl transition-colors"
                                >
                                    Labs
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isLabsMobileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isLabsMobileOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden pl-4 space-y-1"
                                        >
                                            {labsItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-accent-primary hover:bg-background-secondary rounded-xl transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <item.icon size={18} />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Actions */}
                            <div className="border-t border-line pt-6 mt-4 space-y-4">
                                <button
                                    onClick={handleRecruiterToggle}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${isRecruiterMode
                                        ? 'bg-accent-primary text-white border-accent-primary'
                                        : 'bg-transparent text-text-secondary border-line'
                                        }`}
                                >
                                    <Briefcase size={18} />
                                    {isRecruiterMode ? 'Recruiter Mode Active' : 'Switch to Recruiter Mode'}
                                </button>

                                <a
                                    href="#contact"
                                    className="block w-full px-4 py-3 bg-accent-primary text-white text-center text-lg font-medium rounded-xl hover:shadow-glow transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Let's Talk
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
