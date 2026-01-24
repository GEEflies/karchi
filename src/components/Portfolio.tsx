"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Using the actual uploaded images
const projects = [
    {
        id: 1,
        title: "Neon Koncept",
        category: "Art Direction",
        image: "/images/uploaded_image_0_1769179128271.png",
        className: "md:col-span-2 md:row-span-1" // Reduced height
    },
    {
        id: 2,
        title: "Vibrant Mobile",
        category: "App Dizajn",
        image: "/images/uploaded_image_1_1769179128271.png",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        id: 3,
        title: "Dark Mode UI",
        category: "Vývoj Webu",
        image: "/images/uploaded_image_2_1769179128271.png",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        id: 4,
        title: "Abstraktné 3D",
        category: "Animácia",
        image: "/images/uploaded_image_3_1769179128271.png",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        id: 5,
        title: "Clean Rozloženie",
        category: "UX Výskum",
        image: "/images/uploaded_image_4_1769179128271.png",
        className: "md:col-span-1 md:row-span-1"
    },
];

export default function Portfolio() {
    return (
        <section
            id="projects"
            className="py-32 px-4 md:px-8 bg-white text-foreground"
            style={{
                isolation: 'isolate',
                transform: 'translateZ(0)',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
                    >
                        Vybrané
                        <span className="block text-accent-green">Diela</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl max-w-md font-medium text-gray-500"
                    >
                        Ukážka našich najnovších digitálnych experimentov a komerčných úspechov.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`group relative overflow-hidden rounded-3xl bg-gray-100 ${project.className}`}
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                        {project.category}
                                    </span>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-3xl font-bold">{project.title}</h3>
                                        <div className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-12 py-5 bg-foreground text-white rounded-full text-lg font-bold hover:bg-accent-blue transition-colors uppercase tracking-widest">
                        Všetky Projekty
                    </button>
                </div>
            </div>
        </section>
    );
}
