"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-16 md:py-32 px-4 md:px-8 bg-gradient-to-br from-accent-purple to-accent-blue text-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-8 tracking-tighter leading-none">
                        Začnime spolu<br />
                        <span className="opacity-50">pracovať.</span>
                    </h2>
                    <p className="text-base md:text-xl opacity-80 mb-8 md:mb-12 max-w-md font-medium leading-relaxed">
                        Ste pripravení posunúť vašu digitálnu prezentáciu na vyššiu úroveň? Prijímam nové projekty.
                    </p>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg">
                        <a href="mailto:karol.jr@billik.sk" className="flex items-center gap-3 md:gap-4 hover:opacity-80 active:scale-[0.98] transition-all">
                            <div className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full">
                                <Mail size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="text-sm md:text-base">karol.jr@billik.sk</span>
                        </a>
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full">
                                <Phone size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="text-sm md:text-base">+421 907 758 852</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white text-foreground p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                >
                    <form className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400">Meno</label>
                                <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 md:px-4 py-3 md:py-4 text-base md:text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent" placeholder="Ján Novák" />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400">Email</label>
                                <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 md:px-4 py-3 md:py-4 text-base md:text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent" placeholder="jan@example.com" />
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400">Typ Projektu</label>
                            <select className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 md:px-4 py-3 md:py-4 text-base md:text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent appearance-none">
                                <option>Tvorba Webu</option>
                                <option>Dizajn Systém</option>
                                <option>E-Commerce</option>
                                <option>Iné</option>
                            </select>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400">Správa</label>
                            <textarea rows={3} className="w-full bg-gray-50 border-b-2 border-gray-200 px-3 md:px-4 py-3 md:py-4 text-base md:text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent resize-none" placeholder="Napíšte nám o vašich cieľoch..." />
                        </div>

                        <button className="w-full py-4 md:py-5 bg-foreground text-white rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-accent-blue active:scale-[0.98] transition-all group">
                            Odoslať Dopyt
                            <Send size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Decorative Elements - Reduced on mobile for performance */}
            <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-48 md:w-96 h-48 md:h-96 bg-accent-pink rounded-full blur-2xl md:blur-3xl opacity-30 pointer-events-none mix-blend-overlay" />
            <div className="absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-48 md:w-96 h-48 md:h-96 bg-accent-yellow rounded-full blur-2xl md:blur-3xl opacity-30 pointer-events-none mix-blend-overlay" />
        </section>
    );
}
