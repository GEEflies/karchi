"use client";

import { motion, useMotionValue, useMotionTemplate, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

const services = [
    {
        title: "Landing Page",
        price: "200€+",
        description: "Ideálne pre uvedenie produktu alebo osobné portfólio. Jednostránkový web s vysokým dopadom.",
        features: ["Responzívny Dizajn", "SEO Optimalizácia", "Rýchle Načítanie"],
        color: "bg-accent-blue",
        textColor: "text-white"
    },
    {
        title: "Firemný Web",
        price: "400€+",
        description: "Kompletné riešenie pre firmy zamerané na rast a konverzie.",
        features: ["CMS Integrácia", "5+ Podstránok", "Blog Funkcionalita"],
        color: "bg-accent-purple",
        textColor: "text-white"
    },
    {
        title: "E-Shop",
        price: "600€+",
        description: "Profesionálny internetový obchod postavený na predaj a spoľahlivosť.",
        features: ["Platobná Brána", "Správa Skladu", "Zákaznícke Účty"],
        color: "bg-accent-yellow",
        textColor: "text-black"
    },
];

export default function Services() {
    const textRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    // Create a moving "window" of visibility (Mexican wave style - on then off)
    const maskImage = useMotionTemplate`linear-gradient(90deg, 
        transparent calc(${mouseX}% - 25%), 
        black calc(${mouseX}% - 10%), 
        black calc(${mouseX}% + 10%), 
        transparent calc(${mouseX}% + 25%)
    )`;

    // Auto-animate the glow from left to right and back when in view
    useEffect(() => {
        if (!isInView) return;

        const controls = animate(mouseX, [0, 100, 0], {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        });

        return () => controls.stop();
    }, [isInView, mouseX]);

    return (
        <section id="services" className="py-10 md:py-32 px-4 md:px-8 bg-surface-off-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 md:mb-24"
                >
                    <h2 className="text-3xl md:text-7xl lg:text-9xl font-black tracking-tighter text-foreground mb-2 md:mb-8 uppercase">
                        Služby
                        <span className="block md:inline md:ml-6 text-accent-pink stroke-text-black text-transparent">
                            & Cenník
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative p-5 md:p-10 rounded-[1.5rem] md:rounded-[3rem] ${service.color} ${service.textColor} flex flex-col justify-between min-h-[320px] md:min-h-[500px] overflow-hidden group active:scale-[0.98] transition-transform`}
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">{service.title}</h3>
                                <p className="text-sm md:text-lg opacity-80 mb-4 md:mb-8 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-8 opacity-80">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 border-b border-white/20 pb-1.5 md:pb-2 text-xs md:text-base">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 mt-auto flex flex-col gap-2 md:gap-4">
                                <div className="text-3xl md:text-5xl font-black mb-1 md:mb-2">{service.price}</div>

                                <div className="flex flex-col gap-2 md:gap-3">
                                    <Link href="/book/karchigod/intro" className={`w-full py-2.5 md:py-4 bg-white/20 backdrop-blur-md rounded-full font-bold uppercase tracking-wider md:tracking-widest hover:bg-white hover:text-black active:scale-95 transition-all flex items-center justify-center gap-2 text-center text-xs md:text-base`}>
                                        Vybrať Balík <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                                    </Link>

                                    <motion.button
                                        className="w-full py-2 md:py-3 bg-black/20 backdrop-blur-md rounded-full font-bold text-[10px] md:text-sm tracking-wide border border-white/10 flex items-center justify-center gap-2 overflow-hidden relative group/btn"
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={async () => {
                                            await createCheckoutSession(service.title);
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                                        <span className="opacity-90 relative z-10">Ušetri 10% (zaplať vopred)</span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Decorative Circle - smaller on mobile */}
                            <div className="absolute -bottom-12 md:-bottom-20 -right-12 md:-right-20 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Custom Project Card */}
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-4 md:mt-8 relative w-full bg-black text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 overflow-hidden group shadow-2xl"
                >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-10 gap-6 md:gap-10">
                        <div className="flex-1 min-w-0 md:min-w-[300px]">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white">Vlastný Projekt</h3>
                                <span className="px-2 md:px-3 py-1 rounded-full bg-accent-green/20 text-accent-green text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-accent-green/20">Enterprise</span>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-xl leading-relaxed">
                                Komplexné webové aplikácie, API integrácie a AI riešenia.
                                Software vyvinutý presne podľa vašich špecifických požiadaviek.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {["Web App", "API Vývoj", "AI Integrácia", "SaaS"].map((tech) => (
                                    <div key={tech} className="px-2 md:px-3 py-1 md:py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] md:text-xs font-medium text-gray-300 flex items-center gap-1.5 md:gap-2">
                                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(34,197,94,0.8)] md:shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 pt-8 lg:pt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 mt-8 lg:mt-0 lg:ml-8">
                            <div className="text-left sm:text-right">
                                <div
                                    ref={textRef}
                                    className="relative inline-block group/price cursor-default py-2"
                                >
                                    {/* Base Text (Darker) */}
                                    <span className="relative z-10 font-serif italic text-3xl lg:text-4xl text-gray-500 block whitespace-nowrap transition-colors duration-300">
                                        individuálna cena
                                    </span>

                                    {/* Revealed Text (White) - Optional, helps visibility 
                                    <span className="absolute inset-0 z-20 font-serif italic text-3xl lg:text-4xl text-white block whitespace-nowrap pointer-events-none opacity-0 group-hover/price:opacity-100 transition-opacity duration-300">
                                        individuálna cena
                                    </span>
                                    */}

                                    {/* Apple Intelligence Style Glow - Desktop Only to prevent mobile crashes */}
                                    <div className="hidden md:block">
                                        <motion.div
                                            style={{ maskImage, WebkitMaskImage: maskImage }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[70%] opacity-0 group-hover/price:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"
                                            animate={{ opacity: isInView ? 1 : 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent blur-2xl opacity-40 mix-blend-screen" />
                                            <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] blur-3xl opacity-25 animate-[spin_4s_linear_infinite] mix-blend-screen" />
                                        </motion.div>

                                        {/* Overlay Text to be lit up by the glow (blend mode trick) */}
                                        <motion.span
                                            style={{ maskImage, WebkitMaskImage: maskImage }}
                                            className="absolute inset-0 z-10 font-serif italic text-3xl lg:text-4xl text-white block whitespace-nowrap pointer-events-none select-none py-2 top-0"
                                        >
                                            individuálna cena
                                        </motion.span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/book/karchigod/intro" className="group relative px-8 py-4 bg-white text-black hover:text-white rounded-xl font-bold overflow-hidden transition-all duration-300 active:scale-95 whitespace-nowrap">
                                <span className="relative z-10 flex items-center gap-2">
                                    Konzultovať <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-accent-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements - Reduced on mobile */}
                    <div className="hidden md:block absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2 mix-blend-overlay" />

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-accent-green/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[150px] md:w-[400px] h-[150px] md:h-[400px] bg-accent-blue/10 rounded-full blur-[50px] md:blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
                </motion.div>
            </div>

            <style jsx>{`
                .stroke-text-black {
                    -webkit-text-stroke: 2px #0a0a0a;
                }
            `}</style>
        </section>
    );
}
