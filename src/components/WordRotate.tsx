"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const WordRotate = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words]);

    return (
        <div className="inline-flex relative h-[1.5em] w-auto min-w-[220px] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};
