import { useState, useEffect, useCallback } from 'react';
import { generateQRCode } from '../utils/qrCodeGeneration';
import { generateStyledQRCode } from '../utils/styledQrGeneration';
import type { GenerateConfig } from '../types/qrStyles';

interface UseQRCodeReturn {
  qrCode: string | null;
  loading: boolean;
  error: string | null;
  generate: (url: string, config?: GenerateConfig) => Promise<void>;
}

/**
 * Custom hook for QR code generation
 * @param initialUrl - Optional initial URL to generate QR code from
 * @returns {UseQRCodeReturn} QR code state and generation function
 */
export function useQRCode(initialUrl?: string, initialConfig?: GenerateConfig): UseQRCodeReturn {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (url: string, config: GenerateConfig = {}) => {
    if (!url || url.trim() === '') {
      setQRCode(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let qrCodeDataURL: string;
      if (config.mode === 'styled' && config.styleOptions) {
        qrCodeDataURL = await generateStyledQRCode(url, config.styleOptions);
      } else {
        qrCodeDataURL = await generateQRCode(url);
      }
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
      generate(initialUrl, initialConfig);
    }
  }, [initialUrl, initialConfig, generate]);

  return { qrCode, loading, error, generate };
}

