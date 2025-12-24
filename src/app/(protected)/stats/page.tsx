'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp, Shield, Activity, Lock, Globe, Server } from 'lucide-react';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

import { ProfileModal } from '@/components/dashboard/ProfileModal';

// Module-level cache to persist data across client-side navigations
let cachedStats: any = null;
let cachedUser: any = null;

export default function StatsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(!cachedStats);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [stats, setStats] = useState<any>(cachedStats);
    const [user, setUser] = useState<{ id: string; fullName: string | null } | null>(cachedUser);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.data);
                    cachedStats = data.data; // Update cache
                } else if (res.status === 401) {
                    cachedStats = null;
                    cachedUser = null;
                    router.push('/login');
                }
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setIsLoading(false);
                setIsInitialLoad(false);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                    cachedUser = data.data; // Update cache
                } else if (res.status === 401) {
                    cachedStats = null;
                    cachedUser = null;
                    router.push('/login');
                }
            } catch (err) {
                console.error('Failed to fetch user', err);
                router.push('/login');
            }
        };

        fetchUser();
        fetchStats();
    }, [router]);

    if (isInitialLoad) {
        return (
            <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#00FFB2]/20 border-t-[#00FFB2] rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Establishing Uplink...</span>
                </div>
            </main>
        );
    }

    // Process Trend Data (Last 7 Days)
    const getTrendData = () => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = days[d.getDay()];
            const found = stats?.trend.find((t: any) => t.date === dateStr);
            result.push({ day: dayName, value: found ? found.count : 0 });
        }
        return result;
    };

    const trendData = getTrendData();
    const maxTrend = Math.max(...trendData.map(d => d.value), 5); // Minimum scale of 5

    // Process Distribution Data
    const distribution = [
        { type: 'Cloud', value: stats?.distribution.find((d: any) => d.type === 'Cloud Security')?.value || 0, color: '#00FFB2' },
        { type: 'VAPT', value: stats?.distribution.find((d: any) => d.type === 'VAPT')?.value || 0, color: '#3B82F6' },
        { type: 'Redteam', value: stats?.distribution.find((d: any) => d.type === 'Redteam Assessment')?.value || 0, color: '#EF4444' },
    ];
    const totalDist = distribution.reduce((acc, curr) => acc + curr.value, 0) || 1;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
            <DashboardNav onProfileClick={() => setIsProfileModalOpen(true)} />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col overflow-hidden"
            >

                {/* Content Viewport */}
                <div className="relative z-10 flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full overflow-hidden flex flex-col">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#00FFB2]/60">Operational Analytics</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
                                System <span className="text-white/40">Performance</span>
                            </h1>
                        </div>

                        <div className="flex gap-8 pl-8 hidden md:flex">
                            <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1">Response Velocity</div>
                                <div className="text-xl font-bold text-[#00FFB2]">{stats?.summary.totalIssues > 0 ? (stats.summary.totalIssues * 0.12).toFixed(2) : 0} GB/s</div>
                            </div>
                            <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-1">Status Integrity</div>
                                <div className="text-xl font-bold text-white">{stats?.summary.nodeIntegrity}%</div>
                            </div>
                        </div>
                    </header>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto mini-scrollbar pr-2 mb-6">
                        {/* Primary Chart: Threat Trends */}
                        <div className="lg:col-span-2 bg-zinc-900/20 border border-white/5 rounded-xl p-8 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-zinc-950 border border-white/10">
                                        <TrendingUp size={18} className="text-[#00FFB2]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest">Incident Velocity</h3>
                                        <p className="text-[10px] text-white/20 uppercase tracking-widest">7-Day Operational Cycle</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-white">
                                        {stats?.summary.totalIssues > 0 ? Math.round((stats.summary.resolvedIssues / stats.summary.totalIssues) * 100) : 0}%
                                    </span>
                                    <p className="text-[8px] font-bold text-[#00FFB2]/60 uppercase tracking-widest">Resolution Rate</p>
                                </div>
                            </div>

                            {/* Custom SVG Line Chart - Cleaned up */}
                            <div className="h-64 w-full relative">
                                <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                                    {/* Grid Lines */}
                                    <line x1="0" y1="0" x2="700" y2="0" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                                    <line x1="0" y1="50" x2="700" y2="50" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                                    <line x1="0" y1="100" x2="700" y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                                    <line x1="0" y1="150" x2="700" y2="150" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                                    <line x1="0" y1="200" x2="700" y2="200" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

                                    {/* Path - Professional flat stroke */}
                                    <polyline
                                        fill="none"
                                        stroke="#00FFB2"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={trendData.map((d, i) => `${i * 115},${200 - (d.value / maxTrend * 150)}`).join(' ')}
                                        className="transition-all duration-1000 opacity-80"
                                    />

                                    {/* Data Points - Minimal dots */}
                                    {trendData.map((d, i) => (
                                        <circle
                                            key={i}
                                            cx={i * 115}
                                            cy={200 - (d.value / maxTrend * 150)}
                                            r="3"
                                            fill="#00FFB2"
                                            className="transition-all duration-1000"
                                        />
                                    ))}
                                </svg>

                                {/* X-Axis labels */}
                                <div className="flex justify-between mt-6">
                                    {trendData.map(d => (
                                        <span key={d.day} className="text-[10px] font-medium text-white/20 tracking-widest">{d.day}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Secondary Metrics Column */}
                        <div className="grid grid-cols-1 gap-6 h-fit">
                            {/* Distribution Card */}
                            <div className="bg-zinc-900/20 border border-white/5 rounded-xl p-6 space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/5 pb-3">Vector Analysis</h3>
                                <div className="space-y-5">
                                    {distribution.map((item, i) => {
                                        const percent = Math.round((item.value / totalDist) * 100);
                                        return (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest">
                                                    <span className="text-white/40">{item.type}</span>
                                                    <span className="font-bold" style={{ color: item.color }}>{percent}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percent}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className="h-full rounded-full opacity-60"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Core Status Pulse */}
                            <div className="bg-zinc-900/20 border border-white/5 rounded-xl p-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/5 pb-3 mb-6">Core Status</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-950 border border-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2 text-white/20">
                                            <Server size={12} />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Active</span>
                                        </div>
                                        <div className="text-lg font-bold">{stats?.summary.totalIssues}</div>
                                        <div className="text-[8px] font-bold text-white/10 mt-1 uppercase">Issues Tracked</div>
                                    </div>
                                    <div className="bg-zinc-950 border border-white/5 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2 text-white/20">
                                            <Globe size={12} />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Authored</span>
                                        </div>
                                        <div className="text-lg font-bold">{stats?.summary.totalDirectives}</div>
                                        <div className="text-[8px] font-bold text-white/10 mt-1 uppercase">Directives</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row Highlights */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'System Integrity', value: 'STABLE', icon: Shield, color: 'text-[#00FFB2]', status: 'Active' },
                                { label: 'Security Layer', value: 'ENFORCED', icon: Lock, color: 'text-blue-500', status: 'Verified' },
                                { label: 'Uplink Status', value: 'CONNECTED', icon: Activity, color: 'text-[#00FFB2]', status: 'Syncing' }
                            ].map((item, i) => (
                                <div key={i} className="bg-zinc-900/20 border border-white/5 rounded-xl p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-zinc-950 border border-white/5 rounded-lg">
                                            <item.icon size={16} className={cn("opacity-60", item.color)} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">{item.label}</div>
                                            <div className="text-base font-bold tracking-tight">{item.value}</div>
                                        </div>
                                    </div>
                                    <div className={cn("text-[9px] font-bold uppercase tracking-widest opacity-40")}>{item.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onUpdate={(newProfile) => setUser(newProfile)}
            />

            <Footer variant="minimal" />
        </main>
    );
}
