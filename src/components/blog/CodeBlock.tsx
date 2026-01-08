import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text', filename }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Language display names
    const languageNames: Record<string, string> = {
        typescript: 'TypeScript',
        javascript: 'JavaScript',
        tsx: 'TSX',
        jsx: 'JSX',
        csharp: 'C#',
        cs: 'C#',
        json: 'JSON',
        bash: 'Bash',
        shell: 'Shell',
        css: 'CSS',
        html: 'HTML',
        glsl: 'GLSL',
        sql: 'SQL',
        python: 'Python',
        text: 'Text'
    };

    const displayLanguage = languageNames[language.toLowerCase()] || language.toUpperCase();

    return (
        <div className="terminal-window group">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="terminal-btn terminal-btn-red" />
                    <span className="terminal-btn terminal-btn-yellow" />
                    <span className="terminal-btn terminal-btn-green" />
                </div>

                <div className="terminal-title">
                    {filename || displayLanguage}
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="terminal-copy-btn"
                    aria-label={copied ? 'Copied!' : 'Copy code'}
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.span
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-1.5 text-green-400"
                            >
                                <FiCheck className="w-4 h-4" />
                                <span className="text-xs">Copied!</span>
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-1.5"
                            >
                                <FiCopy className="w-4 h-4" />
                                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code Content */}
            <div className="terminal-content">
                <pre className="terminal-pre">
                    <code className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;
