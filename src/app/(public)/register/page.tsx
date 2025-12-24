'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        username: ''
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Derived username if not provided or just use a placeholder
            // For now let's add a username field or auto-generate
            const payload = {
                ...formData,
                username: formData.username || formData.email.split('@')[0]
            };

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            router.push('/welcome');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

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

            {/* Absolute Logo - Restored */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">

            </div>

            <div className="relative z-10 w-full max-w-[400px] flex flex-col justify-center min-h-[calc(100vh-4rem)] py-8">
                <div className="flex flex-col mb-8">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                        Create <br /> <span className="text-white/50">Account</span>
                    </h1>
                </div>

                <div className="space-y-6">
                    <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="agent_tag"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Agent Identity"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@apnisec.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-sm py-3 px-4 text-sm font-medium focus:outline-none focus:border-white/30 focus:bg-zinc-900/50 transition-all placeholder:text-white/5"
                            />
                        </div>

                        {error && (
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 p-2 rounded-sm border border-red-500/20">
                                {error}
                            </p>
                        )}

                        <div className="pt-1">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-3.5 h-3.5 border border-white/20 rounded-sm bg-black peer-checked:bg-[#00FFB2] peer-checked:border-[#00FFB2] transition-all" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 leading-relaxed group-hover:text-white/40 transition-colors">
                                    I ACCEPT THE Terms & Conditions
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <>
                                    Establish Account
                                    <ArrowRight size={14} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 text-center">
                            Already enlisted? <a href="/login" className="text-white hover:text-[#00FFB2] transition-colors underline underline-offset-4 decoration-white/10">Access Terminal</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
