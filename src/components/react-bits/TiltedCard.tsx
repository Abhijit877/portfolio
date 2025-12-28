import React from 'react';
import Tilt from 'react-parallax-tilt';

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    tiltMaxAngleX?: number;
    tiltMaxAngleY?: number;
    scale?: number;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
    children,
    className = "",
    tiltMaxAngleX = 5,
    tiltMaxAngleY = 5,
    scale = 1.02
}) => {
    return (
        <Tilt
            tiltMaxAngleX={tiltMaxAngleX}
            tiltMaxAngleY={tiltMaxAngleY}
            scale={scale}
            transitionSpeed={2000}
            className={className}
        >
            {children}
        </Tilt>
    );
};

export default TiltedCard;
