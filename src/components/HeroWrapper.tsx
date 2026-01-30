"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

interface PathData {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
}

export default function HeroWrapper() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyContainerRef = useRef<HTMLDivElement>(null);
    const heroContainerRef = useRef<HTMLDivElement>(null);
    const darkOverlayRef = useRef<HTMLDivElement>(null);
    const signatureSvgRef = useRef<SVGSVGElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const [paths, setPaths] = useState<PathData[]>([]);
    const [hasMounted, setHasMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        // Check for mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Load signature SVG paths
        fetch("/images/signature.svg")
            .then((res) => res.text())
            .then((svgText) => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const pathElements = svgDoc.querySelectorAll("path");
                const pathsData: PathData[] = [];
                
                pathElements.forEach((path) => {
                    const d = path.getAttribute("d");
                    if (d) {
                        pathsData.push({
                            d,
                            fill: path.getAttribute("fill") || "none",
                            stroke: path.getAttribute("stroke") || "black",
                            strokeWidth: path.getAttribute("stroke-width") || "2",
                        });
                    }
                });
                
                setPaths(pathsData);
            });
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Main GSAP ScrollTrigger Animation
    useEffect(() => {
        if (!hasMounted || !wrapperRef.current || !heroContainerRef.current || !stickyContainerRef.current) return;

        const wrapper = wrapperRef.current;
        const stickyContainer = stickyContainerRef.current;
        const heroContainer = heroContainerRef.current;
        const darkOverlay = darkOverlayRef.current;
        const signatureSvg = signatureSvgRef.current;
        const marquee = marqueeRef.current;
        const validPaths = pathRefs.current.filter((p): p is SVGPathElement => p !== null);

        // Target text elements within the Hero component
        const heroTextContent = heroContainer.querySelector('.hero-text-content');
        const heroHeadline = heroContainer.querySelector('.hero-headline');
        const heroStats = heroContainer.querySelector('.hero-stats');
        const heroBottomSection = heroContainer.querySelector('.hero-bottom-section');
        const heroContentOverlay = heroContainer.querySelector('.hero-content-overlay');

        // Set up signature paths for stroke animation
        if (validPaths.length > 0) {
            validPaths.forEach((path) => {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });
            });
        }

        // Set initial signature state (hidden)
        if (signatureSvg) {
            gsap.set(signatureSvg, {
                scale: 0.6,
                opacity: 0,
            });
        }

        // Detect mobile for responsive animation
        const mobile = window.innerWidth < 640;
        
        // Create the main timeline - animations span most of the wrapper height
        // Mobile: shorter scroll distance, smoother feel
        // Desktop: 250vh tall, animations span 200vh
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: mobile ? "+=120%" : "+=200%", // Mobile: shorter scroll distance for snappier feel
                scrub: mobile ? 0.3 : 1, // Mobile: much smoother scrub (lower = smoother)
            },
        });

        // Animation Sequence:
        
        // 1. Text Fade Out FAST (First 20% of scroll progress)
        const textElements = [heroContentOverlay, heroTextContent, heroHeadline, heroStats, heroBottomSection].filter(Boolean);
        
        if (textElements.length > 0) {
            tl.to(textElements, {
                opacity: 0,
                y: -50,
                duration: 0.2,
                ease: "power2.in",
                stagger: 0.01,
            }, 0);
        }

        // 2. Hero Container Shrink (The "Zoom Out" Effect)
        // Mobile: Smaller scale, square aspect with heavy crop
        tl.to(heroContainer, {
            scale: mobile ? 0.45 : 0.6,
            borderRadius: mobile ? "24px" : "50px",
            duration: mobile ? 0.6 : 0.5,
            ease: mobile ? "power1.out" : "power2.out", // Smoother easing on mobile
        }, 0.05);

        // 3. Shadow/depth effect as it shrinks
        tl.to(heroContainer, {
            boxShadow: "0 60px 120px -30px rgba(0, 0, 0, 0.5), 0 40px 80px -40px rgba(0, 0, 0, 0.5)",
            duration: 0.5,
            ease: "power2.out",
        }, 0.05);

        // 4. Darken the image with overlay
        if (darkOverlay) {
            tl.to(darkOverlay, {
                opacity: 0.7,
                duration: 0.4,
                ease: "power2.out",
            }, 0.1);
        }

        // 5. Marquee slides in (revealed as hero shrinks)
        if (marquee) {
            tl.fromTo(marquee, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
            }, 0.25);
        }

        // 6. Signature Fade In and Draw (starts at 30% progress, extends to 85%)
        if (signatureSvg && validPaths.length > 0) {
            tl.to(signatureSvg, {
                opacity: 1,
                scale: 0.8,
                duration: 0.1,
                ease: "power2.out",
            }, 0.3);

            tl.to(validPaths, {
                strokeDashoffset: 0,
                duration: 0.5, // Increased from 0.45 for longer drawing time
                ease: "power2.out",
                stagger: 0.03, // Increased from 0.02 for more spacing between paths
            }, 0.35);

            tl.to(signatureSvg, {
                scale: 0.9,
                duration: 0.15,
                ease: "power2.out",
            }, 0.75);
        }

        // Cleanup
        return () => {
            tl.kill();
            const st = tl.scrollTrigger;
            if (st) {
                st.kill(true);
            }
        };
    }, [hasMounted, paths]);

    if (!hasMounted) return null;

    return (
        // Outer wrapper - creates scroll space (250vh desktop, 180vh mobile)
        <div 
            ref={wrapperRef} 
            className="hero-wrapper relative w-full"
            style={{ height: isMobile ? '180vh' : '250vh' }}
        >
            {/* Sticky container - stays fixed at top during scroll */}
            <div
                ref={stickyContainerRef}
                className="sticky top-0 w-full h-screen overflow-hidden"
                style={{ zIndex: 0 }}
            >
                {/* Dark Background Underlay (revealed as hero shrinks) */}
                <div 
                    className="absolute inset-0 z-0 overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
                    }}
                >
                    {/* Subtle grain texture */}
                    <div 
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Marquee Text Layer - Desktop: centered, Mobile: below the card */}
                    <div 
                        ref={marqueeRef}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
                    >
                        <Marquee 
                            direction="left" 
                            speed={isMobile ? 40 : 60}
                            className={isMobile ? "absolute bottom-[8%]" : "absolute top-1/2 -translate-y-1/2"}
                        >
                            <span className="text-[18vw] md:text-[18vw] font-black text-white/[0.04] uppercase tracking-tighter whitespace-nowrap px-8">
                                DESIGN
                            </span>
                            <span className="text-[18vw] md:text-[18vw] font-black text-white/[0.04] uppercase tracking-tighter whitespace-nowrap px-8">
                                DEVELOP
                            </span>
                            <span className="text-[18vw] md:text-[18vw] font-black text-white/[0.04] uppercase tracking-tighter whitespace-nowrap px-8">
                                DELIVER
                            </span>
                        </Marquee>
                    </div>
                </div>

                {/* Hero Container (The white card that shrinks) */}
                {/* Mobile: Square aspect ratio, centered. Desktop: Full screen */}
                <div
                    ref={heroContainerRef}
                    className={`hero-container relative z-10 overflow-hidden ${
                        isMobile 
                            ? 'w-[85vw] h-[85vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
                            : 'w-full h-full'
                    }`}
                    style={{
                        transformOrigin: 'center center',
                        borderRadius: isMobile ? '24px' : '0px',
                        willChange: 'transform, border-radius, opacity',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    {/* Dark overlay for image */}
                    <div
                        ref={darkOverlayRef}
                        className="absolute inset-0 z-40 pointer-events-none bg-black opacity-0"
                        style={{ willChange: 'opacity' }}
                    />
                    
                    <Hero />
                </div>

                {/* Signature SVG */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    {paths.length > 0 && (
                        <svg
                            ref={signatureSvgRef}
                            viewBox="0 0 2709 1474"
                            className="w-[70vw] h-auto max-w-[900px] md:w-[50vw]"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ 
                                opacity: 0,
                                willChange: 'transform, opacity',
                            }}
                        >
                            {paths.map((pathData, index) => (
                                <path
                                    key={index}
                                    ref={(el) => { pathRefs.current[index] = el; }}
                                    d={pathData.d}
                                    fill="none"
                                    stroke="white"
                                    strokeWidth={pathData.strokeWidth || "2"}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ))}
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}
