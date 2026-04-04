'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users, TrendingUp, Award, BookOpen, UserPlus,
  Activity, Database, Zap, ArrowRight, Star,
} from 'lucide-react';
import { studentsApi } from '@/lib/students.api';
import type { DashboardStats } from '@/types/student';
import { COURSE_LABELS } from '@/types/student';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs text-slate-500 font-mono bg-surface-muted px-2 py-0.5 rounded-lg">live</span>
      </div>
      <div>
        <p className="text-3xl font-display font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="stat-card">
      <div className="w-10 h-10 rounded-xl bg-surface-muted animate-pulse" />
      <div className="space-y-2">
        <div className="h-8 w-24 bg-surface-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-surface-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsApi.getDashboard()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const ov = stats?.overview;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="animate-fade-in">
          <h1 className="font-display font-bold text-3xl text-white">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time overview from NeonDB stored functions
          </p>
        </div>
        <Link href="/students/new" className="btn-primary flex items-center gap-2 w-fit">
          <UserPlus className="w-4 h-4" />
          Add Student
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard icon={Users}     label="Total Students"   value={ov?.total_students ?? 0}  color="bg-brand-600/20 text-brand-400" />
            <StatCard icon={Activity}  label="Active Students"  value={ov?.active_students ?? 0} color="bg-emerald-500/20 text-emerald-400" />
            <StatCard icon={Award}     label="Average GPA"      value={Number(ov?.avg_gpa ?? 0).toFixed(2)} color="bg-amber-500/20 text-amber-400" sub="out of 4.00" />
            <StatCard icon={TrendingUp} label="New This Month"  value={ov?.new_this_month ?? 0}  color="bg-cyan-500/20 text-cyan-400" />
          </>
        )}
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loading ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />) : (
          <>
            <StatCard icon={Star}     label="Graduated"        value={ov?.graduated ?? 0}       color="bg-violet-500/20 text-violet-400" />
            <StatCard icon={BookOpen} label="Active Courses"   value={ov?.courses_count ?? 0}   color="bg-rose-500/20 text-rose-400" />
            <StatCard icon={Zap}      label="Suspended"        value={ov?.suspended ?? 0}        color="bg-orange-500/20 text-orange-400" />
          </>
        )}
      </div>

      {/* Course Stats + GPA Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Stats */}
        <div className="card p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-4 h-4 text-brand-400" />
            <h2 className="font-display font-semibold text-white">Students per Course</h2>
            <span className="text-xs text-slate-600 ml-auto font-mono">fn_course_stats()</span>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-10 bg-surface-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(stats?.courseStats ?? []).slice(0, 7).map((cs) => {
                const pct = ov?.total_students ? Math.round((cs.total / ov.total_students) * 100) : 0;
                return (
                  <div key={cs.course} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300 truncate max-w-[60%]">
                        {COURSE_LABELS[cs.course as keyof typeof COURSE_LABELS] ?? cs.course}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="text-brand-400 font-semibold">{cs.total}</span>
                        <span>GPA {Number(cs.avg_gpa).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* GPA Distribution */}
        <div className="card p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-4 h-4 text-amber-400" />
            <h2 className="font-display font-semibold text-white">GPA Distribution</h2>
            <span className="text-xs text-slate-600 ml-auto font-mono">fn_gpa_distribution()</span>
          </div>
          {loading ? (
            <div className="space-y-3">{Array(5).fill(0).map((_, i) => <div key={i} className="h-16 bg-surface-muted rounded-xl animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {(stats?.gpaDistribution ?? []).map((g, i) => {
                const colors = ['text-emerald-400 bg-emerald-400/10 border-emerald-400/20', 'text-brand-400 bg-brand-400/10 border-brand-400/20', 'text-amber-400 bg-amber-400/10 border-amber-400/20', 'text-orange-400 bg-orange-400/10 border-orange-400/20', 'text-rose-400 bg-rose-400/10 border-rose-400/20'];
                const total = stats?.gpaDistribution.reduce((a, b) => a + Number(b.count), 0) || 1;
                const pct = Math.round((Number(g.count) / total) * 100);
                return (
                  <div key={g.range} className={`flex items-center justify-between p-3 rounded-xl border ${colors[i] ?? colors[4]}`}>
                    <div>
                      <p className="text-sm font-medium">{g.range}</p>
                      <div className="h-1 w-24 bg-black/20 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-current rounded-full opacity-60" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-display font-bold">{g.count}</p>
                      <p className="text-xs opacity-60">{pct}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 card p-6 animate-fade-in">
        <h2 className="font-display font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: '/students',     label: 'View All Students',  icon: Users,    color: 'text-brand-400' },
            { href: '/students/new', label: 'Register Student',   icon: UserPlus, color: 'text-emerald-400' },
            { href: '/students?status=active', label: 'Active Students', icon: Activity, color: 'text-cyan-400' },
          ].map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-muted hover:bg-surface-border border border-surface-border hover:border-brand-700/50 transition-all duration-200 group">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
              <ArrowRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
