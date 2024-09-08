'use client';

import { type Pet } from '@/lib/types';
import { createContext, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  handleSelectPet: (id: number) => void;
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
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  const handleSelectPet = (id: number) => {
    setSelectedPetId(id);
  };

  console.log(selectedPetId);

  return (
    <PetContext.Provider value={{ pets, selectedPetId, handleSelectPet }}>
      {children}
    </PetContext.Provider>
  );
}
