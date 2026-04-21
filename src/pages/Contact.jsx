import React, { useState } from 'react';

const WHATSAPP_NUMBER = '917033866582';

export default function Contact() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', classLevel: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        const text =
            `Hi, I'd like to enquire about The Sanskriti Academy.\n\n` +
            `Name: ${form.name}\n` +
            `Phone: ${form.phone}\n` +
            (form.email ? `Email: ${form.email}\n` : '') +
            `Class: ${form.classLevel}\n` +
            (form.message ? `\nMessage: ${form.message}` : '');
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setSubmitted(true);
    };

    return (
        <div className="w-full">
            {/* Hero */}
            <header className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-sm mb-4 uppercase tracking-wider">Get In Touch</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Contact Us</h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-200 leading-relaxed">
                        Have questions? We're here to help. Reach out to us for admissions, courses, or any general inquiry.
                    </p>
                </div>
            </header>

            {/* Contact Info + Form */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-deep-blue mb-4">We'd love to hear from you</h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Whether you're a parent looking to enroll your child, or a student curious about our programs, our team is ready to guide you through every step.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: 'location_on', title: 'Our Location', detail: 'Bahuara More Deo, Bypass Road, Aurangabad, Bihar' },
                                    { icon: 'call', title: 'Phone Numbers', detail: '7033866582 · 8507020492' },
                                    { icon: 'mail', title: 'Email Address', detail: 'info@sanskriti.edu.in' },
                                    { icon: 'schedule', title: 'Office Hours', detail: 'Monday – Saturday: 8:00 AM – 7:00 PM' },
                                ].map(({ icon, title, detail }) => (
                                    <div key={title} className="flex items-start gap-4 p-4 rounded-2xl bg-background-light border border-slate-100">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                                            <span className="material-symbols-outlined text-2xl">{icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{title}</p>
                                            <p className="text-slate-600 text-sm mt-0.5">{detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Form */}
                        <div className="bg-background-light rounded-3xl p-8 border border-slate-100 shadow-md">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Opening WhatsApp…</h3>
                                    <p className="text-slate-600">We've opened WhatsApp with your details pre-filled. Just hit send — our team will reply shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-deep-blue mb-2">Book a Free Demo / Enquire Now</h3>
                                    <p className="text-slate-500 text-sm mb-6">Submitting opens WhatsApp with your details pre-filled — no email or back-end needed.</p>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                                            <input
                                                type="text" name="name" required value={form.name} onChange={handleChange}
                                                placeholder="Your name or child's name"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                                            <input
                                                type="tel" name="phone" required value={form.phone} onChange={handleChange}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                            <input
                                                type="email" name="email" value={form.email} onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class Interested In *</label>
                                            <select
                                                name="classLevel" required value={form.classLevel} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all"
                                            >
                                                <option value="">Select a class</option>
                                                <option>Class VIII</option>
                                                <option>Class IX</option>
                                                <option>Class X</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Message</label>
                                            <textarea
                                                name="message" rows={4} value={form.message} onChange={handleChange}
                                                placeholder="Any specific questions or requirements..."
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all resize-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md text-lg flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Send on WhatsApp
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                        <div>
                            <h2 className="text-2xl font-bold text-deep-blue">Find Us</h2>
                            <p className="text-slate-600 text-sm mt-1">Bahuara More Deo, Bypass Road, Aurangabad, Bihar</p>
                        </div>
                        <a
                            href="https://www.google.com/maps?q=24.6640408,84.4324601&z=17&hl=en"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-hover transition-colors"
                        >
                            Open in Google Maps
                            <span className="material-symbols-outlined text-base">arrow_outward</span>
                        </a>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <iframe
                            title="The Sanskriti Academy location"
                            src="https://maps.google.com/maps?q=24.6640408,84.4324601&z=17&hl=en&output=embed"
                            width="100%"
                            height="420"
                            style={{ border: 0, display: 'block' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
