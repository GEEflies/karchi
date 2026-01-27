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
                                        <span className="opacity-90">Ušetriť 10% (zaplatiť vopred)</span>
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
                        <div className="flex-1">
                             <h3 className="text-3xl lg:text-4xl font-black mb-4 text-accent-green">Vlastný Projekt</h3>
                             <p className="text-gray-400 text-lg mb-0 lg:mb-10 max-w-2xl leading-relaxed">
                                Potrebujete komplexnú webovú aplikáciu, API integráciu alebo AI riešenie? 
                                Vyviniem software presne podľa vašich špecifických požiadaviek.
                             </p>
                        </div>
                        
                        <div className="lg:text-right shrink-0">
                            <span className="text-4xl lg:text-5xl font-black block tracking-tighter text-white">Na Mieru</span>
                            <span className="text-gray-500 text-xs lg:text-sm font-bold mt-1 block uppercase tracking-widest">Individuálna Cenová Ponuka</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-10 gap-8 lg:gap-10 mt-10 lg:mt-0">
                         <div className="flex flex-wrap gap-4 lg:gap-6">
                             {["Web App", "API Vývoj", "AI Integrácia", "SaaS"].map((tech) => (
                                 <div key={tech} className="flex items-center gap-2 lg:gap-3 font-bold text-xs lg:text-sm uppercase tracking-wider text-white bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                    <div className="w-4 h-4 rounded-full bg-accent-green text-black flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                        <Check size={10} strokeWidth={4} />
                                    </div>
                                    {tech}
                                 </div>
                             ))}
                         </div>
                         
                         <Link href="/book/karchigod/intro" className="w-full lg:w-auto bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 text-base lg:text-lg shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] shrink-0">
                            Konzultovať <ArrowUpRight size={20} />
                         </Link>
                    </div>
                    
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
