'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addPet(formData) {
  try {
    await prisma.pet.create({
      data: {
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        ownerName: formData.get('ownerName'),
        imageUrl: formData.get('imageUrl') || '/images/default-pet.png',
        notes: formData.get('notes'),
      },
    });
  } catch (error) {
    return { message: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId, formData) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        ownerName: formData.get('ownerName'),
        imageUrl: formData.get('imageUrl') || '/images/default-pet.png',
        notes: formData.get('notes'),
      },
    });
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
}

export async function deletePet(petId) {
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
