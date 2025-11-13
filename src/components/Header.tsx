import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Free QR Code Generator
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Generate permanent QR codes instantly
        </p>
      </div>
    </header>
  );
};

