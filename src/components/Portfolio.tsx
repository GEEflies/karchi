"use client";

import { useRef, useLayoutEffect } from "react";
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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Text Reveal
            gsap.fromTo(".reveal-text",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );

            // Staggered Entry Animation for cards
            const cards = document.querySelectorAll('.project-card');

            gsap.fromTo(cards,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Parallax Effect for images within cards
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

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="py-32 px-4 md:px-8 bg-white text-black overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with Reveal Animation */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="overflow-hidden">
                        <h2 className="reveal-text translate-y-full opacity-0 text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9]">
                            Vybrané
                            <span className="block text-accent-green">Diela</span>
                        </h2>
                    </div>

                    <p className="text-xl max-w-md font-medium text-gray-500 mb-2">
                        Ukážka mojich najnovších projektov a úspechov.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[450px]">
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

                        return (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className={`project-card group relative overflow-hidden rounded-3xl bg-gray-100 ${colSpan} md:col-span-2 shadow-sm hover:shadow-xl transition-all duration-500`}
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
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                                        {/* Gradient Overlay for Text Visibility aka "Black Smoke" */}
                                        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white pointer-events-none z-10">

                                        {/* Top Right Arrow */}
                                        <div className="flex justify-end">
                                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <ArrowUpRight className="text-white" size={24} />
                                            </div>
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="inline-block px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
                                                {project.category}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mt-2 min-h-[1.1em]">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 max-w-[90%] line-clamp-2">
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
