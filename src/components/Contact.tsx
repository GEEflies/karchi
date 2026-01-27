"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-4 md:px-8 bg-gradient-to-br from-accent-purple to-accent-blue text-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                        Začnime spolu<br />
                        <span className="opacity-50">pracovať.</span>
                    </h2>
                    <p className="text-xl opacity-80 mb-12 max-w-md font-medium leading-relaxed">
                        Ste pripravení posunúť vašu digitálnu prezentáciu na vyššiu úroveň? Prijímam nové projekty.
                    </p>

                    <div className="space-y-6 text-lg">
                        <a href="mailto:karol.jr@billik.sk" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full">
                                <Mail size={24} />
                            </div>
                            <span>karol.jr@billik.sk</span>
                        </a>
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full">
                                <Phone size={24} />
                            </div>
                            <span>+421 907 758 852</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white text-foreground p-10 rounded-[3rem] shadow-2xl"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Meno</label>
                                <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent" placeholder="Ján Novák" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Email</label>
                                <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent" placeholder="jan@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Typ Projektu</label>
                            <select className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent appearance-none">
                                <option>Tvorba Webu</option>
                                <option>Dizajn Systém</option>
                                <option>E-Commerce</option>
                                <option>Iné</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Správa</label>
                            <textarea rows={3} className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 text-lg font-medium focus:outline-none focus:border-accent-purple transition-colors bg-transparent resize-none" placeholder="Napíšte nám o vašich cieľoch..." />
                        </div>

                        <button className="w-full py-5 bg-foreground text-white rounded-full text-lg font-bold flex items-center justify-center gap-3 hover:bg-accent-blue transition-colors group">
                            Odoslať Dopyt
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-pink rounded-full blur-3xl opacity-30 pointer-events-none mix-blend-overlay" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-yellow rounded-full blur-3xl opacity-30 pointer-events-none mix-blend-overlay" />
        </section>
    );
}
