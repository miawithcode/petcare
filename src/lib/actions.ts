'use server';

import prisma from '@/lib/db';
import { Pet } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { TPetEssential } from './types';
import { petFormSchema, petIdSchema } from './validations';

export async function addPet(newPet: unknown) {
  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    console.log(error);

    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, newPet: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPet);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet id',
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return { message: 'Failed to delete pet' };
  }

  revalidatePath('/app', 'layout');
}
