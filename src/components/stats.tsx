'use client';

import usePetContext from '@/hooks/use-pet-context';

export default function Stats() {
  const { pets } = usePetContext();
  return (
    <section className="flex items-center justify-end gap-2 text-sm">
      <p className="text-primary">{pets.length}</p>
      <p className="opacity-80">Current Guests</p>
    </section>
  );
}
