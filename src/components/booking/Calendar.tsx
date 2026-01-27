"use client";

import { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    isToday,
    isBefore,
    startOfDay
} from "date-fns";
import { sk } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    availableDays?: number[]; // Array of day indices (0-6) that are generally available
}

export default function Calendar({ selectedDate, onSelectDate, availableDays = [1, 2, 3, 4, 5] }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfDay(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-lg font-bold text-foreground">
                    {format(currentMonth, "MMMM yyyy", { locale: sk })}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        disabled={isSameMonth(currentMonth, new Date()) || isBefore(currentMonth, new Date())}
                        className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-full hover:bg-black/5 cursor-pointer transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        return (
            <div className="grid grid-cols-7 mb-4">
                {days.map((day) => (
                    <div key={day} className="text-center text-xs font-bold text-gray-400 tracking-wider">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const cloneDay = day;

                // Determine availability state
                const isPast = isBefore(day, today);
                const dayOfWeek = day.getDay();
                const isAvailableDay = availableDays.includes(dayOfWeek);
                const isDisabled = isPast || !isAvailableDay;
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

                days.push(
                    <div
                        key={day.toString()}
                        className="aspect-square relative p-1"
                    >
                        <button
                            disabled={isDisabled}
                            onClick={() => !isDisabled && onSelectDate(cloneDay)}
                            className={cn(
                                "w-full h-full rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                                !isSameMonth(day, monthStart) ? "text-gray-300 invisible" : "text-foreground",
                                isDisabled && isSameMonth(day, monthStart) && "text-gray-300 cursor-not-allowed line-through decoration-transparent",
                                // Available Style
                                !isDisabled && !isSelected && "hover:bg-accent-blue/10 hover:text-accent-blue bg-gray-50 cursor-pointer",
                                // Selected Style
                                isSelected && "bg-black text-white shadow-lg scale-105 font-bold cursor-pointer",
                                // Today Style
                                isToday(day) && !isSelected && "ring-1 ring-black/20 font-bold relative after:content-[''] after:absolute after:bottom-2 after:w-1 after:h-1 after:bg-accent-blue after:rounded-full"
                            )}
                        >
                            {formattedDate}
                        </button>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div className="w-full">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
