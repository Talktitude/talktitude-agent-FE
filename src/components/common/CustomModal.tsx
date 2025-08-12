import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  mode?: 'center' | 'top-right';
}

const CustomModal = ({
  open,
  onOpenChange,
  children,
  mode = 'center',
}: CustomModalProps) => {
  const getModalClasses = () => {
    switch (mode) {
      case 'top-right':
        return '!left-auto !top-4 !right-4 !translate-x-0 !translate-y-0 m-0 max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto';
      case 'center':
      default:
        return '';
    }
  };

  const getOverlayClasses = () => {
    switch (mode) {
      case 'center':
        return 'bg-black/60';
      case 'top-right':
      default:
        return 'bg-transparent';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className={getOverlayClasses()} />
        <DialogContent className={getModalClasses()}>
          <DialogClose className="absolute right-6 focus:outline-none"></DialogClose>
          <DialogTitle className="sr-only">Modal</DialogTitle>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CustomModal;
