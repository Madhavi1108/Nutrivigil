// Typed by you in 5 minutes
const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    About NutriVigil
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Learn more about our AI-powered nutrition platform.
                </p>
                <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    🚧 Coming Soon
                </span>
                <div className="mt-8">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
