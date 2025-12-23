'use client';

import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/ui/navbar';

export default function HeroSection() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

            <section id="hero" className="relative w-full bg-black text-white text-sm pb-44 min-h-screen overflow-hidden">
                {/* Structural White Grid with Enhanced Light */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Central Radial Light Glow */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#00FFB2]/10 blur-[120px] rounded-full opacity-50"></div>
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/10 blur-[100px] rounded-full opacity-50"></div>

                    {/* Horizontal Lines */}
                    <div className="absolute top-0 w-full h-px bg-white/20"></div>
                    <div className="absolute top-[20%] w-full h-px bg-white/10"></div>
                    <div className="absolute top-[40%] w-full h-px bg-white/20"></div>
                    <div className="absolute top-[60%] w-full h-px bg-white/10"></div>
                    <div className="absolute top-[80%] w-full h-px bg-white/20"></div>
                    <div className="absolute bottom-0 w-full h-px bg-white/20"></div>

                    {/* Vertical Lines */}
                    <div className="absolute left-0 h-full w-px bg-white/20"></div>
                    <div className="absolute left-[25%] h-full w-px bg-white/10"></div>
                    <div className="absolute left-[50%] h-full w-px bg-white/20"></div>
                    <div className="absolute left-[75%] h-full w-px bg-white/10"></div>
                    <div className="absolute right-0 h-full w-px bg-white/20"></div>

                    {/* Crosshair Details */}
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rounded-full"></div>
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
                </div>

                <Navbar />

                
                <button onClick={() => window.location.href = "https://www.getastra.com/blog/compliance/nist/iso-27001-vs-nist/"} className="relative z-10 flex items-center gap-3 border border-white/20 rounded-full w-max mx-auto px-6 py-2 mt-40 md:mt-32 bg-black hover:bg-white hover:text-black transition-all group cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-widest border border-current px-2 py-0.5 rounded-sm">Enterprise Grade</span>
                    <span className="font-medium text-xs md:text-sm">Aligned with OWASP, NIST, SANS, and ISO 27001</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <h1 className="relative z-10 text-5xl md:text-8xl font-black max-w-[1100px] text-center mx-auto mt-10 text-white leading-[1.1] tracking-tighter">
                    ALL-IN-ONE <br /> <span className="inline-block mt-4 md:mt-0 bg-white text-black px-4 lowercase tracking-tight">cyber defence</span>
                </h1>

                <p className="relative z-10 text-lg md:text-2xl mx-auto max-w-3xl text-center mt-10 text-white/70 font-medium max-md:px-6 leading-relaxed">
                    Proactive cybersecurity, continuous monitoring, and enterprise-grade compliance — all in one platform.
                </p>

                <div className="relative z-10 mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 px-4">
                    <button className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-sm font-black text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase tracking-tighter">
                        Deploy Protection
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/20 bg-transparent px-12 py-5 rounded-sm font-black text-lg hover:bg-white hover:text-black transition-all uppercase tracking-tighter">
                        <span>Red Team Audit</span>
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Core Stats/Metrics Overlay */}
                <div className="relative z-10 mt-24 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center md:text-left">
                    <div className="border-l border-white/20 pl-6 py-4">
                        <div className="text-3xl font-black">BILLIONS</div>
                        <div className="text-xs uppercase text-white/40 tracking-widest mt-1">Records Analyzed</div>
                    </div>
                    <div className="border-l border-white/20 pl-6 py-4">
                        <div className="text-3xl font-black">MILLIONS</div>
                        <div className="text-xs uppercase text-white/40 tracking-widest mt-1">Lines of Code reviewed</div>
                    </div>
                    <div className="border-l border-white/20 pl-6 py-4">
                        <div className="text-3xl font-black">100+</div>
                        <div className="text-xs uppercase text-white/40 tracking-widest mt-1">Organizations Served</div>
                    </div>
                    <div className="border-l border-white/20 pl-6 py-4">
                        <div className="text-3xl font-black">24x7</div>
                        <div className="text-xs uppercase text-white/40 tracking-widest mt-1">Asset Monitoring</div>
                    </div>
                </div>
            </section>
        </>
    );
}
