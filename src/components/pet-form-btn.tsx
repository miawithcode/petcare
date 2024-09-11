import { type TPetFormAction } from '@/lib/types';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

export default function PetFormBtn({ action }: { action: TPetFormAction }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {action === 'add' ? 'Add pet' : 'Edit pet'}
    </Button>
  );
}
