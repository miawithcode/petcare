'use client';

import { addPet } from '@/lib/actions';
import { type Pet } from '@/lib/types';
import { createContext, useMemo, useState } from 'react';

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectPet: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  // handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
  // handleEditPet: (petId: string, newPet: Omit<Pet, 'id'>) => void;
};

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  // state
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

  // const handleCheckoutPet = (id: string) => {
  //   setPets((prev) => prev.filter((pet) => pet.id !== id));
  //   setSelectedPetId(null);
  // };

  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    // setPets((prev) => [...prev, { id: nanoid(), ...newPet }]);
    await addPet(newPet);
  };

  // const handleEditPet = (petId: string, newPet: Omit<Pet, 'id'>) => {
  //   setPets((prev) =>
  //     prev.map((pet) => (pet.id === petId ? { id: petId, ...newPet } : pet)),
  //   );
  // };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectPet,
        selectedPet,
        numberOfPets,
        // handleCheckoutPet,
        handleAddPet,
        // handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
