
export interface Program {
  id: string;
  title: string;
  university: string;
  location: string;
  discipline: string;
  degree: string;
  duration: string;
  tuition: string;
  description: string;
  imageUrl: string;
  deadline?: string;
  language?: string;
  requirements?: string[];
  applicationFee?: string;
  scholarships?: boolean;
  ranking?: number;
}

export type UserRole = 'student' | 'institution';

export interface User {
  id: string;
  email: string;
  password: string; // This would be hashed in a real application
  role: UserRole;
  name: string;
  isRegistered: boolean;
}

export interface Student {
  userId: string;
  interests?: string[];
  appliedPrograms?: string[];
  education?: string;
}

export interface Institution {
  userId: string;
  description?: string;
  website?: string;
  programs?: string[];
  location?: string;
}

export interface Application {
  id: string;
  programId: string;
  studentId: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
}
