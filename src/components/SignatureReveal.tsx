"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [pathData, setPathData] = useState<string>("");
    const [hasMounted, setHasMounted] = useState(false);

    // Load the SVG path data
    useEffect(() => {
        setHasMounted(true);
        fetch("/images/signature.svg")
            .then((res) => res.text())
            .then((svgText) => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const path = svgDoc.querySelector("path");
                if (path) {
                    const d = path.getAttribute("d");
                    if (d) setPathData(d);
                }
            });
    }, []);

    // GSAP Scroll-Scrubbed Animation
    useEffect(() => {
        if (!pathData || !pathRef.current || !containerRef.current || !svgRef.current) return;

        const path = pathRef.current;
        const container = containerRef.current;
        const svg = svgRef.current;

        // Get the total length of the path for stroke animation
        const pathLength = path.getTotalLength();

        // Set initial styles for stroke drawing animation
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            fill: "none",
            stroke: "white",
            strokeWidth: 2,
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
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the section while animating
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
        // 2. Draw the signature while zooming in
        .to(path, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "none",
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
    }, [pathData]);

    if (!hasMounted) return null;

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-gradient-to-b from-[#e6e4e3] to-black overflow-hidden"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                {pathData && (
                    <svg
                        ref={svgRef}
                        viewBox="0 0 2709 1474"
                        className="w-[80vw] h-auto max-w-[1200px] md:w-[60vw]"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            ref={pathRef}
                            d={pathData}
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
        </section>
    );
}
