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
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={words[index]}
                    initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent font-semibold"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};
