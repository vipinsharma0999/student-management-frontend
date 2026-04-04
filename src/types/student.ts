export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended';
export type GenderType = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type CourseType =
  | 'computer_science' | 'information_technology' | 'data_science'
  | 'electrical_engineering' | 'mechanical_engineering' | 'civil_engineering'
  | 'business_administration' | 'economics' | 'mathematics' | 'physics'
  | 'chemistry' | 'biology' | 'literature' | 'history' | 'psychology';

export interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string;
  gender: GenderType;
  course: CourseType;
  semester: number;
  gpa: number;
  status: StudentStatus;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  pincode: string | null;
  photo_url: string | null;
  admission_date: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface StudentQuery {
  search?: string;
  course?: CourseType;
  status?: StudentStatus;
  semester?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
}

export interface DashboardStats {
  overview: {
    total_students: number;
    active_students: number;
    graduated: number;
    suspended: number;
    inactive: number;
    avg_gpa: number;
    new_this_month: number;
    courses_count: number;
  };
  courseStats: { course: string; total: number; avg_gpa: number; active: number }[];
  gpaDistribution: { range: string; count: number }[];
}

export const COURSE_LABELS: Record<CourseType, string> = {
  computer_science: 'Computer Science',
  information_technology: 'Information Technology',
  data_science: 'Data Science',
  electrical_engineering: 'Electrical Engineering',
  mechanical_engineering: 'Mechanical Engineering',
  civil_engineering: 'Civil Engineering',
  business_administration: 'Business Administration',
  economics: 'Economics',
  mathematics: 'Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  literature: 'Literature',
  history: 'History',
  psychology: 'Psychology',
};

export const STATUS_CONFIG: Record<StudentStatus, { label: string; color: string; bg: string }> = {
  active:    { label: 'Active',    color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  inactive:  { label: 'Inactive',  color: 'text-slate-400',   bg: 'bg-slate-400/10 border-slate-400/20' },
  graduated: { label: 'Graduated', color: 'text-cyan-400',    bg: 'bg-cyan-400/10 border-cyan-400/20' },
  suspended: { label: 'Suspended', color: 'text-rose-400',    bg: 'bg-rose-400/10 border-rose-400/20' },
};

export const GENDER_LABELS: Record<GenderType, string> = {
  male: 'Male', female: 'Female', other: 'Other', prefer_not_to_say: 'Prefer not to say',
};
