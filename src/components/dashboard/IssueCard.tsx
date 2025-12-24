'use client';

import React from 'react';
import {
    Trash2,
    ArrowUpRight,
    Cloud,
    Target,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type IssueType = 'Cloud Security' | 'Redteam Assessment' | 'VAPT';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Issue {
    id: string;
    type: IssueType;
    title: string;
    description: string;
    priority: IssuePriority;
    status: IssueStatus;
    createdAt: string;
}

interface IssueCardProps {
    issue: Issue;
    onUpdateStatus: (id: string, status: IssueStatus) => void;
    onDelete: (id: string) => void;
}

export function IssueCard({ issue, onUpdateStatus, onDelete }: IssueCardProps) {
    return (
        <div className="group bg-zinc-950/30 hover:bg-zinc-950/60 border border-white/5 hover:border-white/20 p-6 rounded-sm transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex gap-6 items-start">
                    <div className={cn(
                        "mt-1 p-2 rounded-sm border",
                        issue.priority === 'Critical' ? "border-red-500/50 text-red-500 bg-red-500/5" :
                            issue.priority === 'High' ? "border-orange-500/50 text-orange-500 bg-orange-500/5" :
                                "border-white/10 text-white/40 bg-white/5"
                    )}>
                        {issue.type === 'Cloud Security' ? <Cloud size={18} /> :
                            issue.type === 'VAPT' ? <Target size={18} /> :
                                <Shield size={18} />}
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{issue.id}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border border-white/10 text-white/30 rounded-full">{issue.type}</span>
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight">{issue.title}</h3>
                        <p className="text-xs text-white/40 max-w-xl line-clamp-1">{issue.description}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 lg:gap-12 lg:ml-auto">
                    <div className="space-y-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20">Priority</div>
                        <div className={cn(
                            "text-[10px] font-black tracking-widest",
                            issue.priority === 'Critical' ? "text-red-500" :
                                issue.priority === 'High' ? "text-orange-500" :
                                    "text-white/40"
                        )}>{issue.priority.toUpperCase()}</div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20">Status Update</div>
                        <div className="flex gap-2">
                            {(['Open', 'In Progress', 'Resolved'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => onUpdateStatus(issue.id, status)}
                                    className={cn(
                                        "px-2 py-1 rounded-sm text-[8px] font-black tracking-tighter border transition-all",
                                        issue.status === status
                                            ? "bg-[#00FFB2]/20 border-[#00FFB2]/40 text-[#00FFB2]"
                                            : "border-white/5 text-white/20 hover:border-white/20 hover:text-white"
                                    )}
                                >
                                    {status.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-px h-8 bg-white/5 hidden lg:block" />
                        <button
                            onClick={() => onDelete(issue.id)}
                            className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-white/20 hover:text-white transition-all">
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
