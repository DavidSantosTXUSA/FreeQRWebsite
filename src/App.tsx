import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { QRCodePreview } from './components/QRCodePreview';
import { DownloadButton } from './components/DownloadButton';
import { ErrorMessage } from './components/ErrorMessage';
import { SuccessFeedback } from './components/SuccessFeedback';
import { useQRCode } from './hooks/useQRCode';
import { FeatureHighlights } from './components/FeatureHighlights';

function App() {
  const [url, setUrl] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string>('');
  const { qrCode, loading, error, generate } = useQRCode();
  const steps = useMemo(
    () => [
      {
        title: 'Paste any link',
        description: 'Marketing page, signup form, PDF—anything with https:// works.',
      },
      {
        title: 'We validate instantly',
        description: 'Automatic normalization and smart sizing keep QR codes scannable.',
      },
      {
        title: 'Download & print',
        description: 'Tap once to save a high-resolution PNG that never expires.',
      },
    ],
    [],
  );

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-gray-900">
      <Header />
      <main className="px-4 pb-16">
        <section className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  100% client-side generation
                </span>
                <span>Optimized for posters, flyers, and campus events</span>
              </div>
              <div className="space-y-6">
                <URLInput value={url} onChange={handleURLChange} onValidURL={handleValidURL} />
                <QRCodePreview qrCode={qrCode} loading={loading} error={error} />
                <DownloadButton qrCode={qrCode} onDownload={handleDownload} />
                <ErrorMessage message={error || ''} />
                <SuccessFeedback message={downloadSuccess} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm space-y-2"
                >
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FeatureHighlights />
      </main>
    </div>
  );
}

export default App;

