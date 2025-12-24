'use client';

import React from 'react';
import { Activity, Clock } from 'lucide-react';

export function SystemSidebar() {
    const [health, setHealth] = React.useState({
        network: 98,
        storage: 100,
        node: 94
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setHealth({
                network: 95 + Math.floor(Math.random() * 5),
                storage: 99 + (Math.random() > 0.5 ? 1 : 0),
                node: 90 + Math.floor(Math.random() * 10)
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className="space-y-8">
            {/* System Health */}
            <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-sm space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3">
                    <Activity size={16} className="text-[#00FFB2]" /> SYSTEM STATUS
                </h2>
                <div className="space-y-4">
                    {[
                        { label: 'Network Integrity', value: health.network },
                        { label: 'Storage Encryption', value: health.storage },
                        { label: 'Node Distribution', value: health.node },
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
            <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-sm space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                    <Clock size={16} className="text-white/20" /> UPLINK PROTOCOLS
                </h2>
                <div className="space-y-3">
                    {[
                        { name: 'Drizzle Gateway', status: 'Online' },
                        { name: 'Edge Handlers', status: 'Active' },
                        { name: 'Auth Node', status: 'Secure' },
                    ].map((protocol) => (
                        <div key={protocol.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]/20" />
                                <span className="text-[10px] uppercase font-bold tracking-wide">{protocol.name}</span>
                            </div>
                            <span className="text-[9px] uppercase font-black text-[#00FFB2]/60">{protocol.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
