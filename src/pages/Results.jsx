import React from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
    { name: 'Riya Sharma', class: 'Class X - CBSE', marks: '95%', subject: 'Mathematics', quote: 'The structured approach and weekly tests at Sanskriti Academy helped me score 95 in Math. The faculty never gave up on me.' },
    { name: 'Arjun Kumar', class: 'Class X - BSEB', marks: '1st Division', subject: 'Science', quote: 'In just 6 months, my understanding of Science transformed completely. The teachers explain everything with so much clarity.' },
    { name: 'Priya Singh', class: 'Class X - CBSE', marks: '92%', subject: 'All Subjects', quote: 'I was struggling before joining Sanskriti. The personal attention and extra doubt sessions made all the difference.' },
    { name: 'Rahul Pandey', class: 'Class IX - BSEB', marks: 'Top 5', subject: 'Social Studies', quote: 'Great study material and discipline-driven environment. My writing speed and accuracy improved drastically.' },
];

const stats = [
    { value: '100%', label: 'Board Pass Rate' },
    { value: '50+', label: 'Toppers Produced' },
    { value: '95%', label: 'Students Improved Grades' },
    { value: '3+', label: 'Years of Excellence' },
];

export default function Results({ onEnroll }) {
    return (
        <div className="w-full">
            {/* Hero */}
            <header className="relative py-24 overflow-hidden bg-gradient-to-br from-green-700 to-emerald-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Track Record</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Academic Results &amp; Testimonials</h1>
                    <p className="max-w-3xl mx-auto text-xl text-green-100 leading-relaxed">
                        Our students' success is the truest measure of our excellence. Year after year, Sanskriti Academy students outperform their peers.
                    </p>
                </div>
            </header>

            {/* Stats */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="text-center p-8 rounded-2xl bg-background-light border border-slate-100 hover:shadow-xl transition-shadow">
                                <div className="text-5xl font-extrabold text-primary mb-2">{value}</div>
                                <p className="text-slate-600 font-medium">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Showcase */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-deep-blue text-4xl font-extrabold">Recent Board Highlights</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { board: 'BSEB Board 2024', highlight: '100% Pass Rate', detail: 'All students cleared the Bihar State Board Examination, with 8 students securing First Division with Distinction.' },
                            { board: 'CBSE Board 2024', highlight: '95%+ Scorers', detail: 'Multiple students secured above 90% in all subjects, with topper Riya Sharma achieving 97% in Mathematics.' },
                            { board: 'Class IX Promotion 2024', highlight: '98% Distinction', detail: 'Nearly all Class IX students promoted with distinction, demonstrating consistent academic growth.' },
                            { board: 'Class VIII Annual 2024', highlight: 'Top 10 Rankers', detail: 'Our Class VIII students ranked in the top 10 in their respective schools, showcasing exemplary preparation.' },
                        ].map(({ board, highlight, detail }) => (
                            <div key={board} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex gap-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-4xl">emoji_events</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{board}</span>
                                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">{highlight}</h3>
                                    <p className="text-slate-600 leading-relaxed">{detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-deep-blue text-4xl font-extrabold">What Our Students Say</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map(({ name, class: cls, marks, subject, quote }) => (
                            <div key={name} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow relative">
                                <div className="absolute top-6 right-8 text-6xl text-primary/10 font-serif leading-none">"</div>
                                <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">"{quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{name}</p>
                                        <p className="text-sm text-slate-500">{cls} Â· {marks} Â· {subject}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-3xl font-bold">Be our next success story</h2>
                        <p className="text-purple-100 opacity-90 mt-2">Join the Sanskriti family and unlock your potential.</p>
                    </div>
                    <button onClick={onEnroll} className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all uppercase tracking-wide">Enroll Today</button>
                </div>
            </section>
        </div>
    );
}


