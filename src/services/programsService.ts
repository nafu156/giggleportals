
import { Program, Application } from '../models/types';
import { getPrograms } from './programService';

// Mock storage keys
const PROGRAMS_STORAGE_KEY = 'studyportal_programs';
const APPLICATIONS_STORAGE_KEY = 'studyportal_applications';

// Initialize programs from programService
export const initializePrograms = (): void => {
  const existingPrograms = localStorage.getItem(PROGRAMS_STORAGE_KEY);
  if (!existingPrograms) {
    localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(getPrograms()));
  }
};

// Programs CRUD operations
export const getAllPrograms = (): Program[] => {
  initializePrograms();
  const programsJson = localStorage.getItem(PROGRAMS_STORAGE_KEY);
  return programsJson ? JSON.parse(programsJson) : [];
};

export const savePrograms = (programs: Program[]): void => {
  localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(programs));
};

export const getProgramById = (id: string): Program | undefined => {
  return getAllPrograms().find(program => program.id === id);
};

export const getProgramsByDegree = (degree: string): Program[] => {
  return getAllPrograms().filter(program => program.degree.toLowerCase() === degree.toLowerCase());
};

export const addProgram = (program: Omit<Program, 'id'>): Program => {
  const newProgram: Program = {
    ...program,
    id: `program_${Date.now()}`
  };
  
  const programs = getAllPrograms();
  programs.push(newProgram);
  savePrograms(programs);
  
  return newProgram;
};

// Applications CRUD operations
export const getApplications = (): Application[] => {
  const applicationsJson = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
  return applicationsJson ? JSON.parse(applicationsJson) : [];
};

export const saveApplications = (applications: Application[]): void => {
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
};

export const addApplication = (programId: string, studentId: string): Application => {
  const newApplication: Application = {
    id: `app_${Date.now()}`,
    programId,
    studentId,
    status: 'pending',
    applicationDate: new Date().toISOString()
  };
  
  const applications = getApplications();
  applications.push(newApplication);
  saveApplications(applications);
  
  return newApplication;
};

export const updateApplicationStatus = (applicationId: string, status: 'approved' | 'rejected'): Application => {
  const applications = getApplications();
  const applicationIndex = applications.findIndex(a => a.id === applicationId);
  
  if (applicationIndex === -1) {
    throw new Error('Application not found');
  }
  
  applications[applicationIndex].status = status;
  saveApplications(applications);
  
  return applications[applicationIndex];
};

export const getApplicationsByStudentId = (studentId: string): Array<Application & { program: Program }> => {
  const applications = getApplications().filter(app => app.studentId === studentId);
  const programs = getAllPrograms();
  
  return applications.map(app => {
    const program = programs.find(p => p.id === app.programId);
    return {
      ...app,
      program: program!
    };
  });
};

export const getApplicationsByInstitution = (institutionId: string): Array<Application & { program: Program }> => {
  const programs = getAllPrograms().filter(p => p.university === institutionId);
  const programIds = programs.map(p => p.id);
  
  const applications = getApplications().filter(app => programIds.includes(app.programId));
  
  return applications.map(app => {
    const program = programs.find(p => p.id === app.programId);
    return {
      ...app,
      program: program!
    };
  });
};
