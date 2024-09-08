'use client';

import { type Pet } from '@/lib/types';
import { createContext, useState } from 'react';

export const PetContext = createContext<TPetContext | null>(null);

type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
};

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  return (
    <PetContext.Provider value={{ pets, selectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}
