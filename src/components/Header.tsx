"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Portfólio", href: "#projects" },
    { name: "Služby", href: "#services" },
    { name: "O mne", href: "/o-mne" },
];

export default function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);

        // Check for dark sections by looking at their position relative to the viewport
        const sections = [
            { id: 'about', offset: 50, endOffset: 0 },
            { id: 'contact', offset: 50, endOffset: 0 },
            { id: 'projects', offset: -250, endOffset: 300 }, // turns white late, and turns black early (300px before end)
            { id: 'footer', offset: 50, endOffset: 0 }
        ];

        let isDark = false;

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

        setIsDarkSection(isDark);
    });

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none"
        >
            <nav
                className={cn(
                    "pointer-events-auto flex items-center justify-between gap-12 rounded-full px-6 py-3 transition-all duration-500 ease-out border border-transparent",
                    scrolled
                        ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-lg supports-[backdrop-filter]:bg-white/5"
                        : "bg-transparent border-transparent"
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

                <div className="hidden md:flex items-center gap-6">
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
                        "hidden md:flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-300",
                        isDarkSection
                            ? "bg-white text-black"
                            : "bg-foreground text-white"
                    )}
                >
                    Spolupráca
                </Link>
            </nav>
        </motion.header>
    );
}
