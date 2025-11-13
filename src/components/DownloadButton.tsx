import React from 'react';
import { downloadQRCode } from '../utils/download';

interface DownloadButtonProps {
  qrCode: string | null;
  disabled?: boolean;
  onDownload?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  qrCode,
  disabled = false,
  onDownload,
}) => {
  const handleDownload = () => {
    if (!qrCode) {
      return;
    }

    try {
      downloadQRCode(qrCode, 'qrcode.png');
      if (onDownload) {
        onDownload();
      }
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const isDisabled = disabled || !qrCode;

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled}
      className={`w-full max-w-md mx-auto px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-white rounded-lg transition-colors min-h-[44px] ${
        isDisabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-primary hover:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      }`}
      aria-label="Download QR code"
      aria-disabled={isDisabled}
    >
      Download QR Code
    </button>
  );
};

