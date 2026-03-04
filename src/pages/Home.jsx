import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <section className="relative h-[650px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBg6-W-tYCSAccZeMiaaJI5pMbVAxEoZ4ETgyE7BeWL3SbpKV67AQheRqN79XkRxzwhsWqGdUTTrg5qgN9uID9YauqO6sUqQWScnTDBL9lDWZCVBwGGYhWG-Ys1U9Z0UfmBpkOrkM4-ZeLVMM79elLaLYFHnWUEyZEYJdpULixeF-vF6HLLt9rQrdT_V44w36u9kzPaElhpYaIt9wnDEHFR5EHOULNL99D_DHKZOR_vsnhuXn9vpVbf8uVXDM96j88y8YkpbGAomoif')" }}>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 px-4 py-1.5 rounded-full text-white font-semibold text-sm backdrop-blur-sm">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span>ADMISSIONS OPEN 2026-27</span>
                        </div>
                        <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight">
                            Achieve Board Success with <span className="text-purple-300">The Sanskriti Academy</span>
                        </h1>
                        <p className="text-slate-200 text-xl font-light">
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

            {/* Faculty Preview */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Meet Our Mentors</h3>
                    <h2 className="text-deep-blue text-4xl font-extrabold">Our Expert Faculty</h2>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto mb-12">The backbone of our academy â€” dedicated professionals committed to your academic excellence.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { name: 'Navneet Prakash', role: 'Director & Mathematics Specialist', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATXBC84VRnnI-OAuNwMACtwOHzTDh_4BgTKwJ1yZHEoyVipaU6UT_pSsvp2d747z1Kk6ERh66nzrHJSa3MnrERAv5tlKbDXmLHk4B741IR97f65QzXVOEK4-uzmpHvAZMYQlkyy8P7nF4QtLKhcozRggRhv8YyOO53oGAdBWAWmJv4gDKHfjP_NUf4Wl4PtHLvnDsJ6fv6pK0rNEINWpwSqT6EkHPh1_SMv2FC2__yW52XcQCflB3bxYVTPr38_YdYRWGYnmIe-Y37' },
                            { name: 'Priyanka Prakash', role: 'Science HOD & Life Coach', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5hNeDTVo0c_6BR9FVfUQ8jdMAwLDDSYydsn347MfUMhg-6B15X-sXdWE0wwzCWhlvbrv1E3dTE64si8scHuwrtlwlQHCPcYeA6DvkEDi35AiljFFgqE45S7ivhMwo94dPMRjPTPkCW70HY3Y8Xb9Nq1w_xhL09o7LIUqwZdMVlP0yJjalbj5Q4OHQlGJ5Sa2lfkLpeoCf2Rfa-vaK0MnZmwcoP1UfE0g56vW-4OtO6iMyKaemrS4FhvYeGWsR5EZ19vcaZfoJF3PW' },
                            { name: 'Vivek Prakash', role: 'Social Science & Humanities Expert', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByBbe14HMC27uZD2Y9mckvY9fxnTeGQKDn55DjydR4xCDyvst7-904oNxO2MVdMMQzwWb7W_YeMcneC8-VeWFHYTz-i75ihuF8JyugMHSpFCHZOrgv_FITzW2i2HQKZnGDeRzEAoGjpHnYkyI48DuVllaGFtTppwhDv87tu_Ngnz-Kn48gZkGuc8IPCr6BoefXFAsx9IHkdS7AFRMFR2G8WG4a3poHoZAdJ62JbJaaCbr6ZAxkB18S6BuTmvhLzaScF2VgDYTiccYu' },
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
                        Meet All Faculty â†’
                    </Link>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
                        <p className="text-purple-100 opacity-90 mt-2">Get personalized counseling and a roadmap to success today.</p>
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

