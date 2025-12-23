'use client';

import React from 'react';
import { Activity, Clock } from 'lucide-react';

export function SystemSidebar() {
    return (
        <aside className="space-y-8">
            {/* System Health */}
            <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-sm space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3">
                    <Activity size={16} className="text-[#00FFB2]" /> SYSTEM HEALTH
                </h2>
                <div className="space-y-4">
                    {[
                        { label: 'Network Integrity', value: 100 },
                        { label: 'Storage Encryption', value: 88 },
                        { label: 'Node Distribution', value: 94 },
                    ].map((item) => (
                        <div key={item.label} className="space-y-2">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                                <span>{item.label}</span>
                                <span>{item.value}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-1000"
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Access */}
            <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-sm space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <Clock size={16} className="text-white/20" /> SESSION PROTOCOLS
                </h2>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]/20" />
                                <span className="text-[10px] uppercase font-bold tracking-wide">Kernel Update</span>
                            </div>
                            <span className="text-[9px] uppercase font-black text-white/20">Successful</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
