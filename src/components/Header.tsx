"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Portfólio", href: "#projects" },
    { name: "Služby", href: "#services" },
    { name: "O mne", href: "/o-mne" },
];

export default function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);

        // Check if we're in the hero shrink zone (dark background visible)
        // The hero wrapper is 250vh tall with sticky content
        // After ~10% scroll, dark background is visible
        // Portfolio starts after 250vh
        const viewportHeight = window.innerHeight;
        const heroShrinkStart = viewportHeight * 0.1;
        const heroWrapperEnd = viewportHeight * 2.5; // 250vh
        
        // Check if we're in the hero dark zone
        const isInHeroDarkZone = latest > heroShrinkStart && latest < heroWrapperEnd;

        // Check for dark sections by looking at their position relative to the viewport
        const sections = [
            { id: 'about', offset: 50, endOffset: 0 },
            { id: 'contact', offset: 50, endOffset: 0 },
            { id: 'projects', offset: -250, endOffset: 300 }, // turns white late, and turns black early (300px before end)
            { id: 'footer', offset: 50, endOffset: 0 }
        ];

        let isDark = isInHeroDarkZone;

        if (!isDark) {
            for (const { id, offset, endOffset } of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset && rect.bottom >= endOffset) {
                        isDark = true;
                        break;
                    }
                }
            }
        }

        setIsDarkSection(isDark);
    });

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:pt-6 pointer-events-none"
            >
                {/* Mobile Layout - Centered logo with right-aligned menu */}
                <div className="md:hidden flex items-center justify-center pointer-events-auto relative">
                    <div
                        className={cn(
                            "rounded-full px-4 py-2.5 transition-all duration-500 ease-out",
                            scrolled
                                ? "bg-white/5 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-white/5"
                                : "bg-transparent"
                        )}
                    >
                        <Link
                            href="/"
                            className={cn(
                                "text-3xl font-bold tracking-tighter transition-colors duration-300",
                                isDarkSection || mobileMenuOpen ? "text-white" : "text-foreground"
                            )}
                        >
                            karchi.
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={cn(
                            "absolute right-0 p-2.5 rounded-full transition-all duration-500 ease-out",
                            scrolled
                                ? "bg-white/5 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-white/5"
                                : "bg-transparent",
                            isDarkSection || mobileMenuOpen ? "text-white" : "text-foreground"
                        )}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Desktop Layout - Original nav */}
                <nav
                    className={cn(
                        "hidden md:flex pointer-events-auto items-center justify-between gap-12 rounded-full px-6 py-3 transition-all duration-500 ease-out mx-auto max-w-fit",
                        scrolled
                            ? "bg-white/5 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-white/5"
                            : "bg-transparent"
                    )}
                >
                    <Link
                        href="/"
                        className={cn(
                            "text-3xl font-bold tracking-tighter transition-colors duration-300 mr-4",
                            isDarkSection ? "text-white" : "text-foreground"
                        )}
                    >
                        karchi.
                    </Link>

                    <div className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-300",
                                    isDarkSection
                                        ? "text-white/90 hover:text-white"
                                        : "text-foreground/70 hover:text-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="/book/karchigod/intro"
                        className={cn(
                            "flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-300",
                            isDarkSection
                                ? "bg-white text-black"
                                : "bg-foreground text-white"
                        )}
                    >
                        Spolupráca
                    </Link>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 bottom-0 w-[90%] md:w-[85%] bg-black/95 backdrop-blur-2xl p-8 shadow-2xl border-l border-white/10"
                        >
                            <div className="flex flex-col gap-8 pt-24 h-full">
                                <div className="flex flex-col gap-6">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-4xl font-black text-white py-2 tracking-tighter hover:text-white/70 transition-colors"
                                            >
                                                {item.name}
                                                <span className="block h-px w-0 bg-white group-hover:w-full transition-all duration-300" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="mt-auto mb-8"
                                >
                                    <Link
                                        href="/book/karchigod/intro"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="relative w-full py-4 rounded-full font-bold text-center block overflow-hidden group bg-white text-black text-lg tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <span className="relative z-10">Spolupráca</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
