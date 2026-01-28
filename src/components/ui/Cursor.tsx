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
    const [isInPortfolio, setIsInPortfolio] = useState(false);
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
            const target = e.target as HTMLElement;
            const portfolioSection = document.querySelector('#portfolio-home-section');
            
            // Check if cursor is inside portfolio section on home page
            if (portfolioSection && portfolioSection.contains(target)) {
                setIsInPortfolio(true);
            } else {
                setIsInPortfolio(false);
            }
            
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

        const portfolioSection = document.querySelector('#portfolio-home-section');

        if (cursorType === 'portfolio' && isInPortfolio) {
            // Show custom cursor and hide default cursor only in portfolio section
            gsap.to(cursor, {
                width: 80,
                height: 80,
                backgroundColor: '#ffffff',
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorText, {
                opacity: 1,
                scale: 1,
                color: '#000000',
                duration: 0.3,
                delay: 0.1
            });
            
            // Hide default cursor only in portfolio section
            if (portfolioSection) {
                portfolioSection.classList.add('cursor-none');
            }
        } else {
            // Hide custom cursor, show default cursor
            gsap.to(cursor, {
                width: 0,
                height: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorText, {
                opacity: 0,
                scale: 0.5,
                duration: 0.2
            });
            
            // Show default cursor everywhere else
            if (portfolioSection) {
                portfolioSection.classList.remove('cursor-none');
            }
        }
    }, [cursorType, isInPortfolio]);

    return (
        <CursorContext.Provider value={{ setCursorType }}>
            {children}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] backdrop-blur-sm flex items-center justify-center overflow-hidden"
                style={{ width: 0, height: 0 }}
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
