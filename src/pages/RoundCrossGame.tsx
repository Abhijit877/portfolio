import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiCpu, FiUser, FiActivity, FiTarget, FiZap, FiAward } from 'react-icons/fi';
import LabLayout from '../components/LabLayout';
import Tilt from 'react-parallax-tilt';
import { getBestMove, checkWinner } from '../utils/minimax';

const RoundCrossGame: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [difficulty, setDifficulty] = useState<'easy' | 'impossible'>('impossible');
    const [stats, setStats] = useState({ playerWins: 0, aiWins: 0, draws: 0 });

    useEffect(() => {
        if (!isXNext && !winner) {
            // AI Turn
            setIsThinking(true);
            const timer = setTimeout(() => {
                const move = getBestMove(board, difficulty === 'impossible');
                handleClick(move);
                setIsThinking(false);
            }, 600); // Artificial delay for realism
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, board, difficulty]);

    const handleClick = (index: number) => {
        if (board[index] || winner || isThinking) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
            updateStats(win);
        } else if (!newBoard.includes(null)) {
            setWinner('Draw');
            updateStats('Draw');
        } else {
            setIsXNext(!isXNext);
        }
    };

    const updateStats = (result: string) => {
        setStats(prev => ({
            ...prev,
            playerWins: result === 'X' ? prev.playerWins + 1 : prev.playerWins,
            aiWins: result === 'O' ? prev.aiWins + 1 : prev.aiWins,
            draws: result === 'Draw' ? prev.draws + 1 : prev.draws
        }));
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <LabLayout
            title="Minimax Engine"
            description="Unbeatable Tic-Tac-Toe AI"
            actions={
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setDifficulty('easy')}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-300 shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => setDifficulty('impossible')}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${difficulty === 'impossible' ? 'bg-indigo-500/20 text-indigo-300 shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Impossible
                    </button>
                </div>
            }
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 overflow-y-auto w-full max-w-7xl mx-auto"
        >
            {/* Stats Sidebar - Left (Desktop) / Bottom (Mobile) */}
            <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
                {/* Scoreboard */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <FiActivity /> Session Stats
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                    <FiUser size={16} />
                                </div>
                                <div className="text-sm text-gray-300">Player (X)</div>
                            </div>
                            <div className="font-mono text-xl font-bold text-emerald-400">{stats.playerWins}</div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <FiCpu size={16} />
                                </div>
                                <div className="text-sm text-gray-300">Minimax (O)</div>
                            </div>
                            <div className="font-mono text-xl font-bold text-indigo-400">{stats.aiWins}</div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-sm text-gray-400 ml-2">Draws</div>
                            <div className="font-mono text-xl font-bold text-gray-500 mr-2">{stats.draws}</div>
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex-1 hidden lg:flex flex-col">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <FiZap /> Neural Core
                    </h3>
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Animated Neural Activity Visual */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <div className="w-32 h-32 border border-indigo-500/20 rounded-full animate-pulse-slow"></div>
                            <div className="absolute w-20 h-20 border border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                        </div>
                        <div className="text-center">
                            <div className={`text-4xl font-bold mb-2 transition-colors ${isThinking ? 'text-indigo-400 animate-pulse' : 'text-gray-600'}`}>
                                {isThinking ? 'Thinking...' : 'Idle'}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">Depth: {difficulty === 'impossible' ? 'MAX' : '2'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Board - Center */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 min-h-[400px]">
                <div className="relative group perspective-1000">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                    <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1000}
                        scale={1.02}
                        className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10"
                    >
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {board.map((cell, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleClick(index)}
                                    className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl flex items-center justify-center text-5xl font-bold transition-all border border-white/5 bg-black/40 ${cell === 'X' ? 'text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]' :
                                        cell === 'O' ? 'text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' :
                                            'text-transparent hover:border-white/10'
                                        }`}
                                >
                                    {cell && (
                                        <motion.span
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        >
                                            {cell}
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </Tilt>

                    {/* Winner Overlay */}
                    <AnimatePresence>
                        {winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl"
                            >
                                <div className="text-center p-8 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl transform">
                                    <div className="mb-4">
                                        {winner === 'Draw' ? (
                                            <FiActivity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        ) : (
                                            <FiAward className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {winner === 'Draw' ? 'Stalemate' : `${winner} Wins!`}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-6">
                                        {winner === 'X' ? 'Humanity prevails.' : winner === 'O' ? 'The AI dominates.' : 'A perfect balance.'}
                                    </p>
                                    <button
                                        onClick={resetGame}
                                        className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <FiRefreshCw /> Play Again
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Game Facts / Instructions - Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-6 order-3">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl h-full">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                        <FiTarget /> Objectives
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span>Align 3 symbols vertically, horizontally, or diagonally to win.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span>The "Impossible" AI uses the Minimax algorithm to calculate all possible outcomes.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span>Defeating the AI on max difficulty is mathematically impossible.</span>
                        </li>
                    </ul>

                    <div className="mt-8 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <h4 className="text-indigo-300 font-bold text-sm mb-1">Pro Tip</h4>
                        <p className="text-xs text-indigo-200/60 leading-relaxed">
                            Start in the center or corners to force a draw against the perfect engine.
                        </p>
                    </div>
                </div>
            </div>
        </LabLayout>
    );
};

export default RoundCrossGame;
