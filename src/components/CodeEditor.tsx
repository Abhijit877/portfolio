import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined tokens for the C# snippet to allow syntax highlighting while typing
interface CodeToken {
    text: string;
    type: 'keyword' | 'type' | 'method' | 'variable' | 'string' | 'comment' | 'plain' | 'symbol';
}

const snippetTokens: CodeToken[] = [
    { text: 'public', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'async', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'Task', type: 'type' },
    { text: '<', type: 'symbol' },
    { text: 'List', type: 'type' },
    { text: '<', type: 'symbol' },
    { text: 'Entity', type: 'type' },
    { text: '>>', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: 'SyncDataAsync', type: 'method' },
    { text: '(', type: 'symbol' },
    { text: 'QueryContext', type: 'type' },
    { text: ' ', type: 'plain' },
    { text: 'ctx', type: 'variable' },
    { text: ')', type: 'symbol' },
    { text: '\n', type: 'plain' },
    { text: '{', type: 'symbol' },
    { text: '\n  ', type: 'plain' },
    { text: 'var', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'query', type: 'variable' },
    { text: ' ', type: 'plain' },
    { text: '=', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: '_repo', type: 'variable' },
    { text: '.', type: 'symbol' },
    { text: 'Entities', type: 'plain' },
    { text: '\n    ', type: 'plain' },
    { text: '.', type: 'symbol' },
    { text: 'Where', type: 'method' },
    { text: '(', type: 'symbol' },
    { text: 'e', type: 'variable' },
    { text: ' ', type: 'plain' },
    { text: '=>', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: 'e', type: 'variable' },
    { text: '.', type: 'symbol' },
    { text: 'IsActive', type: 'plain' },
    { text: ' ', type: 'plain' },
    { text: '&&', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: 'ctx', type: 'variable' },
    { text: '.', type: 'symbol' },
    { text: 'Matches', type: 'method' },
    { text: '(', type: 'symbol' },
    { text: 'e', type: 'variable' },
    { text: '))', type: 'symbol' },
    { text: '\n    ', type: 'plain' },
    { text: '.', type: 'symbol' },
    { text: 'Include', type: 'method' },
    { text: '(', type: 'symbol' },
    { text: 'e', type: 'variable' },
    { text: ' ', type: 'plain' },
    { text: '=>', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: 'e', type: 'variable' },
    { text: '.', type: 'symbol' },
    { text: 'Attributes', type: 'plain' },
    { text: ')', type: 'symbol' },
    { text: ';', type: 'symbol' },
    { text: '\n\n  ', type: 'plain' },
    // Critical line to highlight
    { text: 'var', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'results', type: 'variable' },
    { text: ' ', type: 'plain' },
    { text: '=', type: 'symbol' },
    { text: ' ', type: 'plain' },
    { text: 'await', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'query', type: 'variable' },
    { text: '.', type: 'symbol' },
    { text: 'ToListAsync', type: 'method' },
    { text: '()', type: 'symbol' },
    { text: ';', type: 'symbol' },
    { text: '\n\n  ', type: 'plain' },
    { text: 'return', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'results', type: 'variable' },
    { text: ';', type: 'symbol' },
    { text: '\n', type: 'plain' },
    { text: '}', type: 'symbol' },
];

const getColor = (type: CodeToken['type']) => {
    switch (type) {
        case 'keyword': return 'text-blue-400';
        case 'type': return 'text-yellow-300';
        case 'method': return 'text-blue-400';
        case 'variable': return 'text-cyan-200';
        case 'string': return 'text-green-400';
        case 'symbol': return 'text-white';
        case 'comment': return 'text-gray-500';
        default: return 'text-gray-300';
    }
};

const CodeEditor: React.FC = () => {
    const [charIndex, setCharIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showHighlight, setShowHighlight] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Flatten text for easy character counting
    const fullText = snippetTokens.map(t => t.text).join('');

    // Identify the pause point: Right after "await query.ToListAsync();"
    // Let's find the index of that specific line in the full text
    const pauseTextTarget = "await query.ToListAsync();";
    const pauseIndex = fullText.indexOf(pauseTextTarget) + pauseTextTarget.length;

    useEffect(() => {
        let animationFrameId: number;
        let lastTime = 0;
        const typeSpeed = 40; // ms per char approx

        const loop = (time: number) => {
            if (isPaused) {
                animationFrameId = requestAnimationFrame(loop);
                return;
            }

            if (time - lastTime >= typeSpeed) {
                lastTime = time;
                setCharIndex((prev) => {
                    const next = prev + 1;

                    // Check for pause condition
                    if (next === pauseIndex) {
                        setIsPaused(true);
                        setShowHighlight(true);

                        // Trigger resume after delay
                        setTimeout(() => {
                            setShowHighlight(false);
                            setTimeout(() => setIsPaused(false), 200); // Slight delay after highlight fades
                        }, 1500);

                        return next;
                    }

                    // Check for completion and loop
                    if (next > fullText.length + 20) { // Slight pause at end
                        return 0; // Reset
                    }

                    return next;
                });
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, fullText.length, pauseIndex]);

    // Auto-scroll
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [charIndex]);

    // Render logic
    const renderCode = () => {
        let currentChars = 0;
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < snippetTokens.length; i++) {
            const token = snippetTokens[i];

            if (currentChars + token.text.length <= charIndex) {
                // Full token
                elements.push(
                    <span key={i} className={getColor(token.type)}>{token.text}</span>
                );
                currentChars += token.text.length;
            } else if (currentChars < charIndex) {
                // Partial token
                const slice = token.text.slice(0, charIndex - currentChars);
                elements.push(
                    <span key={i} className={getColor(token.type)}>{slice}</span>
                );
                currentChars += slice.length;
                break; // Stop rendering
            } else {
                break; // Not reached yet
            }
        }
        return elements;
    };

    return (
        <motion.div
            className="w-full max-w-xl mx-auto rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-2xl font-mono text-sm md:text-base relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Title Bar */}
            <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                    <span className="bg-[#1e1e1e] px-2 py-1 rounded text-blue-400">SyncService.cs</span>
                </div>
                <div className="w-8" /> {/* Spacer for centering */}
            </div>

            {/* Code Area */}
            <div
                ref={scrollContainerRef}
                className="p-4 md:p-6 overflow-hidden relative min-h-[300px]"
            >
                {/* Highlight Overlay */}
                <AnimatePresence>
                    {showHighlight && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-0 right-0 h-[1.5em] bg-accent-primary/20 border-l-2 border-accent-primary z-0"
                            style={{
                                // Approximate vertical position based on line count at pause index
                                // This is a bit magic-numbery but fine for a controlled snippet
                                top: 'calc(1.5rem + 10.5em)' // 1.5rem padding + lines down
                            }}
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-10">
                    {/* Line Numbers Container */}
                    <div className="absolute left-0 top-0 text-gray-600 select-none text-right pr-4 border-r border-gray-700/50 h-full w-8">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="leading-6">{i + 1}</div>
                        ))}
                    </div>

                    {/* Code Content */}
                    <div className="pl-12 whitespace-pre leading-6">
                        {renderCode()}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2.5 h-5 bg-accent-primary translate-y-1 ml-0.5"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Status Bar like VS Code */}
            <div className="bg-[#007acc] text-white text-[10px] px-2 py-0.5 flex items-center justify-between">
                <div className="flex space-x-3">
                    <span>main*</span>
                    <span>0 errors</span>
                </div>
                <div className="flex space-x-3">
                    <span>Ln {fullText.slice(0, charIndex).split('\n').length}, Col {fullText.slice(0, charIndex).split('\n').pop()?.length || 0}</span>
                    <span>UTF-8</span>
                    <span>C#</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CodeEditor;
