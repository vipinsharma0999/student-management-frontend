'use client';
import { useState, useEffect, useCallback } from 'react';
import { studentsApi } from '@/lib/students.api';
import type { Student, PaginatedResponse, StudentQuery } from '@/types/student';
import toast from 'react-hot-toast';

export function useStudents(initialQuery: StudentQuery = {}) {
  const [data, setData] = useState<PaginatedResponse<Student>>({
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false },
  });
  const [query, setQuery] = useState<StudentQuery>({ page: 1, limit: 10, ...initialQuery });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (q: StudentQuery) => {
    setLoading(true);
    setError(null);
    try {
      const result = await studentsApi.getAll(q);
      setData(result);
    } catch {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(query); }, [query, fetch]);

  const updateQuery = (updates: Partial<StudentQuery>) =>
    setQuery((prev) => ({ ...prev, ...updates, page: updates.page ?? 1 }));

  const refetch = () => fetch(query);

  const createStudent = async (payload: Partial<Student>) => {
    const toastId = toast.loading('Registering student...');
    try {
      const student = await studentsApi.create(payload);
      toast.success('Student registered successfully!', { id: toastId });
      refetch();
      return student;
    } catch {
      toast.dismiss(toastId);
      throw new Error('Failed to create');
    }
  };

  const updateStudent = async (id: string, payload: Partial<Student>) => {
    const toastId = toast.loading('Updating student...');
    try {
      const student = await studentsApi.update(id, payload);
      toast.success('Student updated successfully!', { id: toastId });
      refetch();
      return student;
    } catch {
      toast.dismiss(toastId);
      throw new Error('Failed to update');
    }
  };

  const deleteStudent = async (id: string) => {
    const toastId = toast.loading('Deleting student...');
    try {
      await studentsApi.remove(id);
      toast.success('Student deleted successfully!', { id: toastId });
      refetch();
    } catch {
      toast.dismiss(toastId);
      throw new Error('Failed to delete');
    }
  };

  return {
    data, query, loading, error,
    updateQuery, refetch,
    createStudent, updateStudent, deleteStudent,
  };
}
