import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Results', path: '/results' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Videos', path: '/videos' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar({ onEnroll }) {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="The Sanskriti Academy"
                            className="w-11 h-11 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-primary text-xl font-bold leading-none tracking-tight uppercase">The Sanskriti Academy</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Excellence in Education</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map(({ label, path }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`font-medium text-sm transition-colors ${location.pathname === path ? 'text-primary font-bold' : 'text-slate-700 hover:text-primary'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <button
                            onClick={onEnroll}
                            className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md text-sm uppercase tracking-wide"
                        >
                            Enroll Now
                        </button>
                    </nav>

                    <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className="material-symbols-outlined text-3xl">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4">
                    {navLinks.map(({ label, path }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 text-sm font-medium border-b border-slate-50 ${location.pathname === path ? 'text-primary' : 'text-slate-700'}`}
                        >
                            {label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { setMenuOpen(false); onEnroll(); }}
                        className="mt-3 w-full bg-primary text-white text-center font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wide"
                    >
                        Enroll Now
                    </button>
                </div>
            )}
        </header>
    );
}

