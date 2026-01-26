"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { sk } from "date-fns/locale"; // Import Slovak locale
import { Clock, Globe, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getEventDetails, getAvailableSlots, type BookingEvent } from "@/lib/booking";
import { bookMeeting } from "@/app/actions/book-meeting";
import { supabase } from "@/lib/supabase";

import Calendar from "@/components/booking/Calendar";
import TimeSlots from "@/components/booking/TimeSlots";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
    const params = useParams();
    // Safely handle params which can be string or string[]
    const username = Array.isArray(params.username) ? params.username[0] : params.username;
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [step, setStep] = useState<"date" | "time" | "form" | "success">("date");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Data State
    const [event, setEvent] = useState<BookingEvent | null>(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch Event Details on Mount
    useEffect(() => {
        async function loadEvent() {
            if (!username || !slug) return;

            try {
                const data = await getEventDetails(username, slug);
                if (data) {
                    setEvent(data);
                } else {
                    setError("Udalosť sa nenašla");
                }
            } catch (err) {
                console.error(err);
                setError("Nepodarilo sa načítať detaily udalosti");
            } finally {
                setIsLoadingEvent(false);
            }
        }
        loadEvent();
    }, [username, slug]);

    // 2. Fetch Slots when Date Selected
    useEffect(() => {
        async function fetchSlots() {
            if (!event || !selectedDate) return;

            setIsLoadingSlots(true);
            try {
                const slots = await getAvailableSlots(
                    event.user.id,
                    selectedDate,
                    event.eventType.duration_minutes
                );
                setAvailableSlots(slots);
            } catch (err) {
                console.error("Error fetching slots:", err);
            } finally {
                setIsLoadingSlots(false);
            }
        }

        fetchSlots();
    }, [selectedDate, event]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setStep("time");
        // Slots will allow fetch automatically via useEffect
    };

    const handleTimeSelect = (time: string, fullDateTime: Date) => {
        setSelectedTime(time);
        setSelectedDateTime(fullDateTime);
        setStep("form");
    };

    const handleBookingSubmit = async (data: { name: string; email: string; notes: string }) => {
        if (!event || !selectedDateTime) return;
        setIsSubmitting(true);

        try {
            // Calculate end time based on duration
            const endTime = new Date(selectedDateTime.getTime() + event.eventType.duration_minutes * 60000);

            // Use Server Action
            const result = await bookMeeting({
                eventTypeId: event.eventType.id,
                guestName: data.name,
                guestEmail: data.email,
                startTime: selectedDateTime.toISOString(),
                endTime: endTime.toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                notes: data.notes,
                hostName: event.user.name,
                eventTitle: event.eventType.title,
                hostEmail: event.user.email
            });

            if (result.error) {
                throw new Error(result.error);
            }

            // Artificial delay for UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep("success");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Nepodarilo sa rezervovať termín. Skúste to prosím znova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingEvent) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h1 className="text-2xl font-bold mb-2">Ojoj!</h1>
                <p className="text-gray-600">{error || "Udalosť sa nenašla"}</p>
            </div>
        );
    }

    const { user, eventType } = event;

    if (step === "success") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black mb-4">Máte rezervované!</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    Na vašu e-mailovú adresu bola odoslaná pozvánka do kalendára.
                </p>
                <div className="bg-surface-off-white p-6 rounded-2xl w-full max-w-md border border-black/5 text-left mb-8">
                    <h3 className="font-bold text-lg mb-4">{eventType.title}</h3>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs relative overflow-hidden">
                                {user.avatar_url ? (
                                    <Image src={user.avatar_url} alt={user.name} fill className="object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <span>{user.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={18} />
                            <span>{eventType.duration_minutes} min</span>
                        </div>
                        {selectedDateTime && (
                            <div className="flex items-center gap-3 font-medium text-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                                {format(selectedDateTime, "EEEE, d. MMMM yyyy 'o' H:mm", { locale: sk })}
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => window.location.href = "/"}
                    className="px-8 py-3 bg-black text-white rounded-full font-bold hover:opacity-80 transition-opacity"
                >
                    Späť na portfólio
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* LEFT PANEL: Event Details */}
            <div className="w-full md:w-1/3 bg-surface-off-white p-8 border-b md:border-b-0 md:border-r border-black/5 flex flex-col md:min-h-screen">
                <div className="mb-8">
                    {step !== "date" && (
                        <button
                            onClick={() => setStep("date")}
                            className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors mb-4 inline-flex"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-gray-200">
                        {user.avatar_url && (
                            <Image
                                src={user.avatar_url}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                    <p className="font-medium text-gray-500 mb-1">{user.name}</p>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
                        {eventType.title}
                    </h1>

                    <div className="space-y-4 text-gray-600 font-medium">
                        <div className="flex items-center gap-3">
                            <Clock size={20} className="text-gray-400" />
                            <span>{eventType.duration_minutes} min</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {eventType.description}
                    </p>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                        <Globe size={14} />
                        <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Interaction */}
            <div className="w-full md:w-2/3 p-4 md:p-8 relative overflow-x-hidden">
                <AnimatePresence mode="wait">
                    {step === "date" && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-md mx-auto py-8"
                        >
                            <h2 className="text-xl font-bold mb-6">Vyberte dátum</h2>
                            <Calendar
                                selectedDate={selectedDate}
                                onSelectDate={handleDateSelect}
                            />
                        </motion.div>
                    )}

                    {step === "time" && selectedDate && (
                        <motion.div
                            key="time"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col max-w-md mx-auto py-8"
                        >
                            <button
                                onClick={() => setStep("date")}
                                className="md:hidden mb-4 text-sm text-gray-400 flex items-center gap-1"
                            >
                                ← Späť na kalendár
                            </button>
                            <div className="flex-1">
                                <TimeSlots
                                    selectedDate={selectedDate}
                                    onSelectTime={handleTimeSelect}
                                    availableSlots={availableSlots}
                                    isLoading={isLoadingSlots}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === "form" && selectedDateTime && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-md mx-auto py-8"
                        >
                            <BookingForm
                                selectedDateTime={selectedDateTime}
                                onBack={() => setStep("time")}
                                onSubmit={handleBookingSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
