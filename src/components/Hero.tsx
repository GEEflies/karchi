"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useInView, animate, AnimatePresence, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const CountUp = ({ to, delay, className }: { to: number, delay: number, className?: string }) => {
    const value = useMotionValue(0);
    const rounded = useTransform(value, (latest) => Math.round(latest));

    useEffect(() => {
        animate(value, to, { duration: 2, delay, ease: "easeOut" });
    }, [to, delay, value]);

    return <motion.span className={className}>{rounded}</motion.span>;
};

// Global flag to prevent re-triggering across remounts (e.g. scroll up/down)
let hasGlobalHeroSequencePlayed = false;

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.5 }); // Keep for scroll loop optimization

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Snake Trail State
    const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);
    const trailRef = useRef<{ x: number, y: number, id: number }[]>([]);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const isFirstMove = useRef(true);
    const isAutoSequence = useRef(false);
    const idCounter = useRef(0);

    // Prevent hydration mismatch
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);

    const isSequenceFinished = useRef(false);

    // Rotating text animation
    const [rotatingIndex, setRotatingIndex] = useState(0);
    const rotatingPhrases = ['vyniknú', 'predajú', 'zaujmú'];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotatingIndex((prev) => (prev + 1) % rotatingPhrases.length);
        }, 3000); // 3 seconds per rotation
        return () => clearInterval(interval);
    }, [rotatingPhrases.length]);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (!isSequenceFinished.current) return; // Strict blocking: ONLY allowed after sequence finishes

        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Ninja Cut Sequence
    useEffect(() => {
        // If already played globally, just unlock interaction and skip
        if (hasGlobalHeroSequencePlayed) {
            isSequenceFinished.current = true;
            return;
        }

        if (!hasMounted || !isInView) return;

        hasGlobalHeroSequencePlayed = true;

        const runSequence = async () => {
            // Wait for entrance animations (1.5s)
            await new Promise(r => setTimeout(r, 1500));

            isAutoSequence.current = true;
            isSequenceFinished.current = false; // Ensure blocked

            const h = window.innerHeight;
            let startX = 0;
            let endX = window.innerWidth;

            // Calculate actual image width inside object-contain
            if (imageRef.current && sectionRef.current) {
                const img = imageRef.current;

                // Ensure image is loaded for dimensions
                if (!img.complete || img.naturalWidth === 0) {
                    await new Promise<void>(resolve => {
                        if (img.complete && img.naturalWidth > 0) return resolve();
                        img.onload = () => resolve();
                        // Timeout fallback
                        setTimeout(resolve, 1000);
                    });
                }

                const rect = img.getBoundingClientRect();
                const secRect = sectionRef.current.getBoundingClientRect();

                if (img.naturalWidth) {
                    const ratio = img.naturalWidth / img.naturalHeight;
                    const boxRatio = rect.width / rect.height;

                    let actualW = rect.width;
                    if (ratio < boxRatio) {
                        actualW = rect.height * ratio;
                    }

                    const offsetX = (rect.width - actualW) / 2;
                    // Relative to section
                    startX = (rect.left + offsetX) - secRect.left;
                    endX = startX + actualW;

                    // Constrain slightly further to ensure we are inside (10px buffer)
                    startX += 20;
                    endX -= 20;
                }
            }

            // Helper to perform a swipe
            const swipe = async (fromX: number, toX: number, y: number) => {
                // Teleport to start
                mouseX.set(fromX);
                mouseY.set(y);
                // Reset lastPos to prevent connection lines from previous cut
                // We set it to the start position so interpolation starts fresh
                lastPosRef.current = { x: fromX, y };

                // Animate
                await animate(mouseX, toX, {
                    duration: 0.4,
                    ease: "easeInOut",
                    onUpdate: (latest) => {
                        // Force update lastPos logic inside the loop?
                        // The loop reads mouseX.get(). It works automatically.
                    }
                });
            };

            // 1. Left to Right (Top - Forehead)
            await swipe(startX, endX, h * 0.20);

            // 2. Right to Left (Eyes)
            await swipe(endX, startX, h * 0.36);

            // 3. Left to Right (Nose/Mouth)
            await swipe(startX, endX, h * 0.52);

            // 4. Right to Left (Chin)
            await swipe(endX, startX, h * 0.68);

            isAutoSequence.current = false;
            isSequenceFinished.current = true; // Unlock manual interaction
        };

        runSequence();
    }, [hasMounted, isInView]);

    // Animation loop for the snake trail
    useEffect(() => {
        if (!isInView) return;

        let animationId: number;

        const updateTrail = () => {
            // Handle Tab Switching / Visibility
            if (document.hidden) {
                if (trailRef.current.length > 0) {
                    trailRef.current = [];
                    setTrail([]);
                }
                animationId = requestAnimationFrame(updateTrail);
                return;
            }

            const currentX = mouseX.get();
            const currentY = mouseY.get();

            // On first frame or after reset
            if (isFirstMove.current) {
                if (currentX !== 0 || currentY !== 0) {
                    lastPosRef.current = { x: currentX, y: currentY };
                    isFirstMove.current = false;
                }
                animationId = requestAnimationFrame(updateTrail);
                return;
            }

            // 1. Add points if moved enough
            const dx = currentX - lastPosRef.current.x;
            const dy = currentY - lastPosRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Reset logic for teleports (if distance is absurdly large, skip frame)
            // Increased threshold to 600 to prevent skipping during load lag
            if (dist > 600) {
                lastPosRef.current = { x: currentX, y: currentY };
                animationId = requestAnimationFrame(updateTrail);
                return;
            }

            // Interpolate
            const spacing = 8;
            if (dist > spacing) {
                const numSteps = Math.ceil(dist / spacing);
                const stepX = dx / numSteps;
                const stepY = dy / numSteps;

                for (let i = 1; i <= numSteps; i++) {
                    const px = lastPosRef.current.x + stepX * i;
                    const py = lastPosRef.current.y + stepY * i;
                    trailRef.current.push({ x: px, y: py, id: idCounter.current++ });
                }
                lastPosRef.current = { x: currentX, y: currentY };
            }

            // 2. Decay
            if (trailRef.current.length > 0) {
                trailRef.current.splice(0, 2);

                // Cap max length
                // Long for ninja cuts (80), Short for manual mouse (30 - STRICT)
                const maxLength = isAutoSequence.current ? 80 : 30;

                if (trailRef.current.length > maxLength) {
                    trailRef.current.splice(0, 5); // Aggressive chop
                }
            }

            setTrail([...trailRef.current]);
            animationId = requestAnimationFrame(updateTrail);
        };

        animationId = requestAnimationFrame(updateTrail);
        return () => cancelAnimationFrame(animationId);
    }, [isInView, mouseX, mouseY]);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full bg-gradient-to-b from-[#fdfdfb] to-[#e6e4e3] text-black overflow-hidden font-sans"
            style={{
                isolation: 'isolate',
                transform: 'translateZ(0)',
                willChange: 'transform'
            }}
        >
            {/* Background Color Layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fdfdfb] to-[#e6e4e3]" />

            {/* Snake Trail Layer (Background) */}
            {hasMounted && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {trail.map((point, index) => {
                        const percentage = index / trail.length;
                        const radius = 5 + (percentage * 50);

                        return (
                            <circle
                                key={point.id}
                                cx={point.x}
                                cy={point.y}
                                r={radius}
                                fill="#a0a0a0"
                                className="opacity-40"
                            />
                        );
                    })}
                </svg>
            )}

            {/* Images Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-x-0 top-0 bottom-12 pt-12 z-0"
            >
                {/* 1. Base Image: Helmet */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        ref={imageRef}
                        loading="eager"
                        src="/images/hero-final-fr.png"
                        alt="Hero Helmet"
                        className="w-full h-full object-contain object-top translate-x-[13%] translate-y-[15vh] scale-[0.90] origin-top"
                    />
                </div>

                {/* 2. Reveal Image: Face */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        mask: hasMounted ? "url(#snake-mask)" : "none",
                        WebkitMask: hasMounted ? "url(#snake-mask)" : "none"
                    }}
                >
                    <img
                        loading="eager"
                        src="/images/me-fr.png"
                        alt="Hero Face"
                        style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                        className="w-full h-full object-contain object-top translate-x-[12.5%] translate-y-[15vh] scale-[0.89] origin-top"
                    />
                </div>

                {/* Mask Definition */}
                {hasMounted && (
                    <svg className="absolute w-full h-full pointer-events-none top-0 left-0 opacity-0">
                        <defs>
                            <mask id="snake-mask" maskUnits="userSpaceOnUse">
                                <rect width="100%" height="100%" fill="black" />
                                {trail.map((point, index) => {
                                    const percentage = index / trail.length;
                                    const radius = 5 + (percentage * 50);
                                    return (
                                        <circle
                                            key={point.id}
                                            cx={point.x}
                                            cy={point.y}
                                            r={radius}
                                            fill="white"
                                        />
                                    );
                                })}
                            </mask>
                        </defs>
                    </svg>
                )}

                {/* Smoke Overlay */}
                <div
                    className="absolute -bottom-12 left-0 right-0 h-32 bg-gradient-to-t from-[#e6e4e3] via-white/40 to-transparent z-20 pointer-events-none backdrop-blur-[2px]"
                    style={{
                        maskImage: "linear-gradient(to top, black, transparent)",
                        WebkitMaskImage: "linear-gradient(to top, black, transparent)"
                    }}
                />
            </motion.div>

            {/* Content Overlay Layer */}
            <div className="relative z-20 h-full w-full px-6 py-12 md:p-12 flex flex-col justify-between pointer-events-none">
                {/* Top Section: Headline (Left) & Stats (Right) */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full">

                    {/* Left: Headline */}
                    <div className="pointer-events-auto pt-12 md:pt-[10vh] max-w-[65vw] md:max-w-[42vw]">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tighter leading-[1.1] mb-[4vh]"
                        >
                            TVORÍM
                            <br />
                            STRÁNKY,
                            <br />
                            <span className="whitespace-nowrap">KTORÉ{' '}
                            <span className="inline-grid grid-cols-1 grid-rows-1 h-[1.3em] align-top overflow-hidden">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={rotatingIndex}
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "-100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="row-start-1 col-start-1 block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 whitespace-nowrap"
                                    >
                                        {rotatingPhrases[rotatingIndex]}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="row-start-1 col-start-1 opacity-0 pointer-events-none invisible whitespace-nowrap" aria-hidden="true">
                                    {rotatingPhrases.sort((a, b) => b.length - a.length)[0]}
                                </span>
                            </span>
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="flex flex-col gap-[1vh]"
                        >
                            <p className="text-[4vw] md:text-[1.5vw] font-bold uppercase tracking-wide leading-tight">
                                Freelance webdesigner a developer aplikácií
                            </p>
                            <p className="text-[2.5vw] md:text-[0.9vw] uppercase tracking-widest opacity-60">
                                Sídliaci v Nitre, dostupný celosvetovo.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Stats */}
                    <div className="hidden md:flex flex-col items-end gap-[4vh] pointer-events-auto pt-[10vh]">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-right"
                        >
                            <span className="block text-[3.5vw] font-black leading-none mb-1">
                                <CountUp to={1} delay={1.0} />+
                            </span>
                            <span className="text-[0.7vw] uppercase tracking-widest font-bold opacity-60">Rok Skúseností</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                            className="text-right"
                        >
                            <span className="block text-[3.5vw] font-black leading-none mb-1">
                                <CountUp to={8} delay={1.5} />+
                            </span>
                            <span className="text-[0.7vw] uppercase tracking-widest font-bold opacity-60">Projektov</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-right"
                        >
                            <span className="block text-[3.5vw] font-black leading-none mb-1">
                                <CountUp to={99} delay={2.0} />%
                            </span>
                            <span className="text-[0.7vw] uppercase tracking-widest font-bold opacity-60">Spokojnosť</span>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex justify-end pointer-events-auto"
                >
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                        Scrollovať <ArrowDown className="w-4 h-4" />
                    </div>
                </motion.div>

                {/* Mobile Stats (visible only on small screens) */}
                <div className="md:hidden grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/10 pointer-events-auto bg-[#E5DCC5]/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-center">
                        <span className="block text-3xl font-black">1+</span>
                        <span className="text-[10px] uppercase font-bold opacity-60">Rok</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-3xl font-black">8+</span>
                        <span className="text-[10px] uppercase font-bold opacity-60">Projektov</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-3xl font-black">99%</span>
                        <span className="text-[10px] uppercase font-bold opacity-60">Spokojnosť</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
