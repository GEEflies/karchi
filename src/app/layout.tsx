import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google"; // Added import
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
        <SmoothScroll>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>

    </html>
  );
}
