"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

const services = [
    {
        title: "Landing Page",
        price: "200€+",
        description: "Ideálne pre uvedenie produktu alebo osobné portfólio. Jednostránkový web s vysokým dopadom.",
        features: ["Responzívny", "SEO Optimalizácia", "Rýchle Načítanie"],
        colors: {
            main: "text-accent-blue",
            bg: "bg-accent-blue",
            shadow: "shadow-[0_0_8px_var(--color-accent-blue)]"
        }
    },
    {
        title: "Firemný Web",
        price: "400€+",
        description: "Kompletné riešenie pre firmy zamerané na rast a konverzie.",
        features: ["CMS Integrácia", "5+ Podstránok", "Blog Funkcionalita"],
        colors: {
            main: "text-accent-purple",
            bg: "bg-accent-purple",
            shadow: "shadow-[0_0_8px_var(--color-accent-purple)]"
        }
    },
    {
        title: "E-Shop",
        price: "600€+",
        description: "Profesionálny internetový obchod postavený na predaj a spoľahlivosť.",
        features: ["Platobná Brána", "Správa Skladu", "Zákaznícke Účty"],
        colors: {
            main: "text-accent-yellow",
            bg: "bg-accent-yellow",
            shadow: "shadow-[0_0_8px_var(--color-accent-yellow)]"
        }
    },
];

export default function Services() {
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
                            className="relative p-10 rounded-[3rem] bg-black text-white flex flex-col justify-between min-h-[600px] overflow-hidden group shadow-2xl"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-2 text-white">{service.title}</h3>
                                <div className="font-serif italic text-4xl text-gray-400 mb-6">{service.price}</div>
                                
                                <p className="text-gray-400 text-base mb-8 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs font-medium text-gray-300 flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.colors.bg} ${service.colors.shadow}`} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 mt-auto flex flex-col gap-3">
                                <Link href="/book/karchigod/intro" className="group relative w-full py-4 bg-white text-black rounded-xl font-bold overflow-hidden transition-transform active:scale-95">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Vybrať Balík <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                    <div className={`absolute inset-0 ${service.colors.bg} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out`} />
                                </Link>
                                
                                <button 
                                    className="w-full py-3 bg-white/5 backdrop-blur-md rounded-xl font-bold text-sm tracking-wide hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2 text-gray-300"
                                    onClick={async () => {
                                        await createCheckoutSession(service.title);
                                    }}
                                >
                                    <span>Ušetriť 10% (zaplatiť vopred)</span>
                                </button>
                            </div>

                            {/* Decorative Blur */}
                            <div className={`absolute top-0 right-0 w-[300px] h-[300px] ${service.colors.bg} opacity-20 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2 group-hover:opacity-30 transition-opacity duration-500`} />
                            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-[60px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
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
                                <span className="font-serif italic text-3xl lg:text-4xl text-gray-400 block whitespace-nowrap">
                                    individuálna cena
                                </span>
                            </div>
                         
                            <Link href="/book/karchigod/intro" className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold overflow-hidden transition-transform active:scale-95 whitespace-nowrap">
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
