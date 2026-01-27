"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
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
    const mouseX = useMotionValue(0);
    // Create a moving "window" of visibility (Mexican wave style - on then off)
    const maskImage = useMotionTemplate`linear-gradient(90deg, 
        transparent calc(${mouseX}% - 25%), 
        black calc(${mouseX}% - 10%), 
        black calc(${mouseX}% + 10%), 
        transparent calc(${mouseX}% + 25%)
    )`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!textRef.current) return;
        const rect = textRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const percentage = (relativeX / rect.width) * 100;
        mouseX.set(percentage);
    };

    const handleMouseLeave = () => {
        // Reset or fade out? User asked for "smoothly disappear"
        // We can just animate opacity to 0 via group-hover, so existing logic covers the "disappear" on leave.
        // But to make it "fade out" nicely inside the mask while hovering? The gradients handle the soft edges.
    };

    return (
        <section id="services" className="py-32 px-4 md:px-8 bg-surface-off-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground mb-8 uppercase">
                        Služby
                        <span className="block md:inline md:ml-6 text-accent-pink stroke-text-black text-transparent">
                            & Cenník
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative p-10 rounded-[3rem] ${service.color} ${service.textColor} flex flex-col justify-between min-h-[500px] overflow-hidden group`}
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                                <p className="text-lg opacity-80 mb-8 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-8 opacity-80">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 border-b border-white/20 pb-2">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 mt-auto flex flex-col gap-4">
                                <div className="text-5xl font-black mb-2">{service.price}</div>
                                
                                <div className="flex flex-col gap-3">
                                    <Link href="/book/karchigod/intro" className={`w-full py-4 bg-white/20 backdrop-blur-md rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-center`}>
                                        Vybrať Balík <ArrowUpRight size={18} />
                                    </Link>
                                    
                                    <button 
                                        className="w-full py-3 bg-black/20 backdrop-blur-md rounded-full font-bold text-sm tracking-wide hover:bg-black/40 transition-colors border border-white/10 flex items-center justify-center gap-2"
                                        onClick={async () => {
                                            await createCheckoutSession(service.title);
                                        }}
                                    >
                                        <span className="opacity-90">Ušetri 10% (zaplať vopred)</span>
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Custom Project Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-8 relative w-full bg-black text-white rounded-[3rem] p-10 md:p-14 overflow-hidden group shadow-2xl"
                >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-10 gap-10">
                        <div className="flex-1 min-w-[300px]">
                             <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-3xl lg:text-4xl font-black text-white">Vlastný Projekt</h3>
                                <span className="px-3 py-1 rounded-full bg-accent-green/20 text-accent-green text-[10px] font-bold uppercase tracking-widest border border-accent-green/20">Enterprise</span>
                             </div>
                             <p className="text-gray-400 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
                                Komplexné webové aplikácie, API integrácie a AI riešenia.
                                Software vyvinutý presne podľa vašich špecifických požiadaviek.
                             </p>
                             
                             <div className="flex flex-wrap gap-2">
                                 {["Web App", "API Vývoj", "AI Integrácia", "SaaS"].map((tech) => (
                                     <div key={tech} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs font-medium text-gray-300 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                        {tech}
                                     </div>
                                 ))}
                             </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 pt-8 lg:pt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 mt-8 lg:mt-0 lg:ml-8">
                            <div className="text-left sm:text-right">
                                <div 
                                    ref={textRef}
                                    onMouseMove={handleMouseMove}
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
                                    
                                    {/* Apple Intelligence Style Glow */}
                                    <motion.div 
                                        style={{ maskImage, WebkitMaskImage: maskImage }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] opacity-0 group-hover/price:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                                    >
                                         <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-30" />
                                         <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] blur-lg opacity-20 animate-[spin_4s_linear_infinite] mix-blend-screen" />
                                    </motion.div>

                                    {/* Overlay Text to be lit up by the glow (blend mode trick) 
                                        We duplicate the text on top of the glow, but restrict it to the mask as well 
                                        Currently the glow is BEHIND the gray text.
                                        To make the text "turn white" or glow itself inside the mask, we can add a white text layer that uses the same mask.
                                    */}
                                    <motion.span 
                                        style={{ maskImage, WebkitMaskImage: maskImage }}
                                        className="absolute inset-0 z-10 font-serif italic text-3xl lg:text-4xl text-white block whitespace-nowrap pointer-events-none select-none py-2 top-0"
                                    >
                                        individuálna cena
                                    </motion.span>
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

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2 mix-blend-overlay" />
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-green/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
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
