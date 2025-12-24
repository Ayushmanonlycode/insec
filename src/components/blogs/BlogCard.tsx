'use client';

import React from 'react';
import { Calendar, User, ArrowRight, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Blog {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: {
        username: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface BlogCardProps {
    blog: Blog;
    className?: string;
    onEdit?: (blog: Blog) => void;
    onDelete?: (id: string) => void;
}

export function BlogCard({ blog, className, onEdit, onDelete }: BlogCardProps) {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className={cn(
            "group bg-zinc-900/40 border border-white/5 rounded-sm p-6 hover:border-[#00FFB2]/30 transition-all duration-500 relative overflow-hidden",
            className
        )}>
            {/* Ambient Background Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00FFB2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative space-y-4">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                    <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#00FFB2]/40" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={12} className="text-[#00FFB2]/40" />
                        <span className="text-[#00FFB2]/60">{blog.author?.username || 'System Origin'}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#00FFB2] transition-colors line-clamp-2">
                        {blog.title}
                    </h2>
                    <p className="text-xs text-white/40 font-medium leading-relaxed line-clamp-3">
                        {blog.content}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-[#00FFB2]/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#00FFB2]/40 group-hover:text-[#00FFB2] transition-colors">
                            Directive: 0x{blog.id.slice(0, 4)}
                        </span>
                        {onEdit && (
                            <button
                                onClick={() => onEdit(blog)}
                                className="p-1.5 text-[#00FFB2]/60 hover:text-[#00FFB2] hover:bg-[#00FFB2]/10 rounded-sm transition-colors"
                            >
                                <Pencil size={12} />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(blog.id)}
                                className="p-1.5 text-white/20 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                    <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-all">
                        Access Intel <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Scanning Bar Animation */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FFB2]/20 -translate-y-full group-hover:animate-scan" />
        </article>
    );
}
