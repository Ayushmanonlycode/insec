'use client';

import React from 'react';
import {
    Trash2,
    Pencil,
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
    onUpdatePriority: (id: string, priority: IssuePriority) => void;
    onDelete: (id: string) => void;
    onEdit: (issue: Issue) => void;
}

export function IssueCard({ issue, onUpdateStatus, onUpdatePriority, onDelete, onEdit }: IssueCardProps) {
    return (
        <div className="group bg-zinc-900/60 hover:bg-zinc-900/80 border border-white/10 p-2.5 rounded-xl transition-all duration-300 w-full">
            {/* Header: ID and Actions */}
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "p-1 rounded-sm border transition-colors",
                        issue.priority === 'Critical' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                            issue.priority === 'High' ? "border-orange-500/30 text-orange-500 bg-orange-500/5" :
                                "border-white/10 text-white/40 bg-white/5"
                    )}>
                        {issue.type === 'Cloud Security' ? <Cloud size={10} /> :
                            issue.type === 'VAPT' ? <Target size={10} /> :
                                <Shield size={10} />}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] font-bold uppercase tracking-wider text-white/20">
                            {issue.type}
                        </span>
                        <span className="text-[7px] font-mono text-white/10">#{issue.id.split('-')[0].toUpperCase()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(issue)}
                        className="p-1 text-white/20 hover:text-white hover:bg-white/5 rounded-sm transition-all"
                    >
                        <Pencil size={10} />
                    </button>
                    <button
                        onClick={() => onDelete(issue.id)}
                        className="p-1 text-white/20 hover:text-red-500 hover:bg-red-500/5 rounded-sm transition-all"
                    >
                        <Trash2 size={10} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mb-1.5">
                <h3 className="text-[11px] font-bold text-white leading-tight">
                    {issue.title}
                </h3>
            </div>

            {/* Bottom: Quick Status and Priority */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                <div className="flex gap-1">
                    {(['Low', 'Medium', 'High', 'Critical'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => onUpdatePriority(issue.id, p)}
                            className={cn(
                                "px-1.5 py-0.5 rounded-sm text-[7px] font-bold tracking-tight uppercase border transition-all",
                                issue.priority === p
                                    ? p === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                        p === 'High' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                            "bg-white/10 text-white border-white/20"
                                    : "border-transparent text-white/10 hover:text-white/40"
                            )}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="flex gap-1">
                    {(['Open', 'In Progress', 'Resolved'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => onUpdateStatus(issue.id, status)}
                            className={cn(
                                "px-1.5 py-0.5 rounded-sm text-[7px] font-bold tracking-tight uppercase border transition-all",
                                issue.status === status
                                    ? "bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20"
                                    : "border-transparent text-white/10 hover:text-white/40"
                            )}
                        >
                            {status === 'In Progress' ? 'PROGRESS' : status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
