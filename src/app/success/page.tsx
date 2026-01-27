"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <main className="min-h-screen bg-gradient-to-br from-accent-purple via-accent-blue to-accent-pink flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-[3rem] p-12 md:p-16 text-center shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-block mb-8"
                >
                    <CheckCircle className="w-24 h-24 text-accent-green" strokeWidth={2} />
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                    Platba Úspešná!
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Ďakujeme za vašu platbu. Obdržali ste <span className="font-bold text-accent-purple">10% zľavu</span> za platbu vopred.
                    Čoskoro vás kontaktujem, aby sme začali pracovať na vašom projekte.
                </p>

                {sessionId && (
                    <p className="text-sm text-gray-400 mb-8 font-mono bg-gray-50 p-4 rounded-2xl">
                        ID Transakcie: {sessionId}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-foreground text-white rounded-full font-bold hover:bg-accent-purple transition-colors"
                    >
                        Späť na domovskú stránku
                    </Link>
                    <a
                        href="mailto:karol.jr@billik.sk"
                        className="px-8 py-4 bg-gray-100 text-foreground rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        Kontaktujte ma
                    </a>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Potvrdenie platby bolo odoslané na váš email.
                        <br />
                        Ak máte akékoľvek otázky, neváhajte ma kontaktovať na{" "}
                        <a href="mailto:karol.jr@billik.sk" className="text-accent-blue hover:underline">
                            karol.jr@billik.sk
                        </a>
                    </p>
                </div>
            </motion.div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-accent-purple via-accent-blue to-accent-pink flex items-center justify-center">
                <div className="text-white text-2xl">Načítava sa...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
