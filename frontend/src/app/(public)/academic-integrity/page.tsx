
export default function AcademicIntegrityPage() {
    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Academic Integrity Policy</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                    We are committed to supporting student learning while upholding the highest standards of academic integrity.
                </p>
                <div className="mt-10 max-w-2xl">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Stance</h2>
                    <p className="mt-6">
                        Our platform connects students with experts to provide guidance, explanations, and project support. We strictly prohibit the use of our services for academic dishonesty, such as:
                    </p>
                    <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                        <li className="flex gap-x-3">
                            <span>
                                <strong className="font-semibold text-gray-900">Submitting work as your own.</strong> The materials and guidance provided by our experts are intended for reference and learning purposes only.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <span>
                                <strong className="font-semibold text-gray-900">Exam cheating.</strong> We do not provide real-time assistance during exams or quizzes.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <span>
                                <strong className="font-semibold text-gray-900">Plagiarism.</strong> Students are expected to write their own assignments and cite any resources used properly.
                            </span>
                        </li>
                    </ul>
                    <p className="mt-8">
                        By using our platform, you agree to use the help provided to enhance your understanding and skills, not to bypass academic requirements.
                    </p>
                </div>
            </div>
        </div>
    );
}
