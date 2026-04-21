import React, { useState } from 'react';

// Lite YouTube embed — shows a thumbnail until the user clicks play, then
// swaps to the real iframe. Avoids loading ~500KB of YouTube player JS on
// initial page load.
export default function YouTubeEmbed({ videoId, title = '' }) {
    const [playing, setPlaying] = useState(false);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
            {playing ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title || 'YouTube video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={title ? `Play: ${title}` : 'Play video'}
                    className="absolute inset-0 w-full h-full group cursor-pointer"
                >
                    <img
                        src={thumbnail}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <span
                                className="material-symbols-outlined text-white text-4xl"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                play_arrow
                            </span>
                        </div>
                    </div>
                </button>
            )}
        </div>
    );
}
