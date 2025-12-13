import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX, FiBriefcase } from 'react-icons/fi';

const Header: React.FC = () => {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiter();
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
          <AnimatePresence mode="wait">
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
