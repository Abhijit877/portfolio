import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface FallingTextProps {
    content: string;
    delay?: number;
    className?: string;
    highlightWords?: string[]; // Words to apply gradient/highlight to
}

const FallingText: React.FC<FallingTextProps & { splitBy?: 'word' | 'char' }> = ({
    content,
    delay = 0,
    className = "",
    highlightWords = [],
    splitBy = 'word'
}) => {
    const words = content.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200, // Higher stiffness for faster drop
                mass: 0.8
            },
        },
        hidden: {
            opacity: 0,
            y: -50, // Higher drop
            x: 10, // Slight offset for "falling into place" feel
            rotate: -10, // Start rotated
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className={className}
        >
            {words.map((word, wordIndex) => {
                const isHighlight = highlightWords.includes(word) || highlightWords.includes(word.replace(/[^a-zA-Z]/g, ""));

                if (splitBy === 'char') {
                    return (
                        <span key={wordIndex} style={{ display: 'flex', marginRight: '0.25em', flexWrap: 'nowrap' }}>
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={`${wordIndex}-${charIndex}`}
                                    variants={child}
                                    className={isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary" : ""}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    );
                }

                return (
                    <motion.span
                        variants={child}
                        style={{ marginRight: "0.25em" }}
                        key={wordIndex}
                        className={isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary" : ""}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </motion.div>
    );
};

export default FallingText;
