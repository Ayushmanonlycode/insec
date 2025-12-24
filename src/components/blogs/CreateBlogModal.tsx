'use client';

import React, { useState } from 'react';
import { X, Send, BookOpen, AlertCircle } from 'lucide-react';

interface CreateBlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (blogData: { title: string; content: string }) => Promise<void>;
    initialData?: { title: string; content: string } | null;
}

export function CreateBlogModal({ isOpen, onClose, onSubmit, initialData }: CreateBlogModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (title.length < 3) return setError('Title must be at least 3 characters');
        if (content.length < 10) return setError('Content must be at least 10 characters');

        setIsSubmitting(true);
        try {
            await onSubmit({ title, content });
            onClose();
        } catch (err: any) {
            setError(err.message || 'Transmission failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const isEdit = !!initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-sm shadow-2xl relative animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        <BookOpen size={16} className="text-[#00FFB2]" /> {isEdit ? 'Update Intelligence Directive' : 'New Intelligence Directive'}
                    </h2>
                    <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Directive Header</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., Quantum Encryption Standards v2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-xs font-bold tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-[#00FFB2] transition-colors"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Intel Content</label>
                        <textarea
                            required
                            rows={8}
                            placeholder="Input detailed intelligence data here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-xs font-bold tracking-widest text-white placeholder:text-white/10 focus:outline-none focus:border-[#00FFB2] transition-colors resize-none"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
                    >
                        <Send size={16} strokeWidth={3} className={isSubmitting ? 'animate-pulse' : ''} />
                        {isSubmitting ? 'Transmitting Data...' : isEdit ? 'Update Directive' : 'Broadcast Directive'}
                    </button>
                </form>
            </div>
        </div>
    );
}
