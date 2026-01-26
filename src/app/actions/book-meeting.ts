"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a Supabase client with the Service Role Key for admin privileges (bypassing RLS if needed, or just for secure context)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface BookingState {
    success?: boolean;
    error?: string;
}

export async function bookMeeting(formData: {
    eventTypeId: string;
    guestName: string;
    guestEmail: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    notes?: string;
    timezone: string;
    hostName: string; // Passed for email context
    hostEmail?: string; // We can lookup, or just hardcode for MVP if not in DB yet
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

        // 2. Prepare Email Content
        const dateFormatted = format(new Date(formData.startTime), "EEEE, MMMM d, yyyy 'at' h:mm a");

        // 3. Send Email to Guest
        await resend.emails.send({
            from: "Karchi Bookings <onboarding@resend.dev>", // Default Resend testing domain
            to: formData.guestEmail,
            subject: `Confirmed: ${formData.eventTitle} with ${formData.hostName}`,
            html: `
                <h1>Meeting Confirmed!</h1>
                <p>Hi ${formData.guestName},</p>
                <p>Your <strong>${formData.eventTitle}</strong> with <strong>${formData.hostName}</strong> has been scheduled.</p>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 16px;"><strong>📅 When:</strong> ${dateFormatted}</p>
                    <p style="margin: 10px 0 0 0; font-size: 16px;"><strong>🌍 Timezone:</strong> ${formData.timezone}</p>
                </div>

                ${formData.notes ? `<p><strong>Your Notes:</strong><br>${formData.notes}</p>` : ""}

                <p>A calendar invitation should be arriving separately (if configured).</p>
                <p>Look forward to speaking with you!</p>
            `,
        });

        // 4. Send Email to Host (You)
        // Hardcoded email for MVP or fetch from DB user profile
        // For security, we'll verify the email sending
        const hostEmail = "karchigod@gmail.com"; // TODO: Retrieve from DB user record

        await resend.emails.send({
            from: "Karchi Bookings <onboarding@resend.dev>",
            to: hostEmail,
            subject: `New Booking: ${formData.guestName} - ${formData.eventTitle}`,
            html: `
                 <h1>New Booking Received</h1>
                 <p><strong>${formData.guestName}</strong> has scheduled a ${formData.eventTitle}.</p>
                 
                 <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                     <p><strong>📅 Time:</strong> ${dateFormatted}</p>
                     <p><strong>📧 Email:</strong> ${formData.guestEmail}</p>
                     <p><strong>📝 Notes:</strong> ${formData.notes || "None"}</p>
                 </div>
             `,
        });

        return { success: true };

    } catch (error) {
        console.error("Server Action Error:", error);
        return { error: "An unexpected error occurred." };
    }
}
