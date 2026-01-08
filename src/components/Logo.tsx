import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImage from '../assets/r4.logoremovebg-preview.png';

interface LogoProps {
    showFullName?: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ showFullName = false, className = "" }) => {
    return (
        <Link to="/" className={`relative flex items-center group ${className}`}>
            <AnimatePresence mode="wait">
                {showFullName ? (
                    <motion.div
                        key="full-name"
                        layoutId="brand-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="text-xl md:text-2xl font-bold text-text-primary tracking-tight whitespace-nowrap"
                    >
                        Abhijit Behera
                    </motion.div>
                ) : (
                    <motion.div
                        key="logo-mark"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                    >
                        {/* Logo Image - bigger on mobile, smaller on desktop with text */}
                        <motion.img
                            src={logoImage}
                            alt="r4.dev Logo"
                            className="h-[65px] md:h-[55px] w-auto object-contain transition-all duration-300 ease-out group-hover:brightness-110 dark:invert dark:brightness-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        />
                        {/* r4.dev text - desktop only */}
                        <span className="hidden md:inline text-xl font-bold text-text-primary tracking-tight">
                            &lt;r4.dev&gt;
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </Link>
    );
};

export default Logo;
