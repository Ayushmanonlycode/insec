'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ShieldAlert,
    Search,
    Plus,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { IssueCard, Issue, IssueType, IssueStatus, IssuePriority } from '@/components/dashboard/IssueCard';
import { CreateIssueModal } from '@/components/dashboard/CreateIssueModal';
import { ProfileModal } from '@/components/dashboard/ProfileModal';
import { SystemSidebar } from '@/components/dashboard/SystemSidebar';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; fullName: string | null } | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
    const [filterType, setFilterType] = useState<IssueType | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchIssues = async () => {
        setIsLoading(true);
        try {
            const url = filterType === 'ALL' ? '/api/issues' : `/api/issues?type=${encodeURIComponent(filterType)}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setIssues(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch issues', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                } else if (res.status === 401) {
                    // Redirect to login if unauthorized
                    router.push('/login');
                }
            } catch (err) {
                console.error('Failed to fetch user', err);
                router.push('/login');
            }
        };
        fetchUser();
    }, [router]);

    useEffect(() => {
        fetchIssues();
    }, [filterType]);

    const handleSubmitIssue = async (issueData: Partial<Issue>) => {
        try {
            const isEdit = !!editingIssue;
            const url = isEdit ? `/api/issues/${editingIssue.id}` : '/api/issues';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Verification Error');
            }

            if (isEdit) {
                setIssues(prevIssues => prevIssues.map(i => i.id === editingIssue.id ? data.data : i));
                alert('Incident Protocol Updated Successfully');
            } else {
                setIssues(prevIssues => [data.data, ...prevIssues]);
                alert('Incident Protocol Initiated Successfully');
            }

            setEditingIssue(null);
        } catch (err: any) {
            console.error('Failed to submit issue', err);
            alert(`Incident Protocol Failed: ${err.message}`);
            throw err;
        }
    };

    const deleteIssue = async (id: string) => {
        try {
            const res = await fetch(`/api/issues/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setIssues(issues.filter(i => i.id !== id));
            }
        } catch (err) {
            console.error('Failed to delete issue', err);
        }
    };

    const updateStatus = async (id: string, status: IssueStatus) => {
        try {
            const res = await fetch(`/api/issues/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setIssues(issues.map(i => i.id === id ? { ...i, status } : i));
            }
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const updatePriority = async (id: string, priority: IssuePriority) => {
        try {
            const res = await fetch(`/api/issues/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority }),
            });
            if (res.ok) {
                const data = await res.json();
                setIssues(issues.map(i => i.id === id ? data.data : i));
            }
        } catch (err) {
            console.error('Failed to update priority', err);
        }
    };

    const filteredIssues = issues.filter(issue => {
        if (searchQuery.trim() === '') return true;
        const query = searchQuery.toLowerCase();
        return (
            issue.title.toLowerCase().includes(query) ||
            issue.description.toLowerCase().includes(query) ||
            issue.type.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
            {/* Structural Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[10%] w-full h-px bg-white/10"></div>
                <div className="absolute top-[90%] w-full h-px bg-white/10"></div>
                <div className="absolute left-[5%] h-full w-px bg-white/10"></div>
                <div className="absolute left-[95%] h-full w-px bg-white/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(0,255,178,0.05)_0%,transparent_50%)]"></div>
            </div>

            <DashboardNav onProfileClick={() => setIsProfileModalOpen(true)} />

            <div className="relative z-10 flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full space-y-12 pb-24">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFB2] bg-[#00FFB2]/10 px-3 py-1 rounded-sm border border-[#00FFB2]/20">Command Center</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Session ID: {user?.id.slice(0, 8).toUpperCase() || 'Scanning...'}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Welcome Back, <span className="text-white/20">{user?.fullName || 'Agent'}</span>
                        </h1>
                        <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]"></div>
                                <span>Field Agent</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                <span>Last Sync: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} UTC</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span>Clearance: Restricted</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setEditingIssue(null);
                            setIsCreateModalOpen(true);
                        }}
                        className="bg-white text-black px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Report Incident
                    </button>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Issue Management Section */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Management Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 mr-2">
                                    <ShieldAlert size={16} className="text-[#00FFB2]" /> Issues
                                </h2>
                                <div className="flex gap-1.5">
                                    {(['ALL', 'Cloud Security', 'Redteam Assessment', 'VAPT'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={cn(
                                                "px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest border transition-all",
                                                filterType === type
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="Search Protocol..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-zinc-900/50 border border-white/10 rounded-sm py-1.5 pl-8 pr-3 text-[9px] font-black uppercase tracking-widest focus:outline-none focus:border-[#00FFB2]/50 w-48 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Issues List - Internally Scrollable */}
                        <div className="max-h-[80vh] overflow-y-auto pr-2 mini-scrollbar">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-zinc-950/20 rounded-sm">
                                        <div className="w-8 h-8 border-2 border-[#00FFB2]/20 border-t-[#00FFB2] rounded-full animate-spin mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Syncing with Command Center...</span>
                                    </div>
                                ) : filteredIssues.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-zinc-950/20 rounded-sm">
                                        <ShieldAlert size={40} className="text-white/10 mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">No active incidents detected.</span>
                                    </div>
                                ) : (
                                    filteredIssues.map((issue) => (
                                        <IssueCard
                                            key={issue.id}
                                            issue={issue}
                                            onUpdateStatus={updateStatus}
                                            onUpdatePriority={updatePriority}
                                            onDelete={deleteIssue}
                                            onEdit={(issue) => {
                                                setEditingIssue(issue);
                                                setIsCreateModalOpen(true);
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <SystemSidebar />
                    </div>
                </div>
            </div>

            <Footer variant="minimal" />

            {/* Create Issue Modal */}
            <CreateIssueModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setEditingIssue(null);
                }}
                onSubmit={handleSubmitIssue}
                initialData={editingIssue}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onUpdate={(newProfile) => setUser(newProfile)}
            />
        </main>
    );
}
