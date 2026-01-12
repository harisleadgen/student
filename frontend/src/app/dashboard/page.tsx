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
}

export default function Dashboard() {
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/requests');
                setRequests(response.data);
            } catch (error) {
                console.error("Failed to fetch requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">My Requests</h1>
                <Link href="/dashboard/create-request" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    New Request
                </Link>
            </div>

            {loading ? (
                <p>Loading requests...</p>
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No requests yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new help request.</p>
                    <div className="mt-6">
                        <Link href="/dashboard/create-request" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Create Request
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {requests.map((req) => (
                            <li key={req.id}>
                                <Link href={`/dashboard/requests/${req.id}`} className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-blue-600 truncate">{req.subject}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'New' ? 'bg-green-100 text-green-800' :
                                                        req.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {req.status}
                                                </span>
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
                                                    Deadline: <time dateTime={req.deadline}>{new Date(req.deadline).toLocaleDateString()}</time>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
