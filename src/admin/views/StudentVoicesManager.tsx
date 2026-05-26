import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Search, Trash2, Loader2, Upload, User, Award } from 'lucide-react';

interface Voice {
    id: string;
    student_name: string;
    education_status: string;
    achievement: string;
    review: string;
    student_photo_url: string;
}

export default function StudentVoicesManager() {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [studentName, setStudentName] = useState('');
    const [educationStatus, setEducationStatus] = useState('Grade 12');
    const [achievement, setAchievement] = useState('');
    const [review, setReview] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function fetchVoices() {
        setLoading(true);
        const { data, error } = await supabase
            .from('student_voices')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setVoices(data as Voice[]);
        setLoading(false);
    }

    useEffect(() => { fetchVoices(); }, []);

    async function handleCreateVoice(e: React.FormEvent) {
        e.preventDefault();
        if (!studentName || !review) return;
        setSubmitting(true);

        let student_photo_url = '';

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `students/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('nobel-assets')
                .upload(filePath, imageFile);

            if (!uploadError) {
                const { data } = supabase.storage.from('nobel-assets').getPublicUrl(filePath);
                if (data) student_photo_url = data.publicUrl;
            }
        }

        const { error } = await supabase.from('student_voices').insert([{
            student_name: studentName,
            education_status: educationStatus,
            achievement,
            review,
            student_photo_url
        }]);

        if (!error) {
            setStudentName(''); setAchievement(''); setReview(''); setImageFile(null);
            setShowModal(false);
            fetchVoices();
        }
        setSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Permanently remove this student voice?')) return;
        const { error } = await supabase.from('student_voices').delete().eq('id', id);
        if (!error) fetchVoices();
    }

    const filteredVoices = voices.filter(v =>
        v.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.education_status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Student Voices & Testimonials</h2>
                    <p className="text-xs text-slate-500">Manage student testimonials and featured achievements.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    <Plus size={16} /> Add Testimonial
                </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm max-w-md">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Search students..." className="w-full bg-transparent text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {loading ? <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="animate-spin" /></div> : (
                <div className="grid gap-6 md:grid-cols-2">
                    {filteredVoices.map((voice) => (
                        <div key={voice.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden border bg-slate-50">
                                    {voice.student_photo_url && <img src={voice.student_photo_url} className="h-full w-full object-cover" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{voice.student_name}</h4>
                                    <p className="text-xs font-semibold text-indigo-600">{voice.education_status}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4 italic">"{voice.review}"</p>
                            <div className="mt-4 pt-4 border-t flex justify-end">
                                <button onClick={() => handleDelete(voice.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl border bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-bold">Add Student Testimonial</h3>
                        <form onSubmit={handleCreateVoice} className="mt-4 space-y-4">
                            <input type="text" required placeholder="Full Name" className="w-full rounded-xl border px-3 py-2.5 text-sm" value={studentName} onChange={e => setStudentName(e.target.value)} />

                            <select className="w-full rounded-xl border px-3 py-2.5 text-sm" value={educationStatus} onChange={e => setEducationStatus(e.target.value)}>
                                {[...Array(12)].map((_, i) => <option key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>)}
                                <option value="Distinguished Alumnus">Distinguished Alumnus</option>
                            </select>

                            <div className="relative group">
                                <input type="file" accept="image/*" className="hidden" id="photo-upload" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
                                <label htmlFor="photo-upload" className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all text-sm text-slate-500">
                                    {imageFile ? <span className="text-indigo-600 font-semibold">{imageFile.name}</span> : <><Upload size={20} /> Click to upload student photo</>}
                                </label>
                            </div>

                            <textarea rows={3} required placeholder="Review Quote" className="w-full rounded-xl border px-3 py-2.5 text-sm" value={review} onChange={e => setReview(e.target.value)} />

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border px-4 py-2 text-sm font-semibold">Cancel</button>
                                <button type="submit" disabled={submitting} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">{submitting ? 'Saving...' : 'Save Review'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}