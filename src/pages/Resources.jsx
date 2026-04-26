import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    listResources,
    getFolderInfo,
    fileKindFromMime,
    toneClasses,
    formatFileSize,
    formatModifiedDate,
    isFolder,
    ROOT_FOLDER_ID,
} from '../data/resources';

const ROOT = { id: ROOT_FOLDER_ID, name: 'Study Material' };

export default function Resources() {
    const { folderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const currentFolderId = folderId || ROOT_FOLDER_ID;

    const [path, setPath] = useState(() => location.state?.path || [ROOT]);
    const [status, setStatus] = useState('loading');
    const [files, setFiles] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [configured, setConfigured] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    // Refetch whenever the URL folder changes.
    useEffect(() => {
        let cancelled = false;
        setStatus('loading');
        setFiles([]);
        setNextPageToken(null);
        setFilter('All');
        setQuery('');

        // Reconcile the breadcrumb path with the URL.
        const statePath = location.state?.path;
        if (statePath && statePath[statePath.length - 1].id === currentFolderId) {
            setPath(statePath);
        } else if (currentFolderId === ROOT_FOLDER_ID) {
            setPath([ROOT]);
        } else {
            // Cold link load — show a placeholder while we fetch the folder name.
            setPath([ROOT, { id: currentFolderId, name: 'Loading…' }]);
            getFolderInfo(currentFolderId).then(info => {
                if (cancelled || !info) return;
                setPath([ROOT, { id: info.id, name: info.name }]);
            });
        }

        listResources(currentFolderId)
            .then(result => {
                if (cancelled) return;
                setConfigured(result.configured);
                setFiles(result.files);
                setNextPageToken(result.nextPageToken);
                setStatus('ok');
            })
            .catch(err => {
                if (cancelled) return;
                setError(err.message || 'Unknown error');
                setStatus('error');
            });

        return () => { cancelled = true; };
    }, [currentFolderId, location.key]);

    const folders = useMemo(() => files.filter(isFolder), [files]);
    const documents = useMemo(() => files.filter(f => !isFolder(f)), [files]);

    const kindLabels = useMemo(
        () => Array.from(new Set(documents.map(f => fileKindFromMime(f.mimeType).label))),
        [documents]
    );
    const filterOptions = ['All', ...kindLabels];

    const visibleDocuments = useMemo(() => {
        const q = query.trim().toLowerCase();
        return documents
            .filter(f => filter === 'All' || fileKindFromMime(f.mimeType).label === filter)
            .filter(f => !q || f.name.toLowerCase().includes(q));
    }, [documents, filter, query]);

    const onSelectItem = (item) => {
        if (isFolder(item)) {
            const newPath = [...path, { id: item.id, name: item.name }];
            navigate(`/resources/${item.id}`, { state: { path: newPath } });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setPreviewFile(item);
        }
    };

    const onNavigateToCrumb = (idx) => {
        const newPath = path.slice(0, idx + 1);
        if (idx === 0) {
            navigate('/resources', { state: { path: [ROOT] } });
        } else {
            navigate(`/resources/${newPath[newPath.length - 1].id}`, { state: { path: newPath } });
        }
    };

    const onLoadMore = async () => {
        if (loadingMore || !nextPageToken) return;
        setLoadingMore(true);
        try {
            const result = await listResources(currentFolderId, nextPageToken);
            setFiles(prev => [...prev, ...result.files]);
            setNextPageToken(result.nextPageToken);
        } catch (err) {
            console.error('Drive: load more failed', err);
        } finally {
            setLoadingMore(false);
        }
    };

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

            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {path.length > 1 && <Breadcrumbs path={path} onNavigate={onNavigateToCrumb} />}

                    {status === 'loading' && <LoadingState />}
                    {status === 'error' && <ErrorState message={error} />}
                    {status === 'ok' && !configured && <UnconfiguredState />}
                    {status === 'ok' && configured && files.length === 0 && (
                        path.length === 1 ? <EmptyState /> : <EmptyFolderState />
                    )}

                    {status === 'ok' && configured && files.length > 0 && (
                        <>
                            {folders.length > 0 && (
                                <div className="mb-10">
                                    {documents.length > 0 && (
                                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Folders</h2>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {folders.map(folder => (
                                            <FolderCard key={folder.id} folder={folder} onSelect={onSelectItem} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {documents.length > 0 && (
                                <>
                                    {folders.length > 0 && (
                                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Files</h2>
                                    )}

                                    {(documents.length > 5 || query) && (
                                        <div className="relative max-w-md mx-auto mb-6">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                                            <input
                                                type="search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Search files in this folder…"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                            />
                                        </div>
                                    )}

                                    {filterOptions.length > 2 && (
                                        <div className="flex flex-wrap gap-2 justify-center mb-8">
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

                                    {visibleDocuments.length === 0 ? (
                                        <p className="text-center text-slate-500 text-sm py-8">
                                            No files match {query ? `"${query}"` : 'this filter'}.
                                        </p>
                                    ) : (
                                        <FileGrid files={visibleDocuments} onSelect={onSelectItem} />
                                    )}
                                </>
                            )}

                            {nextPageToken && (
                                <div className="text-center mt-10">
                                    <button
                                        onClick={onLoadMore}
                                        disabled={loadingMore}
                                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60 transition-colors"
                                    >
                                        {loadingMore ? 'Loading…' : 'Load more'}
                                        {!loadingMore && <span className="material-symbols-outlined text-base">expand_more</span>}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {previewFile && (
                <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
            )}
        </div>
    );
}

function Breadcrumbs({ path, onNavigate }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                {path.map((crumb, idx) => {
                    const isLast = idx === path.length - 1;
                    return (
                        <li key={crumb.id || 'root'} className="flex items-center gap-1.5">
                            {idx > 0 && (
                                <span className="material-symbols-outlined text-slate-400 text-base">chevron_right</span>
                            )}
                            {isLast ? (
                                <span className="font-semibold text-deep-blue truncate max-w-[200px]">{crumb.name}</span>
                            ) : (
                                <button
                                    onClick={() => onNavigate(idx)}
                                    className="text-primary hover:text-primary-hover hover:underline font-medium truncate max-w-[200px]"
                                >
                                    {crumb.name}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function FolderCard({ folder, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(folder)}
            className="group text-left bg-white rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all p-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-amber-50">
                    <span className="material-symbols-outlined text-2xl text-amber-700" style={{ fontVariationSettings: '"FILL" 1' }}>folder</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-deep-blue group-hover:text-primary transition-colors break-words leading-snug">
                        {folder.name}
                    </h3>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Folder</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors shrink-0">chevron_right</span>
            </div>
        </button>
    );
}

function FileGrid({ files, onSelect }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map(file => {
                const kind = fileKindFromMime(file.mimeType);
                const tone = toneClasses(kind.tone);
                return (
                    <button
                        key={file.id}
                        type="button"
                        onClick={() => onSelect(file)}
                        className="group text-left bg-white rounded-xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all p-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors shrink-0">visibility</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

function FilePreviewModal({ file, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = original;
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/85 flex items-stretch md:items-center justify-center md:p-6"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={file.name}
        >
            <div
                className="relative w-full max-w-5xl h-full md:h-[88vh] bg-white md:rounded-xl overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 shrink-0">
                    <h3 className="font-semibold text-deep-blue truncate text-sm md:text-base">{file.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-colors"
                            title="Open in Drive"
                            aria-label="Open in Drive"
                        >
                            <span className="material-symbols-outlined text-xl">open_in_new</span>
                        </a>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                </div>
                <iframe
                    key={file.id}
                    src={`https://drive.google.com/file/d/${file.id}/preview`}
                    title={file.name}
                    className="flex-1 w-full bg-slate-50"
                    allow="autoplay"
                />
            </div>
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

function EmptyFolderState() {
    return (
        <div className="max-w-xl mx-auto text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-5">
                <span className="material-symbols-outlined text-4xl">folder_open</span>
            </div>
            <h2 className="text-lg font-bold text-deep-blue mb-1">This folder is empty</h2>
            <p className="text-slate-500 text-sm">Nothing here yet — check back later.</p>
        </div>
    );
}
