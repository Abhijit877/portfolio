import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { useUI } from '../context/UIContext';

import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './MagneticButton';
import {
  FiMenu, FiX, FiBriefcase, FiCpu, FiMessageSquare,
  FiFileText, FiType, FiCode, FiChevronDown
} from 'react-icons/fi';

import { HERO_SCROLL_THRESHOLD } from '../constants/scrollConfig';

const Header: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const { heroInView } = useUI(); // Consuming shared state

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLabsHovered, setIsLabsHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HERO_SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', href: '/#about', type: 'hash' },
    { name: 'Skills', href: '/#skills', type: 'hash' },
    { name: 'Projects', href: '/#projects', type: 'hash' },
    { name: 'Experience', href: '/#experience', type: 'hash' },
    { name: 'Contact', href: '/#contact', type: 'hash' },
  ];

  const labsItems = [
    { name: 'AI Assistant', path: '/labs/assistant', icon: FiMessageSquare, desc: 'Ask about my skills' },
    { name: 'Minimax Engine', path: '/labs/minimax', icon: FiCpu, desc: 'Challenge the AI' },
    { name: 'Doc Converter', path: '/labs/converter', icon: FiFileText, desc: 'Universal Format Tool' },
    { name: 'Typing Test', path: '/labs/typing-test', icon: FiType, desc: 'Test your speed' },
    { name: 'Markdown Live', path: '/labs/markdown', icon: FiCode, desc: 'Real-time Preview' },

  ];

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    return location.pathname === href;
  };

  const isLabsActive = location.pathname.startsWith('/labs');

  // Mobile Menu Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: '100vh',
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const showNameInNavbar = !heroInView || location.pathname !== '/';

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen || location.pathname !== '/'
        ? 'glass border-b border-glass-border py-4'
        : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="layout-container flex items-center justify-between">
        {/* Logo Container */}
        <Link to="/" className="flex items-center gap-3 z-20 group">
          <div className="relative h-8 w-48 overflow-visible hidden sm:block">
            {showNameInNavbar ? (
              <motion.div
                layoutId="brand-name"
                className="text-lg font-bold text-text-primary absolute inset-0 flex items-center whitespace-nowrap"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                className="text-lg font-bold font-mono text-text-primary tracking-tight absolute inset-0 flex items-center"
              >
                <span className="text-text-secondary">&lt;</span>
                <span>r4</span>
                <span className="text-accent-primary">.dev</span>
                <span className="text-text-secondary"> /&gt;</span>
              </motion.div>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {!isRecruiterMode && navLinks.map((link) => (
            <MagneticButton key={link.name}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors relative group py-2 px-1 block ${isLinkActive(link.href) ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'
                  }`}
              >
                {link.name}
                {isLinkActive(link.href) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary"
                  />
                )}
                {!isLinkActive(link.href) && (
                  <span className="absolute bottom-0 left-0 h-0.5 bg-accent-primary transition-all duration-300 w-0 group-hover:w-full" />
                )}
              </a>
            </MagneticButton>
          ))}

          {/* Labs Dropdown */}
          {!isRecruiterMode && (
            <div
              className="relative group "
              onMouseEnter={() => setIsLabsHovered(true)}
              onMouseLeave={() => setIsLabsHovered(false)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${isLabsActive ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'
                  }`}
              >
                Labs
                <span className="text-[10px] bg-accent-primary text-white px-1.5 py-0.5 rounded-full">New</span>
                <FiChevronDown className={`transition-transform duration-300 ${isLabsHovered ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLabsHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, display: 'none' }}
                    animate={{ opacity: 1, y: 0, display: 'block' }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-80 pt-2"
                  >
                    <div className="glass-card  rounded-xl shadow-2xl overflow-hidden p-2">
                      <div className="px-3 py-2 text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-white/5 mb-1">
                        Engineering Labs
                      </div>
                      {labsItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-start gap-4 group/item relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          <div className={`p-2 bg-background-tertiary rounded-lg border border-white/5 relative z-10 transition-colors ${location.pathname === item.path ? 'border-accent-primary text-accent-primary' : 'group-hover/item:border-accent-primary/50 text-text-secondary group-hover/item:text-accent-primary'
                            }`}>
                            <item.icon size={18} />
                          </div>
                          <div className="relative z-10">
                            <div className={`font-bold text-sm flex items-center gap-2 ${location.pathname === item.path ? 'text-accent-primary' : 'text-text-primary'
                              }`}>
                              {item.name}
                            </div>
                            <div className="text-xs text-text-secondary group-hover/item:text-text-primary transition-colors">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex items-center space-x-4 pl-4 border-l border-line ml-4">
            {/* Recruiter Toggle */}
            <button
              onClick={toggleRecruiterMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isRecruiterMode
                ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'bg-transparent text-text-secondary border-text-secondary hover:border-accent-primary hover:text-accent-primary'
                }`}
            >
              <FiBriefcase />
              <span>{isRecruiterMode ? 'Mode: ON' : 'Recruiter'}</span>
            </button>

            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-0 top-0 left-0 w-full glass z-40 pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {!isRecruiterMode && navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={itemVariants}
                  href={link.href}
                  className={`text-2xl font-bold transition-colors ${isLinkActive(link.href) ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              {!isRecruiterMode && (
                <motion.div variants={itemVariants} className="pt-6 border-t border-glass-border">
                  <div className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">Engineering Labs</div>
                  <div className="grid gap-4">
                    {labsItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-4 p-3 rounded-xl bg-background-tertiary/50 border border-glass-border ${location.pathname === item.path ? 'border-accent-primary/50' : ''
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className={`p-2 rounded-lg ${location.pathname === item.path ? 'bg-accent-primary/20 text-accent-primary' : 'bg-background-tertiary text-text-secondary'
                          }`}>
                          <item.icon size={20} />
                        </div>
                        <div>
                          <div className={`font-bold ${location.pathname === item.path ? 'text-accent-primary' : 'text-text-primary'
                            }`}>{item.name}</div>
                          <div className="text-xs text-text-secondary">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex items-center justify-between pt-8 border-t border-glass-border pb-10">
                <button
                  onClick={() => { toggleRecruiterMode(); setIsMobileMenuOpen(false); }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${isRecruiterMode
                    ? 'bg-accent-primary text-white border-accent-primary'
                    : 'bg-transparent text-text-secondary border-text-secondary'
                    }`}
                >
                  <FiBriefcase />
                  <span>{isRecruiterMode ? 'Recruiter Mode On' : 'Recruit Me'}</span>
                </button>
                <div className="scale-125 origin-right">
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
