import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google"; // Added import
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorProvider from "@/components/ui/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: "italic", // As requested
});

export const metadata: Metadata = {
  title: "Professional Web Developer Portfolio",
  description: "Modern web development services in Slovakia.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        {/* Preload hero images for faster loading */}
        <link rel="preload" href="/images/hero-final-fr.png" as="image" />
        <link rel="preload" href="/images/me-fr.png" as="image" />
      </head>
      <head>
        {/* Preload hero images for faster loading */}
        <link rel="preload" href="/images/hero-final-fr.png" as="image" />
        <link rel="preload" href="/images/me-fr.png" as="image" />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`} suppressHydrationWarning>
        <CursorProvider>
          <SmoothScroll>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </CursorProvider>
      </body>

    </html>
  );
}
