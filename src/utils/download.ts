/**
 * Download QR code as PNG image
 * @param imageData - QR code image data URL
 * @param filename - Optional filename (default: "qrcode.png")
 */
export function downloadQRCode(imageData: string, filename: string = 'qrcode.png'): void {
  try {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    throw new Error('Failed to download QR code. Please try again.');
  }
}

