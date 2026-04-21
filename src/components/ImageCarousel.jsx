import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function ImageCarousel({
    images,
    autoPlay = true,
    interval = 4500,
    aspect = 'aspect-[16/10]',
}) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef(null);
    const count = images.length;

    const goTo = useCallback((next) => {
        setIndex(((next % count) + count) % count);
    }, [count]);

    const prev = useCallback(() => goTo(index - 1), [goTo, index]);
    const next = useCallback(() => goTo(index + 1), [goTo, index]);

    useEffect(() => {
        if (!autoPlay || paused || count <= 1) return;
        const id = setInterval(() => setIndex(i => (i + 1) % count), interval);
        return () => clearInterval(id);
    }, [autoPlay, paused, interval, count]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx > 40) prev();
        else if (dx < -40) next();
        touchStartX.current = null;
    };

    return (
        <div
            className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className={`relative ${aspect}`}>
                {images.map((img, i) => (
                    <div
                        key={img.src}
                        className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-hidden={i !== index}
                    >
                        <img
                            src={img.src}
                            alt={img.alt || ''}
                            className="w-full h-full object-cover"
                            loading={i === 0 ? 'eager' : 'lazy'}
                        />
                        {img.caption && (
                            <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5">
                                <p className="text-white text-sm md:text-base font-medium">{img.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm flex items-center justify-center transition-colors"
            >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm flex items-center justify-center transition-colors"
            >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </div>
    );
}
