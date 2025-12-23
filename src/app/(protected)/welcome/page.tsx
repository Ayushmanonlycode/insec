'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
    const router = useRouter();
    const user = { displayName: 'John Doe' };
    const [currentMessage, setCurrentMessage] = useState(0);

    const messages = [
        { text: "Securing connection...", style: "text-white/40" },
        { text: "Loading workspace...", style: "text-white/40" },
        { text: "Synchronizing...", style: "text-white/40" },
    ];

    useEffect(() => {
        const totalTime = 3500;
        const timer = setTimeout(() => {
            router.replace('/dashboard');
        }, totalTime);

        const messageInterval = 1000;
        const messageTimer = setInterval(() => {
            setCurrentMessage((prev) => {
                if (prev < messages.length - 1) return prev + 1;
                return prev;
            });
        }, messageInterval);

        return () => {
            clearTimeout(timer);
            clearInterval(messageTimer);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white font-sans">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="text-center z-10 relative px-6"
            >
                <div className="flex flex-col items-center gap-6">
                    {/* Minimalist Spinner */}
                    <div className="w-6 h-6 border-2 border-white/10 border-t-white rounded-full animate-spin" />

                    <motion.h1
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-medium tracking-tight text-white"
                    >
                        Welcome, <span className="text-white/60">{user?.displayName || 'User'}</span>
                    </motion.h1>
                </div>

                <div className="h-8 mt-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentMessage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`text-xs font-medium tracking-wide ${messages[currentMessage].style}`}
                        >
                            {messages[currentMessage].text}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
