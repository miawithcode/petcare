'use client';

import { Description } from '@radix-ui/react-dialog';
import PetForm from './pet-form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { flushSync } from 'react-dom';

type PetButtonProps = {
  action: 'add' | 'edit' | 'checkout';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  action,
  children,
  onClick,
}: PetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (action === 'checkout') {
    return (
      <Button variant="outline" size="sm" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {action === 'add' ? (
          <Button size="icon" className="rounded-full">
            {children}
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            {children}
          </Button>
        )}
      </DialogTrigger>
      <Description />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          action={action}
          onFormSubmit={() => {
            flushSync(() => {
              setIsOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
