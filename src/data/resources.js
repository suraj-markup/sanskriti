// Google Drive resource manifest fetcher.
//
// Reads VITE_GOOGLE_DRIVE_API_KEY and VITE_GOOGLE_DRIVE_FOLDER_ID from the
// environment (via `.env`). The folder must be shared as "Anyone with the
// link can view"; the API key must have Drive API enabled and ideally an
// HTTP referrer restriction to your production domain.

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

export const ROOT_FOLDER_ID = FOLDER_ID;
export const FOLDER_MIME = 'application/vnd.google-apps.folder';

export function isConfigured() {
    return Boolean(API_KEY && FOLDER_ID);
}

export function isFolder(file) {
    return file?.mimeType === FOLDER_MIME;
}

export async function listResources(folderId = FOLDER_ID, pageToken = null) {
    if (!API_KEY || !folderId) {
        return { configured: false, files: [], nextPageToken: null };
    }

    const url = new URL('https://www.googleapis.com/drive/v3/files');
    // Folders first (then by recency) so they render at the top of the list.
    url.searchParams.set('q', `'${folderId}' in parents and trashed=false`);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set(
        'fields',
        'nextPageToken,files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink,thumbnailLink)'
    );
    url.searchParams.set('orderBy', 'folder,modifiedTime desc');
    url.searchParams.set('pageSize', '100');
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Drive API ${res.status}: ${body || res.statusText}`);
    }
    const data = await res.json();
    return {
        configured: true,
        files: data.files || [],
        nextPageToken: data.nextPageToken || null,
    };
}

// Fetch a single folder's metadata — used to rebuild a breadcrumb when the
// user lands on /resources/:folderId cold (no router state).
export async function getFolderInfo(folderId) {
    if (!API_KEY || !folderId) return null;
    const url = new URL(`https://www.googleapis.com/drive/v3/files/${folderId}`);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('fields', 'id,name,mimeType');
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}

const KIND_BY_MIME = {
    'application/pdf': { label: 'PDF', icon: 'picture_as_pdf', tone: 'pdf' },
    'application/vnd.google-apps.document': { label: 'Doc', icon: 'description', tone: 'doc' },
    'application/msword': { label: 'Doc', icon: 'description', tone: 'doc' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { label: 'Doc', icon: 'description', tone: 'doc' },
    'application/vnd.google-apps.spreadsheet': { label: 'Sheet', icon: 'table_chart', tone: 'sheet' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { label: 'Sheet', icon: 'table_chart', tone: 'sheet' },
    'application/vnd.ms-excel': { label: 'Sheet', icon: 'table_chart', tone: 'sheet' },
    'application/vnd.google-apps.presentation': { label: 'Slides', icon: 'slideshow', tone: 'slides' },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': { label: 'Slides', icon: 'slideshow', tone: 'slides' },
    'application/vnd.google-apps.folder': { label: 'Folder', icon: 'folder', tone: 'folder' },
};

export function fileKindFromMime(mimeType = '') {
    if (KIND_BY_MIME[mimeType]) return KIND_BY_MIME[mimeType];
    if (mimeType.startsWith('image/')) return { label: 'Image', icon: 'image', tone: 'media' };
    if (mimeType.startsWith('video/')) return { label: 'Video', icon: 'videocam', tone: 'media' };
    if (mimeType.startsWith('audio/')) return { label: 'Audio', icon: 'graphic_eq', tone: 'media' };
    return { label: 'File', icon: 'insert_drive_file', tone: 'default' };
}

const TONE_CLASSES = {
    pdf: { bg: 'bg-red-50', icon: 'text-red-600' },
    doc: { bg: 'bg-blue-50', icon: 'text-blue-600' },
    sheet: { bg: 'bg-emerald-50', icon: 'text-emerald-600' },
    slides: { bg: 'bg-amber-50', icon: 'text-amber-700' },
    media: { bg: 'bg-slate-100', icon: 'text-slate-600' },
    folder: { bg: 'bg-amber-50', icon: 'text-amber-700' },
    default: { bg: 'bg-slate-100', icon: 'text-slate-600' },
};

export function toneClasses(tone) {
    return TONE_CLASSES[tone] || TONE_CLASSES.default;
}

export function formatFileSize(bytes) {
    const n = Number(bytes);
    if (!n) return '';
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
    return `${(n / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

export function formatModifiedDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
