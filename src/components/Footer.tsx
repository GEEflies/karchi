"use client";

import Link from "next/link";
import Marquee from "./Marquee";
import { ArrowUpRight } from "lucide-react";

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
                    <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter">
                        Máte niečo <br />
                        <span className="text-accent-blue">na mysli?</span>
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

                    <Link
                        href="/book/karchigod/intro"
                        className="w-full bg-gradient-to-r from-accent-purple to-accent-blue text-white px-8 py-8 rounded-[2rem] text-xl font-bold hover:opacity-90 transition-all duration-300 flex items-center justify-between group shadow-lg shadow-accent-purple/20"
                    >
                        <span className="text-2xl tracking-tight">Povedzte mi o tom</span>
                         <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                         </div>
                    </Link>
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
                    <a 
                        href="mailto:karol.jr@billik.sk" 
                        className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 shadow-lg text-sm md:text-base tracking-wide"
                    >
                        KAROL.JR@BILLIK.SK
                    </a>
                    <a 
                        href="tel:+421907758852" 
                        className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 shadow-lg text-sm md:text-base tracking-wide"
                    >
                        +421 907 758 852
                    </a>
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
