# Karchi - Creative Developer Portfolio

## 👨‍💻 About Me

I am a creative developer bridging the gap between **Design** and **Artificial Intelligence**. My mission is simple: to create digital experiences that are not just functional, but unforgettable. I believe in the power of dynamics, vibrant colors, and interactivity to tell compelling stories.

Since starting my journey in 2025, I have been bringing fresh, lively perspectives to every project—whether for startups looking for their first identity or established brands needing a revival.

### 🌟 At a Glance
- **Experience:** 1+ Years
- **Projects Delivered:** 8+
- **Client Satisfaction:** 99%
- **Focus:** Narrative-driven web design, high-performance interactions, and AI integration.

---

## 🚀 Services

I offer specialized web development services tailored to modern business needs, ranging from high-impact landing pages to full-scale e-commerce solutions.

### 1. Landing Page
**Starting at €200**
Perfect for product launches or personal portfolios. A high-impact, single-page website designed to convert.
* **Responsive Design**
* **SEO Optimization**
* **Fast Loading Speeds**

### 2. Corporate Website (Firemný Web)
**Starting at €400**
A complete solution for companies focused on growth and brand presence.
* **CMS Integration**
* **5+ Subpages**
* **Blog Functionality**

### 3. E-Shop
**Starting at €600**
A professional online store built for sales and reliability.
* **Payment Gateway Integration (Stripe)**
* **Inventory Management**
* **Customer Accounts**

---

## 🤝 Project Workflow

My process is transparent and collaborative, ensuring we build exactly what you need.

### 1. Discovery & Booking
Everything starts with a conversation. You can **book a free consultation** directly through this platform.
- **Select a Date:** Choose a time that works for you via the integrated calendar.
- **Confirm Details:** Fill in your project needs.
- **Automatic Scheduling:** You'll receive a Google Calendar invite and confirmation email immediately.

### 2. Strategy & Design
We define the scope, target audience, and visual identity. I create high-fidelity designs that align with your brand.

### 3. Development
Using the tech stack mentioned below, I build your solution with a focus on speed, SEO, and scalability.

### 4. Launch & Support
After rigorous testing, we launch. I provide support to ensure smooth operation and can help with future updates.

---

## 🛠 Tech Stack & Tools

This portfolio is built with the cutting-edge modern web stack, prioritizing performance, type safety, and smooth animations.

### Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

### Animation & 3D
- **Framer Motion:** Complex layout animations and gestures.
- **GSAP:** Advanced sequencing and timeline control.
- **Three.js / React Three Fiber / Drei:** Immersive 3D elements.
- **Lenis:** Smooth scrolling experiences.

### Backend & Services
- **Database / Auth:** [Supabase](https://supabase.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Emails:** [Resend](https://resend.com/)
- **Utils:** `date-fns`, `clsx`, `tailwind-merge`

---

## 📂 Featured Projects

### 🏡 [Slovak Luxury Living](https://slovak-luxury-living.vercel.app/)
**Category:** Real Estate Platform
**Type:** Client Project

A premium real estate platform featuring advanced integrations and AI capabilities.
- **Problem:** A luxury real estate agency needed a professional online presence with simplified property management and automatic distribution to major portals.
- **Solution:** A modern, responsive web application with a custom CMS, one-click export to *Nehnutelnosti.sk* API, and AI-powered photo enhancement.
- **Key Features:**
    - **MLS Integration:** Automatic export to external real estate portals.
    - **AI Photo Enhancement:** Auto-correction of lighting and resolution upscaling.
    - **Advanced Filtering:** Real-time search by price, location, and parameters.
    - **Custom CMS:** Full admin panel for managing listings.

---

## 🏗 Project Structure

This repository is organized using the Next.js App Router structure:

```
src/
├── app/                 # App Router pages and layouts
│   ├── actions/         # Server Actions (Stripe, Booking)
│   ├── api/             # API Routes (Webhooks)
│   ├── book/            # Booking system pages
│   ├── projects/        # Dynamic project case studies
│   └── ...
├── components/          # React components
│   ├── booking/         # Booking-specific UI components
│   ├── projects/        # Project showcase components
│   ├── ui/              # Reusable UI elements
│   └── ...
├── data/                # Static data (projects.ts)
└── lib/                 # Utility functions and configurations
    ├── supabase.ts      # Supabase client
    ├── stripe.ts        # Stripe helper functions
    └── utils.ts         # CN and other helpers
```

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/karchi.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Environment Variables:**
   Create a `.env.local` file with the necessary keys (Supabase, Stripe, Resend).

---

*Generated for Karchi Portfolio © 2026*
