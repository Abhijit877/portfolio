import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'project' | 'lab';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    href?: string;
    to?: string; // React Router support
    icon?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-accent-gradient text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)]',
    secondary: 'bg-transparent border border-gray-300 dark:border-white/20 text-text-secondary dark:text-gray-300 hover:text-text-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all',
    project: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.8)]',
    lab: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]'
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    href,
    to,
    icon,
    className = '',
    ...props
}) => {

    const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg border transition-all duration-300 md:text-base sm:px-6 sm:py-3';
    const variantStyles = variants[variant];

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
            </span>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                animate={{ left: ['-150%', '150%'] }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 3,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
            />
        </>
    );

    const motionProps = {
        whileHover: { scale: 1.05, filter: 'brightness(1.1)' },
        whileTap: { scale: 0.95 },
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
        className: `${baseStyles} ${variantStyles} ${className} group cursor-pointer`,
        ...props
    };

    if (to) {
        return (
            <Link to={to}>
                <motion.div {...(motionProps as any)}>
                    {content}
                </motion.div>
            </Link>
        );
    }

    if (href) {
        return (
            <motion.a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...(motionProps as any)}>
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button {...(motionProps as any)}>
            {content}
        </motion.button>
    );
};

export default Button;
