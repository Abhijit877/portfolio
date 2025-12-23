import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [text] = useState("> INITIALIZING SECURE CONNECTION...");

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000); // 1.5s text + 0.5s glitch transition
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono text-green-500 text-sm md:text-base">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="typing-effect overflow-hidden whitespace-nowrap border-r-2 border-green-500 pr-1 animate-pulse">
                    {text}
                </div>
                <div className="w-48 h-1 bg-green-900/30 rounded-full overflow-hidden mt-4">
                    <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </div>
    );
};
