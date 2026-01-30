"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useCursor } from "@/components/ui/Cursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const { setCursorType } = useCursor();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Reduced animation for mobile
            const animDuration = isMobile ? 0.6 : 1;
            const staggerDelay = isMobile ? 0.05 : 0.1;

            // Header Text Reveal
            gsap.fromTo(".reveal-text",
                { y: isMobile ? 50 : 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: animDuration,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: isMobile ? "top 80%" : "top 60%",
                    }
                }
            );

            // Staggered Entry Animation for cards
            const cards = document.querySelectorAll('.project-card');

            gsap.fromTo(cards,
                {
                    y: isMobile ? 30 : 50,
                    opacity: 0,
                    scale: isMobile ? 0.98 : 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: isMobile ? 0.5 : 0.8,
                    stagger: staggerDelay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: isMobile ? "top 85%" : "top 75%",
                    }
                }
            );

            // Parallax Effect for images within cards (Desktop only for performance)
            if (!isMobile) {
                cards.forEach((card) => {
                    const image = card.querySelector('.project-image');
                    if (image) {
                        gsap.fromTo(image,
                            { scale: 1.15, y: -20 },
                            {
                                y: 20,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true
                                }
                            }
                        );
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <section
            id="portfolio-home-section"
            ref={containerRef}
            className="relative py-10 md:py-32 px-4 md:px-8 bg-[#f8f8f8] text-black overflow-hidden shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]"
            style={{ zIndex: 10, backgroundColor: '#f8f8f8' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with Reveal Animation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-20 gap-2 md:gap-8">
                    <div className="overflow-hidden">
                        <h2 className="reveal-text translate-y-full opacity-0 text-3xl md:text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.95]">
                            Vybrané <span className="inline md:block text-accent-green">Diela</span>
                        </h2>
                    </div>

                    <p className="text-sm md:text-xl max-w-md font-medium text-gray-500">
                        Ukážka mojich najnovších projektov a úspechov.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[450px]">
                    {projects.map((project, index) => {
                        // Pattern: 8+4, 4+8, 4+4+4? 
                        // Let's go with a dynamic mix:
                        // 0: Large (8)
                        // 1: Small (4)
                        // 2: Small (4)
                        // 3: Large (8)
                        // 4: Half (6)
                        // 5: Half (6)

                        let colSpan = 'lg:col-span-4'; // Default small
                        if (index === 0 || index === 3) colSpan = 'lg:col-span-8';
                        if (index === 4 || index === 5) colSpan = 'lg:col-span-6';

                        // Mobile: All items full width for clean look
                        const mobileSpan = 'col-span-1';

                        return (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className={`project-card group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 ${colSpan} ${mobileSpan} shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 md:duration-500`}
                                onMouseEnter={() => setCursorType('portfolio')}
                                onMouseLeave={() => setCursorType('default')}
                            >
                                <div className="w-full h-full relative overflow-hidden">
                                    {/* Image Container */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            className="project-image object-cover transition-transform duration-700 will-change-transform"
                                            quality={100}
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 md:duration-500" />
                                        {/* Gradient Overlay for Text Visibility aka "Black Smoke" */}
                                        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:duration-500 ease-in-out" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end text-white pointer-events-none z-10">

                                        {/* Top Right Arrow - Hidden on mobile for cleaner look */}
                                        <div className="hidden md:flex justify-end absolute top-4 right-4 md:top-8 md:right-8">
                                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <ArrowUpRight className="text-white" size={24} />
                                            </div>
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 md:duration-500">
                                            <span className="hidden md:inline-block px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
                                                {project.category}
                                            </span>
                                            <h3 className="text-base md:text-3xl lg:text-5xl font-black leading-tight tracking-tight min-h-[1.1em]">
                                                {project.title}
                                            </h3>
                                            <p className="hidden md:block text-sm md:text-base text-white/90 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 max-w-[90%] line-clamp-2">
                                                {project.tagline}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>


            </div>
        </section>
    );
}
