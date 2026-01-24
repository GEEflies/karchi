"use client";

import Link from "next/link";
import Marquee from "./Marquee";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background py-20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink" />

            <div className="mb-20">
                <Marquee className="select-none text-9xl font-black text-transparent stroke-text opacity-30" speed={40}>
                    <span>POĎME NA TO</span>
                    <span className="text-accent-yellow">★</span>
                    <span>POĎME NA TO</span>
                    <span className="text-accent-yellow">★</span>
                </Marquee>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Máte projekt <br />
                        <span className="text-accent-blue">v hlave?</span>
                    </h2>
                    <Link
                        href="mailto:contact@example.com"
                        className="inline-block bg-white text-foreground px-8 py-4 rounded-full text-lg font-bold hover:bg-accent-purple hover:text-white transition-all duration-300"
                    >
                        Rezervovať Hovor
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-8 text-lg">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-accent-green mb-2">Sociálne Siete</h3>
                        <a href="#" className="hover:text-accent-pink transition-colors">Instagram</a>
                        <a href="#" className="hover:text-accent-blue transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-accent-purple transition-colors">Twitter</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-accent-orange mb-2">Mapa Stránky</h3>
                        <Link href="#projects" className="hover:text-white transition-colors">Projekty</Link>
                        <Link href="#services" className="hover:text-white transition-colors">Služby</Link>
                        <Link href="#about" className="hover:text-white transition-colors">O nás</Link>
                    </div>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                <p>© {currentYear} DevPortfolio. Všetky práva vyhradené.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-white">Ochrana Súkromia</Link>
                    <Link href="/terms" className="hover:text-white">Podmienky</Link>
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
