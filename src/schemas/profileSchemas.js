import { z } from 'zod';

/**
 * Zod validation schemas for Student Profile Management
 */

// Phone number regex accommodating international and standard 10-digit Indian numbers
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
const pincodeRegex = /^[0-9]{5,6}$/;
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

export const SKILL_CATEGORIES = [
  'Programming Languages',
  'Frontend Technologies',
  'Backend Technologies',
  'Databases',
  'Cloud & DevOps',
  'Data Science & AI',
  'Tools & Platforms',
  'Soft Skills',
];

export const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const EDUCATION_QUALIFICATIONS = [
  'B.Tech / B.E. (Undergraduate)',
  'M.Tech / M.E. (Postgraduate)',
  'BCA / MCA',
  'Senior Secondary (Class XII / Intermediate)',
  'Secondary School (Class X / SSC)',
  'Diploma',
];

export const PROJECT_STATUSES = ['Completed', 'In Progress', 'Maintained'];

/**
 * 1. Personal Information Schema
 */
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must contain at least 2 characters')
    .max(80, 'Full name cannot exceed 80 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Enter a valid phone number (10-15 digits)'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((dateStr) => {
      const birth = new Date(dateStr);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      return age >= 16 && age <= 60;
    }, 'Student age must be between 16 and 60 years'),
  gender: z
    .string()
    .optional(),
  address: z
    .string()
    .min(5, 'Residential address must contain at least 5 characters')
    .max(200, 'Address cannot exceed 200 characters'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(50, 'City cannot exceed 50 characters'),
  state: z
    .string()
    .min(2, 'State is required')
    .max(50, 'State cannot exceed 50 characters'),
  pincode: z
    .string()
    .regex(pincodeRegex, 'Postal code must be 5 or 6 digits'),
  linkedinUrl: z
    .string()
    .optional()
    .refine((val) => !val || urlRegex.test(val), 'Please enter a valid LinkedIn URL'),
  githubUrl: z
    .string()
    .optional()
    .refine((val) => !val || urlRegex.test(val), 'Please enter a valid GitHub profile URL'),
  portfolioUrl: z
    .string()
    .optional()
    .refine((val) => !val || urlRegex.test(val), 'Please enter a valid portfolio URL'),
  bio: z
    .string()
    .max(300, 'Bio summary cannot exceed 300 characters')
    .optional(),
});

/**
 * 2. Academic Information Schema
 */
export const academicInfoSchema = z
  .object({
    college: z
      .string()
      .min(3, 'College/University name must be at least 3 characters')
      .max(120, 'College name cannot exceed 120 characters'),
    rollNumber: z
      .string()
      .min(2, 'College registration number is required')
      .max(30, 'Registration number cannot exceed 30 characters'),
    degree: z
      .string()
      .min(2, 'Degree/program is required'),
    department: z
      .string()
      .min(2, 'Department/branch is required'),
    graduationYear: z
      .coerce
      .number({ invalid_type_error: 'Graduation year must be a number' })
      .int()
      .min(2020, 'Graduation year must be 2020 or later')
      .max(2035, 'Graduation year cannot exceed 2035'),
    currentSemester: z
      .coerce
      .number({ invalid_type_error: 'Semester must be a number' })
      .int()
      .min(1, 'Semester must be between 1 and 8')
      .max(8, 'Semester must be between 1 and 8'),
    cgpa: z
      .coerce
      .number({ invalid_type_error: 'CGPA must be a valid number' })
      .min(0, 'CGPA cannot be negative')
      .max(10, 'CGPA cannot exceed 10.0'),
    cgpaScale: z
      .coerce
      .number()
      .default(10.0),
    totalBacklogs: z
      .coerce
      .number({ invalid_type_error: 'Total backlogs must be a number' })
      .int()
      .min(0, 'Backlogs cannot be negative'),
    activeBacklogs: z
      .coerce
      .number({ invalid_type_error: 'Active backlogs must be a number' })
      .int()
      .min(0, 'Active backlogs cannot be negative'),
  })
  .refine((data) => data.activeBacklogs <= data.totalBacklogs, {
    message: 'Active backlogs cannot exceed total historical backlogs',
    path: ['activeBacklogs'],
  })
  .refine((data) => data.cgpa <= data.cgpaScale, {
    message: 'Current CGPA cannot exceed the maximum scale value',
    path: ['cgpa'],
  });

/**
 * 3. Education Record Schema
 */
export const educationRecordSchema = z
  .object({
    id: z.string().optional(),
    institution: z
      .string()
      .min(3, 'Institution name must be at least 3 characters')
      .max(120, 'Institution name cannot exceed 120 characters'),
    qualification: z
      .string()
      .min(2, 'Qualification is required'),
    board: z
      .string()
      .min(2, 'Board / University is required')
      .max(80, 'Board name cannot exceed 80 characters'),
    startYear: z
      .coerce
      .number({ invalid_type_error: 'Start year must be a number' })
      .int()
      .min(2000, 'Start year must be 2000 or later')
      .max(2035, 'Start year cannot exceed 2035'),
    endYear: z
      .coerce
      .number({ invalid_type_error: 'End year must be a number' })
      .int()
      .min(2000, 'End year must be 2000 or later')
      .max(2035, 'End year cannot exceed 2035'),
    scoreType: z
      .enum(['CGPA', 'Percentage']),
    score: z
      .string()
      .min(1, 'Score is required')
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      }, 'Score must be a valid number between 0 and 100'),
    current: z.boolean().default(false),
  })
  .refine((data) => data.startYear <= data.endYear, {
    message: 'Start year cannot be after graduation/completion year',
    path: ['endYear'],
  });

/**
 * 4. Skill Entry Schema
 */
export const skillSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Skill name is required')
    .max(50, 'Skill name cannot exceed 50 characters'),
  category: z
    .string()
    .min(1, 'Category is required'),
  proficiency: z
    .enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
});

/**
 * 5. Project Schema
 */
export const projectSchema = z
  .object({
    id: z.string().optional(),
    title: z
      .string()
      .min(3, 'Project title must be at least 3 characters')
      .max(100, 'Project title cannot exceed 100 characters'),
    description: z
      .string()
      .min(10, 'Project description must be at least 10 characters')
      .max(1000, 'Project description cannot exceed 1000 characters'),
    technologies: z
      .array(z.string())
      .min(1, 'At least one technology tag is required'),
    projectType: z
      .string()
      .min(2, 'Project type is required'),
    githubUrl: z
      .string()
      .optional()
      .refine((val) => !val || urlRegex.test(val), 'Please enter a valid GitHub repository URL'),
    liveUrl: z
      .string()
      .optional()
      .refine((val) => !val || urlRegex.test(val), 'Please enter a valid live application URL'),
    startDate: z
      .string()
      .min(1, 'Start date is required'),
    endDate: z
      .string()
      .optional(),
    status: z
      .enum(['Completed', 'In Progress', 'Maintained']),
  })
  .refine(
    (data) => {
      if (!data.endDate || !data.startDate) return true;
      return new Date(data.startDate) <= new Date(data.endDate);
    },
    {
      message: 'Project start date cannot be after end date',
      path: ['endDate'],
    }
  );

/**
 * 6. Certification Schema
 */
export const certificationSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .min(3, 'Certification name must be at least 3 characters')
      .max(120, 'Certification name cannot exceed 120 characters'),
    issuingOrganization: z
      .string()
      .min(2, 'Issuing organization is required')
      .max(120, 'Issuing organization cannot exceed 120 characters'),
    issueDate: z
      .string()
      .min(1, 'Issue date is required'),
    expirationDate: z
      .string()
      .optional(),
    credentialId: z
      .string()
      .max(80, 'Credential ID cannot exceed 80 characters')
      .optional(),
    credentialUrl: z
      .string()
      .optional()
      .refine((val) => !val || urlRegex.test(val), 'Please enter a valid credential verification URL'),
  })
  .refine(
    (data) => {
      if (!data.expirationDate || !data.issueDate) return true;
      return new Date(data.issueDate) <= new Date(data.expirationDate);
    },
    {
      message: 'Issue date cannot be after expiration date',
      path: ['expirationDate'],
    }
  );

/**
 * 7. Achievement Schema
 */
export const achievementSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, 'Achievement title must be at least 3 characters')
    .max(120, 'Achievement title cannot exceed 120 characters'),
  issuingOrganization: z
    .string()
    .min(2, 'Issuing organization is required')
    .max(120, 'Organization cannot exceed 120 characters'),
  date: z
    .string()
    .min(1, 'Achievement date is required'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  credentialUrl: z
    .string()
    .optional()
    .refine((val) => !val || urlRegex.test(val), 'Please enter a valid credential URL'),
});
