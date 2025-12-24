'use client';

import React, { useState, useEffect } from 'react';
import { User, X, ShieldCheck, UserCircle, Mail, AtSign } from 'lucide-react';
import { SuccessModal } from '@/components/common/SuccessModal';

interface UserProfile {
    id: string;
    email: string;
    username: string;
    fullName: string | null;
}

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: (newProfile: UserProfile) => void;
}

export function ProfileModal({ isOpen, onClose, onUpdate }: ProfileModalProps) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen]);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/users/profile');
            if (res.ok) {
                const data = await res.json();
                setProfile(data.data);
                setFormData({
                    fullName: data.data.fullName || '',
                    username: data.data.username || '',
                    email: data.data.email || ''
                });
            }
        } catch (err) {
            console.error('Failed to fetch profile', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessModal({
                    isOpen: true,
                    title: 'Profile Updated',
                    message: 'Identity protocol has been synced.'
                });
                setProfile(data.data);
                if (onUpdate) onUpdate(data.data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err: any) {
            console.error('Failed to update profile', err);
            alert('Profile update failed: Network error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-sm shadow-2xl relative animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                        <UserCircle size={16} className="text-[#00FFB2]" /> IDENTITY PROTOCOL
                    </h2>
                    <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-2 border-[#00FFB2]/20 border-t-[#00FFB2] rounded-full animate-spin" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Full Identity Name</label>
                            <div className="relative">
                                <UserCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    required
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-black border border-white/20 rounded-sm py-3 pl-10 pr-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#00FFB2] disabled:opacity-50"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Codename / Username</label>
                            <div className="relative">
                                <AtSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    required
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-black border border-white/20 rounded-sm py-3 pl-10 pr-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#00FFB2] disabled:opacity-50"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 ml-1">Secure Channel (Email)</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black border border-white/20 rounded-sm py-3 pl-10 pr-4 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#00FFB2] disabled:opacity-50"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#00FFB2] text-black py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(0,255,178,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShieldCheck size={16} strokeWidth={3} />
                            {isSubmitting ? 'Syncing Profile...' : 'Update Protocol'}
                        </button>
                    </form>
                )}

                <SuccessModal
                    isOpen={successModal.isOpen}
                    title={successModal.title}
                    message={successModal.message}
                    onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
                />
            </div>
        </div>
    );
}
