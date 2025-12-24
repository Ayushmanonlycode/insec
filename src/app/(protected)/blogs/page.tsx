'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, ShieldAlert } from 'lucide-react';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { BlogCard, Blog } from '@/components/blogs/BlogCard';
import { CreateBlogModal } from '@/components/blogs/CreateBlogModal';
import { ProfileModal } from '@/components/dashboard/ProfileModal';
import { SystemSidebar } from '@/components/dashboard/SystemSidebar';
import Footer from '@/components/layout/Footer';

import { useRouter } from 'next/navigation';

export default function BlogsPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ id: string; fullName: string | null } | null>(null);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/blogs');
            if (res.ok) {
                const data = await res.json();
                setBlogs(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch blogs', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                } else if (res.status === 401) {
                    router.push('/login');
                }
            } catch (err) {
                console.error('Failed to fetch user', err);
                router.push('/login');
            }
        };
        fetchUser();
        fetchBlogs();
    }, [router]);

    const handleSubmitBlog = async (blogData: { title: string; content: string }) => {
        const isEdit = !!editingBlog;
        const url = isEdit ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
        const method = isEdit ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogData),
        });

        const data = await res.json();

        if (res.ok) {
            if (isEdit) {
                setBlogs(prev => prev.map(b => b.id === editingBlog.id ? data.data : b));
            } else {
                setBlogs(prev => [data.data, ...prev]);
            }
            setEditingBlog(null);
        } else {
            throw new Error(data.message || 'Transmission failed');
        }
    };

    const handleDeleteBlog = async (id: string) => {
        if (!confirm('Are you sure you want to terminate this directive?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBlogs(prev => prev.filter(b => b.id !== id));
            }
        } catch (err) {
            console.error('Failed to delete blog', err);
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        if (searchQuery.trim() === '') return true;
        const query = searchQuery.toLowerCase();
        return (
            blog.title.toLowerCase().includes(query) ||
            blog.content.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
            {/* Structural Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[10%] w-full h-px bg-white/10"></div>
                <div className="absolute top-[90%] w-full h-px bg-white/10"></div>
                <div className="absolute left-[5%] h-full w-px bg-white/10"></div>
                <div className="absolute left-[95%] h-full w-px bg-white/10"></div>
            </div>

            <DashboardNav onProfileClick={() => setIsProfileModalOpen(true)} />

            <div className="relative z-10 flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full space-y-12 pb-24">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FFB2] bg-[#00FFB2]/10 px-3 py-1 rounded-sm border border-[#00FFB2]/20">Information Node</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Intelligence Directives</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Secure <span className="text-white/20">Insights</span>
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 max-w-lg leading-relaxed">
                            Access and broadcast critical intelligence directives to maintain network superiority across all distributed nodes.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingBlog(null);
                            setIsCreateModalOpen(true);
                        }}
                        className="bg-[#00FFB2] text-black px-6 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,255,178,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-3"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Publish Directive
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Blog Feed */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Feed Action Bar */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 mr-4">
                                    <BookOpen size={18} className="text-[#00FFB2]" /> Directive Stream
                                </h2>
                            </div>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    type="text"
                                    placeholder="Search Directives..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-zinc-900/50 border border-white/10 rounded-sm py-2 pl-9 pr-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#00FFB2]/50 w-72 transition-all"
                                />
                            </div>
                        </div>

                        {/* Directives Grid - Internally Scrollable */}
                        <div className="max-h-[75vh] overflow-y-auto pr-2 mini-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isLoading ? (
                                    <div className="col-span-full py-20 flex flex-col items-center justify-center border border-white/5 bg-zinc-950/20 rounded-sm">
                                        <div className="w-8 h-8 border-2 border-[#00FFB2]/20 border-t-[#00FFB2] rounded-full animate-spin mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Syncing Intelligence Stream...</span>
                                    </div>
                                ) : blogs.length === 0 ? (
                                    <div className="col-span-full py-20 flex flex-col items-center justify-center border border-white/5 bg-zinc-950/20 rounded-sm">
                                        <ShieldAlert size={40} className="text-white/10 mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">No active directives found.</span>
                                    </div>
                                ) : (
                                    filteredBlogs.map((blog) => {
                                        const isAuthor = user?.id && blog.authorId.toLowerCase() === user.id.toLowerCase();
                                        return (
                                            <BlogCard
                                                key={blog.id}
                                                blog={blog}
                                                onEdit={isAuthor ? (blog) => {
                                                    setEditingBlog(blog);
                                                    setIsCreateModalOpen(true);
                                                } : undefined}
                                                onDelete={isAuthor ? handleDeleteBlog : undefined}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Integration */}
                    <div className="hidden lg:block">
                        <SystemSidebar />
                    </div>
                </div>
            </div>

            <CreateBlogModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setEditingBlog(null);
                }}
                onSubmit={handleSubmitBlog}
                initialData={editingBlog}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onUpdate={(newProfile) => setUser(newProfile)}
            />

            <Footer variant="minimal" />
        </main>
    );
}
