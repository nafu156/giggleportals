
import { User, UserRole } from '../models/types';

// Mock users database - in a real app, this would be a backend service
const USERS_STORAGE_KEY = 'studyportal_users';

// Mock authentication functions
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | undefined => {
  return getUsers().find(user => user.email === email);
};

export const registerUser = (email: string, password: string, name: string, role: UserRole): User => {
  const existingUser = getUserByEmail(email);
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
    password, // In a real app, this would be hashed
    name,
    role,
    isRegistered: true
  };
  
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const user = getUserByEmail(email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  return user;
};

// Current user session management
const CURRENT_USER_KEY = 'studyportal_current_user';

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isStudent = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'student';
};

export const isInstitution = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'institution';
};
