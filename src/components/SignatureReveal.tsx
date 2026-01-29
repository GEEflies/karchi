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
        validPaths.forEach((path) => {
            const pathLength = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            });
        });

        // Set initial scale (start small)
        gsap.set(svg, {
            scale: 0.3,
            opacity: 0,
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

        // Animation sequence:
        // 1. Fade in and start drawing + zooming
        tl.to(svg, {
            opacity: 1,
            scale: 0.5,
            duration: 0.1,
            ease: "none",
        })
        // 2. Draw all paths while zooming in
        .to(validPaths, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "none",
            stagger: 0.05, // Slight stagger for each path
        }, "<")
        .to(svg, {
            scale: 1.2,
            duration: 0.6,
            ease: "none",
        }, "<")
        // 3. Final zoom to full size and hold
        .to(svg, {
            scale: 1.5,
            duration: 0.2,
            ease: "none",
        })
        // 4. Fade out as we exit
        .to(svg, {
            opacity: 0,
            scale: 2,
            duration: 0.1,
            ease: "none",
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [paths]);

    if (!hasMounted) return null;

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-gradient-to-b from-[#e6e4e3] to-black overflow-hidden"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                {paths.length > 0 && (
                    <svg
                        ref={svgRef}
                        viewBox="0 0 2709 1474"
                        className="w-[80vw] h-auto max-w-[1200px] md:w-[60vw]"
                        preserveAspectRatio="xMidYMid meet"
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
