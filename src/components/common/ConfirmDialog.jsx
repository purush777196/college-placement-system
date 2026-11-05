import React from 'react';
import Dialog from '../ui/Dialog';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Proceed',
  confirmVariant = 'destructive',
  isLoading = false,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmText={confirmText}
      confirmVariant={confirmVariant}
      isLoading={isLoading}
    />
  );
};

export default ConfirmDialog;

