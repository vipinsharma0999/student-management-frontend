'use client';
import Link from 'next/link';
import { Mail, Phone, BookOpen, Hash, Star, Edit2, Trash2, Eye, GraduationCap } from 'lucide-react';
import type { Student } from '@/types/student';
import { COURSE_LABELS, STATUS_CONFIG, GENDER_LABELS } from '@/types/student';
import { clsx } from 'clsx';
import { format } from 'date-fns';

interface StudentCardProps {
  student: Student;
  onDelete: (id: string, name: string) => void;
}

export default function StudentCard({ student, onDelete }: StudentCardProps) {
  const statusCfg = STATUS_CONFIG[student.status];
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${student.first_name}+${student.last_name}&backgroundColor=4f54e5&textColor=ffffff`;

  const gpaColor =
    Number(student.gpa) >= 3.5 ? 'text-emerald-400' :
    Number(student.gpa) >= 3.0 ? 'text-brand-400' :
    Number(student.gpa) >= 2.5 ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="card group hover:border-brand-700/40 transition-all duration-300 animate-slide-up overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-brand-600 via-accent-violet to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarUrl} alt={student.first_name} className="w-12 h-12 rounded-xl ring-2 ring-brand-600/30" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-white text-base truncate">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-xs font-mono text-brand-400 mt-0.5">{student.student_id}</p>
              </div>
              <span className={clsx('badge border flex-shrink-0', statusCfg.bg, statusCfg.color)}>
                {statusCfg.label}
              </span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          {student.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>{student.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="truncate">{COURSE_LABELS[student.course] ?? student.course}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-surface-muted rounded-xl p-2.5 text-center">
            <Hash className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-xs text-slate-500">Sem</p>
            <p className="font-bold text-white text-sm">{student.semester}</p>
          </div>
          <div className="bg-surface-muted rounded-xl p-2.5 text-center">
            <Star className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-xs text-slate-500">GPA</p>
            <p className={clsx('font-bold text-sm', gpaColor)}>{Number(student.gpa).toFixed(2)}</p>
          </div>
          <div className="bg-surface-muted rounded-xl p-2.5 text-center">
            <GraduationCap className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-xs text-slate-500">Joined</p>
            <p className="font-bold text-white text-xs">
              {format(new Date(student.admission_date), 'MMM yy')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
          <Link href={`/students/${student.id}`} className="flex-1">
            <button className="w-full btn-secondary flex items-center justify-center gap-1.5 py-2 text-xs">
              <Eye className="w-3.5 h-3.5" /> View
            </button>
          </Link>
          <Link href={`/students/${student.id}/edit`} className="flex-1">
            <button className="w-full btn-secondary flex items-center justify-center gap-1.5 py-2 text-xs text-brand-400 border-brand-700/30 hover:bg-brand-600/10">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete(student.id, `${student.first_name} ${student.last_name}`)}
            className="p-2 rounded-xl border border-surface-border hover:border-rose-600/30 hover:bg-rose-600/10 text-slate-500 hover:text-rose-400 transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
