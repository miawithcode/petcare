import { Button } from '../ui/button';

type PetButtonProps = {
  action: 'add' | 'edit' | 'checkout';
  children: React.ReactNode;
};

export default function PetButton({ action, children }: PetButtonProps) {
  if (action === 'add') {
    return <Button size="icon">{children}</Button>;
  }

  if (action === 'edit') {
    return (
      <Button variant="secondary" size="sm">
        {children}
      </Button>
    );
  }

  if (action === 'checkout') {
    return (
      <Button variant="secondary" size="sm">
        {children}
      </Button>
    );
  }
}
