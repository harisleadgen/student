"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export default function CreateRequestPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        type: 'Assignment Help',
        subject: '',
        description: '',
        deadline: '',
        budget_range: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/requests', {
                type: formData.type,
                subject: formData.subject,
                description: formData.description,
                deadline: new Date(formData.deadline).toISOString(), // formatting
                budget_range: formData.budget_range
            });
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to submit request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Request</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Fill out the form below to get help with your assignment or project.</p>
                </div>

                <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-600">{error}</p>}

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Help Type</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option>Assignment Help</option>
                            <option>Project Support</option>
                            <option>Exam Preparation</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject / Title</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="e.g. Calculus Integration Problem"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="Describe your requirements in detail..."
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                        <div className="mt-1">
                            <input
                                type="datetime-local"
                                name="deadline"
                                id="deadline"
                                required
                                value={formData.deadline}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
