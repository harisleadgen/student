import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getResource(slug: string) {
    try {
        const res = await fetch(`http://localhost:8000/resources/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = await params;
    const post = await getResource(unwrappedParams.slug);
    if (!post) {
        return {
            title: 'Resource Not Found',
        };
    }
    return {
        title: `${post.title} | Student Help Resources`,
        description: post.excerpt,
    };
}

export default async function ResourcePostPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = await params;
    const post = await getResource(unwrappedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <p className="text-base font-semibold leading-7 text-blue-600">{post.category}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                    {post.excerpt}
                </p>
                {/* Basic Markdown Rendering (Ideally use a markdown library) */}
                <div className="mt-10 max-w-2xl whitespace-pre-wrap">
                    {post.content}
                </div>

                <div className="mt-16 border-t border-gray-200 pt-8">
                    <Link href="/resources" className="text-blue-600 hover:text-blue-500 font-semibold">
                        ← Back to Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}
