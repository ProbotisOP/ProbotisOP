export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  command: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  metric?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  gpa?: string;
  details?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export enum AppState {
  BOOTING,
  DESKTOP,
}

export enum WindowType {
  PROFILE = 'WHOAMI',
  EXPERIENCE = 'HISTORY',
  PROJECTS = 'PROJECTS',
  SKILLS = 'MAN SKILLS',
  SECURITY = 'MSFCONSOLE',
  CONTACT = 'NC -LVNP',
}

export interface WindowState {
  id: WindowType;
  isOpen: boolean;
  isMinimized: boolean;
  isClosing?: boolean;
  zIndex: number;
}
