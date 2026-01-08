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
    primary: 'bg-accent-gradient text-white border-transparent shadow-premium hover:shadow-lifted hover:-translate-y-1',
    secondary: 'bg-white dark:bg-transparent border border-slate-300 dark:border-white/20 text-slate-700 dark:text-gray-300 hover:text-accent-primary hover:border-accent-primary hover:bg-slate-50 dark:hover:bg-accent-primary/10 transition-all shadow-premium hover:shadow-lifted hover:-translate-y-0.5',
    project: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-transparent shadow-premium hover:shadow-lifted hover:-translate-y-1',
    lab: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-transparent shadow-premium hover:shadow-lifted hover:-translate-y-1'
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

    const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg border transition-all duration-300 md:text-base sm:px-6 sm:py-3 noise-texture';
    const variantStyles = variants[variant];

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
            </span>

            {/* Enhanced Shimmer Effect */}
            <motion.div
                className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                animate={{ left: ['-150%', '150%'] }}
                transition={{
                    repeat: Infinity,
                    repeatDelay: 4,
                    duration: 1.8,
                    ease: [0.4, 0, 0.2, 1]
                }}
            />
        </>
    );

    const motionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 },
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
