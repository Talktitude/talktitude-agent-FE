import React from 'react';
import ModalButton from './ModalButton';

interface ModalButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ModalButtonGroup = ({
  children,
  className = '',
}: ModalButtonGroupProps) => {
  return (
    <div className={`flex gap-3 justify-center ${className}`}>{children}</div>
  );
};

export const ConfirmCancelButtons = ({
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  confirmVariant = 'confirm' as const,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'confirm' | 'warning';
}) => (
  <ModalButtonGroup>
    <ModalButton variant="cancel" size="pair" onClick={onCancel}>
      {cancelText}
    </ModalButton>
    <ModalButton variant={confirmVariant} size="pair" onClick={onConfirm}>
      {confirmText}
    </ModalButton>
  </ModalButtonGroup>
);

export const SingleConfirmButton = ({
  onConfirm,
  confirmText = '확인',
  variant = 'confirm' as const,
}: {
  onConfirm: () => void;
  confirmText?: string;
  variant?: 'confirm' | 'warning';
}) => (
  <ModalButtonGroup>
    <ModalButton variant={variant} size="single" onClick={onConfirm}>
      {confirmText}
    </ModalButton>
  </ModalButtonGroup>
);

export default ModalButtonGroup;
