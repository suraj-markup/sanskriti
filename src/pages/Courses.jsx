import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
    {
        class: 'Class VIII',
        board: 'BSEB & CBSE',
        color: 'from-slate-700 to-slate-900',
        subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
        features: ['Foundation building', 'Weekly tests', 'Study material provided', 'Parent feedback sessions'],
    },
    {
        class: 'Class IX',
        board: 'BSEB & CBSE',
        color: 'from-[#1e3a5f] to-[#0f172a]',
        subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
        features: ['Board prep foundation', 'Mock examinations', 'Doubt clearing sessions', 'Performance tracking'],
        featured: true,
    },
    {
        class: 'Class X',
        board: 'BSEB & CBSE',
        color: 'from-amber-700 to-amber-900',
        subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
        features: ['Intensive board prep', 'Previous year papers', 'Personalized attention', 'Daily practice tests'],
    },
];

export default function Courses({ onEnroll }) {
    return (
        <div className="w-full">
            {/* Hero */}
            <header className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Programs</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Courses Offered</h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-200 leading-relaxed">
                        Comprehensive board-level preparation for Classes VIII, IX, and X. Covering all subjects for both BSEB and CBSE boards.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}></div>
            </header>

            {/* Course Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-deep-blue text-4xl font-extrabold">Choose Your Program</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div
                                key={course.class}
                                className={`rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl ${course.featured ? 'ring-4 ring-primary scale-105' : ''}`}
                            >
                                <div className={`bg-gradient-to-br ${course.color} p-8 text-white`}>
                                    {course.featured && (
                                        <div className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Most Popular</div>
                                    )}
                                    <h3 className="text-3xl font-extrabold">{course.class}</h3>
                                    <p className="text-white/80 mt-1 font-semibold">{course.board}</p>
                                </div>
                                <div className="bg-white p-8">
                                    <h4 className="font-bold text-slate-700 uppercase tracking-widest text-xs mb-4">Subjects Covered</h4>
                                    <ul className="space-y-2 mb-6">
                                        {course.subjects.map(sub => (
                                            <li key={sub} className="flex items-center gap-2 text-slate-600 text-sm">
                                                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4 className="font-bold text-slate-700 uppercase tracking-widest text-xs mb-4">Key Features</h4>
                                    <ul className="space-y-2 mb-8">
                                        {course.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                                                <span className="material-symbols-outlined text-green-500 text-base">done</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={onEnroll} className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover transition-all">Enroll Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-deep-blue text-4xl font-extrabold">Batch Schedule 2026</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { time: 'Morning Batch', hours: '7:00 AM – 9:00 AM', days: 'Mon – Sat', icon: 'wb_sunny' },
                            { time: 'Afternoon Batch', hours: '12:00 PM – 2:00 PM', days: 'Mon – Sat', icon: 'partly_cloudy_day' },
                            { time: 'Evening Batch', hours: '5:00 PM – 7:00 PM', days: 'Mon – Sat', icon: 'nightlight' },
                        ].map(({ time, hours, days, icon }) => (
                            <div key={time} className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{time}</h3>
                                <p className="text-2xl font-extrabold text-primary mb-1">{hours}</p>
                                <p className="text-slate-500 text-sm">{days}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-3xl font-bold">Secure your seat today</h2>
                        <p className="text-slate-200 opacity-90 mt-2">Limited seats available. New session starts 27 January 2026.</p>
                    </div>
                    <button onClick={onEnroll} className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all uppercase tracking-wide">Enquire Now</button>
                </div>
            </section>
        </div>
    );
}


