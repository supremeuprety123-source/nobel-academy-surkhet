import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, Loader2, ImageIcon, X } from 'lucide-react';

interface GalleryItem {
    id: string;
    heading: string;
    type: string;
    photo_url: string;
    description: string; // Added description field
}

export default function LifeAtNobelManager() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [heading, setHeading] = useState('');
    const [type, setType] = useState('Classroom Life');
    const [description, setDescription] = useState(''); // Added state hook
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function fetchGallery() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('life_at_nobel')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) setItems(data as GalleryItem[]);
        } catch (err) {
            console.error("Failed fetching live records:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGallery(); }, []);

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        if (!heading.trim() || !imageFile) return;
        setSubmitting(true);

        try {
            const fileExt = imageFile.name.split('.').pop();
            const filePath = `gallery/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('nobel-assets')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('nobel-assets').getPublicUrl(filePath);

            if (data?.publicUrl) {
                const { error: insertError } = await supabase
                    .from('life_at_nobel')
                    .insert([{
                        heading: heading.trim(),
                        type,
                        photo_url: data.publicUrl,
                        description: description.trim() // Commit description to Supabase
                    }]);

                if (insertError) throw insertError;

                // Reset variables cleanly
                setHeading('');
                setDescription('');
                setImageFile(null);
                setShowModal(false);
                fetchGallery();
            }
        } catch (error: any) {
            alert(error.message || 'An error occurred during asset processing');
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Remove this photo from the public portal gallery?')) return;

        try {
            const { error } = await supabase.from('life_at_nobel').delete().eq('id', id);
            if (!error) {
                setItems(prev => prev.filter(item => item.id !== id));
            } else {
                throw error;
            }
        } catch (err: any) {
            alert('Could not complete content drop: ' + err.message);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Life At Nobel Media Desk</h2>
                    <p className="text-xs text-slate-500 mt-1">Organize and display snapshots from labs, tours, sports programs, and computer centers.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all shadow-sm"
                >
                    <Plus size={16} /> Upload Media
                </button>
            </div>

            {loading ? (
                <div className="flex h-40 items-center justify-center text-slate-400">
                    <Loader2 className="animate-spin text-indigo-600" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400">
                    <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No live photos uploaded yet.</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map(item => (
                        <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                            <img src={item.photo_url} alt={item.heading} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                                <span className="text-[10px] font-bold bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-md w-fit tracking-wide">{item.type}</span>
                                <h5 className="font-semibold text-sm mt-1 line-clamp-1">{item.heading}</h5>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="absolute right-3 top-3 bg-rose-500 p-1.5 rounded-lg text-white hover:bg-rose-600 shadow-md transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X size={18} />
                        </button>

                        <h3 className="text-lg font-bold text-slate-900">Upload Gallery Image</h3>

                        <form onSubmit={handleUpload} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Caption Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Chemistry Lab Investigation Session"
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                                    value={heading}
                                    onChange={e => setHeading(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Gallery Section</label>
                                <select
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                >
                                    <option>Classroom Life</option>
                                    <option>Labs & Equipment</option>
                                    <option>ECA Activities</option>
                                    <option>Sports Logs</option>
                                    <option>Tours & Travels</option>
                                </select>
                            </div>

                            {/* New Description Input Field Block */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Context Summary / Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="Add background context details or specify event details..."
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none resize-none"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Media Asset File</label>
                                <div className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-slate-300 p-6 bg-slate-50/50 hover:bg-slate-50 relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                    <div className="text-center space-y-1">
                                        <ImageIcon size={22} className="mx-auto text-slate-400" />
                                        <p className="text-xs font-semibold text-slate-600 max-w-[250px] truncate">
                                            {imageFile ? imageFile.name : 'Choose high-quality school photo'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-indigo-400 transition-colors shadow-sm">
                                    {submitting && <Loader2 size={14} className="animate-spin" />}
                                    {submitting ? 'Uploading...' : 'Commit Asset'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}