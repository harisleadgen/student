import Link from 'next/link';
import axios from '@/lib/axios';

// Since this is a server component in (public), we can fetch data directly or use client
// For SEO, server-side data fetching is better.
// But we are using a separate backend on localhost:8000.
// We'll use fetch with no-cache or revalidate for now.

async function getResources() {
    try {
        const res = await fetch('http://localhost:8000/resources/', { cache: 'no-store' });
        if (!res.ok) {
            // On error or if backend is down during build, return empty
            console.error("Failed to fetch resources");
            return [];
        }
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function ResourcesPage() {
    const resources = await getResources();

    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Help Resources & Guides</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Expert advice, study guides, and tips to help you succeed in your academic journey.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {resources.length === 0 ? (
                        <p>No resources found. Check back later!</p>
                    ) : (
                        resources.map((post: any) => (
                            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.created_at} className="text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {post.category || 'Guide'}
                                    </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <Link href={`/resources/${post.slug}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                </div>
                                {post.tags && (
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <span className="absolute inset-0" />
                                                Tags: {post.tags}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
