'use client';

import React, { useState } from 'react';
import { Plus, X, ShieldCheck } from 'lucide-react';
import { Issue, IssueType, IssuePriority } from './IssueCard';

interface CreateIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (issue: Partial<Issue>) => void;
}

export function CreateIssueModal({ isOpen, onClose, onCreate }: CreateIssueModalProps) {
    const [formData, setFormData] = useState<Partial<Issue>>({
        type: 'VAPT',
        priority: 'MEDIUM',
        status: 'OPEN',
        title: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-sm shadow-2xl relative animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        <Plus size={16} className="text-[#00FFB2]" /> Incident Protocol
                    </h2>
                    <button onClick={onClose} className="text-white/20 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Title</label>
                        <input
                            required
                            type="text"
                            placeholder="Brief Directive Title"
                            className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#00FFB2] placeholder:text-white/30"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as IssueType })}
                                className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#00FFB2] appearance-none cursor-pointer"
                            >
                                <option>Cloud Security</option>
                                <option>Redteam Assessment</option>
                                <option>VAPT</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#00FFB2] appearance-none cursor-pointer"
                            >
                                <option>OPEN</option>
                                <option>IN PROGRESS</option>
                                <option>RESOLVED</option>
                                <option>CLOSED</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Detailed Log</label>
                        <textarea
                            rows={4}
                            placeholder="Describe the technical findings..."
                            className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-medium text-white focus:outline-none focus:border-[#00FFB2] placeholder:text-white/30 resize-none"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#00FFB2] text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(0,255,178,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 mt-4">
                        <ShieldCheck size={16} strokeWidth={3} />
                        Initiate Record
                    </button>
                </form>
            </div>
        </div>
    );
}
