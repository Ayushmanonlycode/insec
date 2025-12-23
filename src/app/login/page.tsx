'use client';

import React from 'react';
import Logo from '@/components/Logo';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Structural Background Lines - Matching Hero Aesthetic */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] w-full h-px bg-white/5"></div>
                <div className="absolute top-[80%] w-full h-px bg-white/5"></div>
                <div className="absolute left-[25%] h-full w-px bg-white/5"></div>
                <div className="absolute left-[75%] h-full w-px bg-white/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,178,0.03)_0%,transparent_60%)]"></div>
            </div>


            <div className="relative z-10 w-full max-w-[400px] flex flex-col justify-center min-h-[calc(100vh-4rem)] py-8">
                <div className="flex flex-col mb-8">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                        Login <br /> <span className="text-white/40">Terminal</span>
                    </h1>
                </div>

                <div className="space-y-6">
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@apnisec.com"
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-4 px-5 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end px-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Password</label>
                                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-[#00FFB2]/50 hover:text-[#00FFB2] transition-colors">Recover</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-4 px-5 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        <button className="w-full bg-white text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 mt-2">
                            Login
                            <ArrowRight size={14} strokeWidth={3} />
                        </button>
                    </form>

                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 text-center">
                            New operator? <a href="/signup" className="text-white hover:text-[#00FFB2] transition-colors underline underline-offset-4 decoration-white/10">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
