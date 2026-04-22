import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { galleryImages } from '../data/galleryImages';
import { videos } from '../data/videos';

export default function Home({ onEnroll }) {
    // Auto-popup after user scrolls 40% of the page (once per visit)
    useEffect(() => {
        const shown = sessionStorage.getItem('popupShown');
        if (shown) return;

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const total = document.body.scrollHeight - window.innerHeight;
            if (total > 0 && scrolled / total >= 0.4) {
                sessionStorage.setItem('popupShown', 'true');
                onEnroll();
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [onEnroll]);

    return (
        <div className="w-full">
            {/* Hero */}
            <section className="relative min-h-[580px] md:h-[650px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/classroom-smartboard.png')" }}>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[580px] md:h-full flex flex-col justify-center items-start py-16 md:py-0">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 px-4 py-1.5 rounded-full text-white font-semibold text-sm backdrop-blur-sm">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span>ADMISSIONS OPEN 2026-27</span>
                        </div>
                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                            Achieve Board Success with <span className="text-amber-300">The Sanskriti Academy</span>
                        </h1>
                        <p className="text-slate-200 text-base md:text-xl font-light">
                            Defining Success, The Sanskriti Way. Join the league of toppers and unlock your true potential with our expert-led programs.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={onEnroll}
                                className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center gap-2 group shadow-xl"
                            >
                                Start Learning Now
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <Link to="/courses" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                                View Courses
                            </Link>
                        </div>
                    </div>
                    <div className="absolute right-8 bottom-8 animate-bounce hidden lg:block cursor-pointer" onClick={onEnroll}>
                        <div className="bg-primary text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center border border-white/20 hover:scale-105 transition-transform">
                            <span className="text-4xl font-black italic">FREE</span>
                            <span className="text-xl font-bold uppercase tracking-tighter border-t border-white/30 pt-1">Demo Class</span>
                            <p className="text-[10px] mt-1 opacity-80 text-white/90">Limited Slots Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Our Excellence</h3>
                        <h2 className="text-deep-blue text-4xl font-extrabold">Why Students Choose Us</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'psychology', title: 'Expert Guidance', desc: 'Learn from industry veterans and experienced educators who simplify complex concepts for better retention.' },
                            { icon: 'menu_book', title: 'Comprehensive Material', desc: 'Exclusively curated notes and mock tests designed specifically to align with the latest board patterns.' },
                            { icon: 'military_tech', title: 'Proven Results', desc: 'Our track record speaks for itself, with consistent top rankers and 100% board success rates every year.' },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="p-8 rounded-2xl bg-background-light border border-slate-100 hover:shadow-xl transition-shadow group">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                                </div>
                                <h4 className="text-deep-blue text-xl font-bold mb-3">{title}</h4>
                                <p className="text-slate-600 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Life at Sanskriti — carousel of real classroom / campus photos */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h3 className="text-primary font-semibold uppercase tracking-wider text-xs mb-2">A Glimpse Inside</h3>
                        <h2 className="text-deep-blue text-3xl md:text-4xl font-bold">Life at Sanskriti</h2>
                        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
                            Classrooms, mentorship sessions and the moments that matter — straight from our campus.
                        </p>
                    </div>
                    <ImageCarousel images={galleryImages} />
                    <div className="text-center mt-8">
                        <Link
                            to="/gallery"
                            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary-hover transition-colors"
                        >
                            View full gallery
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Watch Us Teach — YouTube teaser (coming soon until videos.js is populated) */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h3 className="text-primary font-semibold uppercase tracking-wider text-xs mb-2">Watch Us Teach</h3>
                        <h2 className="text-deep-blue text-3xl md:text-4xl font-bold">Sample Lessons on YouTube</h2>
                        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
                            {videos.length > 0
                                ? 'Sample class snippets, concept breakdowns, and topper interviews from our faculty.'
                                : 'Our video library is on its way — sample classes, concept breakdowns, and student success stories.'}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <ImageCarousel
                            aspect="aspect-video"
                            slides={videos.length > 0
                                ? videos.slice(0, 3).map(v => (
                                    <div className="w-full h-full">
                                        <YouTubeEmbed videoId={v.id} title={v.title} />
                                        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                                            <p className="text-white text-sm md:text-base font-medium">{v.title}</p>
                                        </div>
                                    </div>
                                ))
                                : ['Sample Lessons', 'Concept Breakdowns', "Toppers' Journeys"].map(label => (
                                    <div className="w-full h-full bg-background-light flex flex-col items-center justify-center text-center gap-2 px-6">
                                        <span className="material-symbols-outlined text-5xl text-primary/60">play_circle</span>
                                        <span className="text-lg md:text-xl font-semibold text-deep-blue">{label}</span>
                                        <span className="text-[11px] uppercase tracking-widest text-amber-700 font-semibold">Coming Soon</span>
                                    </div>
                                ))
                            }
                        />
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            to="/videos"
                            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary-hover transition-colors"
                        >
                            {videos.length > 0 ? 'View all videos' : 'Preview video library'}
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Faculty Preview */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Meet Our Mentors</h3>
                    <h2 className="text-deep-blue text-4xl font-extrabold">Our Expert Faculty</h2>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto mb-12">The backbone of our academy — dedicated professionals committed to your academic excellence.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { name: 'Vivek Prakash', role: 'Director', img: '/teachers/vivek.png' },
                            { name: 'Navneet Prakash', role: 'Founder & All Subjects Specialist', img: '/teachers/navneet.png' },
                            { name: 'Priyanka Prakash', role: 'Science HOD & Life Coach', img: '/teachers/priyanka.png' },
                        ].map(({ name, role, img }) => (
                            <div key={name} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
                                <div className="h-72 overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={img} alt={name} />
                                </div>
                                <div className="p-6">
                                    <h4 className="text-deep-blue text-2xl font-bold">{name}</h4>
                                    <p className="text-primary font-semibold text-sm mt-1">{role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/faculty" className="mt-10 inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all">
                        Meet All Faculty →
                    </Link>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
                        <p className="text-slate-200 opacity-90 mt-2">Get personalized counseling and a roadmap to success today.</p>
                    </div>
                    <button
                        onClick={onEnroll}
                        className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all uppercase tracking-wide"
                    >
                        Book Free Demo
                    </button>
                </div>
            </section>
        </div>
    );
}

