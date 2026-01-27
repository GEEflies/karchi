"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { sk } from "date-fns/locale"; // Import Slovak locale
import { Clock, Globe, ArrowLeft, CheckCircle2, Loader2, AlertCircle, CalendarCheck, Mail, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getEventDetails, getAvailableSlots, type BookingEvent } from "@/lib/booking";
import { bookMeeting } from "@/app/actions/book-meeting";
import { supabase } from "@/lib/supabase";

import Calendar from "@/components/booking/Calendar";
import TimeSlots from "@/components/booking/TimeSlots";
import BookingForm from "@/components/booking/BookingForm";
import Confetti from "@/components/booking/Confetti";

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
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4">
                <Confetti isActive={true} />
                
                {/* Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
                    className="relative z-10 w-full max-w-4xl bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col md:flex-row"
                >
                    {/* LEFT PANEL: Success State */}
                    <div className="p-8 md:p-12 flex-1 flex flex-col items-start justify-center relative">
                        <motion.div
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                            className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/10"
                        >
                            <CheckCircle2 className="text-white" size={32} strokeWidth={3} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4"
                        >
                            Rezervované.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 mb-10 text-lg leading-relaxed max-w-xs"
                        >
                            Ďakujeme za rezerváciu. Potvrdenie sme poslali na váš email.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full sm:w-auto"
                        >
                            <Link
                                href="/"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-white rounded-xl font-bold hover:bg-black/90 transition-all active:scale-95 w-full sm:w-auto overflow-hidden"
                            >
                                <span className="relative z-10">Späť na portfólio</span>
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform relative z-10" />
                            </Link>

                            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Skontrolujte si spam priečinok</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT PANEL: Receipt / Ticket */}
                    <div className="bg-gray-50/80 p-8 md:p-12 flex-1 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center relative overflow-hidden backdrop-blur-sm">
                        {/* Decorative Globe */}
                        <div className="absolute top-[-20px] right-[-20px] opacity-[0.03] pointer-events-none rotate-12">
                            <Globe size={240} />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative z-10 space-y-8"
                        >
                            {/* Header */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Video size={12} />
                                    Google Meet
                                </div>
                                <h3 className="text-2xl font-bold text-foreground tracking-tight">{eventType.title}</h3>
                            </div>

                            {/* Details List */}
                            <div className="space-y-6">
                                {/* Host */}
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 p-0.5 shadow-sm overflow-hidden flex-shrink-0">
                                        <div className="w-full h-full rounded-xl bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                            {user.avatar_url ? (
                                                <Image src={user.avatar_url} alt={user.name} fill className="object-cover" />
                                            ) : (
                                                <span className="font-bold text-gray-400">{user.name.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Hostiteľ</p>
                                        <p className="font-bold text-foreground text-base">{user.name}</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-gray-200/60 dashed" />

                                {/* Date */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                                        <CalendarCheck size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Dátum</p>
                                        {selectedDateTime && (
                                            <p className="font-bold text-foreground text-base capitalize">
                                                {format(selectedDateTime, "EEEE, d. MMMM", { locale: sk })}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Access Time & Duration Container */}
                                <div className="flex gap-8">
                                    {/* Time */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <Clock size={20} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">Čas</p>
                                            {selectedDateTime && (
                                                <p className="font-bold text-foreground text-base">
                                                    {format(selectedDateTime, "H:mm")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Duration Visual */}
                                    <div className="flex flex-col justify-center">
                                         <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 pl-1">Trvanie</p>
                                        <div className="px-3 py-1.5 rounded-lg bg-gray-200/50 text-xs font-semibold text-gray-600">
                                            {eventType.duration_minutes} min
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row">
            {/* LEFT PANEL: Event Details */}
            <div className="w-full lg:w-[380px] xl:w-[420px] bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-black/5 flex flex-col">
                {/* Profile Section */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex-shrink-0">
                        {user.avatar_url ? (
                            <Image
                                src={user.avatar_url}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-black text-white flex items-center justify-center text-xl font-bold">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-500 text-sm mb-0.5">{user.name}</p>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground leading-tight">
                            {eventType.title}
                        </h1>
                    </div>
                </div>

                {/* Event Info */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <Clock size={18} className="text-gray-500" />
                        </div>
                        <span className="font-medium">{eventType.duration_minutes} minút</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <Globe size={18} className="text-gray-500" />
                        </div>
                        <span className="font-medium text-sm">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {eventType.description}
                    </p>
                </div>

                {/* Branding */}
                <div className="mt-6 pt-6 border-t border-black/5 hidden lg:block">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Powered by</p>
                    <p className="text-lg font-bold tracking-tight text-foreground">karchi.</p>
                </div>
            </div>

            {/* RIGHT PANEL: Interaction */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 bg-white min-h-[500px] lg:min-h-[600px]">
                <AnimatePresence mode="wait">
                    {step === "date" && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-md mx-auto"
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
                            className="flex flex-col max-w-md mx-auto"
                        >
                            <button
                                onClick={() => setStep("date")}
                                className="mb-6 text-sm text-gray-400 hover:text-black transition-colors flex items-center gap-1 w-fit cursor-pointer"
                            >
                                <ArrowLeft size={16} />
                                Späť na kalendár
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
                            className="max-w-md mx-auto"
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
