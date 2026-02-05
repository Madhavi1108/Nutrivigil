import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, UserCheck, Globe, Cookie, AlertCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrivacyPolicy = () => {
    const [openSection, setOpenSection] = useState(null);

    const sections = [
        {
            id: 'collection',
            icon: <Eye className="w-6 h-6" />,
            title: 'Information We Collect',
            color: 'from-blue-500 to-cyan-500',
            content: [
                {
                    subtitle: 'Personal Information',
                    items: [
                        'Name and email address (when you create an account)',
                        'Profile information you choose to provide',
                        'Communication preferences and settings'
                    ]
                },
                {
                    subtitle: 'Health Information',
                    items: [
                        'Health conditions you select (diabetes, hypertension, etc.)',
                        'Dietary preferences and restrictions',
                        'Food allergies and sensitivities',
                        'Nutrition goals and targets'
                    ]
                },
                {
                    subtitle: 'Usage Data',
                    items: [
                        'Food images you upload for analysis (temporarily stored)',
                        'Scan history and nutrition analysis results',
                        'App usage patterns and interactions',
                        'Device information (browser type, OS, screen resolution)'
                    ]
                },
                {
                    subtitle: 'Cookies and Tracking',
                    items: [
                        'Essential cookies for platform functionality',
                        'Analytics cookies to improve user experience',
                        'Preference cookies to remember your settings',
                        'See our Cookie Policy for detailed information'
                    ]
                }
            ]
        },
        {
            id: 'usage',
            icon: <CheckCircle className="w-6 h-6" />,
            title: 'How We Use Your Information',
            color: 'from-green-500 to-emerald-500',
            content: [
                {
                    subtitle: 'Primary Uses',
                    items: [
                        'Provide personalized nutrition analysis based on your health profile',
                        'Process food images with AI to identify nutritional content',
                        'Generate safety signals (traffic light system) tailored to your conditions',
                        'Maintain your food diary and track nutrition history'
                    ]
                },
                {
                    subtitle: 'Service Improvement',
                    items: [
                        'Improve our AI algorithms and food recognition accuracy',
                        'Understand how users interact with the platform',
                        'Develop new features and enhance existing ones',
                        'Monitor and improve platform performance and reliability'
                    ]
                },
                {
                    subtitle: 'Communication',
                    items: [
                        'Send important updates about your account or services',
                        'Respond to your questions and support requests',
                        'Notify you of changes to our policies or terms',
                        'Send optional newsletters (with your consent)'
                    ]
                },
                {
                    subtitle: 'Legal Compliance',
                    items: [
                        'Comply with applicable laws and regulations',
                        'Protect our rights and prevent fraudulent activity',
                        'Enforce our Terms of Service',
                        'Respond to legal requests from authorities'
                    ]
                }
            ]
        },
        {
            id: 'security',
            icon: <Lock className="w-6 h-6" />,
            title: 'Data Storage & Security',
            color: 'from-purple-500 to-pink-500',
            content: [
                {
                    subtitle: 'Security Measures',
                    items: [
                        'Industry-standard encryption for data in transit (SSL/TLS)',
                        'Encryption for data at rest on our secure servers',
                        'Regular security audits and vulnerability assessments',
                        'Restricted access controls to authorized personnel only',
                        'Multi-factor authentication for administrative access'
                    ]
                },
                {
                    subtitle: 'Image Storage Policy',
                    items: [
                        'Food images are temporarily stored for processing only',
                        'All uploaded images are automatically deleted within 24 hours',
                        'Images are not used for any purpose other than analysis',
                        'We do not permanently retain your food images'
                    ]
                },
                {
                    subtitle: 'Data Retention',
                    items: [
                        'Account data retained while your account is active',
                        'Scan history and nutrition data kept for your reference',
                        'You can delete your data at any time from account settings',
                        'Deleted data is permanently removed from our systems within 30 days'
                    ]
                }
            ]
        },
        {
            id: 'sharing',
            icon: <Globe className="w-6 h-6" />,
            title: 'Data Sharing & Third Parties',
            color: 'from-red-500 to-pink-500',
            content: [
                {
                    subtitle: 'Third-Party Services',
                    items: [
                        'Google Gemini AI: Food recognition and nutritional analysis',
                        'Google Analytics: Website usage tracking and analytics',
                        'API Ninjas: Nutritional database for food information',
                        'Hosting providers: Secure data storage and platform hosting'
                    ]
                },
                {
                    subtitle: 'What We DON\'T Do',
                    items: [
                        '❌ We DO NOT sell your personal information to anyone',
                        '❌ We DO NOT share your health data with advertisers',
                        '❌ We DO NOT use your data for targeted advertising',
                        '❌ We DO NOT share your information without your consent (except as legally required)'
                    ]
                },
                {
                    subtitle: 'Third-Party Privacy Policies',
                    items: [
                        'Google Privacy Policy: https://policies.google.com/privacy',
                        'Each third-party service has its own privacy policy',
                        'We recommend reviewing their policies to understand their practices',
                        'We are not responsible for third-party privacy practices'
                    ]
                }
            ]
        },
        {
            id: 'rights',
            icon: <UserCheck className="w-6 h-6" />,
            title: 'Your Rights & Choices',
            color: 'from-orange-500 to-red-500',
            content: [
                {
                    subtitle: 'Access & Control',
                    items: [
                        '✓ Access: View all personal data we have about you',
                        '✓ Correction: Update or correct inaccurate information',
                        '✓ Deletion: Request complete deletion of your account and data',
                        '✓ Export: Download your data in a portable format (data portability)',
                        '✓ Opt-Out: Unsubscribe from non-essential communications'
                    ]
                },
                {
                    subtitle: 'How to Exercise Your Rights',
                    items: [
                        'Access your account settings to view or update information',
                        'Use the "Delete Account" option to permanently remove data',
                        'Contact privacy@nutrivigil.com for data access or deletion requests',
                        'We will respond to requests within 30 days',
                        'You may need to verify your identity for security purposes'
                    ]
                },
                {
                    subtitle: 'Cookie Controls',
                    items: [
                        'Manage cookie preferences through browser settings',
                        'Disable analytics cookies (essential cookies required for functionality)',
                        'Clear existing cookies through browser tools',
                        'See our Cookie Policy for detailed instructions'
                    ]
                }
            ]
        },
        {
            id: 'cookies',
            icon: <Cookie className="w-6 h-6" />,
            title: 'Cookies Policy Summary',
            color: 'from-yellow-500 to-orange-500',
            content: [
                {
                    subtitle: 'Types of Cookies We Use',
                    items: [
                        '🟢 Essential Cookies: Required for platform to function (login, security)',
                        '🟡 Analytics Cookies: Help us understand usage patterns (Google Analytics)',
                        '🟡 Preference Cookies: Remember your settings (theme, language)',
                        'Note: We do not use advertising or tracking cookies'
                    ]
                },
                {
                    subtitle: 'Managing Cookies',
                    items: [
                        'You can control cookies through your browser settings',
                        'Disabling essential cookies may affect platform functionality',
                        'Analytics and preference cookies can be disabled without major impact',
                        'For detailed information, visit our Cookie Policy page'
                    ]
                }
            ]
        },
        {
            id: 'international',
            icon: <Globe className="w-6 h-6" />,
            title: 'International Users & Compliance',
            color: 'from-teal-500 to-cyan-500',
            content: [
                {
                    subtitle: 'GDPR (European Union)',
                    items: [
                        'We comply with the General Data Protection Regulation (GDPR)',
                        'Legal basis for processing: Consent and legitimate interest',
                        'You have the right to data portability, erasure, and restriction',
                        'You can lodge complaints with your local data protection authority',
                        'Data transfers outside EU are protected by appropriate safeguards'
                    ]
                },
                {
                    subtitle: 'CCPA (California, USA)',
                    items: [
                        'We comply with the California Consumer Privacy Act (CCPA)',
                        'California residents have specific rights to know, delete, and opt-out',
                        'We do not sell personal information as defined by CCPA',
                        'Contact privacy@nutrivigil.com for CCPA requests'
                    ]
                },
                {
                    subtitle: 'Data Transfers',
                    items: [
                        'Your data may be processed in countries outside your residence',
                        'We ensure appropriate safeguards for international data transfers',
                        'Transfers comply with applicable data protection laws',
                        'You can request information about data transfer mechanisms'
                    ]
                }
            ]
        },
        {
            id: 'children',
            icon: <Shield className="w-6 h-6" />,
            title: 'Children\'s Privacy',
            color: 'from-pink-500 to-purple-500',
            content: [
                {
                    subtitle: 'Age Requirements',
                    items: [
                        'NutriVigil is intended for users aged 13 and above',
                        'Users under 18 should have parental consent to use the platform',
                        'We do not knowingly collect data from children under 13',
                        'If we discover we\'ve collected data from a child under 13, we will delete it'
                    ]
                },
                {
                    subtitle: 'Parental Rights',
                    items: [
                        'Parents can request access to their child\'s information',
                        'Parents can request deletion of their child\'s account',
                        'Contact privacy@nutrivigil.com for child privacy concerns',
                        'We comply with COPPA (Children\'s Online Privacy Protection Act)'
                    ]
                }
            ]
        }
    ];

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Hero Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
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
                            <div className="inline-flex items-center gap-3 mb-6">
                                <Shield className="w-12 h-12 text-purple-400" />
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Privacy Policy
                            </h1>
                            <p className="text-gray-400 text-lg mb-2">
                                Last Updated: February 5, 2026
                            </p>
                            <p className="text-gray-300 max-w-3xl mx-auto">
                                Your privacy is important to us. This policy explains how we collect, use, protect, and manage your personal information.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Commitment to Your Privacy</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            At NutriVigil, we are committed to protecting your privacy and ensuring the security of your personal and health information. This Privacy Policy describes how we collect, use, store, and protect your data when you use our platform.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            We believe in transparency and giving you control over your information. If you have any questions about this policy or our privacy practices, please contact us at <a href="mailto:privacy@nutrivigil.com" className="text-purple-400 hover:text-purple-300">privacy@nutrivigil.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Privacy Sections (Accordion) */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-4">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="bg-[#1a1f2e] rounded-2xl border border-gray-800 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full px-6 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white`}>
                                        {section.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-left">{section.title}</h3>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ${
                                        openSection === section.id ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Section Content */}
                            <AnimatePresence>
                                {openSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 border-t border-gray-700/50 pt-6 space-y-6">
                                            {section.content.map((item, idx) => (
                                                <div key={idx} className="bg-[#0a0e1a]/50 p-5 rounded-xl border border-gray-700/50">
                                                    <h4 className="font-bold text-white mb-3">{item.subtitle}</h4>
                                                    <ul className="space-y-2">
                                                        {item.items.map((point, pointIdx) => (
                                                            <li key={pointIdx} className="text-sm text-gray-300 flex items-start gap-2">
                                                                <span className="text-purple-400 mt-1">•</span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Changes to Policy */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Changes to This Privacy Policy</h3>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy.
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    If we make material changes that significantly affect your privacy rights, we will notify you by:
                                </p>
                                <ul className="space-y-2 mb-4">
                                    <li className="text-gray-300 flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Email notification to your registered email address</span>
                                    </li>
                                    <li className="text-gray-300 flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Prominent notice on our platform</span>
                                    </li>
                                    <li className="text-gray-300 flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        <span>Requiring your consent for continued use (if required by law)</span>
                                    </li>
                                </ul>
                                <p className="text-gray-300 leading-relaxed">
                                    We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Related Pages */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Questions or Concerns?</h2>
                        <p className="text-gray-400">
                            We're here to help with any privacy-related questions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-[#1a1f2e] p-6 rounded-xl border border-gray-800">
                            <h3 className="font-bold text-lg mb-2">Privacy Team</h3>
                            <p className="text-gray-400 text-sm mb-3">For privacy-specific inquiries</p>
                            <a href="mailto:privacy@nutrivigil.com" className="text-purple-400 hover:text-purple-300">
                                privacy@nutrivigil.com
                            </a>
                        </div>

                        <div className="bg-[#1a1f2e] p-6 rounded-xl border border-gray-800">
                            <h3 className="font-bold text-lg mb-2">General Support</h3>
                            <p className="text-gray-400 text-sm mb-3">For other questions</p>
                            <a href="mailto:support@nutrivigil.com" className="text-purple-400 hover:text-purple-300">
                                support@nutrivigil.com
                            </a>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-400 mb-4">Related Legal Documents:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/terms" className="text-purple-400 hover:text-purple-300 font-semibold">
                                Terms of Service
                            </Link>
                            <span className="text-gray-600">•</span>
                            <Link to="/cookies" className="text-purple-400 hover:text-purple-300 font-semibold">
                                Cookie Policy
                            </Link>
                            <span className="text-gray-600">•</span>
                            <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-semibold">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
