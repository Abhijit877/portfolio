import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-background-tertiary text-text-primary hover:bg-accent-primary hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-secondary"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </motion.button>
    );
};

export default ThemeToggle;
