import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCpu, FiTerminal, FiCode } from 'react-icons/fi';

const DevProcessVisualizer: React.FC = () => {
    const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0: Code, 1: Execution, 2: Output

    // Phase duration configuration (ms)
    const CODE_DURATION = 5000;
    const EXEC_DURATION = 4000;
    const OUTPUT_DURATION = 4000;

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (phase === 0) {
            timer = setTimeout(() => setPhase(1), CODE_DURATION);
        } else if (phase === 1) {
            timer = setTimeout(() => setPhase(2), EXEC_DURATION);
        } else if (phase === 2) {
            timer = setTimeout(() => setPhase(0), OUTPUT_DURATION);
        }

        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="w-full max-w-2xl mx-auto h-[400px] bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col font-mono text-sm relative">
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0 z-20">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-gray-400 text-xs flex items-center space-x-2">
                    {phase === 0 && <span className="flex items-center"><FiCode className="mr-1" /> editor.cs</span>}
                    {phase === 1 && <span className="flex items-center"><FiTerminal className="mr-1" /> terminal</span>}
                    {phase === 2 && <span className="flex items-center"><FiCpu className="mr-1" /> production</span>}
                </div>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Content Area */}
            <div className="relative flex-1 bg-[#1e1e1e] p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    {phase === 0 && <CodePhase key="code" />}
                    {phase === 1 && <ExecutionPhase key="exec" />}
                    {phase === 2 && <OutputPhase key="output" />}
                </AnimatePresence>
            </div>

            {/* Progress Bar (Bottom) */}
            <motion.div
                className="h-1 bg-accent-primary absolute bottom-0 left-0"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                    duration: (phase === 0 ? CODE_DURATION : phase === 1 ? EXEC_DURATION : OUTPUT_DURATION) / 1000,
                    ease: "linear"
                }}
                key={phase}
            />
        </div>
    );
};

// --- Sub-Components ---

const CodePhase = () => {
    const codeString = `public async Task<IActionResult> ProcessData(DataDto data)
{
    _logger.LogInformation("Processing started...");
    
    // Simulate complex logic
    var result = await _service.OptimizeAsync(data);
    
    if (result.IsSuccess) 
    {
        return Ok(result.Value);
    }
    return BadRequest("Optimization failed");
}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full font-mono text-gray-300 overflow-hidden"
        >
            <Typewriter text={codeString} speed={30} />
        </motion.div>
    );
};

const ExecutionPhase = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col justify-start space-y-2 font-mono"
        >
            <TerminalLine text="> dotnet build" delay={0.2} />
            <TerminalLine text="  Determining projects to restore..." delay={0.8} />
            <TerminalLine text="  Refund.Processor -> C:\bin\Debug\net8.0\Refund.dll" delay={1.5} color="text-gray-400" />
            <TerminalLine text="  Build succeeded." delay={2.2} color="text-green-400" />
            <TerminalLine text="> dotnet run" delay={2.8} />
            <TerminalLine text="  [info] Service listening on https://localhost:5001" delay={3.5} color="text-blue-400" />
        </motion.div>
    );
};

const OutputPhase = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center p-4"
        >
            {/* Mock UI Card */}
            <div className="bg-[#252526] w-full max-w-sm rounded-lg p-6 border border-white/5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />

                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-500/20 text-green-500 rounded-full">
                        <FiCheckCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">Deployment Complete</h3>
                        <p className="text-gray-400 text-xs">Service is fully operational</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="h-2 bg-white/10 rounded w-3/4" />
                    <div className="h-2 bg-white/10 rounded w-1/2" />
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">Status: 200 OK</span>
                    <span className="text-xs text-gray-500">12ms</span>
                </div>
            </div>
        </motion.div>
    );
};

// --- Helpers ---

const Typewriter = ({ text, speed }: { text: string; speed: number }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayText('');
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <pre className="whitespace-pre-wrap">
            <SyntaxHighlight code={displayText} />
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-accent-primary ml-1 align-middle"
            />
        </pre>
    );
};

// Simple syntax highlighting (regex based for demo)
const SyntaxHighlight = ({ code }: { code: string }) => {
    // Very basic C# highlights
    const parts = code.split(/(\b(?:public|async|Task|return|if|var|await|new|int|string|bool)\b|"[^"]*"|\/\/.*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (/^(public|async|Task|return|if|var|await|new|int|string|bool)$/.test(part)) {
                    return <span key={i} className="text-blue-400">{part}</span>;
                } else if (/^"[^"]*"$/.test(part)) {
                    return <span key={i} className="text-green-400">{part}</span>;
                } else if (/^\/\/.*$/.test(part)) {
                    return <span key={i} className="text-gray-500">{part}</span>;
                } else {
                    return <span key={i} className="text-gray-300">{part}</span>;
                }
            })}
        </>
    );
};

const TerminalLine = ({ text, delay, color = "text-gray-300" }: { text: string; delay: number; color?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            className={`font-mono text-sm ${color}`}
        >
            {text}
        </motion.div>
    );
};

export default DevProcessVisualizer;
