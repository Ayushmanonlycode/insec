'use client';

import React from 'react';
import Logo from '@/components/common/Logo';
import {
    User,
    Shield,
    Lock,
    Bell,
    History,
    LogOut,
    ArrowRight,
    Smartphone,
    Chrome,
    MapPin,
    ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { DashboardNav } from '@/components/dashboard/DashboardNav';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            {/* Structural Background - Same as Dashboard */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[10%] w-full h-px bg-white/10"></div>
                <div className="absolute top-[90%] w-full h-px bg-white/10"></div>
                <div className="absolute left-[5%] h-full w-px bg-white/10"></div>
                <div className="absolute left-[95%] h-full w-px bg-white/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(0,255,178,0.05)_0%,transparent_50%)]"></div>
            </div>

            <DashboardNav />

            <div className="relative z-10 flex-1 p-6 md:p-12 max-w-[1200px] mx-auto w-full space-y-12">
                {/* Header Section */}
                <header className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFB2]">Identity Terminal</div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        Operator <br /> <span className="text-white/20">Profile</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Core Identity */}
                    <aside className="space-y-8">
                        <div className="bg-zinc-950/50 border border-white/5 p-8 rounded-sm text-center space-y-6">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto overflow-hidden">
                                    <User size={48} className="text-white/10" />
                                </div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center border-4 border-black hover:scale-110 transition-transform">
                                    <Shield size={14} strokeWidth={3} />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight">John Doe</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">Lead Cyber Architect</p>
                            </div>
                            <div className="pt-6 border-t border-white/5 flex justify-center gap-8">
                                <div className="text-center">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/20">Trust Score</div>
                                    <div className="text-sm font-black text-[#00FFB2]">9.8</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-white/20">Clearance</div>
                                    <div className="text-sm font-black">Level 4</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-sm space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-white/20">Issues Solved</span>
                                    <span>142</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-white/20">Audit Readiness</span>
                                    <span className="text-[#00FFB2]">100%</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-white/20">System Uptime</span>
                                    <span>24d 12h</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Settings & Security */}
                    <section className="lg:col-span-2 space-y-12">
                        {/* Identity Settings */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                                <User size={16} className="text-white/20" /> Identity Configuration
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Email Terminal</label>
                                    <input
                                        type="email"
                                        defaultValue="j.doe@apnisec.com"
                                        className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Communications</label>
                                    <select className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer">
                                        <option>High Frequency (Real-time)</option>
                                        <option>Standard (Daily)</option>
                                        <option>Limited (Weekly)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Security Protocols */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                                <Lock size={16} className="text-white/20" /> Security Protocols
                            </h3>
                            <div className="bg-zinc-950/50 border border-white/5 rounded-sm divide-y divide-white/5">
                                <div className="p-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold uppercase tracking-tight">Two-Factor Authentication</h4>
                                        <p className="text-[10px] font-medium text-white/20 uppercase tracking-widest">Hardware key or Mobile Authenticator required</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#00FFB2] mr-2">Protected</span>
                                        <div className="w-10 h-5 bg-[#00FFB2]/20 border border-[#00FFB2]/30 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-3 h-3 bg-[#00FFB2] rounded-full shadow-[0_0_8px_#00FFB2]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold uppercase tracking-tight">Access Log Retention</h4>
                                        <p className="text-[10px] font-medium text-white/20 uppercase tracking-widest">Stored in immutable blockchain-based ledger</p>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Configure</button>
                                </div>
                            </div>
                        </div>

                        {/* Active Sessions */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                                <History size={16} className="text-white/20" /> Active Sessions
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { device: 'Workstation 01', browser: 'Chrome / MacOS', location: 'London, UK', current: true },
                                    { device: 'Mobile Unit 07', browser: 'Safari / iOS', location: 'London, UK', current: false },
                                ].map((session, idx) => (
                                    <div key={idx} className="bg-zinc-950/30 border border-white/5 rounded-sm p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {session.device.includes('Mobile') ? <Smartphone size={20} className="text-white/20" /> : <Chrome size={20} className="text-white/20" />}
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold tracking-tight uppercase flex items-center gap-3">
                                                    {session.device}
                                                    {session.current && <span className="text-[8px] px-1.5 py-0.5 bg-[#00FFB2] text-black font-black rounded-sm">CURRENT CHANNEL</span>}
                                                </div>
                                                <div className="flex items-center gap-3 text-[9px] font-medium text-white/20 uppercase tracking-widest">
                                                    <span>{session.browser}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><MapPin size={8} /> {session.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {!session.current && (
                                            <button className="text-[9px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors">Terminate</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end gap-6">
                            <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Discard Alterations</button>
                            <button className="bg-white text-black px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                Update Protocols
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer variant="minimal" />
        </main>
    );
}
