import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu } from 'react-icons/fi';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Assistant: React.FC = () => {
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
        <div className="container mx-auto px-6 pt-32 pb-12 min-h-screen">
            <div className="max-w-4xl mx-auto h-[70vh] flex flex-col glass-card border-line rounded-2xl overflow-hidden relative">
                {/* Header */}
                <div className="p-4 border-b border-line bg-background-secondary/50 backdrop-blur-sm flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                        <h1 className="text-xl font-bold text-text-primary">AI Assistant Playground</h1>
                        <p className="text-xs text-text-secondary">Explore my portfolio with AI</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background-primary/30 scrollbar-thin scrollbar-thumb-background-tertiary">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'assistant' ? 'bg-accent-primary text-white' : 'bg-background-tertiary text-text-primary'
                                }`}>
                                {msg.role === 'assistant' ? <FiCpu size={18} /> : <FiUser size={18} />}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl p-4 text-base leading-relaxed shadow-lg ${msg.role === 'user'
                                ? 'bg-accent-primary text-white rounded-tr-sm'
                                : 'bg-background-tertiary text-text-primary rounded-tl-sm'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1].role === 'user' && (
                        <div className="flex gap-3 items-center text-text-secondary text-sm ml-14">
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-line bg-background-secondary/50 backdrop-blur-sm">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about my skills, projects, or experience..."
                            className="w-full bg-background-primary/80 border border-line rounded-xl py-4 pl-6 pr-14 text-text-primary focus:outline-none focus:border-accent-primary transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-secondary transition-colors shadow-md"
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Assistant;
