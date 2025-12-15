import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getBestMove, checkWinner, type Board, type Player } from '../utils/minimax';
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RoundCrossGame: React.FC = () => {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Player is always X and goes first
    const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
        setIsThinking(false);
    };

    const processAIMove = useCallback(() => {
        if (winner || isPlayerTurn) return;

        setIsThinking(true);
        // Add a small delay for realism
        setTimeout(() => {
            const bestMove = getBestMove([...board]);
            if (bestMove !== -1) {
                setBoard(prev => {
                    const newBoard = [...prev];
                    newBoard[bestMove] = 'O';
                    return newBoard;
                });
                setIsPlayerTurn(true);
                setIsThinking(false);
            }
        }, 600);
    }, [board, winner, isPlayerTurn]);

    useEffect(() => {
        const result = checkWinner(board);
        if (result) {
            setWinner(result);
        } else if (!isPlayerTurn && !winner) {
            processAIMove();
        }
    }, [board, isPlayerTurn, winner, processAIMove]);

    const handleCellClick = (index: number) => {
        if (board[index] || winner || !isPlayerTurn || isThinking) return;

        setBoard(prev => {
            const newBoard = [...prev];
            newBoard[index] = 'X';
            return newBoard;
        });
        setIsPlayerTurn(false);
    };

    // Status Message
    let statusMessage = "Your Turn (X)";
    if (winner === 'X') statusMessage = "You Won! (Impossible?)";
    if (winner === 'O') statusMessage = "AI Won!";
    if (winner === 'Draw') statusMessage = "It's a Draw!";
    if (isThinking) statusMessage = "AI is thinking...";

    return (
        <div className="min-h-screen bg-background-primary flex flex-col items-center justify-center p-4 pt-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-accent-primary opacity-10 blur-[100px] rounded-full" />
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent-secondary opacity-10 blur-[100px] rounded-full" />
            </div>

            <div className="z-10 w-full max-w-md">
                <Link to="/" className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors mb-8">
                    <FiArrowLeft className="mr-2" /> Back to Portfolio
                </Link>

                <div className="bg-background-secondary border border-line rounded-2xl p-8 shadow-2xl relative">
                    <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                        Round Cross AI
                    </h1>
                    <p className="text-center text-text-secondary text-sm mb-8">
                        Can you beat the unbeatable Minimax algorithm?
                    </p>

                    <div className="flex justify-center mb-8">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold border ${winner === 'X' ? 'bg-green-500/20 text-green-500 border-green-500/50' :
                            winner === 'O' ? 'bg-red-500/20 text-red-500 border-red-500/50' :
                                winner === 'Draw' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                                    'bg-background-tertiary text-text-primary border-line'
                            }`}>
                            {statusMessage}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {board.map((cell, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={!cell && !winner && isPlayerTurn ? { scale: 1.05 } : {}}
                                whileTap={!cell && !winner && isPlayerTurn ? { scale: 0.95 } : {}}
                                onClick={() => handleCellClick(idx)}
                                className={`h-24 rounded-xl flex items-center justify-center text-4xl font-bold transition-colors ${cell ? 'bg-background-primary shadow-inner border border-line' :
                                    'bg-background-tertiary hover:bg-background-primary cursor-pointer border border-transparent'
                                    } ${cell === 'X' ? 'text-accent-primary' : 'text-accent-secondary'
                                    }`}
                                disabled={!!cell || !!winner || !isPlayerTurn}
                            >
                                {cell && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {cell}
                                    </motion.span>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                    >
                        <FiRefreshCw className={`transition-transform duration-500 ${winner ? 'rotate-180' : ''}`} />
                        {winner ? 'Play Again' : 'Reset Game'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoundCrossGame;
