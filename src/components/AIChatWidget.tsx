import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi';
import { useUI } from '../context/UIContext';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const AIChatWidget: React.FC = () => {
    const { isChatOpen: isOpen, setChatOpen: setIsOpen } = useUI();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm your AI portfolio assistant. Ask me anything about Abhijit's projects, skills, or experience." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMessage }].map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) throw new Error(response.statusText);
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

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
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the AI service. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-background-primary border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] h-[500px]"
                        >
                            {/* Header */}
                            <div className="p-4 bg-background-secondary border-b border-line flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <h3 className="font-bold text-text-primary">AI Assistant</h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-background-tertiary rounded-full text-text-secondary transition-colors"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-primary scrollbar-thin scrollbar-thumb-background-tertiary">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-accent-primary text-white' : 'bg-background-tertiary text-text-primary'
                                            }`}>
                                            {msg.role === 'assistant' ? <FiCpu size={14} /> : <FiUser size={14} />}
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-accent-primary text-white rounded-tr-sm'
                                            : 'bg-background-tertiary text-text-primary rounded-tl-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && messages[messages.length - 1].role === 'user' && (
                                    <div className="flex gap-3 items-center text-text-secondary text-xs ml-11">
                                        <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-line bg-background-secondary">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about my skills..."
                                        className="w-full bg-background-primary border border-line rounded-xl py-3 pl-4 pr-12 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-secondary transition-colors"
                                    >
                                        <FiSend size={16} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-accent-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent-secondary transition-colors"
                >
                    {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
                </motion.button>
            </div>
        </>
    );
};

export default AIChatWidget;
