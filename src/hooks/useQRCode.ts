import { useState, useEffect, useCallback } from 'react';
import { generateQRCode } from '../utils/qrCodeGeneration';

interface UseQRCodeReturn {
  qrCode: string | null;
  loading: boolean;
  error: string | null;
  generate: (url: string) => Promise<void>;
}

/**
 * Custom hook for QR code generation
 * @param initialUrl - Optional initial URL to generate QR code from
 * @returns {UseQRCodeReturn} QR code state and generation function
 */
export function useQRCode(initialUrl?: string): UseQRCodeReturn {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (url: string) => {
    if (!url || url.trim() === '') {
      setQRCode(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const qrCodeDataURL = await generateQRCode(url);
      setQRCode(qrCodeDataURL);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      setQRCode(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialUrl) {
      generate(initialUrl);
    }
  }, [initialUrl, generate]);

  return { qrCode, loading, error, generate };
}

