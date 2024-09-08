'use client';

import Image from 'next/image';
import Skeleton from './skeleton/skeleton';
import { Suspense } from 'react';
import usePetContext from '@/hooks/use-pet-context';

export default function PetList() {
  const { pets } = usePetContext();

  return (
    <ul className="h-full w-full">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-full w-full items-center gap-3 border-b border-border/50 px-5 py-4 transition hover:bg-background/50">
            <Suspense
              fallback={<Skeleton className="h-10 w-10 rounded-full" />}
            >
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image
                  src={pet.imageUrl}
                  fill
                  alt={pet.name}
                  className="object-cover"
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
