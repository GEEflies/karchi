"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
    rotation: number;
    shape: 'square' | 'circle' | 'triangle';
}

const COLORS = [
    '#2563eb', // blue
    '#7c3aed', // purple
    '#db2777', // pink
    '#16a34a', // green
    '#ea580c', // orange
    '#fbbf24', // yellow
];

export default function Confetti({ isActive = true }: { isActive?: boolean }) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (!isActive) return;

        const newPieces: ConfettiPiece[] = [];
        const pieceCount = 150;

        for (let i = 0; i < pieceCount; i++) {
            newPieces.push({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2.5 + Math.random() * 2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 6 + Math.random() * 10,
                rotation: Math.random() * 360,
                shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] as 'square' | 'circle' | 'triangle',
            });
        }

        setPieces(newPieces);

        // Clear confetti after animation
        const timer = setTimeout(() => {
            setPieces([]);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isActive]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            <AnimatePresence>
                {pieces.map((piece) => (
                    <motion.div
                        key={piece.id}
                        initial={{
                            x: `${piece.x}vw`,
                            y: -20,
                            rotate: 0,
                            opacity: 1,
                        }}
                        animate={{
                            y: '110vh',
                            rotate: piece.rotation + 720,
                            opacity: [1, 1, 1, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: piece.duration,
                            delay: piece.delay,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{
                            position: 'absolute',
                            width: piece.size,
                            height: piece.size,
                            backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
                            borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : 0,
                            borderLeft: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
                            borderRight: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
                            borderBottom: piece.shape === 'triangle' ? `${piece.size}px solid ${piece.color}` : undefined,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
