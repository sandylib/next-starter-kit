import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'Must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
  subscribe: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
