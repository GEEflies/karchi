import { supabase } from './supabase';
import { addMinutes, format, parse, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

export interface BookingEvent {
    user: {
        id: string;
        name: string;
        avatar_url: string;
        email: string;
        username: string;
    };
    eventType: {
        id: string;
        title: string;
        duration_minutes: number;
        description: string;
        slug: string;
    };
}

export async function getEventDetails(username: string, slug: string): Promise<BookingEvent | null> {
    // 1. Get User
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name, avatar_url, email, username')
        .eq('username', username)
        .single();

    if (userError || !user) {
        console.error("User fetch error:", userError);
        return null;
    }

    // 2. Get Event Type
    const { data: eventType, error: eventError } = await supabase
        .from('event_types')
        .select('*')
        .eq('user_id', user.id)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (eventError || !eventType) {
        console.error("Event fetch error:", eventError);
        return null;
    }

    return { user, eventType };
}

export async function getAvailableSlots(
    userId: string,
    date: Date,
    durationMinutes: number
): Promise<string[]> {
    const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)

    // 1. Fetch Availability Logic (Templates)
    const { data: availability, error: availError } = await supabase
        .from('availability')
        .select('start_time, end_time')
        .eq('user_id', userId)
        .eq('day_of_week', dayOfWeek);

    if (availError || !availability || availability.length === 0) {
        return [];
    }

    // 2. Fetch Existing Bookings for this specific date
    // We filter roughly by the day to minimize data over wire
    const startOfDayStr = startOfDay(date).toISOString();
    const endOfDayStr = endOfDay(date).toISOString();

    const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('start_time, end_time, event_types!inner(user_id)')
        .eq('event_types.user_id', userId)
        .neq('status', 'cancelled')
        // We want bookings that overlap with this day. 
        // Simple check: start_time < end of day AND end_time > start of day.
        // Supabase filtering is a bit limited for ORs across columns in easy syntax,
        // so we'll grab everything starting or ending near this day.
        // Actually, just grabbing everything where start_time is "today" is usually enough for a daily view,
        // but cross-midnight overlap needs care. For MVP, we'll assume bookings don't span days often.
        .gte('start_time', startOfDayStr)
        .lte('start_time', endOfDayStr);

    if (bookingError) {
        console.error("Booking fetch error:", bookingError);
        // Fail graceful? Return empty?
        return [];
    }

    // 3. Calculate Slots
    const slots: string[] = [];
    const dateStr = format(date, 'yyyy-MM-dd');
    const now = new Date(); // To prevent booking in the past if selectedDate is today

    for (const rule of availability) {
        // Parse the rule times relative to the selected date
        // Note: availability times are HH:mm:ss
        const ruleStart = parse(`${dateStr}T${rule.start_time}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());
        const ruleEnd = parse(`${dateStr}T${rule.end_time}`, "yyyy-MM-dd'T'HH:mm:ss", new Date());

        // Step size: 30 mins by default, or duration if simpler
        const stepMinutes = 30;

        let currentSlot = ruleStart;

        // Iterate through the time window
        while (addMinutes(currentSlot, durationMinutes) <= ruleEnd) {
            const slotEnd = addMinutes(currentSlot, durationMinutes);

            // Filter past times if today
            if (isBefore(currentSlot, now)) {
                currentSlot = addMinutes(currentSlot, stepMinutes);
                continue;
            }

            // Check Collision
            const isOverlapping = bookings?.some(booking => {
                const bStart = new Date(booking.start_time);
                const bEnd = new Date(booking.end_time);
                // Standard overlap check: (StartA < EndB) and (EndA > StartB)
                return isBefore(currentSlot, bEnd) && isAfter(slotEnd, bStart);
            });

            if (!isOverlapping) {
                slots.push(format(currentSlot, 'HH:mm'));
            }

            currentSlot = addMinutes(currentSlot, stepMinutes);
        }
    }

    return slots.sort();
}
