import { z } from 'zod';

export const orientationEnum = z.enum(['PORTRAIT', 'LANDSCAPE', 'SQUARE']);

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title cannot exceed 120 characters').trim(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Please select a category'),
  tagIds: z.array(z.string()).min(1, 'Please select at least one tag').max(5, 'Maximum 5 tags allowed'),
  destinationUrl: z.url('Please enter a valid website URL').optional().or(z.literal('')),
  imageUrl: z.url('Image upload is required'),
  imageKey: z.string().min(1, 'Image key is required'),
  orientation: orientationEnum.default('PORTRAIT'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

