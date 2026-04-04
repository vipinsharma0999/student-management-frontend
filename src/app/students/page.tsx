'use client';
import { useState } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, X, RefreshCw, Users } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import StudentCard from '@/components/students/StudentCard';
import StudentTable from '@/components/students/StudentTable';
import DeleteModal from '@/components/ui/DeleteModal';
import { COURSE_LABELS } from '@/types/student';
import type { CourseType, StudentStatus } from '@/types/student';
import { clsx } from 'clsx';

type ViewMode = 'grid' | 'table';

export default function StudentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data, query, loading, updateQuery, deleteStudent } = useStudents();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try { await deleteStudent(deleteTarget.id); setDeleteTarget(null); }
    finally { setDeleteLoading(false); }
  };

  const clearFilters = () => updateQuery({ search: '', course: undefined, status: undefined, semester: undefined, page: 1 });
  const hasFilters = !!(query.search || query.course || query.status || query.semester);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Students</h1>
          <p className="text-slate-500 text-sm mt-1">
            {loading ? '...' : `${data.meta.total} registered students`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-surface-muted rounded-xl border border-surface-border p-1">
            <button onClick={() => setViewMode('grid')} className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-white')}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('table')} className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'table' ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-white')}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={clsx('btn-secondary flex items-center gap-2', showFilters && 'border-brand-600/50 text-brand-400')}>
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-2 h-2 bg-brand-400 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="card p-4 mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email or student ID..."
            value={query.search ?? ''}
            onChange={(e) => updateQuery({ search: e.target.value })}
            className="input-field pl-10"
          />
          {query.search && (
            <button onClick={() => updateQuery({ search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter row */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 animate-slide-up">
            <select
              value={query.course ?? ''}
              onChange={(e) => updateQuery({ course: (e.target.value || undefined) as CourseType })}
              className="input-field text-sm"
            >
              <option value="">All Courses</option>
              {Object.entries(COURSE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select
              value={query.status ?? ''}
              onChange={(e) => updateQuery({ status: (e.target.value || undefined) as StudentStatus })}
              className="input-field text-sm"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={query.semester ?? ''}
              onChange={(e) => updateQuery({ semester: e.target.value ? Number(e.target.value) : undefined })}
              className="input-field text-sm"
            >
              <option value="">All Semesters</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i+1} value={i+1}>Semester {i+1}</option>
              ))}
            </select>
            <select
              value={`${query.sort_by}:${query.sort_order}`}
              onChange={(e) => {
                const [sort_by, sort_order] = e.target.value.split(':') as [string, 'ASC'|'DESC'];
                updateQuery({ sort_by, sort_order });
              }}
              className="input-field text-sm"
            >
              <option value="created_at:DESC">Newest First</option>
              <option value="created_at:ASC">Oldest First</option>
              <option value="first_name:ASC">Name A–Z</option>
              <option value="gpa:DESC">Highest GPA</option>
              <option value="semester:ASC">Semester</option>
            </select>
          </div>
        )}

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors">
            <RefreshCw className="w-3 h-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className={clsx(
          viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : ''
        )}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="card p-5 h-64 animate-pulse">
              <div className="flex gap-3 mb-4"><div className="w-12 h-12 rounded-xl bg-surface-muted" /><div className="flex-1 space-y-2"><div className="h-4 bg-surface-muted rounded" /><div className="h-3 w-20 bg-surface-muted rounded" /></div></div>
              <div className="space-y-2">{Array(3).fill(0).map((_, j) => <div key={j} className="h-3 bg-surface-muted rounded" />)}</div>
            </div>
          ))}
        </div>
      ) : data.data.length === 0 ? (
        <div className="card p-16 text-center">
          <Users className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="font-display font-semibold text-slate-400 text-lg">No students found</p>
          <p className="text-slate-600 text-sm mt-1">
            {hasFilters ? 'Try adjusting your filters' : 'Register the first student to get started'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.data.map((s) => (
            <StudentCard key={s.id} student={s} onDelete={(id, name) => setDeleteTarget({ id, name })} />
          ))}
        </div>
      ) : (
        <StudentTable students={data.data} onDelete={(id, name) => setDeleteTarget({ id, name })} />
      )}

      {/* Pagination */}
      {!loading && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-slate-500">
            Page {data.meta.page} of {data.meta.totalPages} · {data.meta.total} total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuery({ page: (query.page ?? 1) - 1 })}
              disabled={!data.meta.hasPrev}
              className="btn-secondary disabled:opacity-40 px-4 py-2 text-sm"
            >← Prev</button>
            {Array.from({ length: Math.min(5, data.meta.totalPages) }, (_, i) => {
              const pg = i + 1;
              return (
                <button key={pg} onClick={() => updateQuery({ page: pg })}
                  className={clsx('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', pg === data.meta.page ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-surface-muted')}>
                  {pg}
                </button>
              );
            })}
            <button
              onClick={() => updateQuery({ page: (query.page ?? 1) + 1 })}
              disabled={!data.meta.hasNext}
              className="btn-secondary disabled:opacity-40 px-4 py-2 text-sm"
            >Next →</button>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
