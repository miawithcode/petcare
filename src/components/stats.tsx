'use client';

import usePetContext from '@/hooks/use-pet-context';

export default function Stats() {
  const { numberOfPets } = usePetContext();
  return (
    <section className="flex items-center justify-end gap-2 text-sm">
      <p className="font-semibold text-primary">{numberOfPets}</p>
      <p className="opacity-80">Current Guests</p>
    </section>
  );
}
