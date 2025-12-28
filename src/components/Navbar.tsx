import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, MessageSquare, Cpu, FileText, Type, Code, Briefcase } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { useRecruiter } from '../context/RecruiterContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
    const { heroInView } = useUI();
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLabsMobileOpen, setIsLabsMobileOpen] = useState(false);
    const [isLabsHovered, setIsLabsHovered] = useState(false); // State for desktop hover
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#hero' },
        { name: 'Projects', href: '/#projects' },
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

    const showNameInNavbar = !heroInView || location.pathname !== '/';

    const handleRecruiterToggle = () => {
        toggleRecruiterMode();
        setIsMobileMenuOpen(false);
        if (!isRecruiterMode) navigate('/recruiter');
        else navigate('/');
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'backdrop-blur-md bg-white/80 dark:bg-black/80 py-4 shadow-lg border-b border-black/5 dark:border-white/5'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Branding / Logo */}
                    <Link to="/" className="relative h-8 w-48 overflow-visible z-50 flex items-center group">
                        <AnimatePresence mode="wait">
                            {showNameInNavbar ? (
                                <motion.div
                                    layoutId="brand-name"
                                    className="text-2xl font-bold text-gray-900 dark:text-white tracking-widest font-sans absolute inset-0 flex items-center whitespace-nowrap"
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    Abhijit Behera
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="logo-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-lg font-bold font-mono text-gray-900 dark:text-white tracking-tight absolute inset-0 flex items-center"
                                >
                                    <span className="text-gray-400">&lt;</span>
                                    <span>r4</span>
                                    <span className="text-purple-600 dark:text-purple-500">.dev</span>
                                    <span className="text-gray-400"> /&gt;</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors duration-300 uppercase tracking-wider"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Desktop Labs Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsLabsHovered(true)}
                            onMouseLeave={() => setIsLabsHovered(false)}
                        >
                            <button
                                className={`text-sm font-medium transition-colors duration-300 uppercase tracking-wider flex items-center gap-1 ${isLabsHovered ? 'text-purple-600 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                Labs
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLabsHovered ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLabsHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-4 w-64 pt-2"
                                    >
                                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden p-2">
                                            {labsItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-white/10 transition-colors group"
                                                >
                                                    <div className="p-2 rounded-md bg-purple-100 dark:bg-white/5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                        <item.icon size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-white transition-colors">
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

                    {/* Desktop CTA & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Recruiter Toggle */}
                        <button
                            onClick={handleRecruiterToggle}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isRecruiterMode
                                ? 'bg-purple-600 text-white border-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                                : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-purple-500 hover:text-purple-500'
                                }`}
                        >
                            <Briefcase size={14} />
                            <span>{isRecruiterMode ? 'Mode: ON' : 'Recruit Me'}</span>
                        </button>

                        <ThemeToggle />
                        <a
                            href="#contact"
                            className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-gray-900 dark:text-white z-50 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-8 overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-bold text-gray-800 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors tracking-widest uppercase"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Labs Mobile Dropdown */}
                            <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                                <button
                                    onClick={() => setIsLabsMobileOpen(!isLabsMobileOpen)}
                                    className="flex items-center justify-between w-full text-2xl font-bold text-gray-800 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors tracking-widest uppercase mb-4"
                                >
                                    Labs
                                    <ChevronDown className={`transition-transform duration-300 ${isLabsMobileOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isLabsMobileOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden flex flex-col space-y-4 pl-4"
                                        >
                                            {labsItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="flex items-center gap-3 text-lg font-medium text-gray-600 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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

                            <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-400 uppercase tracking-widest text-sm font-bold">Theme</span>
                                <div onClick={(e) => e.stopPropagation()} className="scale-125">
                                    <ThemeToggle />
                                </div>
                            </div>

                            {/* Mobile Recruiter Toggle */}
                            <button
                                onClick={handleRecruiterToggle}
                                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${isRecruiterMode
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700'
                                    }`}
                            >
                                <Briefcase size={18} />
                                <span>{isRecruiterMode ? 'Recruiter Mode Active' : 'Switch to Recruiter Mode'}</span>
                            </button>

                            <a
                                href="#contact"
                                className="mt-4 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black text-lg font-medium rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Let's Talk
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
