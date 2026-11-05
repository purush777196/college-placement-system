import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  Briefcase,
  FileText,
  CalendarCheck,
  Award,
  Users,
  Settings,
  ShieldCheck,
  TrendingUp,
  Bell,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { ROLES } from './roles';

export const PUBLIC_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const ROLE_NAVIGATION = {
  [ROLES.STUDENT]: [
    { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Placement Drives', href: '/student/drives', icon: Briefcase, badge: 'Active' },
    { label: 'My Applications', href: '/student/applications', icon: ClipboardList },
    { label: 'AI Resume Builder', href: '/student/resume-builder', icon: Sparkles, badge: 'AI' },
    { label: 'Mock Assessments', href: '/student/assessments', icon: FileText },
    { label: 'Interviews', href: '/student/interviews', icon: CalendarCheck },
    { label: 'Offers & Letters', href: '/student/offers', icon: Award },
    { label: 'Notifications', href: '/student/notifications', icon: Bell },
  ],
  [ROLES.TPO]: [
    { label: 'Dashboard', href: '/tpo/dashboard', icon: LayoutDashboard },
    { label: 'Student Directory', href: '/tpo/students', icon: GraduationCap },
    { label: 'Partner Companies', href: '/tpo/companies', icon: Building2 },
    { label: 'Placement Drives', href: '/tpo/drives', icon: Briefcase },
    { label: 'Placement Analytics', href: '/tpo/analytics', icon: TrendingUp },
    { label: 'Offers Released', href: '/tpo/offers', icon: Award },
    { label: 'Broadcast Notice', href: '/tpo/announcements', icon: Bell },
    { label: 'System Settings', href: '/tpo/settings', icon: Settings },
  ],
  [ROLES.RECRUITER]: [
    { label: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Job Postings & Drives', href: '/recruiter/drives', icon: Briefcase },
    { label: 'Candidate Pool', href: '/recruiter/candidates', icon: Users },
    { label: 'Shortlisted Resumes', href: '/recruiter/resumes', icon: FileText },
    { label: 'Interview Scheduler', href: '/recruiter/interviews', icon: CalendarCheck },
    { label: 'Offer Rollouts', href: '/recruiter/offers', icon: Award },
    { label: 'Company Profile', href: '/recruiter/profile', icon: Building2 },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Role Permissions', href: '/admin/roles', icon: ShieldCheck },
    { label: 'College Departments', href: '/admin/departments', icon: GraduationCap },
    { label: 'Audit Logs', href: '/admin/audit', icon: ClipboardList },
    { label: 'System Analytics', href: '/admin/analytics', icon: TrendingUp },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ],
};
