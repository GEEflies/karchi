"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Map service titles to Stripe Price IDs
const SERVICE_PRICE_IDS = {
  "Landing Page": process.env.STRIPE_PRICE_LANDING_PAGE!,
  "Firemný Web": process.env.STRIPE_PRICE_FIREMNY_WEB!,
  "E-Shop": process.env.STRIPE_PRICE_ESHOP!,
};

export async function createCheckoutSession(serviceTitle: string) {
  const priceId = SERVICE_PRICE_IDS[serviceTitle as keyof typeof SERVICE_PRICE_IDS];

  if (!priceId) {
    throw new Error("Invalid service");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#services`,
  });

  if (session.url) {
    redirect(session.url);
  }
}
