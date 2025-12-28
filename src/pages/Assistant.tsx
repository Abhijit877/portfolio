import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu, FiActivity, FiSettings, FiClock, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LabLayout from '../components/LabLayout';
import Particles from '../components/react-bits/Particles';
import DecayText from '../components/react-bits/DecayText';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
}

const Assistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e?: React.FormEvent, manualInput?: string) => {
        if (e) e.preventDefault();
        const textToSend = manualInput || input;

        if (!textToSend.trim() || isLoading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: textToSend, timestamp: new Date() }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: textToSend }].map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) throw new Error(response.statusText);
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: new Date() }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                assistantMessage += chunk;

                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = assistantMessage;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the AI service. Please try again later.", timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Empty State Component ---
    const EmptyState = () => (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-80 z-20 relative">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-6 animate-pulse-slow backdrop-blur-sm border border-indigo-500/20">
                <FiCpu className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div className="mb-2">
                <DecayText text="Neural Interface Ready" className="text-xl font-bold text-text-primary" />
            </div>
            <p className="text-sm text-text-secondary max-w-sm mb-8">
                Connect to the portfolio knowledge base. Ask about projects, technical skills, or professional experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                {['Summarize experience', 'List top skills', 'Explain "Gravity Carrom"', 'Contact details'].map((suggestion) => (
                    <button
                        key={suggestion}
                        onClick={() => handleSubmit(undefined, suggestion)}
                        className="px-4 py-3 bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-indigo-500/30 rounded-xl text-sm text-text-secondary hover:text-indigo-500 dark:hover:text-indigo-300 transition-all text-left flex items-center justify-between group backdrop-blur-md"
                    >
                        <span>{suggestion}</span>
                        <FiSend className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-indigo-500 dark:text-indigo-400" />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <LabLayout
            title="AI Assistant"
            description="Interactive Portfolio Intelligence"
            className="grid grid-cols-1 lg:grid-cols-12 grid-rows-[1fr_auto] lg:grid-rows-1 gap-0 lg:gap-0 relative" // Bento Grid Setup
        >
            <Particles className="absolute inset-0 z-0 opacity-30" quantity={40} />

            {/* Main Chat Area - 9 Columns */}
            <div className="lg:col-span-9 flex flex-col h-[80vh] bg-white/50 dark:bg-white/[0.01] relative z-10 rounded-l-2xl border border-r-0 border-white/10 overflow-hidden backdrop-blur-sm">

                {/* Scrollable Messages */}
                <div className="flex-1 overflow-y-auto min-h-0 p-4 md:p-8 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 relative">
                    {messages.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-8 max-w-3xl mx-auto z-20 relative">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border backdrop-blur-md ${msg.role === 'assistant'
                                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                                            : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                                            }`}>
                                            {msg.role === 'assistant' ? <FiCpu size={18} /> : <FiUser size={18} />}
                                        </div>

                                        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                            <div className={`rounded-2xl p-4 md:p-6 text-sm md:text-base leading-relaxed backdrop-blur-md border shadow-sm ${msg.role === 'user'
                                                ? 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/10 text-emerald-900 dark:text-emerald-50 rounded-tr-sm'
                                                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 text-text-primary rounded-tl-sm'
                                                }`}>
                                                {msg.content}
                                            </div>
                                            {msg.timestamp && (
                                                <span className="text-[10px] text-text-secondary mt-2 font-mono ml-1 uppercase tracking-widest opacity-60">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 items-center ml-14 md:ml-16"
                                >
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span className="text-xs font-mono text-indigo-400/80 tracking-widest">PROCESSING</span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area - Clean & Glassy */}
                <div className="p-4 md:p-6 pb-20 md:pb-6 bg-gradient-to-t from-white/90 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 absolute bottom-0 left-0 w-full z-20">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Abhijit..."
                            className="w-full bg-white/80 dark:bg-[#111111]/80 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-[#151515] transition-all shadow-xl font-mono text-sm backdrop-blur-md text-glow"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                        >
                            <FiSend size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar Stats - 3 Columns */}
            <div className="lg:col-span-3 hidden lg:flex flex-col bg-white/20 dark:bg-black/20 border-l border-y border-r border-line dark:border-white/5 backdrop-blur-xl p-6 relative z-20 rounded-r-2xl h-[80vh]">
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2 mb-4">
                        <FiActivity /> System Metrics
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-line dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                            <span className="text-xs text-text-secondary">Response Time</span>
                            <span className="text-sm font-mono text-emerald-500 dark:text-emerald-400 font-bold">~120ms</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-line dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                            <span className="text-xs text-text-secondary">Model</span>
                            <span className="text-sm font-mono text-indigo-500 dark:text-indigo-400 font-bold">gpt-4o</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-line dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                            <span className="text-xs text-text-secondary">Session ID</span>
                            <span className="text-xs font-mono text-text-secondary truncate w-24">#8F2A-9X</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2 mb-4">
                        <FiSettings /> Capabilities
                    </h3>
                    <div className="space-y-2">
                        {['Portfolio Analysis', 'Skill Match', 'Project Insights', 'Code Explanation'].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-line dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/[0.05] transition-all cursor-default group">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                    <FiMessageSquare size={14} />
                                </div>
                                <span className="text-sm text-text-secondary group-hover:text-text-primary">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-line dark:border-white/5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <FiClock className="text-text-secondary" />
                        <span>Session started at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
        </LabLayout>
    );
};

export default Assistant;

