import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Search, Trash2, Calendar, Loader2, Upload, Image as ImageIcon } from 'lucide-react';

interface Event {
    id: string;
    heading: string;
    type: string;
    description: string;
    date: string;
    photo_url: string;
}

export default function NewsEventsManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form Fields State
    const [heading, setHeading] = useState('');
    const [type, setType] = useState('Sports');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function fetchEvents() {
        setLoading(true);
        const { data, error } = await supabase
            .from('news_events')
            .select('*')
            .order('date', { ascending: false });

        if (!error && data) setEvents(data as Event[]);
        setLoading(false);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    async function handleCreateEvent(e: React.FormEvent) {
        e.preventDefault();
        if (!heading || !description) return;
        setSubmitting(true);

        let final_photo_url = '';

        try {
            // Handle Image Upload if file exists
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `events/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('nobel-assets')
                    .upload(filePath, imageFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error("Storage upload exception:", uploadError);
                    alert(`Upload Failed: ${uploadError.message}`);
                    setSubmitting(false);
                    return;
                }

                // Correct public URL acquisition syntax
                const { data: urlData } = supabase.storage
                    .from('nobel-assets')
                    .getPublicUrl(filePath);

                if (urlData?.publicUrl) {
                    final_photo_url = urlData.publicUrl;
                }
            }

            // Insert into Database with explicitly validated photo data
            const { error: dbError } = await supabase.from('news_events').insert([{
                heading,
                type,
                description,
                photo_url: final_photo_url // explicitly passing verified URL
            }]);

            if (dbError) {
                console.error("Database save validation error:", dbError);
                alert(`Database Error: ${dbError.message}`);
            } else {
                // Clear state upon success
                setHeading('');
                setDescription('');
                setImageFile(null);
                setShowModal(false);
                fetchEvents();
            }
        } catch (err) {
            console.error("Unexpected pipeline execution error:", err);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to permanently delete this event post?')) return;
        const { error } = await supabase.from('news_events').delete().eq('id', id);
        if (!error) fetchEvents();
    }

    const filteredEvents = events.filter(e =>
        e.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">News & Campus Events</h2>
                    <p className="text-xs text-slate-500">Highlight student accomplishments, sports, and cultural festivals for the community.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                    <Plus size={16} /> Log New Event
                </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm max-w-md">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Filter events..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="relative h-44 w-full bg-slate-100 flex items-center justify-center border-b border-slate-100">
                                {event.photo_url ? (
                                    <img src={event.photo_url} alt={event.heading} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-1 text-slate-400">
                                        <ImageIcon size={32} className="text-slate-300" />
                                        <span className="text-[10px] font-medium">No Image Uploaded</span>
                                    </div>
                                )}
                                <span className="absolute left-3 top-3 rounded-lg bg-slate-900/70 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white">
                                    {event.type}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-5">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">{event.heading}</h3>
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">{event.description}</p>
                                </div>
                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                                        <Calendar size={12} />
                                        <span>{event.date || 'Today'}</span>
                                    </div>
                                    <button onClick={() => handleDelete(event.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-lg hover:bg-slate-50">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900">Create Event Post</h3>
                        <form onSubmit={handleCreateEvent} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Event Title</label>
                                <input type="text" required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" value={heading} onChange={e => setHeading(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Event Scope</label>
                                <select className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none" value={type} onChange={e => setType(e.target.value)}>
                                    <option>Sports</option>
                                    <option>Annual Program</option>
                                    <option>Cultural Event</option>
                                    <option>Educational Tour</option>
                                    <option>Result Announcement</option>
                                    <option>Competition</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Banner Image Upload</label>
                                <div className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-slate-300 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors relative cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                    <div className="text-center space-y-1">
                                        <Upload size={20} className="mx-auto text-slate-400" />
                                        <p className="text-xs font-semibold text-slate-600">
                                            {imageFile ? imageFile.name : 'Click to select or drop event poster asset'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Details Description</label>
                                <textarea rows={4} required className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none resize-none" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                                    {submitting && <Loader2 size={14} className="animate-spin" />} Launch Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}