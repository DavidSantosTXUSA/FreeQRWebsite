import QRCodeStyling, { type Options } from 'qr-code-styling';
import type { StyledQRCodeOptions } from '../types/qrStyles';

const DEFAULT_SIZE = 360;

export async function generateStyledQRCode(url: string, options: StyledQRCodeOptions): Promise<string> {
  const config: Options = {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    data: url,
    image: options.logoDataUrl || undefined,
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: 'anonymous',
      margin: 8,
      imageSize: options.logoSizePercent ? options.logoSizePercent / 100 : 0.2,
    },
    backgroundOptions: {
      color: options.backgroundColor,
    },
    dotsOptions: {
      type: options.dotStyle,
      color: options.gradient ? undefined : options.foregroundColor,
      gradient: options.gradient
        ? {
            type: options.gradient.type,
            rotation: options.gradient.rotation ?? 0,
            colorStops: options.gradient.colors.map((color, idx, arr) => ({
              offset: arr.length > 1 ? idx / (arr.length - 1) : 0,
              color,
            })),
          }
        : undefined,
    },
    cornersSquareOptions: {
      type: options.cornerStyle === 'rounded' ? 'extra-rounded' : 'square',
      color: options.foregroundColor,
    },
    cornersDotOptions: {
      type: options.cornerStyle === 'rounded' ? 'dot' : 'square',
      color: options.foregroundColor,
    },
  };

  const qr = new QRCodeStyling(config);
  const raw = (await qr.getRawData('png')) as Blob;
  return convertBlobToDataURL(raw);
}

function convertBlobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


