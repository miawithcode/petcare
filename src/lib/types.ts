import { Pet } from '@prisma/client';

export type TPetEssential = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;

export type TPetFormAction = 'add' | 'edit';
