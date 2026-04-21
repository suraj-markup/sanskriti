import React, { useMemo, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import { galleryImages } from '../data/galleryImages';

const categories = ['All', ...Array.from(new Set(galleryImages.map(i => i.category)))];

export default function Gallery() {
    const [active, setActive] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = useMemo(
        () => (active === 'All' ? galleryImages : galleryImages.filter(img => img.category === active)),
        [active]
    );

    return (
        <div className="w-full">
            <header className="py-16 bg-background-light border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block text-primary font-semibold uppercase tracking-wider text-xs mb-3">Our Campus</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-deep-blue mb-4">Gallery</h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
                        A visual tour of The Sanskriti Academy — our classrooms, faculty, campus, and student life.
                    </p>
                </div>
            </header>

            {/* Featured carousel */}
            <section className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ImageCarousel images={galleryImages} />
                </div>
            </section>

            {/* Grid with category filter */}
            <section className="pb-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {filtered.map((img) => (
                            <button
                                key={img.src}
                                type="button"
                                onClick={() => setLightbox(img)}
                                className="relative group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                    <div className="text-left">
                                        <p className="text-white text-sm font-medium">{img.caption}</p>
                                        <span className="text-[11px] text-white/80">{img.category}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {lightbox && (
                <div
                    className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute -top-10 right-0 text-white/90 text-sm flex items-center gap-1 hover:text-white"
                            onClick={() => setLightbox(null)}
                        >
                            <span className="material-symbols-outlined text-base">close</span> Close
                        </button>
                        <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-lg shadow-xl" />
                        {lightbox.caption && (
                            <p className="text-white/90 text-center mt-3 text-sm">{lightbox.caption}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
