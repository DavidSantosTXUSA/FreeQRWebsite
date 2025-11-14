import React, { memo } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
      role="alert"
      aria-live="polite"
    >
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);
ErrorMessage.displayName = 'ErrorMessage';

