import apiClient from '@/lib/api-client';
import type { Student, PaginatedResponse, StudentQuery, DashboardStats } from '@/types/student';

export const studentsApi = {
  // GET all with filters
  getAll: async (query: StudentQuery = {}): Promise<PaginatedResponse<Student>> => {
    const params = Object.fromEntries(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    );
    const { data } = await apiClient.get('/students', { params });
    return data;
  },

  // GET one by id
  getById: async (id: string): Promise<Student> => {
    const { data } = await apiClient.get(`/students/${id}`);
    return data;
  },

  // POST create
  create: async (payload: Partial<Student>): Promise<Student> => {
    const { data } = await apiClient.post('/students', payload);
    return data;
  },

  // PATCH update
  update: async (id: string, payload: Partial<Student>): Promise<Student> => {
    const { data } = await apiClient.patch(`/students/${id}`, payload);
    return data;
  },

  // DELETE
  remove: async (id: string): Promise<{ message: string; id: string }> => {
    const { data } = await apiClient.delete(`/students/${id}`);
    return data;
  },

  // GET dashboard stats
  getDashboard: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get('/students/dashboard');
    return data;
  },
};
