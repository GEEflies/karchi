"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PathData {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
}

export default function SignatureReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const [paths, setPaths] = useState<PathData[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    // Load all SVG paths
    useEffect(() => {
        setHasMounted(true);
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
                            stroke: path.getAttribute("stroke") || "white",
                            strokeWidth: path.getAttribute("stroke-width") || "2",
                        });
                    }
                });
                
                setPaths(pathsData);
            });
    }, []);

    // GSAP Scroll-Scrubbed Animation
    useEffect(() => {
        if (paths.length === 0 || !containerRef.current || !svgRef.current) return;

        const container = containerRef.current;
        const svg = svgRef.current;
        const validPaths = pathRefs.current.filter((p): p is SVGPathElement => p !== null);

        if (validPaths.length === 0) return;

        // Set up each path for stroke animation
        validPaths.forEach((path, index) => {
            const pathLength = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
                opacity: index === 0 ? 1 : 0, // Only first path visible initially
                force3D: true, // GPU acceleration
            });
        });

        // Set initial scale (start small)
        gsap.set(svg, {
            scale: 0.3,
            opacity: 0,
            force3D: true, // GPU acceleration
        });

        // Create the scroll-triggered timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        // Calculate total length of all paths for proportional timing
        const pathLengths = validPaths.map(path => path.getTotalLength());
        const totalLength = pathLengths.reduce((sum, len) => sum + len, 0);
        const totalDrawDuration = 0.7; // Total time for all paths to draw
        
        // Speed multipliers for each path (higher = slower)
        // Path 2 (index 1) is the complex signature that needs to be drawn much slower
        const pathSpeedMultipliers = [1, 4, 1, 1]; // 4x slower for path 2
        
        // Animation sequence:
        // 1. Fade in and start drawing + zooming
        tl.to(svg, {
            opacity: 1,
            scale: 0.5,
            duration: 0.05,
            ease: "none",
            force3D: true, // GPU acceleration
        });

        // 2. Draw each path sequentially with duration proportional to its length
        let currentScale = 0.5;
        validPaths.forEach((path, index) => {
            // Calculate duration based on path length, with multiplier for specific paths
            const multiplier = pathSpeedMultipliers[index] || 1;
            const pathDuration = ((pathLengths[index] / totalLength) * totalDrawDuration) * multiplier;
            const scaleIncrement = 0.7 / validPaths.length;
            
            // Fade in the path before drawing
            if (index > 0) {
                tl.to(path, {
                    opacity: 1,
                    duration: 0.02,
                    ease: "none",
                    force3D: true,
                });
            }
            
            // Draw the path with proportional duration
            tl.to(path, {
                strokeDashoffset: 0,
                duration: pathDuration,
                ease: "none",
                force3D: true,
            }, "<");
            
            // Continue zooming during path drawing
            currentScale += scaleIncrement;
            tl.to(svg, {
                scale: currentScale,
                duration: pathDuration,
                ease: "none",
                force3D: true,
            }, "<");
        });

        // 3. Final zoom to full size and hold
        tl.to(svg, {
            scale: 1.5,
            duration: 0.15,
            ease: "none",
            force3D: true,
        })
        // 4. Fade out as we exit
        .to(svg, {
            opacity: 0,
            scale: 2,
            duration: 0.1,
            ease: "none",
            force3D: true,
        });

        return () => {
            // Kill the timeline first
            tl.kill();
            // Get the ScrollTrigger instance and kill it with revert
            const st = tl.scrollTrigger;
            if (st) {
                st.kill(true); // true = revert all inline styles
            }
        };
    }, [paths]);

    if (!hasMounted) return null;

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-gradient-to-b from-[#e6e4e3] to-black overflow-hidden"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center -mt-16 sm:mt-0">
                {paths.length > 0 && (
                    <svg
                        ref={svgRef}
                        viewBox="0 0 2709 1474"
                        className="w-[80vw] h-auto max-w-[1200px] md:w-[60vw]"
                        preserveAspectRatio="xMidYMid meet"
                        style={{ willChange: 'transform, opacity', transform: 'translate3d(0, 0, 0)' }}
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
        </section>
    );
}
