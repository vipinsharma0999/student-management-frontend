'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit2 } from 'lucide-react';
import StudentForm from '@/components/students/StudentForm';
import { studentsApi } from '@/lib/students.api';
import type { Student } from '@/types/student';
import toast from 'react-hot-toast';

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsApi.getById(id)
      .then(setStudent)
      .catch(() => toast.error('Student not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      await studentsApi.update(id, data);
      toast.success('Student updated successfully!');
      router.push(`/students/${id}`);
    } catch {}
  };

  if (loading) return (
    <div className="page-container max-w-4xl">
      <div className="space-y-4">
        <div className="h-10 w-64 bg-surface-muted rounded-xl animate-pulse" />
        {Array(3).fill(0).map((_, i) => <div key={i} className="card p-6 h-48 animate-pulse bg-surface-muted" />)}
      </div>
    </div>
  );

  if (!student) return (
    <div className="page-container text-center py-20">
      <p className="text-slate-400">Student not found</p>
    </div>
  );

  return (
    <div className="page-container max-w-4xl">
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link href={`/students/${id}`}>
          <button className="p-2 rounded-xl border border-surface-border hover:border-brand-600/50 text-slate-500 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Edit2 className="w-4 h-4 text-amber-400" />
            </div>
            <h1 className="font-display font-bold text-3xl text-white">Edit Student</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1 ml-10">
            Editing <span className="text-brand-400 font-mono">{student.student_id}</span> — {student.first_name} {student.last_name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 animate-fade-in">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-slow" />
        <p className="text-sm text-amber-300">
          Changes are saved via <code className="font-mono text-amber-200 bg-amber-500/20 px-1 py-0.5 rounded text-xs">sp_update_student()</code> stored procedure.
          All changes are automatically logged in the audit table.
        </p>
      </div>

      <div className="animate-slide-up">
        <StudentForm defaultValues={student} onSubmit={handleSubmit} isEdit />
      </div>
    </div>
  );
}
