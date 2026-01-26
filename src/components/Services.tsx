"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
                        <span className="block text-accent-pink stroke-text-black text-transparent">
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

                            <div className="relative z-10 mt-auto">
                                <div className="text-5xl font-black mb-6">{service.price}</div>
                                <Link href="/book/karchigod/consultation" className="w-full py-4 bg-white/20 backdrop-blur-md rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                                    Vybrať Balík <ArrowUpRight size={18} />
                                </Link>
                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .stroke-text-black {
                    -webkit-text-stroke: 2px #0a0a0a;
                }
            `}</style>
        </section>
    );
}
