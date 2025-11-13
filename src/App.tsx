import { useState } from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { QRCodePreview } from './components/QRCodePreview';
import { DownloadButton } from './components/DownloadButton';
import { ErrorMessage } from './components/ErrorMessage';
import { SuccessFeedback } from './components/SuccessFeedback';
import { useQRCode } from './hooks/useQRCode';

function App() {
  const [url, setUrl] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string>('');
  const { qrCode, loading, error, generate } = useQRCode();

  const handleURLChange = (newUrl: string) => {
    setUrl(newUrl);
    setDownloadSuccess('');
  };

  const handleValidURL = (normalizedURL: string) => {
    generate(normalizedURL);
  };

  const handleDownload = () => {
    // Check if mobile device for different success message
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const successMessage = isMobile
      ? 'QR code opened in new tab. Long-press to save image.'
      : 'QR code downloaded successfully!';
    
    setDownloadSuccess(successMessage);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-8 max-w-2xl">
        <div className="space-y-4 md:space-y-6">
          <URLInput
            value={url}
            onChange={handleURLChange}
            onValidURL={handleValidURL}
          />
          <QRCodePreview qrCode={qrCode} loading={loading} error={error} />
          <DownloadButton qrCode={qrCode} onDownload={handleDownload} />
          <ErrorMessage message={error || ''} />
          <SuccessFeedback message={downloadSuccess} />
        </div>
      </main>
    </div>
  );
}

export default App;

