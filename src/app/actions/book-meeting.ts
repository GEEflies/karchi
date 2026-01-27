"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a Supabase client with the Service Role Key for admin privileges
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface BookingState {
    success?: boolean;
    error?: string;
}

// Helper to create Google Calendar Event
async function createGoogleCalendarEvent(
    booking: {
        guestName: string;
        guestEmail: string;
        startTime: string;
        endTime: string;
        title: string;
        description?: string;
    }
) {
    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground" // Redirect URI we used
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const event = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1, // Required for Meet link
            requestBody: {
                summary: booking.title,
                description: booking.description,
                start: { dateTime: booking.startTime },
                end: { dateTime: booking.endTime },
                attendees: [{ email: booking.guestEmail }],
                conferenceData: {
                    createRequest: {
                        requestId: Math.random().toString(36).substring(7),
                        conferenceSolutionKey: { type: "hangoutsMeet" },
                    },
                },
            },
        });

        return {
            link: event.data.hangoutLink,
            eventId: event.data.id
        };

    } catch (error) {
        console.error("Google Calendar API Error:", error);
        return { link: null, eventId: null }; // Fail gracefully
    }
}

export async function bookMeeting(formData: {
    eventTypeId: string;
    guestName: string;
    guestEmail: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    notes?: string;
    timezone: string;
    hostName: string;
    hostEmail?: string;
    eventTitle: string;
}): Promise<BookingState> {
    try {
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("ToDo")) {
            console.error("Missing Resend API Key");
            return { error: "Server configuration error: Missing Email API Key" };
        }

        // 1. Insert Booking into Supabase
        const { data: booking, error: insertError } = await supabaseAdmin
            .from("bookings")
            .insert({
                event_type_id: formData.eventTypeId,
                guest_name: formData.guestName,
                guest_email: formData.guestEmail,
                start_time: formData.startTime,
                end_time: formData.endTime,
                timezone: formData.timezone,
                notes: formData.notes,
                status: "confirmed",
            })
            .select()
            .single();

        if (insertError) {
            console.error("Booking Insert Error:", insertError);
            return { error: "Failed to schedule the meeting. Please try again." };
        }

        // 2. Create Google Calendar Event (with Meet Link)
        const calendarResult = await createGoogleCalendarEvent({
            guestName: formData.guestName,
            guestEmail: formData.guestEmail,
            startTime: formData.startTime,
            endTime: formData.endTime,
            title: `${formData.eventTitle} s Karchim: ${formData.guestName}`,
            description: `Rezervované cez portfólio.\n\nPoznámky: ${formData.notes || "Žiadne"}`
        });

        // 3. Prepare Email Content
        const dateFormatted = format(new Date(formData.startTime), "EEEE, d. MMMM yyyy 'o' H:mm", { locale: sk });
        const meetLink = calendarResult.link;

        // 4. Send Email to Guest
        await resend.emails.send({
            from: "Karchi Bookings <onboarding@resend.dev>",
            to: formData.guestEmail,
            subject: `Potvrdené: ${formData.eventTitle} s Karchim`,
            html: `
                <h1>Potvrdené!</h1>
                <p>Ahoj ${formData.guestName},</p>
                <p>Tvoja <strong>${formData.eventTitle}</strong> s <strong>${formData.hostName}</strong> je úspešne naplánovaná.</p>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; color: #000;">
                    <p style="margin: 0; font-size: 16px;"><strong>📅 Kedy:</strong> ${dateFormatted}</p>
                    <p style="margin: 10px 0 0 0; font-size: 16px;"><strong>🌍 Časové pásmo:</strong> ${formData.timezone}</p>
                    ${meetLink ? `
                        <p style="margin: 20px 0 0 0;">
                            <a href="${meetLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                Pripojiť sa cez Google Meet
                            </a>
                        </p>
                    ` : ""}
                </div>

                ${formData.notes ? `<p><strong>Tvoje poznámky:</strong><br>${formData.notes}</p>` : ""}

                <p style="color: #666; font-size: 14px;">Pozvánka do kalendára ti bola odoslaná automaticky.</p>
                <p>Teším sa na naše stretnutie!</p>
            `,
        });

        // 5. Send Email to Host
        const hostEmail = "karchigod@gmail.com";

        await resend.emails.send({
            from: "Karchi Bookings <onboarding@resend.dev>",
            to: hostEmail,
            subject: `Nová Rezervácia: ${formData.guestName} - ${formData.eventTitle}`,
            html: `
                 <h1>Nová rezervácia prijatá</h1>
                 <p><strong>${formData.guestName}</strong> si naplánoval/a ${formData.eventTitle}.</p>
                 
                 <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; color: #000;">
                     <p><strong>📅 Kedy:</strong> ${dateFormatted}</p>
                     <p><strong>📧 Email:</strong> ${formData.guestEmail}</p>
                     <p><strong>📝 Poznámky:</strong> ${formData.notes || "Žiadne"}</p>
                     ${meetLink ? `<p><strong>🔗 Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>` : ""}
                 </div>
             `,
        });

        return { success: true };

    } catch (error) {
        console.error("Server Action Error:", error);
        return { error: "An unexpected error occurred." };
    }
}
