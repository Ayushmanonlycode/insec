'use client';

import React, { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    autoCloseSeconds?: number;
}

export function SuccessModal({ isOpen, onClose, title, message, autoCloseSeconds = 5 }: SuccessModalProps) {
    useEffect(() => {
        if (isOpen && autoCloseSeconds > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoCloseSeconds, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-zinc-950 border border-[#00FFB2]/30 w-full max-w-sm rounded-sm shadow-[0_0_50px_rgba(0,255,178,0.1)] relative overflow-hidden"
                    >
                        {/* Decorative Background Scanline */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFB2]/20 animate-scanline"></div>
                        </div>

                        <div className="p-8 flex flex-col items-center text-center space-y-6">
                            {/* Animated Icon Container */}
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                    className="w-16 h-16 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,178,0.2)]"
                                >
                                    <ShieldCheck size={32} className="text-[#00FFB2]" />
                                </motion.div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full border border-[#00FFB2]/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FFB2]">Protocol Success</h3>
                                <h2 className="text-lg font-black uppercase tracking-tight text-white">{title}</h2>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full bg-[#00FFB2] text-black py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,255,178,0.2)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                            >
                                Acknowledge
                            </button>
                        </div>

                        {/* Progress Bar for Auto-Close */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: autoCloseSeconds, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-[#00FFB2]/50"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}