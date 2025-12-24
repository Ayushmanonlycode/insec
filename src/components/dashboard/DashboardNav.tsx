'use client';

import React from 'react';
import Logo from '@/components/common/Logo';
import { Search, Bell, LogOut, UserCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function DashboardNav({ onProfileClick }: { onProfileClick?: () => void }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = [
        { label: 'Console', href: '/dashboard' },
        { label: 'Directives', href: '/blogs' },
        { label: 'Statistics', href: '/stats' },
    ];

    return (
        <nav className="relative z-20 border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo className="w-28 h-auto" />
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.3em] transition-all relative py-1",
                                    isActive
                                        ? "text-white"
                                        : "text-white/30 hover:text-white"
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#00FFB2] shadow-[0_0_8px_#00FFB2]" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button
                    onClick={onProfileClick}
                    className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-[#00FFB2] hover:border-[#00FFB2]/50 transition-colors"
                >
                    <UserCircle size={20} />
                </button>
                <button
                    onClick={handleLogout}
                    className="text-white/40 hover:text-red-500 transition-colors flex items-center gap-2 text-[9px] font-black uppercase tracking-widest pl-4 border-l border-white/5"
                >
                    <LogOut size={16} />
                    <span className="hidden md:inline">Disconnect</span>
                </button>
            </div>
        </nav>
    );
}
