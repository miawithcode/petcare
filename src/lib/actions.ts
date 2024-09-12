'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { type TPet } from './types';

export async function addPet(newPet: Omit<TPet, 'id'>) {
  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: string, newPet: Omit<TPet, 'id'>) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPet,
    });
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: string) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return { message: 'Failed to delete pet' };
  }

  revalidatePath('/app', 'layout');
}
