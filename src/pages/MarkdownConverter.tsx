import React, { useState, useEffect } from 'react';

import { FiEdit3, FiEye, FiDownload, FiCopy, FiCheck, FiTrash2, FiLayout } from 'react-icons/fi';
import LabLayout from '../components/LabLayout';
import FuzzyOverlay from '../components/react-bits/FuzzyOverlay';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Live

## A Real-Time Rendering Engine
Experince seamless **instant preview** as you type. This editor is optimized for developers who need a quick, distraction-free environment for documentation.

### Features
- **Live Sync**: Zero latency rendering
- **Safe HTML**: Sanitized output via DOMPurify
- **Glocal Access**: Export to .md or .html instantly

\`\`\`javascript
const r4 = {
    version: "2.0.0",
    theme: "Dark Neumorphism",
    performance: "Blazing Fast"
};
\`\`\`

> "Simplicity is the ultimate sophistication." 
> — Leonardo da Vinci
`;

const MarkdownConverter: React.FC = () => {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
    const [html, setHtml] = useState('');
    const [activeView, setActiveView] = useState<'split' | 'edit' | 'preview'>('split');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const rawHtml = marked(markdown) as string;
        setHtml(DOMPurify.sanitize(rawHtml));
    }, [markdown]);

    const handleCopy = () => {
        navigator.clipboard.writeText(html);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = (type: 'md' | 'html') => {
        const content = type === 'md' ? markdown : html;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document.${type}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <LabLayout
            title="Markdown Live"
            description="Real-Time Rendering Engine"
            actions={
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setActiveView('split')}
                        className={`p-2 rounded-md transition-all ${activeView === 'split' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:text-white'}`}
                        title="Split View"
                    >
                        <FiLayout />
                    </button>
                    <button
                        onClick={() => setActiveView('edit')}
                        className={`p-2 rounded-md transition-all ${activeView === 'edit' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:text-white'}`}
                        title="Editor Only"
                    >
                        <FiEdit3 />
                    </button>
                    <button
                        onClick={() => setActiveView('preview')}
                        className={`p-2 rounded-md transition-all ${activeView === 'preview' ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:text-white'}`}
                        title="Preview Only"
                    >
                        <FiEye />
                    </button>
                </div>
            }
            className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8 h-[calc(100vh-140px)] relative"
        >
            <FuzzyOverlay />

            {/* Editor Pane */}
            {(activeView === 'split' || activeView === 'edit') && (
                <div className={`flex-1 flex flex-col gap-4 min-w-0 ${activeView === 'split' ? 'lg:w-1/2' : 'w-full'}`}>
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <FiEdit3 className="text-indigo-400" /> Editor
                        </span>
                        <div className="text-xs font-mono text-gray-600">
                            {markdown.length} chars
                        </div>
                    </div>

                    <div className="flex-1 rounded-2xl bg-[#080808]/80 border border-white/10 shadow-2xl overflow-hidden relative group hover:border-white/20 transition-colors backdrop-blur-md">
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="w-full h-full bg-transparent p-6 md:p-8 font-mono text-sm md:text-base text-gray-300 resize-none focus:outline-none focus:bg-white/[0.01] transition-colors leading-relaxed custom-scrollbar"
                            placeholder="Type markdown here..."
                            spellCheck={false}
                        />
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setMarkdown('')}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Clear All"
                            >
                                <FiTrash2 size={14} />
                            </button>
                            <button
                                onClick={() => handleDownload('md')}
                                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                                title="Download .md"
                            >
                                <FiDownload size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Pane */}
            {(activeView === 'split' || activeView === 'preview') && (
                <div className={`flex-1 flex flex-col gap-4 min-w-0 ${activeView === 'split' ? 'lg:w-1/2' : 'w-full'}`}>
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <FiEye className="text-emerald-400" /> Preview
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                            >
                                {isCopied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                                {isCopied ? 'Copied HTML' : 'Copy HTML'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 rounded-2xl bg-white border border-white/10 shadow-2xl overflow-hidden relative backdrop-blur-md">
                        {/* Browser Window Bar */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-1.5 z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            <div className="mx-auto text-[10px] text-gray-400 font-mono">localhost:3000/preview</div>
                        </div>

                        <div className="absolute inset-0 top-8 overflow-auto custom-scrollbar p-8 prose prose-slate max-w-none prose-sm md:prose-base prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-pre:bg-slate-800 prose-pre:text-slate-50 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 prose-blockquote:py-1 prose-blockquote:px-4">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                    </div>
                </div>
            )}
        </LabLayout>
    );
};

export default MarkdownConverter;
