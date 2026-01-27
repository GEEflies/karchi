import Link from "next/link";

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Hide the global header/footer for booking pages */}
            <style>{`
                header, footer, #smooth-scroll > header, #smooth-scroll > footer {
                    display: none !important;
                }
            `}</style>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
                {/* Simple Booking Header */}
                <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5 sticky top-0 z-50">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground hover:opacity-70 transition-opacity">
                        karchi.
                    </Link>
                    <Link 
                        href="/"
                        className="text-sm font-medium text-gray-500 hover:text-foreground transition-colors cursor-pointer"
                    >
                        ← Späť na portfólio
                    </Link>
                </div>
                
                {/* Main Content - Wrapper removed to allow page-specific control */}
                {children}
            </div>
        </>
    );
}
