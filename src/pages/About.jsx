import React from 'react';
import { Link } from 'react-router-dom';

export default function About({ onEnroll }) {
    return (
        <div className="w-full">
            {/* Hero Banner */}
            <header className="relative py-24 overflow-hidden bg-background-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-sm mb-4 uppercase tracking-wider">A Tradition of Trust</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">About The Sanskriti Academy</h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
                        The Sanskriti Academy is a result-oriented coaching institute focused on providing high-quality education to students of Classes VIII to X. We specialize in preparing students for board examinations with structured guidance, disciplined learning, and personal attention.
                    </p>
                </div>
            </header>

            {/* Philosophy */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                                <span className="w-8 h-px bg-accent"></span>
                                Our Core Philosophy
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">We believe not just in promises, but in performance.</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                As parents, you seek more than just an after-school class; you seek a partner in your child's academic journey. We understand the pressure of board examinations and the importance of a strong foundation in Classes VIII, IX, and X.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Structured Guidance', desc: 'Meticulously planned curriculum for board success.' },
                                    { title: 'Disciplined Learning', desc: 'Fostering habits that lead to lifelong excellence.' },
                                    { title: 'Personal Attention', desc: 'Small batches ensuring no child is left behind.' },
                                    { title: 'Result Oriented', desc: 'Proven track record of board exam toppers.' },
                                ].map(({ title, desc }) => (
                                    <div key={title} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{title}</h4>
                                            <p className="text-sm text-slate-500">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 to-amber-100 rounded-3xl -z-10 blur-2xl"></div>
                            <img
                                alt="Dedicated study environment"
                                className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[450px]"
                                src="/images/mentorship-session.png"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100">
                                <p className="text-accent font-bold text-lg mb-2 italic">"A Parent's Trust"</p>
                                <p className="text-slate-600 text-sm">"The personal attention my child received at Sanskriti Academy turned her board exam anxiety into confidence."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">flag</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Committed to helping students achieve new academic heights within their own city. We believe that quality education shouldn't require long commutes or relocation; the best guidance should be available right here for our community's youth.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">verified</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                To be the most trusted academic partner for parents and students in the region, recognized for our unwavering commitment to performance, integrity, and the holistic development of every student under our care.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Director's Message */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-5/12 relative">
                            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent rounded-2xl -z-10 opacity-30"></div>
                            <img
                                alt="Vivek Prakash - Director"
                                className="rounded-2xl shadow-2xl object-cover aspect-[4/5] w-full"
                                src="/teachers/vivek.png"
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200">
                                <p className="font-bold text-xl text-slate-900">Vivek Prakash</p>
                                <p className="text-accent text-sm font-semibold tracking-widest uppercase">Director &amp; Founder</p>
                            </div>
                        </div>
                        <div className="w-full md:w-7/12">
                            <span className="text-accent font-bold uppercase tracking-widest text-sm">A Message from the Director</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-8 leading-tight">Bridging the Gap Between Effort and Results</h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>"When I founded The Sanskriti Academy, I saw many hardworking students struggling not because they lacked talent, but because they lacked a structured path. My goal was simple: to bring world-class coaching standards to our own city."</p>
                                <p>"We treat every student's board exam as our own. Our focus on Classes VIII-X is intentional — these are the most formative years where academic discipline is built."</p>
                                <p>"To the parents, I promise this: your child's growth is our priority. We provide the guidance and the discipline; they provide the effort. Together, we achieve excellence."</p>
                            </div>
                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-1 w-16 bg-primary rounded-full"></div>
                                <span className="font-bold text-slate-900 tracking-widest uppercase text-sm">Vivek Prakash</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Give Your Child the Advantage of Excellence</h2>
                    <p className="text-slate-200 mb-10 max-w-2xl mx-auto text-lg">We are now enrolling for the current academic session for Classes VIII, IX, and X.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button onClick={onEnroll} className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 hover:bg-background-light">
                            <span className="material-symbols-outlined">event</span>
                            Schedule a Visit
                        </button>
                        <Link to="/results" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all">
                            View Past Results
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

