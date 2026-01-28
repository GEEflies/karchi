"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-10 md:py-32 px-4 md:px-8 bg-foreground text-white rounded-t-[1.5rem] md:rounded-t-[3rem] -mt-6 md:-mt-10 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-accent-green mb-3 md:mb-8">
                            O mne
                        </h2>
                        <h3 className="text-xl md:text-4xl lg:text-6xl font-medium leading-tight mb-4 md:mb-8">
                            Spájam medzeru medzi <span className="text-accent-blue">dizajnom</span> a <span className="text-accent-pink">AI</span>.
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm md:text-lg text-white/60 leading-relaxed flex flex-col justify-end"
                    >
                        <p className="mb-3 md:mb-6">
                            Začiatky mám v roku 2025, moja misia je jednoduchá: tvoriť digitálne zážitky, ktoré nie sú len funkčné, ale nezabudnuteľné. Verím v silu dynamiky, farieb a interaktivity pri rozprávaní príbehov.
                        </p>
                        <p className="hidden md:block">
                            Či už ste startup hľadajúci svoju prvú identitu alebo zavedená značka potrebujúca oživenie, prinášam sviežu, živú perspektívu do každého projektu.
                        </p>

                        <div className="flex gap-4 md:gap-12 mt-6 md:mt-12 border-t border-white/10 pt-4 md:pt-8">
                            <div>
                                <div className="text-2xl md:text-5xl font-bold text-white mb-0.5 md:mb-2">1+</div>
                                <div className="text-[8px] md:text-xs uppercase tracking-wider">Rokov Skúseností</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-5xl font-bold text-white mb-0.5 md:mb-2">8+</div>
                                <div className="text-[8px] md:text-xs uppercase tracking-wider">Projektov</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-5xl font-bold text-white mb-0.5 md:mb-2">99%</div>
                                <div className="text-[8px] md:text-xs uppercase tracking-wider">Spokojnosť</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
