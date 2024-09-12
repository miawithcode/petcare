import { z } from 'zod';
import { DEFAULT_PET_IMAGE } from './constants';

const isLocalImagePath = (value: string) => {
  return value.startsWith('/images/') && value.endsWith('.png');
};

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required' })
      .max(20, { message: 'Name should be less than 20 characters' }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: 'ownerName is required' })
      .max(20, { message: 'ownerName should be less than 20 characters' }),
    imageUrl: z.union([
      z.literal(''),
      z.string().trim().url({ message: 'Image URL should be a valid URL' }),
      z.string().trim().refine(isLocalImagePath, {
        message:
          'default image path should start with "/images/" and end with ".png"',
      }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive({ message: 'Please input a valid age' })
      .max(99999),
    notes: z.union([z.literal(''), z.string().trim().max(500)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();
