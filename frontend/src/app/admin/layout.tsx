"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function AdminLayout({
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
                if (response.data.role !== 'admin') {
                    // Not authorized
                    router.push('/dashboard'); // or 403
                    return;
                }
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
        return <div className="flex justify-center items-center h-screen">Loading Admin...</div>;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-white">Admin Portal</span>
                            </div>
                            <div className="hidden ml-6 sm:flex sm:space-x-8">
                                <Link href="/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    All Requests
                                </Link>
                                <Link href="/admin/resources" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Manage Resources
                                </Link>
                            </div>
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
