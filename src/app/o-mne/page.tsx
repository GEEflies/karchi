"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, Github } from "lucide-react";

export default function AboutMePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header Navigation */}
            <div className="fixed top-6 left-4 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5"
                >
                    <ArrowLeft size={16} />
                    Späť na portfólio
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                            O mne
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
                            Freelance digitálny dizajnér & art director sídliaci v Bratislave
                        </p>
                    </motion.div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-20 rounded-full overflow-hidden border-8 border-gray-100 shadow-2xl"
                    >
                        <Image
                            src="/images/me-fr.png"
                            alt="Karchi"
                            fill
                            className="object-cover"
                            style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-4 md:px-8 bg-surface-off-white">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 text-lg leading-relaxed text-gray-700"
                    >
                        <p className="text-2xl font-semibold text-foreground">
                            Ahoj! 👋
                        </p>

                        <p>
                            Som samostatný digitálny dizajnér a art director so sídlom v Bratislave, 
                            kde spájam kreativitu s technickými zručnosťami na vytváranie jedinečných 
                            digitálnych zážitkov.
                        </p>

                        <p>
                            Mojou špecializáciou je{" "}
                            <span className="font-semibold text-foreground">
                                dizajn a vývoj webových stránok, digitálny branding a interaktívne používateľské rozhrania
                            </span>
                            . Verím, že dobrý dizajn nie je len o tom, ako veci vyzerajú, ale hlavne o tom, 
                            ako fungujú a aký príbeh rozprávajú.
                        </p>

                        <p>
                            Za posledný rok som pracoval na projektoch od{" "}
                            <span className="font-semibold text-foreground">
                                luxusných realitných webstránok
                            </span>{" "}
                            cez{" "}
                            <span className="font-semibold text-foreground">
                                AI SaaS platformy na vylepšenie fotiek
                            </span>{" "}
                            až po{" "}
                            <span className="font-semibold text-foreground">
                                edukačné AI nástroje pre učiteľov
                            </span>
                            . Každý projekt pre mňa predstavuje príležitosť posunúť hranice možného 
                            a vytvoriť niečo, čo má skutočný vplyv.
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 my-12">
                            <h3 className="text-xl font-bold mb-4 text-foreground">
                                Čo ma definuje
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-blue text-2xl">→</span>
                                    <span><strong>Full-stack prístup:</strong> Od návrhu v Figme až po deployment v Next.js/React</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-purple text-2xl">→</span>
                                    <span><strong>AI integrácie:</strong> RAG pipelines, Pinecone, OpenAI API</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-pink text-2xl">→</span>
                                    <span><strong>Brand identity:</strong> Tvorba lôg, názvov, kompletnej vizuálnej identity</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-accent-green text-2xl">→</span>
                                    <span><strong>Detail obsessed:</strong> Každá animácia, každý pixel má svoj zmysel</span>
                                </li>
                            </ul>
                        </div>

                        <p>
                            Momentálne som dostupný na nové projekty a spolupráce. Či už ide o kompletný 
                            redizajn značky, vývoj webovej aplikácie, alebo niečo úplne iné - rád si 
                            vypočujem váš nápad a spoločne mu dáme život.
                        </p>

                        <div className="pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-bold mb-6 text-foreground">
                                Kontaktujte ma
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="mailto:karol.jr@billik.sk"
                                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-full font-semibold hover:bg-accent-blue transition-colors"
                                >
                                    <Mail size={18} />
                                    Email
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-foreground rounded-full font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    <Linkedin size={18} />
                                    LinkedIn
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-foreground rounded-full font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    <Github size={18} />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 md:px-8 bg-foreground text-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <div>
                            <div className="text-5xl md:text-6xl font-black mb-2 text-accent-blue">1+</div>
                            <div className="text-sm uppercase tracking-wider text-white/60">Rokov Skúseností</div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-black mb-2 text-accent-purple">8+</div>
                            <div className="text-sm uppercase tracking-wider text-white/60">Projektov</div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-6xl font-black mb-2 text-accent-green">99%</div>
                            <div className="text-sm uppercase tracking-wider text-white/60">Spokojnosť</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            Pripravení na spoluprácu?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Pozrite si moje projekty alebo ma kontaktujte a začnime spolu tvoriť niečo úžasné.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/#projects"
                                className="px-8 py-4 bg-foreground text-white rounded-full text-lg font-bold hover:bg-accent-purple transition-colors"
                            >
                                Pozrieť Portfólio
                            </Link>
                            <Link
                                href="/book/karchigod/intro"
                                className="px-8 py-4 bg-gray-100 text-foreground rounded-full text-lg font-bold hover:bg-gray-200 transition-colors"
                            >
                                Začať Projekt
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
