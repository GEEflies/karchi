"use client";

import { useState } from "react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BookingFormProps {
    selectedDateTime: Date;
    onBack: () => void;
    onSubmit: (data: { name: string; email: string; notes: string }) => Promise<void>;
    isSubmitting?: boolean;
}

export default function BookingForm({ selectedDateTime, onBack, onSubmit, isSubmitting = false }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        notes: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="text-sm text-gray-400 hover:text-black mb-4 transition-colors flex items-center gap-1 cursor-pointer"
                >
                    ← Späť
                </button>
                <h3 className="text-2xl font-bold mb-2">
                    Potvrďte detaily
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-accent-green" />
                    <p className="text-gray-600 text-sm font-medium">
                        {format(selectedDateTime, "EEEE, d. MMMM yyyy 'o' H:mm", { locale: sk })}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-5">
                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Meno *</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Ján Novák"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Email *</label>
                    <input
                        type="email"
                        required
                        className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors bg-gray-50 focus:bg-white"
                        placeholder="jan@priklad.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Poznámky</label>
                    <textarea
                        className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors bg-gray-50 focus:bg-white min-h-[100px] resize-none"
                        placeholder="Prosím napíšte čokoľvek, čo pomôže pri príprave na stretnutie..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-foreground text-background rounded-full font-bold text-lg hover:bg-black/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Rezervujem...
                            </>
                        ) : (
                            "Rezervovať termín"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
