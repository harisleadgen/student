"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';

interface HelpRequest {
    id: number;
    type: string;
    subject: string;
    deadline: string;
    status: string;
    created_at: string;
    student_id: number;
}

export default function AdminDashboard() {
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/requests'); // Admin sees all
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            await axios.put(`/requests/${id}/status`, { status: newStatus });
            fetchRequests(); // Refresh
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Requests</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {requests.map((req) => (
                        <li key={req.id}>
                            <div className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <Link href={`/dashboard/requests/${req.id}`} className="text-sm font-medium text-blue-600 truncate underline">
                                            {req.subject} (ID: {req.id})
                                        </Link>
                                        <div className="ml-2 flex-shrink-0 flex gap-2">
                                            <select
                                                value={req.status}
                                                onChange={(e) => updateStatus(req.id, e.target.value)}
                                                className="bg-white border border-gray-300 rounded-md text-sm"
                                            >
                                                <option>New</option>
                                                <option>In Review</option>
                                                <option>In Progress</option>
                                                <option>Delivered</option>
                                                <option>Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                {req.type}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                Deadline: {new Date(req.deadline).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
