"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export default function Marquee({
    children,
    direction = "left",
    speed = 50,
    className,
    pauseOnHover = false,
}: MarqueeProps) {
    return (
        <div className={cn("overflow-hidden flex w-full", className)}>
            <motion.div
                className="flex shrink-0 gap-8 py-4 min-w-full"
                initial={{ x: 0 }}
                animate={{ x: direction === "left" ? "-100%" : "100%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
            <motion.div
                className="flex shrink-0 gap-8 py-4 min-w-full"
                initial={{ x: 0 }}
                animate={{ x: direction === "left" ? "-100%" : "100%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}
