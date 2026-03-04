import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-deep-blue text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-sm">school</span>
                            </div>
                            <h2 className="text-xl font-bold">The Sanskriti Academy</h2>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Nurturing excellence and empowering minds. Join us in the journey of academic brilliance and character building.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-xl">language</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link className="hover:text-primary transition-colors" to="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/courses">Courses Offered</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/results">Annual Results</Link></li>
                            <li><Link className="hover:text-primary transition-colors" to="/faculty">Our Faculty</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms &amp; Conditions</a></li>
                            <li><Link className="hover:text-primary transition-colors" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span>Bahuara More Deo, Bypass Road, Aurangabad</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <span>8507020492 / 7033866582</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span>info@sanskriti.edu.in</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
                    <p>Â© 2026 The Sanskriti Academy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

