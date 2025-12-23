'use client';

import React from 'react';
import Logo from '@/components/Logo';
import { Search, Bell } from 'lucide-react';

export function DashboardNav() {
    return (
        <nav className="relative z-20 border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <a href="/" className="hover:opacity-80 transition-opacity">
                    <Logo className="w-28 h-auto" />
                </a>
                <div className="hidden md:flex items-center gap-8">
                    <a href="/dashboard" className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Console</a>
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Nodes</a>
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Directives</a>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-white/40 hover:text-white transition-colors"><Search size={18} /></button>
                <button className="text-white/40 hover:text-white transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FFB2] rounded-full shadow-[0_0_10px_#00FFB2]" />
                </button>
                <a href="/profile" className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-[#00FFB2] hover:border-[#00FFB2]/50 transition-colors">
                    OP
                </a>
            </div>
        </nav>
    );
}
