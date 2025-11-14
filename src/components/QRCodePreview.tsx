import React, { memo } from 'react';

interface QRCodePreviewProps {
  qrCode: string | null;
  loading: boolean;
  error: string | null;
  mode?: 'classic' | 'styled';
}

const QRCodePreviewComponent: React.FC<QRCodePreviewProps> = ({ qrCode, loading, error, mode = 'classic' }) => {
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
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto p-4 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-slate-100 text-gray-600">
        {mode === 'styled' ? 'Creative mode' : 'Classic mode'}
      </span>
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

export const QRCodePreview = memo(QRCodePreviewComponent);
QRCodePreview.displayName = 'QRCodePreview';

