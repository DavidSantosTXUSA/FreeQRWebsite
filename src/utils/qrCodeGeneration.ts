import QRCode from 'qrcode';

/**
 * Generate QR code from URL string
 * @param url - URL string to generate QR code from
 * @returns Promise<string> - QR code image data URL (PNG format)
 */
/**
 * Generate QR code from URL string
 * Optimized for performance with appropriate size based on URL length
 * @param url - URL string to generate QR code from
 * @returns Promise<string> - QR code image data URL (PNG format)
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    // Determine optimal size based on URL length for better performance
    // Longer URLs need larger QR codes to maintain scannability
    const urlLength = url.length;
    let width = 300; // Default size (minimum for print quality)
    
    if (urlLength > 500) {
      width = 400; // Larger for very long URLs
    } else if (urlLength > 200) {
      width = 350; // Medium for longer URLs
    }

    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: width,
      errorCorrectionLevel: 'H', // High error correction for durability on printed materials
      margin: 1, // Minimum margin for optimal size
      color: {
        dark: '#000000', // Black foreground (high contrast for scanning)
        light: '#FFFFFF', // White background (high contrast for scanning)
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    throw new Error('Failed to generate QR code. Please check your URL and try again.');
  }
}

