"use client";

import { useEffect, useState, use } from 'react';
import axios from '@/lib/axios';

interface Message {
    id: number;
    sender_id: number;
    message: string;
    created_at: string;
}

interface RequestDetail {
    id: number;
    subject: string;
    description: string;
    status: string;
    deadline: string;
    type: string;
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const [request, setRequest] = useState<RequestDetail | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch current user ID for alignment
                const userRes = await axios.get('/auth/me');
                setCurrentUser(userRes.data);

                const reqRes = await axios.get(`/requests/${id}`);
                setRequest(reqRes.data);

                const msgRes = await axios.get(`/requests/${id}/messages`);
                setMessages(msgRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post(`/requests/${id}/messages`, {
                message: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!request) return <div>Request not found</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{request.subject}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{request.type} • Status: {request.status}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">
                        Deadline: {new Date(request.deadline).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{request.description}</dd>
                    </div>
                </dl>
            </div>

            {/* Messaging Section */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Messages & Updates</h4>

                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No messages yet.</p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.sender_id === currentUser?.id ? 'bg-blue-100 text-blue-900' : 'bg-white border border-gray-200 text-gray-900'}`}>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs text-gray-400 mt-1 text-right">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Type a message..."
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
