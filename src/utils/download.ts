/**
 * Download QR code as PNG image
 * Works on both desktop and mobile browsers
 * @param imageData - QR code image data URL
 * @param filename - Optional filename (default: "qrcode.png")
 */
export function downloadQRCode(imageData: string, filename: string = 'qrcode.png'): void {
  try {
    // Convert data URL to blob for better compatibility
    const blob = dataURLtoBlob(imageData);
    const blobURL = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = filename;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up blob URL after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 100);
  } catch (error) {
    throw new Error('Failed to download QR code. Please try again.');
  }
}

/**
 * Convert data URL to blob
 * @param dataURL - Data URL string
 * @returns Blob - Blob object
 */
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

