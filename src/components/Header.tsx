import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX, FiBriefcase, FiCpu, FiMessageSquare } from 'react-icons/fi';

const Header: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
  const { setChatOpen } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background-primary/80 backdrop-blur-md shadow-lg border-b border-white/5 py-4'
        : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Container - Fixed width to prevent layout shift */}
        <div className="w-48 relative h-8 overflow-hidden">
          <AnimatePresence>
            {!isRecruiterMode && isScrolled ? (
              <motion.a
                key="logo-scrolled"
                href="#"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-xl font-bold font-mono text-text-primary tracking-tighter block absolute inset-0"
              >
                Abhijit Behera
              </motion.a>
            ) : (
              <motion.a
                key="logo-full"
                href="#"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-2xl font-bold font-mono text-text-primary tracking-tighter block absolute inset-0"
              >
                &lt;Dev<span className="text-accent-primary">Folio</span> /&gt;
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {!isRecruiterMode && navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all group-hover:w-full" />
            </a>
          ))}

          {/* Labs Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1">
              Labs <span className="text-[10px] bg-accent-primary text-white px-1.5 py-0.5 rounded-full">New</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-background-primary/95 backdrop-blur-xl border border-line rounded-xl shadow-2xl overflow-hidden p-2 ring-1 ring-white/5">
                <div className="px-3 py-2 text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-white/5 mb-1">
                  Playground
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-start gap-4 group/item relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  <div className="p-2 bg-background-tertiary rounded-lg border border-white/5 relative z-10 group-hover/item:border-accent-primary/50 transition-colors">
                    <FiMessageSquare size={18} className="text-accent-primary" />
                  </div>
                  <div className="relative z-10">
                    <div className="font-bold text-text-primary text-sm flex items-center gap-2">
                      AI Assistant <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="text-xs text-text-secondary group-hover/item:text-text-primary transition-colors">Ask about my skills</div>
                  </div>
                </button>
                <Link
                  to="/labs/round-cross-ai"
                  className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors flex items-start gap-4 group/item relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  <div className="p-2 bg-background-tertiary rounded-lg border border-white/5 relative z-10 group-hover/item:border-accent-secondary/50 transition-colors">
                    <FiCpu size={18} className="text-accent-secondary" />
                  </div>
                  <div className="relative z-10">
                    <div className="font-bold text-text-primary text-sm flex items-center gap-2">
                      Minimax Engine
                    </div>
                    <div className="text-xs text-text-secondary group-hover/item:text-text-primary transition-colors">Challenge the AI</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pl-4 border-l border-line ml-4">
            {/* Recruiter Toggle */}
            <button
              onClick={toggleRecruiterMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isRecruiterMode
                ? 'bg-accent-primary text-white border-accent-primary'
                : 'bg-transparent text-text-secondary border-text-secondary hover:border-accent-primary hover:text-accent-primary'
                }`}
            >
              <FiBriefcase />
              <span>{isRecruiterMode ? 'Recruiter Mode: ON' : 'Recruiter Mode'}</span>
            </button>

            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-line overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-accent-primary transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <button
                  onClick={toggleRecruiterMode}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isRecruiterMode
                    ? 'bg-accent-primary text-white border-accent-primary'
                    : 'bg-transparent text-text-secondary border-text-secondary'
                    }`}
                >
                  <FiBriefcase />
                  <span>{isRecruiterMode ? 'Recruiter' : 'Recruiter Mode'}</span>
                </button>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
