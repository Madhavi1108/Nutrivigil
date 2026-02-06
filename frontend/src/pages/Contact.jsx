import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
    const { theme } = useTheme();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitting: false,
        submitted: false,
        error: false
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormStatus({ submitting: true, submitted: false, error: false });

        try {
            // Replace with your actual form submission endpoint
            // Example: formspree.io, emailjs, or your backend
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus({ submitting: false, submitted: true, error: false });
                setFormData({ name: '', email: '', subject: '', message: '' });
                
                // Reset success message after 5 seconds
                setTimeout(() => {
                    setFormStatus({ submitting: false, submitted: false, error: false });
                }, 5000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setFormStatus({ submitting: false, submitted: false, error: true });
            
            // Reset error message after 5 seconds
            setTimeout(() => {
                setFormStatus({ submitting: false, submitted: false, error: false });
            }, 5000);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            content: "contact@nutrivigil.com",
            link: "mailto:contact@nutrivigil.com",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Support",
            content: "support@nutrivigil.com",
            link: "mailto:support@nutrivigil.com",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Support Hours",
            content: "Mon-Fri: 9AM - 6PM IST",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            content: "Remote-First Team",
            color: "from-orange-500 to-red-500"
        }
    ];

    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            name: "GitHub",
            link: "https://github.com/Gagan021-5/Nutrivigil",
            color: "hover:bg-gray-700"
        },
        {
            icon: <Twitter className="w-5 h-5" />,
            name: "Twitter",
            link: "https://twitter.com/nutrivigil",
            color: "hover:bg-blue-500"
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            name: "LinkedIn",
            link: "https://linkedin.com/company/nutrivigil",
            color: "hover:bg-blue-600"
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#0a0e1a] text-white' : 'bg-white text-gray-900'
        }`}>
            {/* Hero Section */}
            <section className={`relative py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]' : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/" 
                        className={`inline-flex items-center gap-2 transition-colors mb-8 ${
                            theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Get in Touch
                            </h1>
                            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`p-8 rounded-2xl border transition-colors duration-300 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors ${
                                                errors.name ? 'border-red-500' : theme === 'dark' ? 'bg-[#0a0e1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors ${
                                                errors.email ? 'border-red-500' : theme === 'dark' ? 'bg-[#0a0e1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors ${
                                                theme === 'dark' ? 'bg-[#0a0e1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="What is this about?"
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                                                errors.message ? 'border-red-500' : theme === 'dark' ? 'bg-[#0a0e1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={formStatus.submitting}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold px-6 py-4 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {formStatus.submitting ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {/* Success Message */}
                                    {formStatus.submitted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
                                        >
                                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                            <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                                        </motion.div>
                                    )}

                                    {/* Error Message */}
                                    {formStatus.error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span>Oops! Something went wrong. Please try again or email us directly.</span>
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>
                        </div>

                        {/* Contact Information Sidebar */}
                        <div className="space-y-6">
                            {/* Contact Info Cards */}
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className={`p-6 rounded-2xl border transition-all hover:border-purple-500/50 ${
                                        theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white flex-shrink-0`}>
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">{info.title}</h3>
                                            {info.link ? (
                                                <a 
                                                    href={info.link}
                                                    className={`transition-colors ${
                                                        theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                                                    }`}
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className={`transition-colors duration-300 ${
                                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>{info.content}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Social Media Links */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                                <h3 className="font-semibold mb-4">Follow Us</h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                                                theme === 'dark' ? 'bg-[#0a0e1a] text-gray-400' : 'bg-white border border-gray-200 text-gray-600'
                                            } ${social.color}`}
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20 text-center transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-4">Have a Quick Question?</h2>
                        <p className={`mb-6 transition-colors duration-300 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                        }`}>
                            Check out our FAQ page for instant answers to common questions
                        </p>
                        <Link 
                            to="/faq" 
                            className={`inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg border transition-all ${
                                theme === 'dark' ? 'bg-[#1a1f2e] hover:bg-[#252a3a] text-white border-gray-700' : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300'
                            }`}
                        >
                            Visit FAQ Page
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
