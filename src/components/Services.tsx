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
                            className={`relative p-10 rounded-[3rem] ${service.color} ${service.textColor} flex flex-col justify-between min-h-[600px] overflow-hidden group`}
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-black tracking-tight">{service.title}</h3>
                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${service.textColor === 'text-black' ? 'border-black/20' : 'border-white/20'}`}>
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>

                                <div className={`mb-10 font-serif italic text-6xl md:text-7xl tracking-tighter ${service.textColor === 'text-black' ? 'opacity-90' : 'opacity-100'}`}>
                                    {service.price}
                                </div>

                                <p className={`text-lg mb-8 font-medium leading-relaxed max-w-sm ${service.textColor === 'text-black' ? 'opacity-70' : 'opacity-80'}`}>
                                    {service.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {service.features.map((feature, i) => (
                                        <div 
                                            key={i} 
                                            className={`px-3 py-1.5 rounded-md border text-xs font-bold uppercase tracking-widest flex items-center gap-2 
                                                ${service.textColor === 'text-black' 
                                                    ? 'bg-black/5 border-black/10 text-black' 
                                                    : 'bg-white/10 border-white/20 text-white'
                                                }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.textColor === 'text-black' ? 'bg-black' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 mt-auto flex flex-col gap-3">
                                <Link 
                                    href="/book/karchigod/intro" 
                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-sm
                                        ${service.textColor === 'text-black' 
                                            ? 'bg-black text-white hover:bg-black/80' 
                                            : 'bg-white text-black hover:bg-white/90'
                                        }`}
                                >
                                    Vybrať Balík <ArrowUpRight size={16} />
                                </Link>
                                
                                <button 
                                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-colors border flex items-center justify-center gap-2
                                        ${service.textColor === 'text-black'
                                            ? 'bg-transparent border-black/10 hover:bg-black/5'
                                            : 'bg-transparent border-white/10 hover:bg-white/10'
                                        }
                                    `}
                                    onClick={async () => {
                                        await createCheckoutSession(service.title);
                                    }}
                                >
                                    <span>Ušetriť 10% (zaplatiť vopred)</span>
                                </button>
                            </div>

                            {/* Decorative Elements */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-50 pointer-events-none group-hover:scale-150 transition-transform duration-700
                                ${service.textColor === 'text-black' ? 'bg-white/60' : 'bg-white/20'}`} 
                            />
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
