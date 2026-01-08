import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`
                relative p-2.5 rounded-xl font-medium
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 
                ${theme === 'dark'
                    ? 'bg-[#1A1A1A] border border-white/12 text-[#F5F5F5] focus:ring-[#5B8DEF]/40 hover:border-[#5B8DEF] hover:shadow-[0_0_20px_rgba(91,141,239,0.25)]'
                    : 'bg-[#F7F9FA] border border-[#D7DADD] text-[#2C2E2F] focus:ring-[#0070BA]/40 hover:bg-[#0070BA] hover:text-white hover:border-[#0070BA] hover:shadow-md'
                }
                group overflow-hidden
            `}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="relative flex items-center gap-2">
                <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                        <motion.div
                            key="moon"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center"
                        >
                            <FiMoon size={18} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center"
                        >
                            <FiSun size={18} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <span className="text-sm hidden sm:inline">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
            </div>
        </motion.button>
    );
};

export default ThemeToggle;
