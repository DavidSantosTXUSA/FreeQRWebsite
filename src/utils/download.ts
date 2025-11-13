/**
 * Download QR code as PNG image
 * Works on both desktop and mobile browsers
 * @param imageData - QR code image data URL
 * @param filename - Optional filename (default: "qrcode.png")
 */
export function downloadQRCode(imageData: string, filename: string = 'qrcode.png'): void {
  try {
    // Check if we're on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, open image in new tab/window for download
      // User can long-press to save image
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<img src="${imageData}" alt="QR Code" style="max-width:100%;height:auto;" />`);
        newWindow.document.close();
      } else {
        // Fallback: create download link
        const link = document.createElement('a');
        link.href = imageData;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      // For desktop browsers, use standard download
      const link = document.createElement('a');
      link.href = imageData;
      link.download = filename;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    throw new Error('Failed to download QR code. Please try again.');
  }
}

