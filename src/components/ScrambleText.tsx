import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    scrambleDuration?: number;
    delayStart?: number;
    onComplete?: () => void;
}

// Elite readable character set - less dense, more elegant
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = '',
    scrambleSpeed = 30,
    scrambleDuration = 1200,
    delayStart = 0,
    onComplete,
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startScramble = useCallback(() => {
        if (hasStarted) return;
        setHasStarted(true);
        setIsScrambling(true);

        let elapsedTime = 0;

        // Start with all scrambled characters
        setDisplayText(
            text.split('').map(char =>
                char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
            ).join('')
        );

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            elapsedTime += scrambleSpeed;
            const progress = Math.min(elapsedTime / scrambleDuration, 1);

            const scrambled = text.split('').map((char, index) => {
                // Preserve spaces
                if (char === ' ') return ' ';

                // Calculate reveal threshold with slight randomization for organic feel
                const charProgress = (index / text.length) + (Math.random() * 0.1);

                // If we've passed the reveal point for this character
                if (progress > charProgress) {
                    return char;
                }

                // Still scrambling - cycle through random chars
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplayText(scrambled);

            if (elapsedTime >= scrambleDuration) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsScrambling(false);
                onComplete?.();
            }
        }, scrambleSpeed);
    }, [text, scrambleSpeed, scrambleDuration, hasStarted, onComplete]);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Start after delay
        timeoutRef.current = setTimeout(() => {
            startScramble();
        }, delayStart);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [delayStart, startScramble]);

    // Reset when text changes
    useEffect(() => {
        setHasStarted(false);
        setDisplayText('');
    }, [text]);

    return (
        <span
            className={`${className} ${isScrambling ? 'select-none' : ''}`}
            style={{ fontFamily: 'inherit' }}
        >
            {displayText || text}
        </span>
    );
};

export default ScrambleText;
