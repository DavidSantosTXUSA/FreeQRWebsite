import React, { memo } from 'react';
import { downloadQRCode } from '../utils/download';

interface DownloadButtonProps {
  qrCode: string | null;
  disabled?: boolean;
  onDownload?: () => void;
}

const DownloadButtonComponent: React.FC<DownloadButtonProps> = ({
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
      // Error will be handled by error boundary or parent component
    }
  };

  const isDisabled = disabled || !qrCode;

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={handleDownload}
        disabled={isDisabled}
        className={`w-full px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-white rounded-lg transition-colors min-h-[44px] ${
          isDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        }`}
        aria-label="Download QR code"
        aria-disabled={isDisabled}
      >
        Download QR Code
      </button>
    </div>
  );
};

export const DownloadButton = memo(DownloadButtonComponent);
DownloadButton.displayName = 'DownloadButton';

