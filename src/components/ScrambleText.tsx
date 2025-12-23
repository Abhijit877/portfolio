import React, { useState, useEffect, useRef } from 'react';
// motion removed

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    scrambleDuration?: number;
    revealDirection?: 'start' | 'end' | 'random';
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = '',
    scrambleSpeed = 40,
    scrambleDuration = 600
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    // Use a ref to keep track of the current animation frame/interval to cleanup properly
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // When text changes, start scrambling
        startScramble();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    const startScramble = () => {
        setIsScrambling(true);
        let duration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            duration += scrambleSpeed;

            // Calculate how much of the text should be revealed based on progress
            const progress = Math.min(duration / scrambleDuration, 1);

            const scrambled = text.split('').map((char, index) => {
                // If character is a space, keep it
                if (char === ' ') return ' ';

                // If we've passed the "reveal point" for this index (pseudo-randomly or linear)
                // Let's do a linear reveal from left to right for readability + hacker feel
                if (index < text.length * progress) {
                    return char;
                }

                // Otherwise return random char
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplayText(scrambled);

            if (duration >= scrambleDuration) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text); // Ensure final state is clean
                setIsScrambling(false);
            }
        }, scrambleSpeed);
    };

    return (
        <span className={`${className} ${isScrambling ? 'animate-pulse' : ''}`}>
            {displayText}
        </span>
    );
};

export default ScrambleText;
