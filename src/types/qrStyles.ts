export type StyledMode = 'classic' | 'styled';

export interface StyledQRCodeOptions {
  foregroundColor: string;
  backgroundColor: string;
  dotStyle: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
  cornerStyle: 'square' | 'rounded';
  gradient?: {
    colors: string[];
    type: 'linear' | 'radial';
    rotation?: number;
  };
  logoDataUrl?: string | null;
}

export interface GenerateConfig {
  mode?: StyledMode;
  styleOptions?: StyledQRCodeOptions;
}


