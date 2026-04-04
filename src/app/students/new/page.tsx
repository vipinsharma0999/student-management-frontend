'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';
import StudentForm from '@/components/students/StudentForm';
import { studentsApi } from '@/lib/students.api';
import toast from 'react-hot-toast';

export default function NewStudentPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const student = await studentsApi.create(data);
      toast.success(`${data.first_name} registered successfully! ID: ${student.student_id}`);
      router.push('/students');
    } catch {
      // toast handled by interceptor
    }
  };

  return (
    <div className="page-container max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link href="/students">
          <button className="p-2 rounded-xl border border-surface-border hover:border-brand-600/50 text-slate-500 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-brand-400" />
            </div>
            <h1 className="font-display font-bold text-3xl text-white">Register Student</h1>
          </div>
          <p className="text-slate-500 text-sm mt-1 ml-10">
            Fill in the details below to register a new student via stored procedure
          </p>
        </div>
      </div>

      {/* DB info banner */}
      {/* <div className="flex items-center gap-3 bg-brand-600/10 border border-brand-600/20 rounded-xl px-4 py-3 mb-6 animate-fade-in">
        <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse-slow" />
        <p className="text-sm text-brand-300">
          This form calls <code className="font-mono text-brand-200 bg-brand-600/20 px-1 py-0.5 rounded text-xs">sp_create_student()</code> stored procedure in NeonDB,
          which auto-generates a unique student ID and validates email uniqueness.
        </p>
      </div> */}

      <div className="animate-slide-up">
        <StudentForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
