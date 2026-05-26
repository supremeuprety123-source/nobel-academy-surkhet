import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Megaphone, FileText, BookOpen, Newspaper, ArrowUpRight } from 'lucide-react';

export default function DashboardOverview() {
    const [metrics, setMetrics] = useState({ notices: 0, news: 0, apps: 0, prospectus: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            const [noticesCount, newsCount, appsCount, prosCount] = await Promise.all([
                supabase.from('notices').select('*', { count: 'exact', head: true }),
                supabase.from('news_events').select('*', { count: 'exact', head: true }),
                supabase.from('applications').select('*', { count: 'exact', head: true }),
                supabase.from('prospectus_requests').select('*', { count: 'exact', head: true }),
            ]);

            setMetrics({
                notices: noticesCount.count || 0,
                news: newsCount.count || 0,
                apps: appsCount.count || 0,
                prospectus: prosCount.count || 0,
            });
            setLoading(false);
        }
        fetchCounts();
    }, []);

    const metricCards = [
        { title: 'Active Notices', value: metrics.notices, icon: Megaphone, color: 'text-blue-600 bg-blue-50 border-blue-100' },
        { title: 'News & Events Logs', value: metrics.news, icon: Newspaper, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        { title: 'Online Applications', value: metrics.apps, icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { title: 'Prospectus Requests', value: metrics.prospectus, icon: BookOpen, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    ];

    if (loading) return <div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 rounded-2xl w-full" /></div>;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">System Overview</h2>
                <p className="text-sm text-slate-500">Live operational data metrics across the database platform.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {metricCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div className={`rounded-xl border p-2.5 ${card.color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    Live <ArrowUpRight size={12} />
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-slate-400">{card.title}</h3>
                                <p className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}