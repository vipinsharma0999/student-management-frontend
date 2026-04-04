'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Edit2, Trash2, Mail, Phone, BookOpen, Hash,
  Star, MapPin, Calendar, User, GraduationCap, Clock, Database,
} from 'lucide-react';
import { studentsApi } from '@/lib/students.api';
import type { Student } from '@/types/student';
import { COURSE_LABELS, STATUS_CONFIG, GENDER_LABELS } from '@/types/student';
import DeleteModal from '@/components/ui/DeleteModal';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-surface-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-sm text-slate-200 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    studentsApi.getById(id)
      .then(setStudent)
      .catch(() => toast.error('Student not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await studentsApi.remove(id);
      toast.success('Student deleted');
      router.push('/students');
    } catch {}
    finally { setDeleteLoading(false); }
  };

  if (loading) return (
    <div className="page-container max-w-5xl">
      <div className="card p-8 animate-pulse space-y-6">
        <div className="flex gap-6"><div className="w-24 h-24 rounded-2xl bg-surface-muted" /><div className="flex-1 space-y-3"><div className="h-7 w-48 bg-surface-muted rounded" /><div className="h-4 w-32 bg-surface-muted rounded" /></div></div>
        <div className="grid grid-cols-3 gap-4">{Array(6).fill(0).map((_, i) => <div key={i} className="h-20 bg-surface-muted rounded-xl" />)}</div>
      </div>
    </div>
  );

  if (!student) return (
    <div className="page-container text-center py-20">
      <p className="text-slate-400 text-lg">Student not found</p>
      <Link href="/students" className="btn-primary mt-4 inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</Link>
    </div>
  );

  const statusCfg = STATUS_CONFIG[student.status];
  const gpaColor = Number(student.gpa) >= 3.5 ? 'text-emerald-400' : Number(student.gpa) >= 3.0 ? 'text-brand-400' : Number(student.gpa) >= 2.5 ? 'text-amber-400' : 'text-rose-400';
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${student.first_name}+${student.last_name}&backgroundColor=4f54e5&textColor=ffffff`;

  return (
    <div className="page-container max-w-5xl">
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <Link href="/students">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Students
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/students/${id}/edit`}>
            <button className="btn-secondary flex items-center gap-2"><Edit2 className="w-4 h-4" />Edit</button>
          </Link>
          <button onClick={() => setShowDelete(true)} className="btn-danger flex items-center gap-2">
            <Trash2 className="w-4 h-4" />Delete
          </button>
        </div>
      </div>

      {/* Profile header */}
      <div className="card p-6 mb-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={student.first_name} className="w-20 h-20 rounded-2xl ring-2 ring-brand-600/40 shadow-glow-sm" />
            <div className={clsx('absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-surface-card', student.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500')} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="font-display font-bold text-2xl text-white">
                {student.first_name} {student.last_name}
              </h1>
              <span className={clsx('badge border', statusCfg.bg, statusCfg.color)}>{statusCfg.label}</span>
            </div>
            <p className="text-brand-400 font-mono text-sm">{student.student_id}</p>
            <p className="text-slate-500 text-sm mt-1">{student.email}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'GPA', value: Number(student.gpa).toFixed(2), color: gpaColor },
              { label: 'Semester', value: student.semester, color: 'text-white' },
              { label: 'Admitted', value: format(new Date(student.admission_date), 'MMM yy'), color: 'text-slate-300' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-surface-muted rounded-xl px-4 py-3 text-center">
                <p className={clsx('font-display font-bold text-lg', color)}>{value}</p>
                <p className="text-xs text-slate-600 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-brand-400" />
            <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Personal Info</h2>
          </div>
          <InfoRow icon={Mail}     label="Email"         value={student.email} />
          <InfoRow icon={Phone}    label="Phone"         value={student.phone} />
          <InfoRow icon={Calendar} label="Date of Birth" value={format(new Date(student.date_of_birth), 'dd MMMM yyyy')} />
          <InfoRow icon={User}     label="Gender"        value={GENDER_LABELS[student.gender]} />
        </div>

        <div className="card p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-accent-cyan" />
            <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Academic Info</h2>
          </div>
          <InfoRow icon={BookOpen} label="Course"   value={COURSE_LABELS[student.course] ?? student.course} />
          <InfoRow icon={Hash}     label="Semester" value={`Semester ${student.semester}`} />
          <InfoRow icon={Star}     label="GPA"      value={`${Number(student.gpa).toFixed(2)} / 4.00`} />
          <InfoRow icon={Calendar} label="Admission Date" value={format(new Date(student.admission_date), 'dd MMMM yyyy')} />
        </div>

        {(student.address || student.city) && (
          <div className="card p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-accent-amber" />
              <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Address</h2>
            </div>
            <InfoRow icon={MapPin} label="Address" value={student.address} />
            <InfoRow icon={MapPin} label="City"    value={student.city} />
            <InfoRow icon={MapPin} label="State"   value={student.state} />
            <InfoRow icon={MapPin} label="Country" value={student.country} />
            <InfoRow icon={Hash}   label="Pincode" value={student.pincode} />
          </div>
        )}

        <div className="card p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-accent-violet" />
            <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Record Info</h2>
          </div>
          <InfoRow icon={Hash}  label="UUID"     value={student.id} />
          <InfoRow icon={Clock} label="Created"  value={format(new Date(student.created_at), 'dd MMM yyyy, HH:mm')} />
          <InfoRow icon={Clock} label="Updated"  value={format(new Date(student.updated_at), 'dd MMM yyyy, HH:mm')} />
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          name={`${student.first_name} ${student.last_name}`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
