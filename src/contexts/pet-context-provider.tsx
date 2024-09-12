'use client';

import { addPet, deletePet, editPet } from '@/lib/actions';
import { createContext, useMemo, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Pet } from '@prisma/client';
import { TPetEssential } from '@/lib/types';

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet['id'] | null;
  handleSelectPet: (petId: Pet['id']) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (petId: Pet['id']) => Promise<void>;
  handleAddPet: (newPet: TPetEssential) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPet: TPetEssential) => Promise<void>;
};

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...state, { id: nanoid(), ...payload }];
        case 'edit':
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPet };
            }
            return pet;
          });
        case 'delete':
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<Pet['id'] | null>(null);

  // derived
  const selectedPet = useMemo(() => {
    return optimisticPets.find((pet) => pet.id === selectedPetId);
  }, [optimisticPets, selectedPetId]);

  const numberOfPets = useMemo(() => {
    return optimisticPets.length;
  }, [optimisticPets]);

  // handlers
  const handleSelectPet = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const res = await deletePet(petId);
    if (res) {
      toast(res.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: TPetEssential) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const res = await addPet(newPet);
    if (res) {
      toast(res.message);
      return;
    }
  };

  const handleEditPet = async (petId: Pet['id'], newPet: TPetEssential) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, newPet } });
    const res = await editPet(petId, newPet);
    if (res) {
      toast(res.message);
      return;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleSelectPet,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
