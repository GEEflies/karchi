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
            from: "Karchi <onboarding@resend.dev>",
            to: formData.guestEmail,
            subject: `Potvrdené: ${formData.eventTitle} s Karchim`,
            html: `
                <!DOCTYPE html>
                <html lang="sk">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Potvrdenie rezervácie</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
                        <tr>
                            <td style="padding: 40px 20px;">
                                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                                    
                                    <!-- Header with gradient -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 40px 30px; text-align: center;">
                                            <div style="background-color: rgba(255, 255, 255, 0.1); display: inline-block; padding: 12px 24px; border-radius: 50px; margin-bottom: 20px;">
                                                <span style="color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Karchi</span>
                                            </div>
                                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">Potvrdené!</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                                                Ahoj <strong>${formData.guestName}</strong>,
                                            </p>
                                            <p style="margin: 0 0 32px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                                Tvoj úvodný hovor s <strong>${formData.hostName}m</strong> je úspešne naplánovaný.
                                            </p>
                                            
                                            <!-- Details Card -->
                                            <div style="background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 12px; padding: 28px; margin-bottom: 32px; border: 1px solid #e5e5e5;">
                                                <div style="margin-bottom: 20px;">
                                                    <div style="color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">📅 Kedy</div>
                                                    <div style="color: #1a1a1a; font-size: 18px; font-weight: 700;">${dateFormatted}</div>
                                                </div>
                                                <div style="margin-bottom: ${meetLink ? '24px' : '0'};">
                                                    <div style="color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🌍 Časové pásmo</div>
                                                    <div style="color: #1a1a1a; font-size: 16px; font-weight: 600;">${formData.timezone}</div>
                                                </div>
                                                ${meetLink ? `
                                                    <div style="padding-top: 24px; border-top: 1px solid #e0e0e0;">
                                                        <a href="${meetLink}" style="display: block; background-color: #000000; color: #ffffff; text-align: center; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; transition: background-color 0.2s;">
                                                            Pripojiť sa cez Google Meet →
                                                        </a>
                                                    </div>
                                                ` : ''}
                                            </div>
                                            
                                            ${formData.notes ? `
                                                <div style="background-color: #fafafa; border-left: 3px solid #000; padding: 16px 20px; margin-bottom: 32px; border-radius: 4px;">
                                                    <div style="color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Tvoje poznámky</div>
                                                    <div style="color: #1a1a1a; font-size: 15px; line-height: 1.6;">${formData.notes}</div>
                                                </div>
                                            ` : ''}
                                            
                                            <p style="margin: 0 0 8px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                                                Teším sa na naše stretnutie!
                                            </p>
                                            <p style="margin: 0; color: #888; font-size: 14px; line-height: 1.6;">
                                                Pozvánka do kalendára ti bola odoslaná automaticky.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #fafafa; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                                            <p style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600;">Karchi</p>
                                            <p style="margin: 0; color: #888; font-size: 13px;">Digitálny Dizajn & Art Direction</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });

        // 5. Send Email to Host (billikkarol3@gmail.com)
        const hostEmail = "billikkarol3@gmail.com";

        await resend.emails.send({
            from: "Karchi Bookings <onboarding@resend.dev>",
            to: hostEmail,
            subject: `🎉 Nová Rezervácia: ${formData.guestName} - ${formData.eventTitle}`,
            html: `
                <!DOCTYPE html>
                <html lang="sk">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 40px 20px;">
                                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">🎉 Nová Rezervácia!</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            <p style="margin: 0 0 24px; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                                                Zákazník <strong style="color: #6366f1;">${formData.guestName}</strong> si práve rezervoval stretnutie.
                                            </p>
                                            
                                            <!-- Meeting Details Card -->
                                            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f3f4f6 100%); border-radius: 12px; padding: 28px; margin-bottom: 32px; border-left: 4px solid #6366f1;">
                                                <div style="margin-bottom: 20px;">
                                                    <div style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">📅 Typ stretnutia</div>
                                                    <div style="color: #1a1a1a; font-size: 18px; font-weight: 700;">${formData.eventTitle}</div>
                                                </div>
                                                
                                                <div style="margin-bottom: 20px;">
                                                    <div style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">🕐 Čas</div>
                                                    <div style="color: #1a1a1a; font-size: 16px; font-weight: 600;">${dateFormatted}</div>
                                                    <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">${formData.timezone}</div>
                                                </div>
                                                
                                                <div style="margin-bottom: 20px;">
                                                    <div style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">👤 Kontakt</div>
                                                    <div style="color: #1a1a1a; font-size: 16px; font-weight: 600;">${formData.guestName}</div>
                                                    <div style="color: #6366f1; font-size: 14px; margin-top: 4px;">
                                                        <a href="mailto:${formData.guestEmail}" style="color: #6366f1; text-decoration: none;">${formData.guestEmail}</a>
                                                    </div>
                                                </div>
                                                
                                                ${formData.notes ? `
                                                    <div style="margin-bottom: 20px;">
                                                        <div style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">📝 Poznámky zákazníka</div>
                                                        <div style="color: #1a1a1a; font-size: 15px; line-height: 1.6; background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">${formData.notes}</div>
                                                    </div>
                                                ` : ''}
                                                
                                                ${meetLink ? `
                                                    <div style="padding-top: 24px; border-top: 2px solid #e5e7eb; margin-top: 24px;">
                                                        <div style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 12px;">🔗 Google Meet Link</div>
                                                        <a href="${meetLink}" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                                                            Pripojiť sa na Meet →
                                                        </a>
                                                        <div style="margin-top: 12px;">
                                                            <a href="${meetLink}" style="color: #6366f1; font-size: 13px; text-decoration: none; word-break: break-all;">${meetLink}</a>
                                                        </div>
                                                    </div>
                                                ` : ''}
                                            </div>
                                            
                                            <div style="background-color: #fef3c7; border-left: 3px solid #f59e0b; padding: 16px; border-radius: 8px; margin-top: 24px;">
                                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                                    <strong>💡 Tip:</strong> Udalosť bola automaticky pridaná do tvojho Google Kalendára s Meet linkom.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                                            <p style="margin: 0; color: #6b7280; font-size: 13px;">
                                                Automatická notifikácia z Karchi Booking System
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });

        return { success: true };

    } catch (error) {
        console.error("Server Action Error:", error);
        return { error: "An unexpected error occurred." };
    }
}
