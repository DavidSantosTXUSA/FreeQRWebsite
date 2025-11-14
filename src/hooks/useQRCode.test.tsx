import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useQRCode } from './useQRCode';

vi.mock('../utils/qrCodeGeneration', () => ({
  generateQRCode: vi.fn(async (url: string) => {
    const encoded = Buffer.from(url).toString('base64');
    return `data:image/png;base64,${encoded}`;
  }),
}));

describe('useQRCode', () => {
  it('generates a QR code when generate is called', async () => {
    const { result } = renderHook(() => useQRCode());

    await act(async () => {
      await result.current.generate('https://example.com');
    });

    await waitFor(() => {
      expect(result.current.qrCode).toContain('data:image/png');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('resets QR code when input is empty', async () => {
    const { result } = renderHook(() => useQRCode());

    await act(async () => {
      await result.current.generate('');
    });

    expect(result.current.qrCode).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('auto-generates when initial URL is provided', async () => {
    const { result } = renderHook(() => useQRCode('https://aws.amazon.com'));

    await waitFor(() => {
      expect(result.current.qrCode).toContain('data:image/png');
    });
  });
});


