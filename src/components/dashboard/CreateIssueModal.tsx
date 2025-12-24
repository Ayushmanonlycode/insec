'use client';

import React, { useState } from 'react';
import { Plus, X, ShieldCheck } from 'lucide-react';
import { Issue, IssueType, IssuePriority } from './IssueCard';

interface CreateIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (issue: Partial<Issue>) => void;
    initialData?: Issue | null;
}

export function CreateIssueModal({ isOpen, onClose, onSubmit, initialData }: CreateIssueModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Partial<Issue>>({
        type: 'VAPT',
        priority: 'Medium',
        status: 'Open',
        title: '',
        description: ''
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                type: 'VAPT',
                priority: 'Medium',
                status: 'Open',
                title: '',
                description: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Failed to submit incident:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEdit = !!initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-sm shadow-2xl relative animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        {isEdit ? <ShieldCheck size={16} className="text-[#00FFB2]" /> : <Plus size={16} className="text-[#00FFB2]" />}
                        {isEdit ? 'Update Protocol' : 'Incident Protocol'}
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
                            minLength={5}
                            type="text"
                            placeholder="Brief Directive Title"
                            value={formData.title}
                            className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#00FFB2] placeholder:text-white/30 disabled:opacity-50"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            disabled={isSubmitting}
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
                                <option value="Cloud Security">Cloud Security</option>
                                <option value="Redteam Assessment">Redteam Assessment</option>
                                <option value="VAPT">VAPT</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as IssuePriority })}
                                className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#00FFB2] appearance-none cursor-pointer"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Current Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#00FFB2] appearance-none cursor-pointer"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Detailed Log</label>
                        <textarea
                            required
                            minLength={10}
                            rows={4}
                            placeholder="Describe the technical findings..."
                            value={formData.description}
                            className="w-full bg-black border border-white/20 rounded-sm py-3 px-4 text-xs font-medium text-white focus:outline-none focus:border-[#00FFB2] placeholder:text-white/30 resize-none disabled:opacity-50"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00FFB2] text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(0,255,178,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShieldCheck size={16} strokeWidth={3} />
                        {isSubmitting ? 'Processing Protocol...' : isEdit ? 'Confirm Update' : 'Initiate Record'}
                    </button>
                </form>
            </div>
        </div>
    );
}
