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
  phone?: string;
  date_of_birth: string;
  gender: GenderType;
  course: CourseType;
  semester: number;
  gpa: number;
  status: StudentStatus;
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

export type ModalMode = 'create' | 'edit' | 'view' | null;
