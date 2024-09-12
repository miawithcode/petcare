'use client';

import usePetContext from '@/hooks/use-pet-context';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TPet, type TPetFormAction } from '@/lib/types';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';

const petSchema = z.object({
  name: z.string().min(1),
  ownerName: z.string().min(1),
  imageUrl: z.string().optional(),
  age: z.number(),
  notes: z.string().min(1),
});

type PetSchema = z.infer<typeof petSchema>;

type PetFormProps = {
  action: TPetFormAction;
  onFormSubmit: () => void;
};

export default function PetForm({ action, onFormSubmit }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
  const { register, handleSubmit } = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
  });

  return (
    <form
      action={async (formData) => {
        onFormSubmit();

        const newPet: Omit<TPet, 'id'> = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          age: Number(formData.get('age') as string),
          imageUrl:
            (formData.get('imageUrl') as string) || '/images/default-pet.png',
          notes: formData.get('notes') as string,
        };

        if (action === 'add') {
          await handleAddPet(newPet);
        } else {
          await handleEditPet(selectedPet!.id, newPet);
        }
      }}
      className="flex flex-col gap-3"
    >
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          defaultValue={action === 'edit' ? selectedPet?.name : ''}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          id="ownerName"
          type="text"
          {...register('ownerName')}
          defaultValue={action === 'edit' ? selectedPet?.ownerName : ''}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          step="any"
          {...register('age', { valueAsNumber: true })}
          defaultValue={action === 'edit' ? selectedPet?.age : ''}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          {...register('imageUrl')}
          defaultValue={action === 'edit' ? selectedPet?.imageUrl : ''}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Note</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          rows={3}
          defaultValue={action === 'edit' ? selectedPet?.notes : ''}
        />
      </div>

      <PetFormBtn action={action} />
    </form>
  );
}
