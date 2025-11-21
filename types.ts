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
