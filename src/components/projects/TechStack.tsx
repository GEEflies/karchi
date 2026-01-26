"use client";

import { motion } from "framer-motion";

interface TechStackProps {
    technologies: string[];
}

export default function TechStack({ technologies }: TechStackProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-6 py-3 bg-foreground text-white rounded-full font-bold text-sm hover:bg-accent-blue transition-colors cursor-default"
                >
                    {tech}
                </motion.div>
            ))}
        </div>
    );
}
