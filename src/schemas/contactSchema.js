import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name cannot exceed 80 characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid work or institutional email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject cannot exceed 120 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});
