"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useInView, animate, AnimatePresence, useTransform } from "framer-motion";
import { ArrowDown, Lock, Unlock } from "lucide-react";

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

// Check if device supports touch
const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.5 }); // Keep for scroll loop optimization

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);
    // Lock state for mobile interaction
    const [isLocked, setIsLocked] = useState(false);

    // Snake Trail Logic - Using Refs for DOM manipulation (High Perf)
    // Reduced on mobile for better performance (less DOM manipulation)
    const MAX_POINTS = isMobile ? 80 : 150;
    const trailRef = useRef<{ x: number, y: number, id: number }[]>([]);

    // DOM Refs to bypass React Render Cycle
    const backgroundSnakeRef = useRef<(SVGCircleElement | null)[]>([]);
    const maskSnakeRef = useRef<(SVGCircleElement | null)[]>([]);
    // Mobile-specific mask refs (uses viewBox coordinates 0-100)
    const mobileMaskRef = useRef<(SVGCircleElement | null)[]>([]);
    const mobileSvgRef = useRef<SVGSVGElement | null>(null);

    const lastPosRef = useRef({ x: 0, y: 0 });
    const isFirstMove = useRef(true);
    const isAutoSequence = useRef(false);
    const idCounter = useRef(0);

    // Prevent hydration mismatch
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 640 || isTouchDevice());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll when locked
    useEffect(() => {
        if (isLocked) {
            // Prevent layout shift by compensating for scrollbar width (Desktop only)
            if (!isMobile) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // Prevent touch scrolling
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.body.style.paddingRight = '';
        };
    }, [isLocked, isMobile]);

    // Passive touch event listeners for better mobile performance
    // Using native addEventListener for passive option (React doesn't support this)
    useEffect(() => {
        if (!hasMounted || !sectionRef.current) return;

        const section = sectionRef.current;

        const handlePassiveTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) return;

            // Mobile: always allow touch trail
            if (isMobile) {
                const rect = section.getBoundingClientRect();
                const touch = e.touches[0];
                mouseX.set(touch.clientX - rect.left);
                mouseY.set(touch.clientY - rect.top);
                return;
            }

            // Desktop: require lock or image area touch
            if (!isLocked && !touchStartedOnImage.current) return;

            const rect = section.getBoundingClientRect();
            const touch = e.touches[0];
            mouseX.set(touch.clientX - rect.left);
            mouseY.set(touch.clientY - rect.top);
        };

        const handlePassiveTouchStart = (e: TouchEvent) => {
            if (!e.touches[0]) return;

            const touch = e.touches[0];
            const rect = section.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            // On mobile, always allow touch trail (any movement triggers it)
            if (isMobile) {
                mouseX.set(x);
                mouseY.set(y);
                lastPosRef.current = { x, y };
                isFirstMove.current = false;
                return;
            }

            // Desktop: Check if touch is in the image area
            const imageAreaStart = 0;
            touchStartedOnImage.current = y > imageAreaStart;

            if (!isLocked && !touchStartedOnImage.current) return;

            mouseX.set(x);
            mouseY.set(y);
            lastPosRef.current = { x, y };
            isFirstMove.current = false;
        };

        const handlePassiveTouchEnd = () => {
            touchStartedOnImage.current = false;
        };

        // Add passive event listeners
        section.addEventListener('touchmove', handlePassiveTouchMove, { passive: true });
        section.addEventListener('touchstart', handlePassiveTouchStart, { passive: true });
        section.addEventListener('touchend', handlePassiveTouchEnd, { passive: true });

        return () => {
            section.removeEventListener('touchmove', handlePassiveTouchMove);
            section.removeEventListener('touchstart', handlePassiveTouchStart);
            section.removeEventListener('touchend', handlePassiveTouchEnd);
        };
    }, [hasMounted, isMobile, isLocked, mouseX, mouseY]);

    const isSequenceFinished = useRef(false);
    const lastActivityTime = useRef(Date.now());



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
        if (!isSequenceFinished.current && !isMobile) return; // Strict blocking: ONLY allowed after sequence finishes (desktop)

        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Track if touch started on image area (for unlocked touch drawing)
    const touchStartedOnImage = useRef(false);

    // Ninja Cut Sequence Logic (extracted for reuse)
    const runNinjaSequence = async () => {
        if (!hasMounted || !sectionRef.current) return;
        
        isAutoSequence.current = true;
        isSequenceFinished.current = false;

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
                startX = (rect.left + offsetX) - secRect.left;
                endX = startX + actualW;
                startX += 20;
                endX -= 20;
            }
        }

        // Helper to perform a swipe
        const swipe = async (fromX: number, toX: number, y: number) => {
            mouseX.set(fromX);
            mouseY.set(y);
            lastPosRef.current = { x: fromX, y };
            await animate(mouseX, toX, {
                duration: isMobile ? 0.3 : 0.4,
                ease: "easeInOut"
            });
        };

        // Mobile-specific: 4 rapid diagonal "ninja" slashes
        if (isMobile) {
            const w = window.innerWidth;

            const diagonalSwipe = async (fromX: number, fromY: number, toX: number, toY: number, duration = 0.35) => {
                mouseX.set(fromX);
                mouseY.set(fromY);
                lastPosRef.current = { x: fromX, y: fromY };
                
                await new Promise(r => setTimeout(r, 16));

                await Promise.all([
                    animate(mouseX, toX, { duration, ease: [0.25, 0.1, 0.25, 1] }),
                    animate(mouseY, toY, { duration, ease: [0.25, 0.1, 0.25, 1] })
                ]);
            };

            // 4 Ninja Strikes
            await diagonalSwipe(0, h * 0.2, w, h * 0.5, 0.6);
            await new Promise(r => setTimeout(r, 120));
            await diagonalSwipe(w, h * 0.15, 0, h * 0.55, 0.6);
            await new Promise(r => setTimeout(r, 120));
            await diagonalSwipe(0, h * 0.45, w, h * 0.7, 0.55);
            await new Promise(r => setTimeout(r, 120));
            await diagonalSwipe(w, h * 0.55, 0, h * 0.85, 0.55);
            await new Promise(r => setTimeout(r, 1500));
        } else {
            // Desktop positions
            await swipe(startX, endX, h * 0.20);
            await swipe(endX, startX, h * 0.36);
            await swipe(startX, endX, h * 0.52);
            await swipe(endX, startX, h * 0.68);
        }

        isAutoSequence.current = false;
        isSequenceFinished.current = true;
    };

    // Initial Ninja Cut Sequence on Load
    useEffect(() => {
        if (hasGlobalHeroSequencePlayed) {
            isSequenceFinished.current = true;
            return;
        }

        if (!hasMounted || !isInView) return;

        hasGlobalHeroSequencePlayed = true;

        const runSequence = async () => {
            await new Promise(r => setTimeout(r, isMobile ? 600 : 1500));
            await runNinjaSequence();
        };

        runSequence();
    }, [hasMounted, isInView]);

    // Inactivity Detection - Re-trigger ninja cuts after 4s (Mobile Only)
    useEffect(() => {
        if (!isMobile || !hasMounted || !isInView || !hasGlobalHeroSequencePlayed) return;

        const checkInactivity = setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivityTime.current;
            if (timeSinceLastActivity >= 4000 && !isAutoSequence.current) {
                lastActivityTime.current = Date.now(); // Reset timer
                runNinjaSequence();
            }
        }, 1000); // Check every second

        return () => clearInterval(checkInactivity);
    }, [isMobile, hasMounted, isInView]);

    // Update activity time on any interaction
    useEffect(() => {
        if (!isMobile || !hasMounted || !sectionRef.current) return;

        const section = sectionRef.current;
        const updateActivity = () => {
            lastActivityTime.current = Date.now();
        };

        section.addEventListener('touchstart', updateActivity, { passive: true });
        section.addEventListener('touchmove', updateActivity, { passive: true });

        return () => {
            section.removeEventListener('touchstart', updateActivity);
            section.removeEventListener('touchmove', updateActivity);
        };
    }, [isMobile, hasMounted]);

    // Animation loop for the snake trail
    useEffect(() => {
        if (!isInView) return;

        let animationId: number;

        const updateTrail = () => {
            // Handle Tab Switching / Visibility
            if (document.hidden) {
                if (trailRef.current.length > 0) {
                    trailRef.current = [];
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

            // Interpolate - tighter spacing on mobile during auto sequence for smoother lines
            const spacing = (isMobile && isAutoSequence.current) ? 3 : 5;
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

            // 2. Decay - Much faster on mobile during auto sequence for tail to catch up quickly
            if (trailRef.current.length > 0) {
                // Much faster decay on mobile auto sequence for quick tail catch-up
                const decaySpeed = isAutoSequence.current ? (isMobile ? 5 : 1) : 3;
                trailRef.current.splice(0, decaySpeed);

                // Shorter max length on mobile for tighter, faster trail
                const maxLength = isAutoSequence.current ? (isMobile ? 80 : 120) : 50;
                if (trailRef.current.length > maxLength) {
                    trailRef.current.splice(0, trailRef.current.length - maxLength);
                }
            }

            // 3. Direct DOM Update (No React State/Re-render)
            // Optimize: Update all pools in one go
            const currentTrail = trailRef.current;
            const len = currentTrail.length;



            for (let i = 0; i < MAX_POINTS; i++) {
                // Determine if this index is active
                if (i < len) {
                    const point = currentTrail[i];
                    const percentage = i / len;
                    // Consistent width on mobile during auto sequence, tapering on desktop/normal
                    let radius;
                    if (isMobile && isAutoSequence.current) {
                        // Fixed width for mobile auto sequence - no taper
                        radius = 12;
                    } else {
                        // Tapering width - simplified calculation for mobile performance
                        const baseRadius = isMobile ? 3 : 5;
                        const maxRadius = isMobile ? 20 : 50; // Reduced max on mobile
                        radius = baseRadius + (percentage * maxRadius);
                    }

                    // Optimization: Batch attribute updates? standard setAttribute is fine here.
                    const r = radius.toFixed(1);
                    const cx = point.x.toFixed(1);
                    const cy = point.y.toFixed(1);

                    // Update Visual Trail (background)
                    const bgCircle = backgroundSnakeRef.current[i];
                    if (bgCircle) {
                        bgCircle.setAttribute("cx", cx);
                        bgCircle.setAttribute("cy", cy);
                        bgCircle.setAttribute("r", r);
                        // Hide background trail on mobile during auto sequence (no gray outline)
                        bgCircle.style.opacity = (isMobile && isAutoSequence.current) ? "0" : "0.4";
                    }

                    // Update Mask (Face Reveal) - Desktop
                    const maskCircle = maskSnakeRef.current[i];
                    if (maskCircle) {
                        maskCircle.setAttribute("cx", cx);
                        maskCircle.setAttribute("cy", cy);
                        maskCircle.setAttribute("r", r);
                        maskCircle.style.display = "block";
                    }

                    // Update Mobile Mask (uses viewBox 0-100 coordinates)
                    const mobileCircle = mobileMaskRef.current[i];
                    if (mobileCircle && mobileSvgRef.current) {
                        const svgRect = mobileSvgRef.current.getBoundingClientRect();
                        // Only update if SVG has valid dimensions (visible on mobile)
                        if (svgRect.width > 0 && svgRect.height > 0) {
                            // point.x and point.y are already relative to the section element (set in handleTouchMove)
                            // Since the SVG fills the section, we just convert directly to viewBox coords (0-100)
                            const vbX = (point.x / svgRect.width) * 100;
                            const vbY = (point.y / svgRect.height) * 100;
                            const vbR = (radius / svgRect.width) * 100;
                            mobileCircle.setAttribute("cx", vbX.toFixed(1));
                            mobileCircle.setAttribute("cy", vbY.toFixed(1));
                            mobileCircle.setAttribute("r", vbR.toFixed(1));
                            mobileCircle.style.display = "block";
                        }
                    }

                } else {
                    // Hide unused points
                    if (backgroundSnakeRef.current[i]) backgroundSnakeRef.current[i]!.style.opacity = "0";
                    if (maskSnakeRef.current[i]) maskSnakeRef.current[i]!.style.display = "none";
                    if (mobileMaskRef.current[i]) mobileMaskRef.current[i]!.style.display = "none";
                }
            }

            animationId = requestAnimationFrame(updateTrail);
        };

        animationId = requestAnimationFrame(updateTrail);
        return () => cancelAnimationFrame(animationId);
    }, [isInView, mouseX, mouseY]); // Removed trail dependency

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full bg-gradient-to-b from-[#fdfdfb] to-[#e6e4e3] text-black overflow-hidden font-sans"
            style={{
                touchAction: isLocked ? 'none' : 'auto',
                isolation: 'isolate',
                transform: 'translateZ(0)',
                willChange: 'transform'
            }}
        >
            {/* Holographic Wireframe Helmet Layer - Mobile Only */}
            {isMobile && hasMounted && (
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden flex items-start justify-center">
                    {/* The wireframe helmet image with clip-path scan animation */}
                    <motion.img
                        src="/images/helmet_wireframe.png"
                        alt=""
                        className="absolute"
                        style={{
                            top: '30%',
                            width: '500px',
                            height: '374px',
                            minWidth: '500px',
                            minHeight: '374px',
                            maxWidth: '500px',
                            maxHeight: '374px',
                            opacity: 0.1,
                            mixBlendMode: 'screen'
                        }}
                        animate={{
                            opacity: [0, 0.15, 0.15, 0], // Fade in/out at extremes to soften entry/exit
                            clipPath: [
                                'inset(0 0 100% 0)', // Start hidden (visible top edge at 0)
                                'inset(0 0 0% 0)',   // Wipe down to fully reveal (connects to top)
                                'inset(0 0 0% 0)',   // Hold full visibility briefly
                                'inset(100% 0 0% 0)' // Wipe down to fully hide (connects to bottom)
                            ]
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            repeatDelay: 2.5,
                            ease: 'easeInOut',
                            times: [0, 0.45, 0.55, 1] // 45% reveal, 10% hold, 45% hide - much shorter visibility
                        }}
                    />

                </div>
            )}

            {/* Background Color Layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fdfdfb] to-[#e6e4e3]" />

            {/* Snake Trail Layer (Background) */}
            {hasMounted && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {Array.from({ length: MAX_POINTS }).map((_, index) => (
                        <circle
                            key={index}
                            ref={(el) => { backgroundSnakeRef.current[index] = el; }}
                            cx="-100" // Initial off-screen
                            cy="-100"
                            r="0"
                            fill="#a0a0a0"
                            className="opacity-0 transition-none" // Start hidden
                        />
                    ))}
                </svg>
            )}

            {/* Mask Definitions (Moved Global for Mobile+Desktop) */}
            {hasMounted && (
                <svg className="absolute w-full h-full pointer-events-none top-0 left-0 z-10">
                    <defs>
                        {/* Inverse Mask: HIDES helmet where snake trail draws (white=show, black=hide) */}
                        <mask id="snake-mask-inverse" maskUnits="userSpaceOnUse">
                            <rect width="100%" height="100%" fill="white" />
                            {Array.from({ length: MAX_POINTS }).map((_, index) => (
                                <circle
                                    key={index}
                                    ref={(el) => { maskSnakeRef.current[index] = el; }}
                                    cx="-100"
                                    cy="-100"
                                    r="0"
                                    fill="black"
                                    style={{ display: 'none' }}
                                />
                            ))}
                        </mask>
                    </defs>
                </svg>
            )}

            {/* MOBILE Images Container - Using SVG for Safari mask compatibility */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="md:hidden absolute inset-x-0 top-0 bottom-0 z-0"
            >
                {/* Mobile SVG Container with both images and mask applied within SVG context */}
                <svg
                    ref={mobileSvgRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMin slice"
                    style={{ filter: 'contrast(1.05) saturate(1.0)' }}
                >
                    {/* Mobile mask definition inside this SVG */}
                    <defs>
                        {/* Gooey filter for liquid blob effect on mobile trails */}
                        <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                        <mask id="mobile-mask-inverse" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                            {/* Apply gooey filter to the mask group for liquid blob effect */}
                            <rect x="0" y="0" width="100" height="100" fill="white" />
                            <g filter="url(#gooey-filter)">
                            {hasMounted && Array.from({ length: MAX_POINTS }).map((_, index) => (
                                <circle
                                    key={`mobile-mask-${index}`}
                                    ref={(el) => { mobileMaskRef.current[index] = el; }}
                                    cx="-100"
                                    cy="-100"
                                    r="0"
                                    fill="black"
                                    style={{ display: 'none' }}
                                />
                            ))}
                            </g>
                        </mask>
                    </defs>
                    {/* Face image - always visible underneath */}
                    <image
                        href="/images/me-fr.png"
                        x="0.2%"
                        y="33%"
                        width="98%"
                        height="98%"
                        preserveAspectRatio="xMidYMin meet"
                    />
                    {/* Helmet image - masked to hide where trail is drawn */}
                    <image
                        href="/images/hero-final-fr.png"
                        x="0%"
                        y="32%"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMin meet"
                        mask={hasMounted ? "url(#mobile-mask-inverse)" : undefined}
                    />
                </svg>

                {/* Mobile Lock Button (Overlaid on Image) - Moved lower for better thumb access */}
                <div className="absolute top-[75%] right-[10%] z-50 pointer-events-auto opacity-100">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLocked(!isLocked);
                        }}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 ${isLocked
                            ? 'bg-black text-white border-black ring-2 ring-offset-2 ring-black/20'
                            : 'bg-blue-600 text-white border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.3)]'
                            } active:scale-95`}
                        aria-label={isLocked ? "Unlock" : "Lock"}
                    >
                        {isLocked ? (
                            <Unlock className="w-5 h-5" />
                        ) : (
                            <Lock className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Text Backdrop Blur Overlay - Smooth transition via mask */}
            <div
                className="md:hidden absolute top-0 left-0 right-0 h-[35vh] bg-white/95 backdrop-blur-[3px] z-15 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
                }}
            />

            {/* DESKTOP Images Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="hidden md:block absolute inset-0 z-0"
            >
                {/* Desktop: Base = Face (NO mask, WITH filter) - Always underneath */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        loading="eager"
                        src="/images/me-fr.png"
                        alt="Hero Face"
                        style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                        className="w-full h-full object-contain object-top translate-x-[13%] translate-y-[12vh] scale-[0.93] origin-top"
                    />
                </div>

                {/* Desktop: Top = Helmet (INVERSE mask) - Visible by default, HIDDEN where you draw */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        mask: hasMounted ? "url(#snake-mask-inverse)" : "none",
                        WebkitMask: hasMounted ? "url(#snake-mask-inverse)" : "none"
                    }}
                >
                    <img
                        ref={imageRef}
                        loading="eager"
                        src="/images/hero-final-fr.png"
                        alt="Hero Helmet"
                        className="w-full h-full object-contain object-top translate-x-[13.5%] translate-y-[11.2vh] scale-[0.95] origin-top"
                    />
                </div>


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
                    <div className="pointer-events-auto pt-16 md:pt-[10vh] w-full md:max-w-[42vw] text-center md:text-left z-30">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-[2rem] leading-[1.1] md:text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tighter md:leading-[1.15] mb-3 md:mb-[4vh]"
                        >
                            {/* Mobile Title Layout */}
                            <span className="md:hidden flex flex-wrap justify-center gap-[0.4em] mb-1">
                                <span>TVORÍM</span>
                                <span>STRÁNKY,</span>
                            </span>

                            {/* Desktop Title Layout */}
                            <span className="hidden md:inline">TVORÍM<br />STRÁNKY,<br /></span>

                            <span className="whitespace-nowrap flex md:inline items-baseline justify-center gap-[0.35em] lowercase md:uppercase font-normal md:font-black">KTORÉ
                                <span className="inline-grid grid-cols-1 grid-rows-1 h-[1.3em] md:h-[1.4em] align-top overflow-hidden pl-[2px] md:pl-0 md:ml-[0.4em]">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.span
                                            key={rotatingIndex}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="row-start-1 col-start-1 block whitespace-nowrap font-serif italic font-black lowercase tracking-wider text-4xl leading-[1.1] md:text-[clamp(2.5rem,7vw,6rem)] md:leading-[1.15] text-accent-blue md:not-italic md:font-black md:uppercase md:tracking-tighter md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-blue-600 md:to-cyan-500 md:font-sans"
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
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="hidden md:flex flex-col gap-1 md:gap-[1vh]"
                        >
                            <p className="text-[11px] md:text-[1.5vw] font-bold uppercase tracking-wide leading-tight">
                                Freelance webdesigner a developer aplikácií
                            </p>
                            <p className="text-[9px] md:text-[0.9vw] uppercase tracking-widest opacity-60">
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

                {/* Bottom Section */}
                <div className="flex items-end justify-end w-full">
                    {/* Lock Button (Bottom Right) & Scroll Indicator */}
                    <div className="flex flex-col items-end gap-4 pointer-events-auto w-full md:w-auto">

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{
                                opacity: 1,
                                y: [0, 8, 0]
                            }}
                            transition={{
                                opacity: { delay: 1.5, duration: 1 },
                                y: {
                                    delay: 2.5,
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                        >
                            Scrollovať <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
