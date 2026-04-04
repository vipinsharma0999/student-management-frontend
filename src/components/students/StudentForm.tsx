'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx } from 'clsx';
import { User, Mail, Phone, Calendar, BookOpen, Hash, Star, MapPin, Save, Loader2 } from 'lucide-react';
import type { Student, CourseType, GenderType } from '@/types/student';
import { COURSE_LABELS } from '@/types/student';

const schema = z.object({
  first_name:    z.string().min(2, 'Minimum 2 characters').max(100),
  last_name:     z.string().min(2, 'Minimum 2 characters').max(100),
  email:         z.string().email('Invalid email address'),
  phone:         z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile').optional().or(z.literal('')),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender:        z.enum(['male','female','other','prefer_not_to_say'] as const),
  course:        z.string().min(1, 'Select a course') as z.ZodType<CourseType>,
  semester:      z.coerce.number().min(1).max(12),
  gpa:           z.coerce.number().min(0).max(4).optional(),
  status:        z.enum(['active','inactive','graduated','suspended'] as const).optional(),
  address:       z.string().optional(),
  city:          z.string().optional(),
  state:         z.string().optional(),
  country:       z.string().optional(),
  pincode:       z.string().regex(/^\d{6}$/, 'Enter valid 6-digit pincode').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

interface StudentFormProps {
  defaultValues?: Partial<Student>;
  onSubmit: (data: FormData) => Promise<void>;
  isEdit?: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

function FieldGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('grid gap-4', className)}>{children}</div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="error-text"><span>⚠</span>{error}</p>}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-surface-border">
      <Icon className="w-4 h-4 text-brand-400" />
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

export default function StudentForm({ defaultValues, onSubmit, isEdit = false }: StudentFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name:    defaultValues?.first_name    ?? '',
      last_name:     defaultValues?.last_name     ?? '',
      email:         defaultValues?.email         ?? '',
      phone:         defaultValues?.phone         ?? '',
      date_of_birth: defaultValues?.date_of_birth?.split('T')[0] ?? '',
      gender:        defaultValues?.gender        ?? 'male',
      course:        defaultValues?.course        ?? '' as CourseType,
      semester:      defaultValues?.semester      ?? 1,
      gpa:           defaultValues?.gpa           ?? 0,
      status:        defaultValues?.status        ?? 'active',
      address:       defaultValues?.address       ?? '',
      city:          defaultValues?.city          ?? '',
      state:         defaultValues?.state         ?? '',
      country:       defaultValues?.country       ?? 'India',
      pincode:       defaultValues?.pincode       ?? '',
    },
  });

  const inp = 'input-field';
  const sel = clsx(inp, 'cursor-pointer');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Info */}
      <div className="card p-6">
        <SectionTitle icon={User} title="Personal Information" />
        <FieldGroup className="grid-cols-1 sm:grid-cols-2">
          <Field label="First Name *" error={errors.first_name?.message}>
            <input {...register('first_name')} className={inp} placeholder="e.g. Aarav" />
          </Field>
          <Field label="Last Name *" error={errors.last_name?.message}>
            <input {...register('last_name')} className={inp} placeholder="e.g. Sharma" />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input {...register('email')} type="email" className={clsx(inp, 'pl-10')} placeholder="student@edu.in" />
            </div>
          </Field>
          <Field label="Mobile Number" error={errors.phone?.message}>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input {...register('phone')} className={clsx(inp, 'pl-10')} placeholder="9876543210" />
            </div>
          </Field>
          <Field label="Date of Birth *" error={errors.date_of_birth?.message}>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input {...register('date_of_birth')} type="date" className={clsx(inp, 'pl-10')} max={new Date().toISOString().split('T')[0]} />
            </div>
          </Field>
          <Field label="Gender *" error={errors.gender?.message}>
            <select {...register('gender')} className={sel}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </Field>
        </FieldGroup>
      </div>

      {/* Academic Info */}
      <div className="card p-6">
        <SectionTitle icon={BookOpen} title="Academic Information" />
        <FieldGroup className="grid-cols-1 sm:grid-cols-2">
          <Field label="Course *" error={errors.course?.message}>
            <select {...register('course')} className={sel}>
              <option value="">— Select Course —</option>
              {Object.entries(COURSE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </Field>
          <Field label="Semester *" error={errors.semester?.message}>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input {...register('semester')} type="number" min={1} max={12} className={clsx(inp, 'pl-10')} placeholder="1–12" />
            </div>
          </Field>
          <Field label="GPA (0–4)" error={errors.gpa?.message}>
            <div className="relative">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input {...register('gpa')} type="number" step="0.01" min={0} max={4} className={clsx(inp, 'pl-10')} placeholder="e.g. 3.85" />
            </div>
          </Field>
          {isEdit && (
            <Field label="Status" error={errors.status?.message}>
              <select {...register('status')} className={sel}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="suspended">Suspended</option>
              </select>
            </Field>
          )}
        </FieldGroup>
      </div>

      {/* Address */}
      <div className="card p-6">
        <SectionTitle icon={MapPin} title="Address Information" />
        <FieldGroup className="grid-cols-1">
          <Field label="Street Address" error={errors.address?.message}>
            <textarea {...register('address')} rows={2} className={clsx(inp, 'resize-none')} placeholder="House/Flat No., Street, Area" />
          </Field>
        </FieldGroup>
        <FieldGroup className="grid-cols-1 sm:grid-cols-2 mt-4">
          <Field label="City" error={errors.city?.message}>
            <input {...register('city')} className={inp} placeholder="e.g. Jaipur" />
          </Field>
          <Field label="State" error={errors.state?.message}>
            <select {...register('state')} className={sel}>
              <option value="">— Select State —</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Pincode" error={errors.pincode?.message}>
            <input {...register('pincode')} className={inp} placeholder="6-digit pincode" maxLength={6} />
          </Field>
          <Field label="Country" error={errors.country?.message}>
            <input {...register('country')} className={inp} placeholder="India" />
          </Field>
        </FieldGroup>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {isEdit ? 'Saving...' : 'Registering...'}</>
          ) : (
            <><Save className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Register Student'}</>
          )}
        </button>
      </div>
    </form>
  );
}
