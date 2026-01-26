"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import TechStack from "./TechStack";
import { CheckCircle2 } from "lucide-react";

interface ProjectContentProps {
    project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
                {/* Project Overview */}
                <section className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-12"
                    >
                        Prehľad projektu
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 bg-surface-off-white rounded-2xl"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                                Problém
                            </h3>
                            <p className="text-lg leading-relaxed">{project.overview.problem}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-8 bg-accent-blue/5 rounded-2xl border-2 border-accent-blue/20"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-blue mb-3">
                                Riešenie
                            </h3>
                            <p className="text-lg leading-relaxed">{project.overview.solution}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="p-8 bg-surface-off-white rounded-2xl"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                                Moja rola
                            </h3>
                            <p className="text-lg leading-relaxed">{project.overview.role}</p>
                            {project.overview.timeline && (
                                <p className="text-sm text-gray-500 mt-4">
                                    <span className="font-bold">Časová os:</span> {project.overview.timeline}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-12"
                    >
                        Kľúčové funkcie
                    </motion.h2>

                    <div className="space-y-6">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-8 bg-surface-off-white rounded-2xl hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="text-accent-green" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Results */}
                {project.results && project.results.length > 0 && (
                    <section className="mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-black tracking-tighter mb-12"
                        >
                            Výsledky a dopad
                        </motion.h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.results.map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 rounded-2xl text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-black text-accent-purple mb-2">
                                        {result.value}
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-gray-600">
                                        {result.metric}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Technology Stack */}
                <section>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-12"
                    >
                        Použité technológie
                    </motion.h2>

                    <TechStack technologies={project.technologies} />
                </section>
            </div>
        </div>
    );
}
