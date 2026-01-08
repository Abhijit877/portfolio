import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the magnetic pull is (0-1, default 0.4)
    radius?: number; // Radius of magnetic effect in pixels
    springConfig?: {
        stiffness: number;
        damping: number;
        mass: number;
    };
    onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    strength = 0.4,
    radius = 200,
    springConfig = {
        stiffness: 150,
        damping: 15,
        mass: 0.1
    },
    onClick
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Calculate distance from center
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Only apply effect within radius
        if (distance < radius) {
            // Strength decreases with distance (inverse relationship)
            const pullStrength = (1 - distance / radius) * strength;

            setPosition({
                x: distanceX * pullStrength,
                y: distanceY * pullStrength
            });
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: "spring",
                stiffness: springConfig.stiffness,
                damping: springConfig.damping,
                mass: springConfig.mass
            }}
            className={`cursor-pointer inline-block ${className}`}
            onClick={onClick}
            style={{
                // Subtle scale on hover
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s ease-out',
            }}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;