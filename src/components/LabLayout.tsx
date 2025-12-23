import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LabLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string; // For adding custom grid layouts if needed
}

const MeshBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background-primary transition-colors duration-300">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-500/10 dark:bg-blue-900/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/10 dark:bg-indigo-900/10 rounded-full blur-[80px] animate-pulse-slow delay-2000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    </div>
);

const LabLayout: React.FC<LabLayoutProps> = ({
    children,
    title,
    description,
    actions,
    className
}) => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-background-primary text-text-primary font-sans selection:bg-accent-primary/30 transition-colors duration-300">
            <MeshBackground />

            {/* Header - Fixed Z-Index 100 */}
            <header className="fixed top-0 left-0 w-full h-[var(--header-height)] z-[100] flex items-center justify-between px-6 lg:px-8 border-b border-line/10 backdrop-blur-md bg-white/70 dark:bg-[#050505]/80">
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all group border border-transparent hover:border-black/5 dark:hover:border-white/10 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-xs text-text-secondary font-mono tracking-wide mt-0.5 uppercase">{description}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {actions}
                </div>
            </header>

            {/* Main Content Safe Zone - Z-Index 1 */}
            {/* Height calculated to fit exactly under header with no scroll on body */}
            <main
                className="relative z-[1] flex flex-col w-full px-4 pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8"
                style={{
                    marginTop: 'var(--header-height)',
                    height: 'calc(100vh - var(--header-height))'
                }}
            >
                {/* Glassmorphic Bento Wrapper */}
                {/* Standardizes the 'Card' look for the tool area */}
                <div className={`w-full h-full rounded-2xl border border-line/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-2xl shadow-xl overflow-hidden relative group/container ${className || ''}`}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default LabLayout;
