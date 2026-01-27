"use client";

import Link from "next/link";
import Marquee from "./Marquee";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="bg-foreground text-background py-20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink" />

            <div className="mb-20">
                <Marquee className="select-none text-9xl font-black text-transparent stroke-text opacity-30" speed={40}>
                    <span>POĎME NA TO</span>
                    <span className="text-accent-yellow">★</span>
                    <span>POĎME NA TO</span>
                    <span className="text-accent-yellow">★</span>
                </Marquee>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <h2 className="flex flex-col gap-2 font-black leading-[0.85] tracking-tighter text-foreground">
                        <span className="text-7xl md:text-9xl uppercase block">
                            Máte
                        </span>
                        <span className="font-serif italic font-normal text-6xl md:text-8xl text-accent-blue block pl-12 md:pl-32 -mt-2 opacity-80">
                            niečo
                        </span>
                        <span className="text-7xl md:text-9xl uppercase block text-right">
                            na mysli?
                        </span>
                    </h2>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-10">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">
                            Vyberte si spôsob kontaktu:
                        </h3>
                        
                        <div className="flex flex-col gap-4">
                            <a href="https://x.com/karchiJR" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-accent-purple transition-colors">
                                <div className="flex items-center gap-4">
                                    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:text-accent-purple transition-colors" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                                    </svg>
                                    <span className="font-bold text-2xl group-hover:text-accent-purple transition-colors">X / TWITTER</span>
                                </div>
                                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </a>

                            <a href="https://wa.me/421907758852" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-accent-green transition-colors">
                                <div className="flex items-center gap-4">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:text-accent-green transition-colors">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    <span className="font-bold text-2xl group-hover:text-accent-green transition-colors">WHATSAPP</span>
                                </div>
                                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </a>
                        </div>
                    </div>

                    <MagneticButton
                        href="/book/karchigod/intro"
                        className="w-full h-32 bg-white text-black rounded-3xl flex items-center justify-between px-10 group overflow-hidden relative"
                        liquidColor={null} // Disable liquid for this one
                        isMagnetic={false}
                    >
                        <div className="relative z-10 flex flex-col items-start gap-1 h-32 justify-center">
                             <span className="text-sm font-bold uppercase tracking-widest opacity-50">Začať spoluprácu</span>
                             <div className="h-10 overflow-hidden relative">
                                <span className="text-4xl font-black tracking-tight block transition-transform duration-500 group-hover:-translate-y-full">Povedzte mi to</span>
                                <span className="text-4xl font-black tracking-tight block absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-accent-blue">Poďme na to!</span>
                             </div>
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-xl group-hover:bg-accent-blue">
                            <ArrowUpRight size={28} />
                        </div>
                    </MagneticButton>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="flex flex-col gap-6">
                    <nav className="flex flex-wrap gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
                        <Link href="#projects" className="hover:text-accent-blue transition-colors">Projekty</Link>
                        <Link href="#services" className="hover:text-accent-purple transition-colors">Služby</Link>
                        <Link href="/o-mne" className="hover:text-accent-pink transition-colors">O mne</Link>
                    </nav>
                    
                    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/30">
                        <p>© 2026 KARCHI. Všetky práva vyhradené.</p>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:text-white">Ochrana Súkromia</Link>
                            <Link href="/terms" className="hover:text-white">Podmienky</Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <MagneticButton 
                        href="mailto:karol.jr@billik.sk" 
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-bold transition-all duration-300 flex items-center gap-3 bg-white/5 backdrop-blur-sm overflow-hidden relative group"
                        liquidColor="#ffffff"
                    >
                        <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                             <Mail size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="tracking-wide">KAROL.JR@BILLIK.SK</span>
                        </div>
                    </MagneticButton>
                    <MagneticButton 
                        href="tel:+421907758852" 
                        className="px-8 py-4 rounded-full border border-white/20 text-white font-bold transition-all duration-300 flex items-center gap-3 bg-white/5 backdrop-blur-sm overflow-hidden relative group"
                        liquidColor="#ffffff"
                    >
                        <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                             <Phone size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="tracking-wide">+421 907 758 852</span>
                        </div>
                    </MagneticButton>
                </div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </footer>
    );
}

function MagneticButton({ 
    children, 
    className, 
    href, 
    liquidColor = "rgba(255,255,255,0.1)",
    isMagnetic = true
}: { 
    children: React.ReactNode, 
    className?: string, 
    href: string, 
    liquidColor?: string | null,
    isMagnetic?: boolean
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const liquidRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const element = ref.current;
        const liquid = liquidRef.current;
        if (!element) return;

        // Button Magnetic Animation
        let xTo: ((value: number) => void) | null = null;
        let yTo: ((value: number) => void) | null = null;

        if (isMagnetic) {
            xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        }

        // Liquid Follow Animation (Only if liquidRef exists)
        let xLiquid: ((value: number) => void) | null = null;
        let yLiquid: ((value: number) => void) | null = null;
        
        if (liquid) {
            xLiquid = gsap.quickTo(liquid, "left", { duration: 0.8, ease: "power3.out" });
            yLiquid = gsap.quickTo(liquid, "top", { duration: 0.8, ease: "power3.out" });
        }

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            
            // Magnetic Move
            if (isMagnetic && xTo && yTo) {
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.35);
                yTo(y * 0.35);
            }

            // Liquid Follow
            if (xLiquid && yLiquid) {
                const relX = clientX - left;
                const relY = clientY - top;
                xLiquid(relX);
                yLiquid(relY);
            }
        };

        const mouseEnter = () => {
             if (liquid) gsap.to(liquid, { scale: 2.5, duration: 0.6, ease: "power1.in" });
        };

        const mouseLeave = () => {
            if (isMagnetic && xTo && yTo) {
                xTo(0);
                yTo(0);
            }
             if (liquid) gsap.to(liquid, { scale: 0, duration: 0.6, ease: "power2.out" });
        };

        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseenter", mouseEnter);
        element.addEventListener("mouseleave", mouseLeave);

        return () => {
            element.removeEventListener("mousemove", mouseMove);
            element.removeEventListener("mouseenter", mouseEnter);
            element.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    const content = (
        <>
            {liquidColor && (
                <div 
                    ref={liquidRef} 
                    className="absolute w-48 h-48 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 scale-0"
                    style={{ backgroundColor: liquidColor }}
                />
            )}
            {children}
        </>
    );

    // Helper to determine if it's an external link or internal
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');

    if (isExternal) {
        return (
            <a ref={ref} href={href} className={className} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
                {content}
            </a>
        );
    }

    return (
        <Link ref={ref} href={href} className={className}>
            {content}
        </Link>
    );
}
