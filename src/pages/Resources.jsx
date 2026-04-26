import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    listResources,
    fileKindFromMime,
    toneClasses,
    formatFileSize,
    formatModifiedDate,
} from '../data/resources';

export default function Resources() {
    const [status, setStatus] = useState('loading');
    const [files, setFiles] = useState([]);
    const [configured, setConfigured] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const result = await listResources();
                if (cancelled) return;
                setConfigured(result.configured);
                setFiles(result.files);
                setStatus('ok');
            } catch (err) {
                if (cancelled) return;
                setError(err.message || 'Unknown error');
                setStatus('error');
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const kindLabels = Array.from(
        new Set(files.map(f => fileKindFromMime(f.mimeType).label))
    );
    const filterOptions = ['All', ...kindLabels];
    const visibleFiles =
        filter === 'All'
            ? files
            : files.filter(f => fileKindFromMime(f.mimeType).label === filter);

    return (
        <div className="w-full">
            <header className="py-16 bg-background-light border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block text-primary font-semibold uppercase tracking-wider text-xs mb-3">Resources</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-deep-blue mb-4">Study Material</h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
                        Notes, worksheets, past papers and reference docs for Classes VIII–X — uploaded by our faculty.
                    </p>
                </div>
            </header>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {status === 'loading' && <LoadingState />}
                    {status === 'error' && <ErrorState message={error} />}
                    {status === 'ok' && !configured && <UnconfiguredState />}
                    {status === 'ok' && configured && files.length === 0 && <EmptyState />}
                    {status === 'ok' && configured && files.length > 0 && (
                        <>
                            {filterOptions.length > 2 && (
                                <div className="flex flex-wrap gap-2 justify-center mb-10">
                                    {filterOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setFilter(opt)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === opt
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <FileGrid files={visibleFiles} />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

function FileGrid({ files }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map(file => {
                const kind = fileKindFromMime(file.mimeType);
                const tone = toneClasses(kind.tone);
                return (
                    <a
                        key={file.id}
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group block bg-white rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all p-5"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${tone.bg}`}>
                                <span className={`material-symbols-outlined text-2xl ${tone.icon}`}>{kind.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-deep-blue group-hover:text-primary transition-colors break-words leading-snug">
                                    {file.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-slate-500">
                                    <span className="font-semibold uppercase tracking-wider">{kind.label}</span>
                                    {file.size && <span aria-hidden>·</span>}
                                    {file.size && <span>{formatFileSize(file.size)}</span>}
                                    {file.modifiedTime && <span aria-hidden>·</span>}
                                    {file.modifiedTime && <span>Updated {formatModifiedDate(file.modifiedTime)}</span>}
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors shrink-0">arrow_outward</span>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

function LoadingState() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-slate-100 rounded w-4/5" />
                            <div className="h-3 bg-slate-100 rounded w-2/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ErrorState({ message }) {
    return (
        <div className="text-center max-w-xl mx-auto py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-5">
                <span className="material-symbols-outlined text-4xl">error</span>
            </div>
            <h2 className="text-xl font-bold text-deep-blue mb-2">We couldn't load resources</h2>
            <p className="text-slate-600 text-sm mb-2">
                The Drive folder may be private, or the API key may be invalid. Please try again in a few minutes.
            </p>
            {import.meta.env.DEV && message && (
                <p className="text-xs text-slate-400 font-mono break-all">{message}</p>
            )}
        </div>
    );
}

function UnconfiguredState() {
    return (
        <div className="text-center max-w-xl mx-auto py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-5">
                <span className="material-symbols-outlined text-4xl">build</span>
            </div>
            <h2 className="text-xl font-bold text-deep-blue mb-2">Setup needed</h2>
            <p className="text-slate-600 text-sm">
                Set <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">VITE_GOOGLE_DRIVE_API_KEY</code> and{' '}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">VITE_GOOGLE_DRIVE_FOLDER_ID</code> in your <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">.env</code> file.
            </p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="max-w-3xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Coming Soon
            </div>
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-5xl">folder_open</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">Study material is on its way</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                Our faculty is curating notes, worksheets and past papers for each class. Check back soon — or reach out and we'll send you the latest material directly.
            </p>
            <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
                Get in touch
                <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
        </div>
    );
}
