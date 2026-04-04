'use client';
import Link from 'next/link';
import { Edit2, Trash2, Eye } from 'lucide-react';
import type { Student } from '@/types/student';
import { COURSE_LABELS, STATUS_CONFIG } from '@/types/student';
import { clsx } from 'clsx';
import { format } from 'date-fns';

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string, name: string) => void;
}

export default function StudentTable({ students, onDelete }: StudentTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-border">
              {['Student', 'ID', 'Course', 'Semester', 'GPA', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {students.map((s) => {
              const statusCfg = STATUS_CONFIG[s.status];
              const gpaColor = Number(s.gpa) >= 3.5 ? 'text-emerald-400' : Number(s.gpa) >= 3.0 ? 'text-brand-400' : Number(s.gpa) >= 2.5 ? 'text-amber-400' : 'text-rose-400';
              const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${s.first_name}+${s.last_name}&backgroundColor=4f54e5&textColor=ffffff`;
              return (
                <tr key={s.id} className="hover:bg-surface-muted/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={avatarUrl} alt={s.first_name} className="w-8 h-8 rounded-lg" />
                      <div>
                        <p className="text-sm font-medium text-white">{s.first_name} {s.last_name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[180px]">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-brand-400 bg-brand-600/10 px-2 py-0.5 rounded">{s.student_id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-400 max-w-[140px] truncate block">
                      {COURSE_LABELS[s.course] ?? s.course}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{s.semester}</td>
                  <td className="px-4 py-3">
                    <span className={clsx('text-sm font-bold', gpaColor)}>{Number(s.gpa).toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx('badge border', statusCfg.bg, statusCfg.color)}>{statusCfg.label}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {format(new Date(s.admission_date), 'dd MMM yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/students/${s.id}`}>
                        <button className="p-1.5 rounded-lg hover:bg-surface-border text-slate-500 hover:text-brand-400 transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <Link href={`/students/${s.id}/edit`}>
                        <button className="p-1.5 rounded-lg hover:bg-surface-border text-slate-500 hover:text-brand-400 transition-colors" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => onDelete(s.id, `${s.first_name} ${s.last_name}`)}
                        className="p-1.5 rounded-lg hover:bg-rose-600/10 text-slate-500 hover:text-rose-400 transition-colors" title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
