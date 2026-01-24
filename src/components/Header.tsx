"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Portfólio", href: "#projects" },
    { name: "Služby", href: "#services" },
    { name: "O nás", href: "#about" },
];

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 20);
    });

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 pointer-events-none"
        >
            <nav
                className={cn(
                    "pointer-events-auto flex items-center justify-between gap-12 rounded-full px-6 py-3 transition-all duration-500 ease-out border border-transparent",
                    scrolled
                        ? "bg-[#E5DCC5]/90 backdrop-blur-md border-black/5 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-tighter text-foreground mr-4"
                >
                    karchi.
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <Link
                    href="#contact"
                    className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-foreground rounded-full hover:scale-105 active:scale-95 transition-all"
                >
                    Spolupráca
                </Link>
            </nav>
        </motion.header>
    );
}
