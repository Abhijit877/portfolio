import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const FuzzyOverlay: React.FC = () => {
    const { theme } = useTheme();
    const opacity = theme === 'dark' ? 0.05 : 0.03;

    return (
        <div className="pointer-events-none fixed inset-0 z-[-1] h-full w-full overflow-hidden">
            <svg className="fixed inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
            <div
                className="absolute inset-0 block"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: opacity,
                    mixBlendMode: 'overlay'
                }}
            ></div>
        </div>
    );
};

export default FuzzyOverlay;
