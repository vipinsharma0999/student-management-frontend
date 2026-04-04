import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ─────────────────────────────────────────────
// Axios instance (connection to NestJS backend)
// ─────────────────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(Array.isArray(message) ? message.join(', ') : message));
  },
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  gender: string;
  course: string;
  semester: number;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  photo_url?: string;
  admission_date: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedStudents {
  data: Student[];
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
  course?: string;
  status?: string;
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

// ─────────────────────────────────────────────
// Student API functions
// ─────────────────────────────────────────────
export const studentsApi = {
  getAll: async (query: StudentQuery = {}): Promise<PaginatedStudents> => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.append(k, String(v));
    });
    const { data } = await api.get(`/students?${params}`);
    return data;
  },

  getOne: async (id: string): Promise<Student> => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },

  create: async (payload: Partial<Student>): Promise<Student> => {
    const { data } = await api.post('/students', payload);
    return data;
  },

  update: async (id: string, payload: Partial<Student>): Promise<Student> => {
    const { data } = await api.patch(`/students/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },

  getDashboard: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/students/dashboard');
    return data;
  },
};

export default api;
