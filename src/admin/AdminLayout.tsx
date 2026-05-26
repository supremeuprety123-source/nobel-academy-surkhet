import React, { useState } from 'react';
import {
    LayoutDashboard, Megaphone, Newspaper, Image,
    UserCheck, FileText, BookOpen, Settings, LogOut, Menu, X, ScrollText
} from 'lucide-react';

import DashboardOverview from './views/DashboardOverview';
import NoticesManager from './views/NoticesManager';
import ApplicationsManager from './views/ApplicationsManager';
import NewsEventsManager from './views/NewsEventsManager';
import StudentVoicesManager from './views/StudentVoicesManager';
import LifeAtNobelManager from './views/LifeAtNobelManager';
import ProspectusManager from './views/ProspectusManager'; // 1. Imported the new component

// Added 'prospectus' token safely to the ViewType union type matrix
type ViewType = 'dashboard' | 'notices' | 'news' | 'life' | 'voices' | 'applications' | 'prospectus' | 'settings';

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
    // Read from localStorage on initial render to preserve the active view tab over page refreshes
    const [currentView, setCurrentView] = useState<ViewType>(() => {
        const savedView = localStorage.getItem('nobel_admin_current_view');
        return (savedView as ViewType) || 'dashboard';
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'notices', name: 'Notices', icon: Megaphone },
        { id: 'news', name: 'News & Events', icon: Newspaper },
        { id: 'life', name: 'Life at Nobel', icon: Image },
        { id: 'voices', name: 'Student Voices', icon: UserCheck },
        { id: 'applications', name: 'Applications & Leads', icon: FileText },
        // 2. Inserted the Prospectus tracking link with a clean ScrollText icon asset mapping
        { id: 'prospectus', name: 'Prospectus Enquiries', icon: ScrollText },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">N</div>
                        <div>
                            <h1 className="font-bold text-sm tracking-tight text-slate-900">NOBEL ACADEMY</h1>
                            <p className="text-xs font-medium text-slate-400">Admin Dashboard</p>
                        </div>
                    </div>
                    <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 lg:hidden" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
                </div>

                <nav className="mt-6 flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentView(item.id as ViewType);
                                    // Save the chosen view ID to localStorage so a page refresh stays here
                                    localStorage.setItem('nobel_admin_current_view', item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
                <div className="border-t border-slate-100 pt-4">
                    <button
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50/50 transition-colors"
                        onClick={() => {
                            // Clean up the stored view tracking key on logout
                            localStorage.removeItem('nobel_admin_current_view');
                            onLogout();
                        }}
                    >
                        <LogOut size={18} />Logout
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col overflow-x-hidden">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
                    <button className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">A</div>
                            <span className="hidden text-sm font-semibold text-slate-700 md:inline">Principal / Staff</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {currentView === 'dashboard' && <DashboardOverview />}
                    {currentView === 'notices' && <NoticesManager />}
                    {currentView === 'news' && <NewsEventsManager />}
                    {currentView === 'life' && <LifeAtNobelManager />}
                    {currentView === 'voices' && <StudentVoicesManager />}
                    {currentView === 'applications' && <ApplicationsManager />}
                    {/* 3. Conditional view toggle injection block for Prospectus inquiries */}
                    {currentView === 'prospectus' && <ProspectusManager />}
                </main>
            </div>
        </div>
    );
}