'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import usePetContext from '@/hooks/use-pet-context';
import { type Pet } from '@/lib/types';

export default function PetDetail() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex h-full w-full flex-col bg-input/20">
      {!selectedPet ? (
        <div className="flex h-full items-center justify-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <DetailHeader pet={selectedPet} />
          <DetailInfo pet={selectedPet} />
          <Note pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return <p className="font-medium text-muted-foreground">No pet selected</p>;
}

type Props = {
  pet: Pet;
};

function DetailHeader({ pet }: Props) {
  return (
    <div className="flex justify-between border-b border-border/50 bg-white px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="relative size-14 overflow-hidden rounded-full">
          <Image
            src={pet.imageUrl}
            alt={pet.name}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold leading-7">{pet.name}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm">
          Edit
        </Button>
        <Button variant="secondary" size="sm">
          Checkout
        </Button>
      </div>
    </div>
  );
}

function DetailInfo({ pet }: Props) {
  return (
    <div className="grid grid-cols-2 px-8 py-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-[13px] font-semibold uppercase text-muted-foreground">
          Owner Name
        </p>
        <p>{pet.ownerName}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-[13px] font-semibold uppercase text-muted-foreground">
          Age
        </p>
        <p>{pet.age}</p>
      </div>
    </div>
  );
}

function Note({ pet }: Props) {
  return (
    <div className="flex-1 px-8 pb-8">
      <div className="h-full w-full rounded-lg border border-border/50 bg-white p-4">
        {pet.notes}
      </div>
    </div>
  );
}
