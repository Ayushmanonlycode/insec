'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-0 pointer-events-none">
            <nav className={cn(
                "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto",
                scrolled
                    ? "bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-2 w-[95%] lg:w-[800px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] translate-y-4"
                    : "w-full border-b border-white/10 bg-black px-4 md:px-16 lg:px-24 xl:px-32 py-4 translate-y-0"
            )}>
                <a href="/" aria-label="apni sec Home" className="flex items-center gap-2 group flex-shrink-0">
                    <Logo className={cn(
                        "h-auto text-white group-hover:opacity-80 transition-all duration-500",
                        scrolled ? "w-20" : "w-28"
                    )} />
                </a>

                <div className="flex items-center gap-6 md:gap-10">
                    <div className="hidden lg:flex items-center gap-10">
                        <a href="#hero" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            Home
                        </a>
                        <a href="#services" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            Services
                        </a>
                        <a href="#compliance" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            Compliance
                        </a>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <a href="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            Sign In
                        </a>
                        <a
                            href="/signup"
                            className={cn(
                                "bg-white text-black font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center",
                                scrolled
                                    ? "px-4 py-1.5 text-[8px] rounded-full"
                                    : "px-7 py-2.5 text-[10px] rounded-sm"
                            )}
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}
