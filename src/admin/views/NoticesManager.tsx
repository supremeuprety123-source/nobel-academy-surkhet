import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Search, Trash2, Loader2, Calendar } from 'lucide-react';

export default function NoticeManager() {
    const [notices, setNotices] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form states mapped to structural data columns
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Academic');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    async function fetchNotices() {
        setLoading(true);
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('date', { ascending: false });

        if (!error && data) setNotices(data);
        setLoading(false);
    }

    useEffect(() => { fetchNotices(); }, []);

    async function handleCreateNotice(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !description) return;
        setSubmitting(true);

        // We fill all alternative columns (title, topic, heading) simultaneously
        // so that your NoticeBoard component will find the text regardless of its lookups!
        const { error } = await supabase.from('notices').insert([{
            title: title,
            topic: title,
            heading: title,
            description: description,
            summary: description,
            type: type,
            category: type,
            expiry_date: expiryDate || null
        }]);

        if (error) {
            console.error("Notice Save Error:", error);
            alert(`Error saving notice: ${error.message}`);
        } else {
            setTitle('');
            setDescription('');
            setExpiryDate('');
            setShowModal(false);
            fetchNotices();
        }
        setSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this notice?')) return;
        const { error } = await supabase.from('notices').delete().eq('id', id);
        if (!error) fetchNotices();
    }

    const filteredNotices = notices.filter(item =>
        ((item.title || item.topic || '').toLowerCase()).includes(searchTerm.toLowerCase()) ||
        ((item.type || '').toLowerCase()).includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Notice Board Manager</h2>
                    <p className="text-xs text-slate-500">Publish active bulletins, urgent alerts, or holiday structural notices.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
                >
                    <Plus size={16} /> Create Notice
                </button>
            </div>

            {/* Filter Search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm max-w-md">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search dashboard notices..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display Loop Card Layout */}
            {loading ? (
                <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNotices.map(item => (
                        <div key={item.id} className="flex flex-col justify-between border border-slate-200 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="rounded-lg bg-slate-100 text-slate-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                                        {item.type || item.category || 'General'}
                                    </span>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                                        <Calendar size={12} />
                                        <span>{item.date || 'Recent'}</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">{item.title || item.topic}</h4>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-4 leading-relaxed font-light">{item.description || item.summary}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-slate-50 inline-flex items-center gap-1 text-xs font-semibold"
                                >
                                    <Trash2 size={14} /> Delete Notice
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredNotices.length === 0 && (
                        <div className="col-span-full py-12 text-center text-sm text-slate-400 italic bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            No notices logged. Use the 'Create Notice' button above to post one.
                        </div>
                    )}
                </div>
            )}

            {/* Modal Form Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-slate-100 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-900">Post New Notice</h3>

                        <form onSubmit={handleCreateNotice} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Notice Title / Topic</label>
                                <input
                                    required
                                    placeholder="e.g., Terminal Examination Postponement"
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Tag Type</label>
                                    <select
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                        value={type}
                                        onChange={e => setType(e.target.value)}
                                    >
                                        <option>Academic</option>
                                        <option>Urgent</option>
                                        <option>Admission</option>
                                        <option>General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                        value={expiryDate}
                                        onChange={e => setExpiryDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Notice Description Body</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Type complete structural details for the student bulletin feed..."
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none resize-none"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3 pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-1/2 bg-amber-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    {submitting && <Loader2 size={14} className="animate-spin" />} Save Notice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}