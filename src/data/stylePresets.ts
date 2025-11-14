import type { StyledQRCodeOptions } from '../types/qrStyles';

export interface StylePreset {
  id: string;
  label: string;
  description: string;
  options: StyledQRCodeOptions;
}

export const stylePresets: StylePreset[] = [
  {
    id: 'classic',
    label: 'Polished Classic',
    description: 'Bold, high-contrast QR ideal for professional print runs.',
    options: {
      foregroundColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      dotStyle: 'square',
      cornerStyle: 'square',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset Gradient',
    description: 'Warm gradient with rounded dots, perfect for event flyers.',
    options: {
      foregroundColor: '#FB923C',
      backgroundColor: '#FFF7ED',
      dotStyle: 'rounded',
      cornerStyle: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 90,
        colors: ['#FB923C', '#F97316', '#F43F5E'],
      },
    },
  },
  {
    id: 'neon',
    label: 'Neon Pulse',
    description: 'Vibrant colors with classy corners for modern campaigns.',
    options: {
      foregroundColor: '#10B981',
      backgroundColor: '#0F172A',
      dotStyle: 'classy-rounded',
      cornerStyle: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 45,
        colors: ['#34D399', '#22D3EE', '#8B5CF6'],
      },
    },
  },
];


