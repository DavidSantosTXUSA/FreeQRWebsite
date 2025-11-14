import { memo } from 'react';

const badges = [
  'Permanent QR codes',
  'No account required',
  'Mobile-friendly',
  'Privacy-first',
];

export const Header = memo(() => {
  return (
    <header className="w-full px-4 pt-12 pb-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm">Instant • Permanent • Private</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Free QR Code Generator
          </h1>
          <p className="text-lg md:text-2xl text-gray-600">
            Generate beautiful, permanent QR codes in seconds, right in your browser.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-gray-600">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full bg-white/80 border border-gray-200 shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
