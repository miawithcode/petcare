'use client';

import Image from 'next/image';
import Skeleton from './skeleton/skeleton';
import { Suspense } from 'react';
import usePetContext from '@/hooks/use-pet-context';
import { cn } from '@/lib/utils';
import useSearchContext from '@/hooks/use-search-context';

export default function PetList() {
  const { pets, handleSelectPet, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  // derived states
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ul className="h-full w-full">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSelectPet(pet.id)}
            className={cn(
              'flex h-full w-full items-center gap-3 px-5 py-4 transition hover:bg-neutral-50',
              { 'bg-neutral-50': selectedPetId === pet.id },
            )}
          >
            <Suspense
              fallback={<Skeleton className="h-10 w-10 rounded-full" />}
            >
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image
                  src={pet.imageUrl}
                  fill
                  alt={pet.name}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Suspense>
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
