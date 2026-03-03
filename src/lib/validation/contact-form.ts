import { z } from 'zod';

// Regex patterns for validation
const NAME_PATTERN = /^[a-zA-Z\s\-']+$/;
const PHONE_PATTERN = /^[+\d\s\-()]+$/;

// Sanitize input by removing newlines and control characters that could enable header injection
const sanitizeForMailto = (input: string): string => {
  return input
    .replace(/[\r\n]/g, ' ')  // Replace newlines with spaces
    .replace(/[\x00-\x1F\x7F]/g, '')  // Remove control characters
    .trim();
};

// Contact form validation schema
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(NAME_PATTERN, { message: "Name contains invalid characters" }),
  surname: z
    .string()
    .trim()
    .min(1, { message: "Surname is required" })
    .max(50, { message: "Surname must be less than 50 characters" })
    .regex(NAME_PATTERN, { message: "Surname contains invalid characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .email({ message: "Please enter a valid email address" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "Telephone is required" })
    .max(20, { message: "Telephone must be less than 20 characters" })
    .regex(PHONE_PATTERN, { message: "Telephone contains invalid characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validate and sanitize form data for mailto link
export const validateAndSanitizeContactForm = (
  data: ContactFormData
): { success: true; sanitizedData: ContactFormData } | { success: false; errors: Record<string, string> } => {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      errors[field] = err.message;
    });
    return { success: false, errors };
  }
  
  // Sanitize all fields for mailto safety
  const sanitizedData: ContactFormData = {
    firstName: sanitizeForMailto(result.data.firstName),
    surname: sanitizeForMailto(result.data.surname),
    email: sanitizeForMailto(result.data.email),
    telephone: sanitizeForMailto(result.data.telephone),
    message: sanitizeForMailto(result.data.message)
  };
  
  return { success: true, sanitizedData };
};

// Build a safe mailto link from validated and sanitized data
export const buildSafeMailtoLink = (data: ContactFormData): string => {
  const recipients = 'tsoanelomodise@gmail.com';
  const subject = `Contact Form Submission from ${data.firstName} ${data.surname}`;
  const body = `Name: ${data.firstName} ${data.surname}
Email: ${data.email}
Telephone: ${data.telephone}

Message:
${data.message}`;

  return `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
