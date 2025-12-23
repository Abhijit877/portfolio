import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMonitor, FiRotateCcw, FiActivity, FiTarget, FiZap, FiClock, FiAlertTriangle } from 'react-icons/fi';
import LabLayout from '../components/LabLayout';

// Python code snippets for the test
const SNIPPETS = [
    `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    `class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = [np.random.randn(y, x) for x, y in zip(layers[:-1], layers[1:])]
        self.biases = [np.random.randn(y, 1) for y in layers[1:]]

    def feedforward(self, a):
        for b, w in zip(self.biases, self.weights):
            a = sigmoid(np.dot(w, a) + b)
        return a`,
    `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`
];

const TypingTest: React.FC = () => {
    const [snippet, setSnippet] = useState('');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Timer ref for accurate intervals
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        resetTest();
    }, []);

    const resetTest = () => {
        const randomSnippet = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
        setSnippet(randomSnippet);
        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setIsFinished(false);
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
        if (inputRef.current) inputRef.current.focus();
    };

    const calculateStats = (currentInput: string) => {
        if (!startTime) return;

        const timeElapsedMin = (Date.now() - startTime) / 60000;
        const wordsTyped = currentInput.length / 5;
        const currentWpm = Math.round(wordsTyped / timeElapsedMin) || 0;

        // Calculate errors
        let currentErrors = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (currentInput[i] !== snippet[i]) currentErrors++;
        }

        const currentAccuracy = Math.max(0, Math.round(((currentInput.length - currentErrors) / currentInput.length) * 100));

        setWpm(currentWpm);
        setErrors(currentErrors);
        setAccuracy(isNaN(currentAccuracy) ? 100 : currentAccuracy);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;

        // Start timer on first keystroke
        if (!isActive && val.length === 1) {
            setIsActive(true);
            setStartTime(Date.now());
            timerRef.current = setInterval(() => {
                // Update WIP stats periodically if needed, or just rely on keystrokes
                // For WPM we need real-time updates even if not typing
            }, 1000);
        }

        setInput(val);
        calculateStats(val);

        if (val === snippet) {
            setIsFinished(true);
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    // Render Logic for characters
    const renderCharacter = (char: string, index: number) => {
        const inputChar = input[index];
        let className = "text-gray-500"; // Default (future)

        if (index < input.length) {
            if (inputChar === char) {
                className = "text-emerald-400"; // Correct
            } else {
                className = "text-red-400 bg-red-500/20"; // Incorrect
            }
        } else if (index === input.length) {
            className = "text-accent-primary border-b-2 border-accent-primary animate-pulse"; // Cursor
        }

        return (
            <span key={index} className={className}>{char}</span>
        );
    };

    return (
        <LabLayout
            title="Speed Coder"
            description="Syntax Proficiency Test"
            actions={
                <button
                    onClick={resetTest}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-medium text-gray-300"
                >
                    <FiRotateCcw /> Reset
                </button>
            }
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto"
        >
            {/* HUD - Top Bar (Mobile) or Left Col (Desktop) */}
            <div className="lg:col-span-3 flex flex-col gap-6 order-1">
                {/* Primary Stats Card */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col gap-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <FiActivity /> Live Telemetry
                    </h3>

                    {/* WPM Meter */}
                    <div className="relative flex flex-col items-center justify-center py-6 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-xl border border-indigo-500/20">
                        <div className="text-5xl font-mono font-bold text-indigo-400 tabular-nums">
                            {wpm}
                        </div>
                        <div className="text-xs text-indigo-300/70 font-bold tracking-widest mt-1">WPM</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                            <div className={`text-2xl font-bold font-mono ${accuracy < 90 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                {accuracy}%
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase mt-1">Accuracy</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                            <div className={`text-2xl font-bold font-mono ${errors > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                {errors}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase mt-1">Errors</div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hidden lg:block">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <FiZap /> Objectives
                    </h3>
                    <ul className="space-y-3 text-xs text-gray-400 leading-relaxed">
                        <li className="flex gap-2">
                            <FiTarget className="text-indigo-400 shrink-0 mt-0.5" />
                            <span>Type the code snippet exactly as shown. Indentation matters.</span>
                        </li>
                        <li className="flex gap-2">
                            <FiClock className="text-indigo-400 shrink-0 mt-0.5" />
                            <span>Timer starts on the first keystroke.</span>
                        </li>
                        <li className="flex gap-2">
                            <FiAlertTriangle className="text-yellow-400 shrink-0 mt-0.5" />
                            <span>Mistakes lower your overall accuracy score.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Typing Area - Center/Right */}
            <div className="lg:col-span-9 order-2 flex flex-col h-full min-h-[500px]">
                <div className="flex-1 rounded-2xl bg-[#080808] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col group">

                    {/* Window Controls Decoration */}
                    <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                        <div className="ml-auto text-xs font-mono text-gray-500 flex items-center gap-2">
                            <FiMonitor /> PYTHON_ENV_3.11
                        </div>
                    </div>

                    {/* Code Container */}
                    <div className="flex-1 relative p-8 font-mono text-base md:text-lg leading-relaxed overflow-auto custom-scrollbar" onClick={() => inputRef.current?.focus()}>

                        {/* Rendered Text Overlay */}
                        <div className="absolute top-8 left-8 right-8 select-none pointer-events-none whitespace-pre-wrap">
                            {snippet.split('').map((char, index) => renderCharacter(char, index))}
                        </div>

                        {/* Hidden Input */}
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={handleChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                            spellCheck={false}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                        />
                    </div>

                    {/* Result Overlay */}
                    <AnimatePresence>
                        {isFinished && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20"
                            >
                                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
                                    <h2 className="text-3xl font-bold text-white mb-2">Test Complete</h2>
                                    <p className="text-gray-400 mb-8">System assessment initialized.</p>
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                            <div className="text-2xl font-bold text-indigo-400">{wpm}</div>
                                            <div className="text-[10px] text-gray-500 uppercase">WPM</div>
                                        </div>
                                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                            <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Accuracy</div>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                            <div className="text-2xl font-bold text-blue-400">A+</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Grade</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetTest}
                                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        New Snippet
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </LabLayout>
    );
};

export default TypingTest;
