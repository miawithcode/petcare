'use client';

import { addPet, deletePet, editPet } from '@/lib/actions';
import { type TPet } from '@/lib/types';
import { createContext, useMemo, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

type TPetContext = {
  pets: TPet[];
  selectedPetId: string | null;
  handleSelectPet: (id: string) => void;
  selectedPet: TPet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (newPet: Omit<TPet, 'id'>) => Promise<void>;
  handleEditPet: (petId: string, newPet: Omit<TPet, 'id'>) => Promise<void>;
};

type PetContextProviderProps = {
  children: React.ReactNode;
  data: TPet[];
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
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

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

  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const res = await deletePet(petId);
    if (res) {
      toast(res.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: Omit<TPet, 'id'>) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const res = await addPet(newPet);
    if (res) {
      toast(res.message);
      return;
    }
  };

  const handleEditPet = async (petId: string, newPet: Omit<TPet, 'id'>) => {
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
