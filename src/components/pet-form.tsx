'use client';

import usePetContext from '@/hooks/use-pet-context';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TPetFormAction } from '@/lib/types';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { TPetEssential } from '@/lib/types';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { petFormSchema, type TPetForm } from '@/lib/validations';

type PetFormProps = {
  action: TPetFormAction;
  onFormSubmit: () => void;
};

export default function PetForm({ action, onFormSubmit }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      age: selectedPet?.age,
      imageUrl: selectedPet?.imageUrl,
      notes: selectedPet?.notes,
    },
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmit();

        const newPet: TPetEssential = getValues();
        newPet.imageUrl = newPet.imageUrl || DEFAULT_PET_IMAGE;
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
        <Input id="name" type="text" {...register('name')} />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" type="text" {...register('ownerName')} />
        {errors.ownerName && (
          <p className="text-xs text-destructive">{errors.ownerName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="age">Age</Label>
        <Input id="age" type="number" step="any" {...register('age')} />
        {errors.age && (
          <p className="text-xs text-destructive">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" {...register('imageUrl')} />
        {errors.imageUrl && (
          <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Note</Label>
        <Textarea id="notes" {...register('notes')} rows={3} />
        {errors.notes && (
          <p className="text-xs text-destructive">{errors.notes.message}</p>
        )}
      </div>

      <PetFormBtn action={action} />
    </form>
  );
}
