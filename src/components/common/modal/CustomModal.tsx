import React from 'react';
import {
  Dialog,
  DialogContent,
  // DialogClose,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
  DialogFooter,
} from '@/components/ui/dialog';

interface CustomModalPropsType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  mode?: 'center' | 'top-right';
  isFooter?: boolean;
  onLogout?: () => void;
  isAlert?: boolean;
  isWarning?: boolean;
  footerText?: string;
}
const CustomModal = ({
  open,
  onOpenChange,
  children,
  mode = 'center',
  isFooter = false,
  onLogout,
  isAlert = false,
  isWarning = false,
  footerText = '로그아웃',
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
        <DialogContent
          className={getModalClasses()}
          aria-describedby={undefined}
          hideCloseButton={isAlert || isWarning}
        >
          {isAlert && (
            <DialogTitle className="flex justify-center items-center text-xl font-semibold py-3 bg-mainColor text-white rounded-t-3xl">
              알림
            </DialogTitle>
          )}
          {isWarning && (
            <DialogTitle className="flex justify-center items-center text-xl font-semibold py-3 bg-textRed text-white rounded-t-3xl">
              경고
            </DialogTitle>
          )}
          <DialogTitle className="sr-only">Modal</DialogTitle>
          {children}
          {isFooter && (
            <DialogFooter className="flex flex-col items-center">
              <button
                onClick={onLogout}
                className="text-center text-mainColor font-medium rounded-3xl text-lg py-[16px] w-full hover:bg-gray-50"
              >
                {footerText}
              </button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default CustomModal;
