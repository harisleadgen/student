import Navbar from "@/components/Navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                {children}
            </main>
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2024 StudentHelp. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
