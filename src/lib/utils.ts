import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COURSES: { value: string; label: string; short: string }[] = [
  { value: 'computer_science',        label: 'Computer Science',         short: 'CS'  },
  { value: 'information_technology',  label: 'Information Technology',   short: 'IT'  },
  { value: 'data_science',            label: 'Data Science',             short: 'DS'  },
  { value: 'electrical_engineering',  label: 'Electrical Engineering',   short: 'EE'  },
  { value: 'mechanical_engineering',  label: 'Mechanical Engineering',   short: 'ME'  },
  { value: 'civil_engineering',       label: 'Civil Engineering',        short: 'CE'  },
  { value: 'business_administration', label: 'Business Administration',  short: 'BA'  },
  { value: 'economics',               label: 'Economics',                short: 'EC'  },
  { value: 'mathematics',             label: 'Mathematics',              short: 'MA'  },
  { value: 'physics',                 label: 'Physics',                  short: 'PH'  },
  { value: 'chemistry',               label: 'Chemistry',                short: 'CH'  },
  { value: 'biology',                 label: 'Biology',                  short: 'BI'  },
  { value: 'literature',              label: 'Literature',               short: 'LT'  },
  { value: 'history',                 label: 'History',                  short: 'HI'  },
  { value: 'psychology',              label: 'Psychology',               short: 'PS'  },
];

export const STATUSES = [
  { value: 'active',    label: 'Active',    color: 'text-accent-cyan'   },
  { value: 'inactive',  label: 'Inactive',  color: 'text-slate-400'     },
  { value: 'graduated', label: 'Graduated', color: 'text-accent-amber'  },
  { value: 'suspended', label: 'Suspended', color: 'text-accent-rose'   },
];

export const GENDERS = [
  { value: 'male',              label: 'Male'            },
  { value: 'female',            label: 'Female'          },
  { value: 'other',             label: 'Other'           },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const SEMESTERS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `Semester ${i + 1}`,
}));

export function getCourseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value;
}

export function getCourseShort(value: string) {
  return COURSES.find((c) => c.value === value)?.short ?? value.slice(0, 2).toUpperCase();
}

export function getStatusConfig(status: string) {
  const map: Record<string, { label: string; bg: string; dot: string; text: string }> = {
    active:    { label: 'Active',    bg: 'bg-emerald-500/10', dot: 'bg-emerald-400', text: 'text-emerald-400' },
    inactive:  { label: 'Inactive',  bg: 'bg-slate-500/10',   dot: 'bg-slate-400',   text: 'text-slate-400'   },
    graduated: { label: 'Graduated', bg: 'bg-amber-500/10',   dot: 'bg-amber-400',   text: 'text-amber-400'   },
    suspended: { label: 'Suspended', bg: 'bg-rose-500/10',    dot: 'bg-rose-400',    text: 'text-rose-400'    },
  };
  return map[status] ?? map.inactive;
}

export function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function formatGPA(gpa: number | string) {
  const n = Number(gpa);
  return isNaN(n) ? '0.00' : n.toFixed(2);
}

export function getGPAColor(gpa: number) {
  if (gpa >= 3.5) return 'text-emerald-400';
  if (gpa >= 3.0) return 'text-brand-400';
  if (gpa >= 2.5) return 'text-amber-400';
  return 'text-rose-400';
}

export function getAvatarUrl(firstName: string, lastName: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}+${lastName}&backgroundColor=6272f1&textColor=ffffff&radius=50`;
}

export function formatCourseDisplay(course: string) {
  return getCourseLabel(course);
}
