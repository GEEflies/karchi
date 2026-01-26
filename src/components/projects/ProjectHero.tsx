"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectHeroProps {
    project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
    return (
        <section className="relative min-h-[80vh] bg-foreground text-white overflow-hidden">
            {/* Background Hero Image */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12"
                    >
                        <ArrowLeft size={20} />
                        <span>Späť na projekty</span>
                    </Link>
                </motion.div>

                {/* Project Info */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                            {project.type === "client" ? "Práca pre klienta" : "Osobný projekt"} • {project.category}
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl font-medium"
                    >
                        {project.tagline}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-bold hover:bg-accent-blue hover:text-white transition-colors"
                            >
                                <span>Navštíviť stránku</span>
                                <ExternalLink size={18} />
                            </a>
                        )}
                        {project.appStoreUrl && (
                            <a
                                href={project.appStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/20 transition-colors"
                            >
                                <span>Zobraziť v App Store</span>
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
