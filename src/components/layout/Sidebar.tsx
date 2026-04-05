'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserPlus, GraduationCap,
  ChevronRight, Sparkles, Menu, X,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/',             label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/students',     label: 'All Students', icon: Users },
  { href: '/students/new', label: 'Add Student',  icon: UserPlus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-cyan rounded-full border-2 border-surface-card" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm leading-tight">EduManage</p>
            <p className="text-xs text-slate-500 font-mono">Pro v1.0</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                active
                  ? 'bg-brand-600/20 text-brand-400 border border-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-surface-muted',
              )}
            >
              <Icon className={clsx('w-4 h-4 shrink-0 transition-colors', active ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300')} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-brand-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="p-4 border-t border-surface-border">
        <div className="bg-gradient-to-br from-brand-600/20 to-accent-violet/10 rounded-xl p-4 border border-brand-600/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <p className="text-xs font-semibold text-brand-300">Database</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Powered by NeonDB with stored procedures & indexing
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow" />
            <span className="text-xs text-accent-cyan font-medium">Connected</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ── Mobile top navbar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-surface-card border-b border-surface-border flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <p className="font-display font-bold text-white text-sm">EduManage Pro</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-muted transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer backdrop ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside className={clsx(
        'md:hidden fixed top-0 left-0 z-40 h-full w-72 bg-surface-card border-r border-surface-border flex flex-col transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <NavContent />
      </aside>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 shrink-0 bg-surface-card border-r border-surface-border flex-col h-screen sticky top-0 overflow-hidden">
        <NavContent />
      </aside>
    </>
  );
}
