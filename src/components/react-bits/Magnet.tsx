import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetProps {
    children: React.ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
}

const Magnet: React.FC<MagnetProps> = ({ children, padding = 100, disabled = false, magnetStrength = 2 }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || !ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX / magnetStrength, y: middleY / magnetStrength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default Magnet;
