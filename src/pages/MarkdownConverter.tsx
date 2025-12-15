import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiCode, FiEye, FiShield, FiCopy, FiCheck } from 'react-icons/fi';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownConverter: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('# Hello Markdown\n\nStart typing **markdown** on the left to see the *live preview* on the right.\n\n```javascript\nconsole.log("Code blocks supported!");\n```\n\n## Security Feature\nTry pasting a script tag:\n<script>alert("XSS Attack!")</script>\nIt will be sanitized automatically!');
    const [html, setHtml] = useState<string>('');
    const [splitPos, setSplitPos] = useState<number>(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const [justCopied, setJustCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            const rawHtml = await marked.parse(markdown);
            const cleanHtml = DOMPurify.sanitize(rawHtml as string);
            setHtml(cleanHtml);
        }, 300);

        return () => clearTimeout(timer);
    }, [markdown]);

    // Split Pane Logic
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    const handleDrag = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newPos = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        if (newPos > 20 && newPos < 80) { // Limits
            setSplitPos(newPos);
        }
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleDragEnd);
        } else {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
        }
    }, [isDragging, handleDrag]);

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(html);
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background-primary transition-colors duration-300">
            <div className="container mx-auto max-w-[1400px]">
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-2"
                        >
                            <FiCpu /> Engineering Lab #5
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                            Live Markdown Editor
                        </h1>
                    </div>
                </header>

                {/* Editor Container */}
                <div
                    ref={containerRef}
                    className="relative flex h-[75vh] bg-background-secondary border border-line rounded-2xl overflow-hidden shadow-2xl select-none"
                >
                    {/* Left Pane: Input */}
                    <div
                        style={{ width: `${splitPos}%` }}
                        className="flex flex-col border-r border-line relative"
                    >
                        <div className="bg-[#1e1e1e] p-3 border-b border-white/10 flex items-center justify-between text-white">
                            <span className="flex items-center gap-2 text-sm font-bold opacity-80">
                                <FiCode /> Markdown Source
                            </span>
                            <span className="text-xs opacity-50 font-mono">UTF-8</span>
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="flex-1 p-6 bg-[#0d0d0d] resize-none focus:outline-none font-mono text-sm leading-relaxed text-gray-300 selection:bg-accent-primary/30"
                            placeholder="# Type markdown here..."
                            spellCheck={false}
                        />
                    </div>

                    {/* Draggable Divider */}
                    <div
                        className={`absolute top-0 bottom-0 w-1 bg-accent-primary cursor-col-resize z-20 hover:scale-x-[4] hover:opacity-100 transition-all ${isDragging ? 'scale-x-[4] opacity-100' : 'opacity-0'}`}
                        style={{ left: `${splitPos}%`, transform: 'translateX(-50%)' }}
                        onMouseDown={handleDragStart}
                    />

                    {/* Right Pane: Preview */}
                    <div
                        style={{ width: `${100 - splitPos}%` }}
                        className="flex flex-col bg-white text-black relative"
                    >
                        <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                <FiEye /> Live Preview
                            </span>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-700 px-2 py-1 rounded"
                                >
                                    <FiShield /> Sanitized
                                </motion.div>
                                <button
                                    onClick={handleCopyHtml}
                                    className="p-1.5 hover:bg-white rounded-md text-gray-500 hover:text-accent-primary transition-all relative overflow-hidden"
                                    title="Copy HTML to Clipboard"
                                >
                                    <AnimatePresence mode='wait'>
                                        {justCopied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <FiCheck className="text-green-500" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <FiCopy />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                        <div
                            className="flex-1 p-8 overflow-auto prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-code:bg-gray-200 prose-code:text-red-500 prose-code:rounded prose-code:px-1 prose-pre:bg-gray-800 prose-pre:text-gray-100"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </div>

                <p className="text-center text-text-secondary text-sm mt-6 opacity-60">
                    Drag the center divider to resize panes.
                </p>
            </div>
        </div>
    );
};

export default MarkdownConverter;
