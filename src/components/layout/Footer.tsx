'use client';

import React from 'react';
import Logo from '@/components/common/Logo';
import { cn } from '@/lib/utils';
import { Github, Twitter, Linkedin, ArrowUpRight, Youtube } from 'lucide-react';

const footerLinks = [
    {
        title: "Solutions",
        links: [
            { label: "Penetration Testing", href: "#" },
            { label: "VAPT Services", href: "#" },
            { label: "Cloud Security", href: "#" },
            { label: "Compliance Audit", href: "#" },
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Security Blog", href: "#" },
            { label: "Case Studies", href: "#" },
            { label: "Documentation", href: "#" },
            { label: "Advisories", href: "#" },
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Press Kit", href: "#" },
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Security Policy", href: "#" },
        ]
    }
];

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-24 pb-12 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
                {/* Brand Section */}
                <div className="lg:col-span-2 flex flex-col items-start gap-8">
                    <a href="/" className="group transition-all duration-300">
                        <Logo className="w-48 md:w-56 h-auto text-white group-hover:opacity-80" />
                    </a>
                    <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                        Pioneering the next generation of cybersecurity surveillance. We provide persistent defense mechanisms for modern digital infrastructure.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://x.com/apnisec" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
                            <Twitter size={18} />
                        </a>
                        <a href="https://www.linkedin.com/company/apnisec/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://www.youtube.com/@apnisec" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                {/* Link Sections */}
                {footerLinks.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-6">
                        <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                            {section.title}
                        </h5>
                        <ul className="flex flex-col gap-4">
                            {section.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-[#00FFB2] transition-colors flex items-center group/link"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" size={12} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                    © 2025 APNI SEC INC. ALL RIGHTS RESERVED.
                </div>
                <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00FFB2]">System Status: Operational</span>
                    </div>
                    <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                        Designed for high-integrity environments
                    </div>
                </div>
            </div>
        </footer>
    );
}
