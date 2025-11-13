import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 md:py-8 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Free QR Code Generator
        </h1>
        <p className="text-base md:text-xl text-gray-600">
          Generate permanent QR codes instantly
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          No account required • Completely free • QR codes never expire
        </p>
      </div>
    </header>
  );
};

