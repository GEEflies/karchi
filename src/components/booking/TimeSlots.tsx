"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

interface TimeSlotsProps {
    selectedDate: Date;
    onSelectTime: (time: string, fullDateTime: Date) => void;
    availableSlots?: string[]; // e.g., ["09:00", "09:30", ...]
    isLoading?: boolean;
}

export default function TimeSlots({
    selectedDate,
    onSelectTime,
    availableSlots = [],
    isLoading = false
}: TimeSlotsProps) {

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 gap-3">
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                <p className="text-sm">Hľadám voľné termíny...</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex-shrink-0">
                {format(selectedDate, "EEEE, d. MMMM", { locale: sk })}
            </h3>

            <div className="flex-1 min-h-0">
                {availableSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">Žiadne voľné termíny pre tento dátum.</p>
                ) : (
                    <div 
                        className="overflow-y-auto pr-2 scrollbar-thin max-h-[350px] sm:max-h-[400px] lg:max-h-[480px]"
                        data-lenis-prevent
                    >
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {availableSlots.map((time, index) => (
                                <motion.button
                                    key={time}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => {
                                        const [hours, minutes] = time.split(':').map(Number);
                                        const dateTime = new Date(selectedDate);
                                        dateTime.setHours(hours, minutes);
                                        onSelectTime(time, dateTime);
                                    }}
                                    className="w-full flex items-center justify-center py-3 border border-black/10 rounded-xl hover:border-black hover:bg-gray-50 text-foreground font-semibold transition-all cursor-pointer active:scale-95"
                                >
                                    {time}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}
