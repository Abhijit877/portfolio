import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LabLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
}

const LabLayout: React.FC<LabLayoutProps> = ({ children, title, description, actions, className = "" }) => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 ${className?.includes('grid') ? '' : 'flex flex-col'} ${theme === 'dark' ? 'bg-[#030303] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>

            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                {theme === 'dark' ? (
                    <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-gradient from-accent-primary/20 via-transparent to-transparent opacity-40 blur-3xl" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-gradient from-accent-primary/10 via-transparent to-transparent opacity-40 blur-3xl" />
                    </>
                )}
            </div>

            <div className={`relative z-10 w-full h-full ${className?.includes('grid') ? className : 'container mx-auto px-4 py-8 md:py-16 flex-1 flex flex-col'}`}>
                {(title || actions) && (
                    <div className={`mb-8 ${className?.includes('grid') ? 'col-span-12' : ''} flex flex-col md:flex-row items-center justify-between gap-6`}>
                        <div className="text-center md:text-left">
                            {title && (
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-current to-current/50">
                                    {title}
                                </h1>
                            )}
                            {description && <p className="text-sm opacity-60 max-w-2xl mt-2">{description}</p>}
                        </div>
                        {actions && (
                            <div className="flex items-center gap-4">
                                {actions}
                            </div>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default LabLayout;
