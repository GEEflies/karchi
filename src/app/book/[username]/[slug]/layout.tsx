export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-surface-off-white flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] border border-black/5">
                {children}
            </div>
        </div>
    );
}
