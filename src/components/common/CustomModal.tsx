import React from 'react';
import { CustomModalPropsType } from '@/types/account';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
  DialogFooter,
} from '@/components/ui/dialog';

const CustomModal = ({
  open,
  onOpenChange,
  children,
  mode = 'center',
  isFooter = false,
  onLogout,
}: CustomModalPropsType) => {
  const getModalClasses = () => {
    switch (mode) {
      case 'top-right':
        return '!left-auto !top-12 !right-16 !translate-x-0 !translate-y-0 m-0 max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto w-[380px]';
      case 'center':
        return 'w-[400px]';
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
          {isFooter && (
            <DialogFooter className="flex flex-col items-center">
              <button
                onClick={onLogout}
                className="text-center text-mainColor font-medium rounded-3xl text-lg py-[16px] w-full hover:bg-gray-50"
              >
                로그아웃
              </button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CustomModal;
