import React, { useState } from 'react';

const WHATSAPP_NUMBER = '917033866582';

export default function EnrollPopup({ onClose }) {
    const [form, setForm] = useState({ name: '', classLevel: '', board: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        const message =
            `Hi, I'd like to book a free demo class at The Sanskriti Academy.\n\n` +
            `Student: ${form.name}\n` +
            `Class: ${form.classLevel}\n` +
            `Board: ${form.board}\n` +
            `Parent Phone: ${form.phone}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setSubmitted(true);
    };

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Purple top bar */}
                <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #1e3a5f 0%, #0f172a 100%)' }}></div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                <div className="px-6 md:px-8 pb-8 pt-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Opening WhatsApp…</h3>
                            <p className="text-slate-500 text-sm mb-6">We've opened WhatsApp with your details pre-filled. Just hit send — our team will reply shortly.</p>
                            <div className="text-center">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Call us directly</p>
                                <div className="flex justify-center gap-6">
                                    <a href="tel:7033866582" className="font-bold text-primary text-lg hover:underline">7033866582</a>
                                    <a href="tel:8507020492" className="font-bold text-primary text-lg hover:underline">8507020492</a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Icon & heading */}
                            <div className="text-center mb-6">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#e7eef7' }}>
                                    <span className="material-symbols-outlined text-3xl" style={{ color: '#1e3a5f' }}>menu_book</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Lexend, sans-serif' }}>Book Free Demo Class</h2>
                                <p className="text-slate-500 text-sm mt-1">Start your journey to success today!</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Student Name */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Student Name</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                                        <input
                                            type="text" name="name" required value={form.name} onChange={handleChange}
                                            placeholder="Enter Full Name"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-base transition-all"
                                            style={{ '--tw-ring-color': '#1e3a5f33' }}
                                        />
                                    </div>
                                </div>

                                {/* Class + Board */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Class</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">school</span>
                                            <select
                                                name="classLevel" required value={form.classLevel} onChange={handleChange}
                                                className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none text-base appearance-none"
                                            >
                                                <option value="">Select Class</option>
                                                <option>Class VIII</option>
                                                <option>Class IX</option>
                                                <option>Class X</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Board</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">assignment</span>
                                            <select
                                                name="board" required value={form.board} onChange={handleChange}
                                                className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none text-base appearance-none"
                                            >
                                                <option value="">Select Board</option>
                                                <option>BSEB</option>
                                                <option>CBSE</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Parent Phone Number</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                                        <input
                                            type="tel" name="phone" required value={form.phone} onChange={handleChange}
                                            placeholder="Enter Mobile Number"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none text-base transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Submit via WhatsApp */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-md mt-2"
                                    style={{ background: '#25D366' }}
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Send on WhatsApp
                                </button>
                            </form>

                            {/* Call now */}
                            <div className="mt-5 text-center">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <span className="material-symbols-outlined text-sm" style={{ color: '#1e3a5f' }}>group</span>
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1e3a5f' }}>Call Now For Details</span>
                                </div>
                                <div className="flex justify-center gap-6">
                                    <a href="tel:7033866582" className="font-bold text-slate-800 text-base hover:text-primary transition-colors">7033866582</a>
                                    <a href="tel:8507020492" className="font-bold text-slate-800 text-base hover:text-primary transition-colors">8507020492</a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

