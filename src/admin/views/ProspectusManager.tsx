import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Search, Calendar, AlertCircle, Loader2, CheckCircle, XCircle, Eye } from 'lucide-react';

interface ProspectusRequest {
    id: string;
    name: string;
    email: string;
    contact: string;
    class_applying_for: string;
    message: string;
    status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
    created_at: string;
}

export default function ProspectusManager() {
    const [requests, setRequests] = useState<ProspectusRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    async function fetchProspectusRequests() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('prospectus')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setRequests(data as ProspectusRequest[]);
        } catch (err) {
            console.error("Error fetching prospectus requests:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProspectusRequests();
    }, []);

    async function updateStatus(id: string, newStatus: ProspectusRequest['status']) {
        setUpdatingId(id);
        try {
            const { error } = await supabase
                .from('prospectus')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Commit the update securely to local UI layout state array
            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
            );
        } catch (err: any) {
            console.error("Database status tracking sync failed:", err);
            alert(`Could not save status change: ${err.message}`);
        } finally {
            setUpdatingId(null);
        }
    }

    const formatDate = (isoString: string) => {
        if (!isoString) return '—';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const filteredRequests = requests.filter(req => {
        const structuralName = req?.name || '';
        const structuralClass = req?.class_applying_for || '';

        return (
            structuralName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            structuralClass.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">Prospectus Download Requests</h2>
                <p className="text-xs text-slate-500">Review, track, and manage inquiries from parents who requested the official school prospectus and syllabus layout maps.</p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm max-w-md">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by name or grade level..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex h-40 items-center justify-center text-slate-400"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-500">
                            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Requester Info</th>
                                    <th className="px-6 py-4">Target Grade</th>
                                    <th className="px-6 py-4">Date Received</th>
                                    <th className="px-6 py-4">Message/Notes</th>
                                    <th className="px-6 py-4">Status Tag</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{req?.name || 'Unnamed Requester'}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                                {req?.contact || 'No Contact'} | {req?.email || 'No Email'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{req?.class_applying_for || 'Not Specified'}</td>

                                        <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={13} className="text-slate-400" />
                                                {formatDate(req?.created_at)}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={req?.message}>
                                            {req?.message || '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${req?.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' :
                                                req?.status === 'Rejected' ? 'bg-rose-50 text-rose-700' :
                                                    req?.status === 'Reviewed' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                                                }`}>
                                                {req?.status === 'Pending' && <AlertCircle size={12} />}
                                                {req?.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-1">
                                                {updatingId === req.id ? (
                                                    <Loader2 size={16} className="animate-spin text-slate-400 px-2" />
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(req.id, 'Reviewed')}
                                                            disabled={req?.status === 'Reviewed'}
                                                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all text-xs font-semibold px-2 flex items-center gap-1 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                            title="Mark as Reviewed"
                                                        >
                                                            <Eye size={14} />
                                                            Review
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(req.id, 'Accepted')}
                                                            disabled={req?.status === 'Accepted'}
                                                            className="rounded-lg p-1 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                            title="Approve / Dispatch"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(req.id, 'Rejected')}
                                                            disabled={req?.status === 'Rejected'}
                                                            className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                                            title="Decline Request"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredRequests.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                            No active prospectus inquiries found matching that query scope.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}