'use client';

import Image from 'next/image';
import usePetContext from '@/hooks/use-pet-context';
import PetButton from './pet-button';
import { Pet } from '@prisma/client';

export default function PetDetail() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex h-full w-full flex-col bg-neutral-50">
      {!selectedPet ? (
        <EmptyView />
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
  return (
    <div className="flex h-full items-center justify-center bg-white">
      <p className="font-medium text-muted-foreground">No pet selected</p>
    </div>
  );
}

type Props = {
  pet: Pet;
};

function DetailHeader({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex justify-between border-b border-border-light bg-white px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="relative size-14 overflow-hidden rounded-full">
          <Image
            src={pet.imageUrl}
            alt={pet.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h2 className="text-xl font-semibold leading-7">{pet.name}</h2>
      </div>

      <div className="flex items-center gap-1">
        <PetButton action="edit">Edit</PetButton>
        <PetButton
          onClick={async () => await handleCheckoutPet(pet.id)}
          action="checkout"
        >
          Checkout
        </PetButton>
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
      <div className="h-full w-full rounded-lg border border-border-light bg-white p-4">
        {pet.notes}
      </div>
    </div>
  );
}
