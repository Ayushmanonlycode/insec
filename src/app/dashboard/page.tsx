'use client';

import React, { useState } from 'react';
import {
    ShieldAlert,
    Search,
    Plus,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { IssueCard, Issue, IssueType, IssueStatus } from '@/components/dashboard/IssueCard';
import { CreateIssueModal } from '@/components/dashboard/CreateIssueModal';
import { SystemSidebar } from '@/components/dashboard/SystemSidebar';

const INITIAL_ISSUES: Issue[] = [
    { id: 'SEC-042', type: 'VAPT', title: 'Unhandled Exception in Auth Middleware', priority: 'CRITICAL', status: 'IN PROGRESS', description: 'Vulnerability in auth layer allowing bypass.', time: '2h ago' },
    { id: 'SEC-039', type: 'Cloud Security', title: 'S3 Bucket Public Access', priority: 'HIGH', status: 'OPEN', description: 'Production bucket has public read permissions.', time: '5h ago' },
    { id: 'SEC-035', type: 'Redteam Assessment', title: 'Phishing Simulation Report', priority: 'MEDIUM', status: 'RESOLVED', description: 'Results from the Q4 phishing assessment.', time: '12h ago' },
];

export default function DashboardPage() {
    const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<IssueType | 'ALL'>('ALL');

    const handleCreateIssue = (issueData: Partial<Issue>) => {
        const issue: Issue = {
            ...issueData as Issue,
            id: `SEC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            time: 'Just now'
        };
        setIssues([issue, ...issues]);
    };

    const deleteIssue = (id: string) => {
        setIssues(issues.filter(i => i.id !== id));
    };

    const updateStatus = (id: string, status: IssueStatus) => {
        setIssues(issues.map(i => i.id === id ? { ...i, status } : i));
    };

    const filteredIssues = filterType === 'ALL'
        ? issues
        : issues.filter(i => i.type === filterType);

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            {/* Structural Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[10%] w-full h-px bg-white/10"></div>
                <div className="absolute top-[90%] w-full h-px bg-white/10"></div>
                <div className="absolute left-[5%] h-full w-px bg-white/10"></div>
                <div className="absolute left-[95%] h-full w-px bg-white/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(0,255,178,0.05)_0%,transparent_50%)]"></div>
            </div>

            <DashboardNav />

            <div className="relative z-10 flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full space-y-12 pb-24">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFB2] bg-[#00FFB2]/10 px-3 py-1 rounded-sm border border-[#00FFB2]/20">Command Center</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Operational <br /> <span className="text-white/20">Dashboard</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-white text-black px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Report Incident
                    </button>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Issue Management Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Management Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 mr-4">
                                    <ShieldAlert size={18} className="text-[#00FFB2]" /> Issues
                                </h2>
                                <div className="flex gap-2">
                                    {(['ALL', 'Cloud Security', 'Redteam Assessment', 'VAPT'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest border transition-all",
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
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="Filter Protocol..."
                                        className="bg-zinc-950 border border-white/10 rounded-sm py-2 pl-9 pr-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#00FFB2]/50 w-48 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Issues List */}
                        <div className="grid grid-cols-1 gap-4">
                            {filteredIssues.map((issue) => (
                                <IssueCard
                                    key={issue.id}
                                    issue={issue}
                                    onUpdateStatus={updateStatus}
                                    onDelete={deleteIssue}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <SystemSidebar />
                </div>
            </div>

            {/* Create Issue Modal */}
            <CreateIssueModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateIssue}
            />
        </main>
    );
}
