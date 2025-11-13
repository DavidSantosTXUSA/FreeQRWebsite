import React from 'react';

interface SuccessFeedbackProps {
  message: string;
}

export const SuccessFeedback: React.FC<SuccessFeedbackProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
      role="status"
      aria-live="polite"
    >
      <p className="text-green-600 text-center">{message}</p>
    </div>
  );
};

