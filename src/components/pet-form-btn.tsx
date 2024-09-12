import { type TPetFormAction } from '@/lib/types';
import { Button } from './ui/button';

export default function PetFormBtn({ action }: { action: TPetFormAction }) {
  return (
    <Button type="submit">{action === 'add' ? 'Add pet' : 'Edit pet'}</Button>
  );
}
