import React, { useState, useEffect, useRef } from 'react';
import { validateURL, getURLValidationError } from '../utils/urlValidation';

interface URLInputProps {
  value: string;
  onChange: (url: string) => void;
  onValidURL: (url: string) => void;
}

export const URLInput: React.FC<URLInputProps> = ({ value, onChange, onValidURL }) => {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const onValidURLRef = useRef(onValidURL);

  // Keep ref up to date
  useEffect(() => {
    onValidURLRef.current = onValidURL;
  }, [onValidURL]);

  useEffect(() => {
    if (value.trim() === '') {
      setError(null);
      setIsValid(false);
      return;
    }

    // Debounce validation to avoid too many QR code generations
    const timeoutId = setTimeout(() => {
      const valid = validateURL(value);
      setIsValid(valid);
      
      if (valid) {
        setError(null);
        // Normalize URL for QR code generation
        let normalizedURL = value.trim();
        if (!normalizedURL.match(/^https?:\/\//i)) {
          normalizedURL = `https://${normalizedURL}`;
        }
        onValidURLRef.current(normalizedURL);
      } else {
        setError(getURLValidationError(value));
      }
    }, 300); // 300ms debounce for better performance

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="url"
        value={value}
        onChange={handleChange}
        placeholder="Enter URL (e.g., https://example.com)"
        className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : isValid
            ? 'border-green-500 focus:ring-green-500'
            : 'border-gray-300 focus:ring-primary focus:border-primary'
        }`}
        aria-label="Enter URL for QR code generation"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'url-error' : undefined}
      />
      {error && (
        <p
          id="url-error"
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

