import { z } from 'zod';

// Reject dangerous URL protocols
const safeUrlSchema = z
  .string()
  .trim()
  .max(2048, "URL must be less than 2048 characters")
  .refine(
    (val) => {
      if (!val) return true;
      try {
        const url = new URL(val);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    { message: "Must be a valid http or https URL" }
  );

const optionalSafeUrl = z
  .string()
  .trim()
  .transform((v) => v || null)
  .pipe(safeUrlSchema.nullable());

// News Media validation schema
export const newsMediaSchema = z.object({
  content_type: z.enum(['news', 'story']),
  title: z.string().trim().min(1, "Title is required").max(500, "Title must be less than 500 characters"),
  excerpt: z.string().trim().max(2000, "Excerpt must be less than 2000 characters").optional().nullable(),
  full_content: z.string().trim().max(100000, "Content is too long").optional().nullable(),
  featured_image_url: optionalSafeUrl.optional(),
  video_url: optionalSafeUrl.optional(),
  source_url: optionalSafeUrl.optional(),
  story_thumbnail_url: optionalSafeUrl.optional(),
  priority: z.number().int().min(1).max(10),
  show_on_home: z.boolean(),
  highlight_on_home: z.boolean(),
  show_on_archive: z.boolean(),
});

// Careers validation schema
export const careersSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300, "Title must be less than 300 characters"),
  slug: z.string().trim().min(1, "Slug is required").max(300, "Slug must be less than 300 characters"),
  department: z.string().trim().max(200).optional().nullable(),
  location: z.string().trim().max(200).optional().nullable(),
  employment_type: z.string().trim().max(100).optional().nullable(),
  summary: z.string().trim().max(2000, "Summary must be less than 2000 characters").optional().nullable(),
  description: z.string().trim().max(100000, "Description is too long").optional().nullable(),
  responsibilities: z.string().trim().max(100000, "Responsibilities text is too long").optional().nullable(),
  requirements: z.string().trim().max(100000, "Requirements text is too long").optional().nullable(),
  salary_range: z.string().trim().max(200, "Salary range must be less than 200 characters").optional().nullable(),
  apply_url: optionalSafeUrl.optional(),
  closing_date: z.string().optional().nullable(),
  priority: z.number().int().min(1).max(10),
  show_on_archive: z.boolean(),
});

export type NewsMediaFormData = z.infer<typeof newsMediaSchema>;
export type CareersFormData = z.infer<typeof careersSchema>;
