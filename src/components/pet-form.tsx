'use client';

import usePetContext from '@/hooks/use-pet-context';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TPetFormAction } from '@/lib/types';
import { Textarea } from './ui/textarea';
import { addPet, editPet } from '@/lib/actions';
import PetFormBtn from './pet-form-btn';
import { toast } from 'sonner';

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
  const { selectedPet } = usePetContext();
  const { register, handleSubmit } = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
  });

  return (
    <form
      action={async (formData) => {
        if (action === 'add') {
          const res = await addPet(formData);
          if (res) {
            toast(res.message);
            return;
          }
        } else {
          const res = await editPet(selectedPet?.id, formData);
          if (res) {
            toast(res.message);
            return;
          }
        }

        onFormSubmit();
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
