import React from 'react';

interface QRCodePreviewProps {
  qrCode: string | null;
  loading: boolean;
  error: string | null;
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({ qrCode, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full max-w-md mx-auto p-8 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Generating QR code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full max-w-md mx-auto p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!qrCode) {
    return (
      <div className="flex items-center justify-center w-full max-w-md mx-auto p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">QR code will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
      <img
        src={qrCode}
        alt="Generated QR Code"
        className="w-full max-w-xs md:max-w-sm h-auto"
        aria-label="Generated QR code"
        loading="lazy"
      />
    </div>
  );
};

