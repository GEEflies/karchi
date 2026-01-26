"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorContextType {
    setCursorType: (type: 'default' | 'portfolio') => void;
}

const CursorContext = createContext<CursorContextType>({
    setCursorType: () => { },
});

export const useCursor = () => useContext(CursorContext);

export default function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursorType, setCursorType] = useState<'default' | 'portfolio'>('default');
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorText = cursorTextRef.current;

        if (!cursor || !cursorText) return;

        // Initial setup
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorText = cursorTextRef.current;

        if (!cursor || !cursorText) return;

        if (cursorType === 'portfolio') {
            gsap.to(cursor, {
                width: 80,
                height: 80,
                backgroundColor: '#ffffff', // White background
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorText, {
                opacity: 1,
                scale: 1,
                color: '#000000', // Black text
                duration: 0.3,
                delay: 0.1
            });
            // document.documentElement.classList.add('cursor-none'); // Keep system cursor hidden or shown?
            // Usually we want to hide system cursor if we have a custom one.
            document.documentElement.classList.add('cursor-none');
        } else {
            // Default state - small dot or hidden if user prefers system cursor usually
            // but here we keep a small dot or completely hide the custom cursor and show system cursor?
            // The prompt says "return to normal". Usually "normal" implies system cursor OR a small dot.
            // Let's go with a small dot to keep the custom feel alive, or just hide it if design allows.
            // For now: Small customized dot.
            gsap.to(cursor, {
                width: 12,
                height: 12,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorText, {
                opacity: 0,
                scale: 0.5,
                color: '#ffffff', // Reset to white
                duration: 0.2
            });
            document.documentElement.classList.remove('cursor-none');
        }
    }, [cursorType]);

    return (
        <CursorContext.Provider value={{ setCursorType }}>
            {children}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] backdrop-blur-sm flex items-center justify-center overflow-hidden"
                style={{ width: 12, height: 12, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div
                    ref={cursorTextRef}
                    className="text-white text-sm font-black uppercase tracking-widest opacity-0 text-center leading-none flex flex-col items-center justify-center gap-1"
                >
                    <span>Case</span>
                    <span>Study</span>
                </div>
            </div>
        </CursorContext.Provider>
    );
}
