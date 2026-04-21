import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { videos } from '../data/videos';

const placeholderCategories = ['Sample Lessons', 'Concept Breakdowns', "Toppers' Journeys"];

export default function Videos() {
    const hasVideos = videos.length > 0;
    const categories = useMemo(
        () => ['All', ...Array.from(new Set(videos.map(v => v.category)))],
        []
    );
    const [active, setActive] = useState('All');
    const filtered = active === 'All' ? videos : videos.filter(v => v.category === active);

    return (
        <div className="w-full">
            <header className="py-16 bg-background-light border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block text-primary font-semibold uppercase tracking-wider text-xs mb-3">Video Library</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-deep-blue mb-4">Watch Us Teach</h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
                        Sample class snippets, concept breakdowns, and student success stories from The Sanskriti Academy.
                    </p>
                </div>
            </header>

            {hasVideos ? (
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {categories.length > 2 && (
                            <div className="flex flex-wrap gap-2 justify-center mb-10">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActive(cat)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${active === cat
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                            {filtered.map(v => (
                                <div key={v.id}>
                                    <YouTubeEmbed videoId={v.id} title={v.title} />
                                    <div className="mt-3">
                                        <p className="font-semibold text-deep-blue">{v.title}</p>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">{v.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            Coming Soon
                        </div>
                        <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6">
                            <span
                                className="material-symbols-outlined text-5xl"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                play_circle
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">
                            Our video library is on its way
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
                            We're building a curated collection of sample classes, chapter summaries, and student success stories. Get in touch to be notified when it goes live.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                            {placeholderCategories.map(label => (
                                <div
                                    key={label}
                                    className="aspect-video rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-1"
                                >
                                    <span className="material-symbols-outlined text-3xl">play_circle</span>
                                    <span className="text-sm font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            Notify Me
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
