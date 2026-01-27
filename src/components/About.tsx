"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-32 px-4 md:px-8 bg-foreground text-white rounded-t-[3rem] -mt-10 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-green mb-8">
                            O mne
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
                            Spájam medzeru medzi <span className="text-accent-blue">dizajnom</span> a <span className="text-accent-pink">AI</span>.
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-white/60 leading-relaxed flex flex-col justify-end"
                    >
                        <p className="mb-6">
                            Začiatky mám v roku 2025, moja misia je jednoduchá: tvoriť digitálne zážitky, ktoré nie sú len funkčné, ale nezabudnuteľné. Verím v silu dynamiky, farieb a interaktivity pri rozprávaní príbehov.
                        </p>
                        <p>
                            Či už ste startup hľadajúci svoju prvú identitu alebo zavedená značka potrebujúca oživenie, prinášam sviežu, živú perspektívu do každého projektu.
                        </p>

                        <div className="flex gap-12 mt-12 border-t border-white/10 pt-8">
                            <div>
                                <div className="text-5xl font-bold text-white mb-2">1+</div>
                                <div className="text-xs uppercase tracking-wider">Rokov Skúseností</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-white mb-2">8+</div>
                                <div className="text-xs uppercase tracking-wider">Projektov</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold text-white mb-2">99%</div>
                                <div className="text-xs uppercase tracking-wider">Spokojnosť</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
