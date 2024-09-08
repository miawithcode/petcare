'use client';

import { type Pet } from '@/lib/types';
import { createContext, useMemo, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectPet: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => void;
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
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived
  const selectedPet = useMemo(() => {
    return pets.find((pet) => pet.id === selectedPetId);
  }, [pets, selectedPetId]);

  const numberOfPets = useMemo(() => {
    return pets.length;
  }, [pets]);

  // handlers
  const handleSelectPet = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectPet,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
