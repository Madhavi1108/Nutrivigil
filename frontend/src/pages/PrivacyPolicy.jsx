import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPolicy = () => {
    const { theme } = useTheme();
    
    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#0a0e1a]' : 'bg-gray-50'
        }`}>
            <div className="text-center max-w-2xl">
                <h1 className={`text-4xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    Privacy Policy
                </h1>
                <p className={`text-lg mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    Learn how we protect and handle your personal information.
                </p>
                <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    🚧 Coming Soon
                </span>
                <div className="mt-8">
                    <Link to="/" className={`hover:underline ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;