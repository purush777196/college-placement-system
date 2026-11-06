import { z } from 'zod';

const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export const studentRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name cannot exceed 100 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid student email address'),
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\+?[0-9\s-]{10,15}$/, 'Please enter a valid 10-digit phone number'),
    collegeId: z
      .string()
      .min(3, 'Registration number must be at least 3 characters'),
    department: z
      .string()
      .min(1, 'Please select your academic department'),
    degree: z
      .string()
      .min(1, 'Please select your degree/program'),
    graduationYear: z
      .string()
      .min(1, 'Please select your graduation year'),
    cgpa: z
      .coerce
      .number({ invalid_type_error: 'CGPA must be a valid number' })
      .min(0, 'CGPA cannot be negative')
      .max(10, 'CGPA cannot exceed 10.0'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const recruiterRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Recruiter name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters'),
    officialEmail: z
      .string()
      .min(1, 'Official work email is required')
      .email('Please enter a valid corporate email address'),
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    companyName: z
      .string()
      .min(2, 'Company name must be at least 2 characters'),
    companyWebsite: z
      .string()
      .min(1, 'Company website is required')
      .regex(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        'Please enter a valid website URL (e.g., https://company.com)'
      ),
    designation: z
      .string()
      .min(2, 'Designation must be at least 2 characters'),
    contactNumber: z
      .string()
      .min(1, 'Contact number is required')
      .regex(/^\+?[0-9\s-]{10,15}$/, 'Please enter a valid contact number'),
    companyIndustry: z
      .string()
      .min(1, 'Please select the company industry'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must accept the recruiter terms of service',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const tpoRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters'),
    officialEmail: z
      .string()
      .min(1, 'Official college email is required')
      .email('Please enter a valid institutional email address'),
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    collegeName: z
      .string()
      .min(3, 'College name must be at least 3 characters'),
    collegeCode: z
      .string()
      .min(2, 'College code must be at least 2 characters'),
    department: z
      .string()
      .min(2, 'Department / Cell name is required'),
    designation: z
      .string()
      .min(2, 'Designation must be at least 2 characters'),
    contactNumber: z
      .string()
      .min(1, 'Contact number is required')
      .regex(/^\+?[0-9\s-]{10,15}$/, 'Please enter a valid contact number'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must accept the placement governance terms',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid registered email address'),
});

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Backward-compatible generic registerSchema for existing imports
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid college or work email'),
    role: z.enum(['student', 'tpo', 'recruiter', 'admin'], {
      errorMap: () => ({ message: 'Please select an authorized role' }),
    }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms of service and privacy policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
