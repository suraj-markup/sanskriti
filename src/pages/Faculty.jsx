import React from 'react';
import { Link } from 'react-router-dom';

const faculty = [
    {
        name: 'Vivek Prakash',
        role: 'Director',
        experience: '12+ Years',
        bio: 'Driving the vision of academic excellence at The Sanskriti Academy. Expert in helping students excel in humanities and social sciences.',
        img: '/teachers/vivek.png',
    },
    {
        name: 'Navneet Prakash',
        role: 'Founder & All Subjects Specialist',
        subjects: 'All Subjects (VIII–X)',
        experience: '10+ Years',
        bio: 'Founder of The Sanskriti Academy and a specialist across all board subjects. Known for conceptual clarity, advanced problem-solving, and making complex topics approachable for every student.',
        img: '/teachers/navneet.png',
    },
    {
        name: 'Priyanka Prakash',
        role: 'Science HOD & Life Coach',
        subjects: 'Science (VIII-X)',
        experience: '8+ Years',
        bio: 'Providing personalized mentorship and academic guidance. Expert in breaking down complex science concepts with real-world examples.',
        img: '/teachers/priyanka.png',
    },
];

export default function Faculty({ onEnroll }) {
    return (
        <div className="w-full">
            {/* Hero */}
            <header className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Mentors</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Expert Faculty</h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-200 leading-relaxed">
                        The backbone of The Sanskriti Academy — dedicated professionals committed to transforming every student's academic journey.
                    </p>
                </div>
            </header>

            {/* Faculty Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        {faculty.map((member, i) => (
                            <div key={member.name} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                <div className="w-full md:w-2/5 relative group">
                                    <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all"></div>
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="relative rounded-3xl shadow-2xl object-cover w-full aspect-[4/5] md:aspect-auto md:h-[450px] group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                </div>
                                <div className="w-full md:w-3/5 space-y-6">
                                    <div>
                                        <span className="text-primary font-bold uppercase tracking-widest text-sm">{member.role}</span>
                                        <h2 className="text-4xl font-extrabold text-deep-blue mt-2">{member.name}</h2>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed">{member.bio}</p>
                                    <div className="flex flex-wrap gap-4">
                                        {member.subjects && (
                                            <div className="bg-background-light rounded-xl p-4 border border-slate-100 flex-1 min-w-[200px]">
                                                <div className="flex items-center gap-2 text-primary mb-1">
                                                    <span className="material-symbols-outlined text-sm">menu_book</span>
                                                    <span className="text-xs font-bold uppercase tracking-widest">Subjects</span>
                                                </div>
                                                <p className="text-slate-700 font-semibold text-sm">{member.subjects}</p>
                                            </div>
                                        )}
                                        {member.experience && (
                                            <div className="bg-background-light rounded-xl p-4 border border-slate-100 flex-1 min-w-[200px]">
                                                <div className="flex items-center gap-2 text-primary mb-1">
                                                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                                                    <span className="text-xs font-bold uppercase tracking-widest">Experience</span>
                                                </div>
                                                <p className="text-slate-700 font-semibold text-sm">{member.experience}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary/40">alternate_email</span>
                                        <span className="material-symbols-outlined text-primary/40">group</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaching Philosophy */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-deep-blue text-4xl font-extrabold">Our Teaching Philosophy</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'psychology', title: 'Concept First', desc: 'We ensure every student understands fundamentals before moving to application — building unshakeable foundations.' },
                            { icon: 'fact_check', title: 'Test & Improve', desc: 'Weekly tests and regular mock exams keep students board-ready throughout the year.' },
                            { icon: 'groups', title: 'Never Left Behind', desc: 'Dedicated doubt-clearing sessions and small batch sizes ensure personalized attention for every student.' },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow group text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors mx-auto">
                                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                                <p className="text-slate-600 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-3xl font-bold">Learn from the best</h2>
                        <p className="text-slate-200 opacity-90 mt-2">Book a free demo class with our faculty today.</p>
                    </div>
                    <button onClick={onEnroll} className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all uppercase tracking-wide">Book Free Demo</button>
                </div>
            </section>
        </div>
    );
}


