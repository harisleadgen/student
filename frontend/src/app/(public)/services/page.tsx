
export default function ServicesPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Our Expertise</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Comprehensive Academic Support
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        From complex coding projects to essay writing, we have experts in every field ready to help you succeed.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {[
                            {
                                name: 'Assignment Assistance',
                                description:
                                    'Get detailed explanations and step-by-step solutions for your homework assignments in Math, Science, Engineering, and more.',
                            },
                            {
                                name: 'Programming Projects',
                                description:
                                    'Expert help with coding projects in Python, Java, C++, Web Development, and Data Science. We help you debug and structure your code.',
                            },
                            {
                                name: 'Essay & Report Writing',
                                description:
                                    'Guidance on thesis statements, structure, and academic writing style. (Note: We provide guidance, not ghostwriting).',
                            },
                            {
                                name: 'Thesis & Dissertation',
                                description:
                                    'Research methodology support, literature review guidance, and data analysis help for your major projects.',
                            },
                        ].map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
