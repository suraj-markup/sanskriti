import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Courses', to: '/courses' },
    { label: 'Results', to: '/results' },
    { label: 'Faculty', to: '/faculty' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Videos', to: '/videos' },
    { label: 'Resources', to: '/resources' },
    { label: 'Contact', to: '/contact' },
];

export default function Footer() {
    return (
        <footer className="bg-deep-blue text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/logo.png"
                                alt="The Sanskriti Academy"
                                className="w-10 h-10 object-contain bg-white rounded p-0.5"
                            />
                            <h2 className="text-xl font-bold leading-tight">The Sanskriti Academy</h2>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Nurturing excellence and empowering minds. Join us in the journey of academic brilliance and character building.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="grid grid-cols-2 gap-y-3 text-slate-400 text-sm">
                            {quickLinks.map(({ label, to }) => (
                                <li key={to}>
                                    <Link className="hover:text-white transition-colors" to={to}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary-hover text-xl">location_on</span>
                                <span>Bahuara More Deo, Bypass Road, Aurangabad, Bihar</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary-hover text-xl">call</span>
                                <a href="tel:7033866582" className="hover:text-white transition-colors">7033866582</a>
                                <span className="text-slate-600">·</span>
                                <a href="tel:8507020492" className="hover:text-white transition-colors">8507020492</a>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary-hover text-xl">mail</span>
                                <a href="mailto:info@sanskriti.edu.in" className="hover:text-white transition-colors">info@sanskriti.edu.in</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
                    <p>© 2026 The Sanskriti Academy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
