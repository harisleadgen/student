"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const response = await axios.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                localStorage.removeItem('token');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-blue-600">StudentHelp Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Hi, {user?.name}</span>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    router.push('/login');
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <main>{children}</main>
            </div>
        </div>
    );
}
