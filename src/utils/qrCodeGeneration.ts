import QRCode from 'qrcode';

/**
 * Generate QR code from URL string
 * @param url - URL string to generate QR code from
 * @returns Promise<string> - QR code image data URL (PNG format)
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 300,
      errorCorrectionLevel: 'H', // High error correction for durability on printed materials
      margin: 1,
      color: {
        dark: '#000000', // Black foreground
        light: '#FFFFFF', // White background
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    throw new Error('Failed to generate QR code. Please check your URL and try again.');
  }
}

