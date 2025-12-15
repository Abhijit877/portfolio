import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiRefreshCw, FiActivity, FiTarget, FiAlertTriangle, FiCode, FiPlay } from 'react-icons/fi';

// Sample code snippets for testing
const CODE_SNIPPETS = [
    `const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};`,
    `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
  }
  return -1;
}`,
    `useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`
];

interface State {
    status: 'idle' | 'running' | 'finished';
    snippetIndex: number;
    userInput: string;
    startTime: number | null;
    wpm: number;
    accuracy: number;
    errors: number;
    isFocused: boolean;
}

type Action =
    | { type: 'START' }
    | { type: 'TYPE', payload: string }
    | { type: 'RESET' }
    | { type: 'TICK', payload: number }
    | { type: 'SET_FOCUS', payload: boolean };

const initialState: State = {
    status: 'idle',
    snippetIndex: 0,
    userInput: '',
    startTime: null,
    wpm: 0,
    accuracy: 100,
    errors: 0,
    isFocused: false
};

const typingReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                status: 'running',
                startTime: Date.now(),
                userInput: '',
                errors: 0,
                wpm: 0,
                accuracy: 100
            };
        case 'TYPE':
            if (state.status === 'finished') return state;

            const input = action.payload;
            const targetText = CODE_SNIPPETS[state.snippetIndex];

            // Calculate errors
            let errors = 0;
            for (let i = 0; i < input.length; i++) {
                if (input[i] !== targetText[i]) errors++;
            }

            // Check completion
            const isFinished = input.length === targetText.length;

            return {
                ...state,
                userInput: input,
                errors,
                status: isFinished ? 'finished' : state.status
            };
        case 'TICK':
            if (state.status !== 'running' || !state.startTime) return state;

            const timeElapsedMin = (action.payload - state.startTime) / 60000;
            const wordCount = state.userInput.length / 5;
            const wpm = timeElapsedMin > 0 ? Math.round(wordCount / timeElapsedMin) : 0;
            const accuracy = state.userInput.length > 0
                ? Math.round(((state.userInput.length - state.errors) / state.userInput.length) * 100)
                : 100;

            return {
                ...state,
                wpm,
                accuracy
            };
        case 'RESET':
            return {
                ...initialState,
                snippetIndex: (state.snippetIndex + 1) % CODE_SNIPPETS.length
            };
        case 'SET_FOCUS':
            return {
                ...state,
                isFocused: action.payload
            };
        default:
            return state;
    }
};

const MetricCard = ({ icon, label, value, unit, color }: { icon: any, label: string, value: number, unit?: string, color: string }) => (
    <motion.div
        layout
        className="bg-background-secondary border border-line p-5 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-8 opacity-5 ${color} scale-150 transform translate-x-4 -translate-y-4 rounded-full`}></div>
        <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <motion.span
                    key={value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold ${color.replace('bg-', 'text-')}`}
                >
                    {value}
                </motion.span>
                {unit && <span className="text-sm text-text-secondary font-medium">{unit}</span>}
            </div>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-xl ${color.replace('bg-', 'text-')}`}>
            {icon}
        </div>
    </motion.div>
);

const TypingTest: React.FC = () => {
    const [state, dispatch] = useReducer(typingReducer, initialState);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Timer effect
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (state.status === 'running') {
            interval = setInterval(() => {
                dispatch({ type: 'TICK', payload: Date.now() });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [state.status]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (state.status === 'idle') {
            dispatch({ type: 'START' });
        }
        dispatch({ type: 'TYPE', payload: val });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET' });
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const targetText = CODE_SNIPPETS[state.snippetIndex];
    const lines = targetText.split('\n');

    const renderLine = useCallback((line: string, lineIndex: number, globalIndex: number) => {
        return (
            <div key={lineIndex} className="flex">
                <span className="w-8 mr-4 text-right text-text-secondary opacity-30 select-none text-sm leading-relaxed font-mono">
                    {lineIndex + 1}
                </span>
                <span className="flex-1 font-mono text-lg leading-relaxed whitespace-pre font-medium">
                    {line.split('').map((char, charIndex) => {
                        const currentIndex = globalIndex + charIndex;
                        const userChar = state.userInput[currentIndex];

                        let className = "transition-all duration-75 ";

                        if (currentIndex === state.userInput.length) {
                            // Cursor
                            return (
                                <span key={charIndex} className="relative">
                                    <span className="absolute -left-[1px] -top-1 w-[2px] h-6 bg-accent-primary animate-pulse z-10"></span>
                                    <span className="opacity-50 text-text-secondary">{char}</span>
                                </span>
                            );
                        } else if (userChar === undefined) {
                            className += "text-text-secondary opacity-40";
                        } else if (userChar === char) {
                            className += "text-green-400 opacity-100"; // Bright Green for correct
                        } else {
                            className += "text-red-400 bg-red-500/10 border-b border-red-500 rounded-sm"; // Red for error
                        }

                        return (
                            <span key={charIndex} className={className}>
                                {char}
                            </span>
                        );
                    })}
                </span>
            </div>
        );
    }, [state.userInput]);

    // Calculate global indices for line rendering
    let currentGlobalIndex = 0;
    const lineElements = lines.map((line, index) => {
        const el = renderLine(line, index, currentGlobalIndex);
        currentGlobalIndex += line.length + 1; // +1 for newline
        return el;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background-primary transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-3"
                        >
                            <FiCpu /> Engineering Lab #4
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                            Advanced Typing Test
                        </h1>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                        <MetricCard
                            icon={<FiActivity />}
                            label="Speed"
                            value={state.wpm}
                            unit="WPM"
                            color="bg-blue-500"
                        />
                        <MetricCard
                            icon={<FiTarget />}
                            label="Accuracy"
                            value={state.accuracy}
                            unit="%"
                            color="bg-green-500"
                        />
                        <MetricCard
                            icon={<FiAlertTriangle />}
                            label="Errors"
                            value={state.errors}
                            color="bg-red-500"
                        />
                    </div>
                </div>

                {/* IDE Container */}
                <motion.div
                    layout
                    className={`relative bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 ${state.isFocused ? 'border-accent-primary shadow-[0_0_30px_-5px_var(--accent-primary)]' : 'border-line'}`}
                >
                    {/* IDE Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-2 mr-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 text-xs font-mono text-text-secondary">
                                <FiCode /> <span>snippet_{state.snippetIndex + 1}.js</span>
                            </div>
                        </div>
                        <div className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                            {state.status === 'idle' && 'Ready to Start'}
                            {state.status === 'running' && <span className="text-accent-primary animate-pulse">● Recording</span>}
                            {state.status === 'finished' && <span className="text-green-500">✓ Completed</span>}
                        </div>
                    </div>

                    {/* Code Area */}
                    <div
                        className="p-8 min-h-[400px] cursor-text relative group"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Rendered Code */}
                        <div className="relative z-10 space-y-1">
                            {lineElements}
                        </div>

                        {/* Start Overlay Hint */}
                        {state.status === 'idle' && !state.isFocused && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-20 group-hover:bg-transparent transition-colors pointer-events-none">
                                <div className="px-6 py-3 bg-accent-primary text-white rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce">
                                    <FiPlay /> Click to Focus & Start
                                </div>
                            </div>
                        )}

                        {/* Hidden Input */}
                        <textarea
                            ref={inputRef}
                            value={state.userInput}
                            onChange={handleChange}
                            onFocus={() => dispatch({ type: 'SET_FOCUS', payload: true })}
                            onBlur={() => dispatch({ type: 'SET_FOCUS', payload: false })}
                            className="absolute opacity-0 top-0 left-0 w-full h-full cursor-text z-0"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                        />
                    </div>

                    {/* Completion Overlay */}
                    <AnimatePresence>
                        {state.status === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-[#1a1a1a] border border-white/10 p-10 rounded-2xl text-center max-w-md w-full shadow-2xl"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                        <FiTarget />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Excellent Run!</h2>
                                    <p className="text-text-secondary mb-8">
                                        You typed with <span className="text-white font-bold">{state.accuracy}% accuracy</span> at a speed of <span className="text-white font-bold">{state.wpm} WPM</span>.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-accent-primary/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <FiRefreshCw /> Try Next Snippet
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default TypingTest;
