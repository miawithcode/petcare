'use client';

import usePetContext from '@/hooks/use-pet-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pet } from '@/lib/types';
import { Textarea } from './ui/textarea';

const petSchema = z.object({
  name: z.string().min(1),
  ownerName: z.string().min(1),
  imageUrl: z.string().optional(),
  age: z.number(),
  notes: z.string().min(1),
});

type PetSchema = z.infer<typeof petSchema>;

type PetFormProps = {
  action: 'add' | 'edit';
  onFormSubmit: () => void;
};

export default function PetForm({ action, onFormSubmit }: PetFormProps) {
  const { handleAddPet } = usePetContext();
  const { register, handleSubmit } = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
  });

  const onSubmit: SubmitHandler<PetSchema> = (data) => {
    const newPet: Omit<Pet, 'id'> = {
      name: data.name,
      age: data.age,
      ownerName: data.ownerName,
      imageUrl: data.imageUrl || '/images/default-pet.png',
      notes: data.notes,
    };

    handleAddPet(newPet);
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...register('name')} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" type="text" {...register('ownerName')} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          step="any"
          {...register('age', { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" {...register('imageUrl')} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Note</Label>
        <Textarea id="notes" {...register('notes')} rows={3} />
      </div>

      <Button type="submit">{action === 'add' ? 'Add pet' : 'Edit pet'}</Button>
    </form>
  );
}
