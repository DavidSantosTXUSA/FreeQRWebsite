import { ChangeEvent } from 'react';
import { stylePresets } from '../data/stylePresets';

interface CreativeControlsProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  selectedPresetId: string;
  onPresetChange: (presetId: string) => void;
  onLogoUpload: (dataUrl: string | null) => void;
  logoPreview: string | null;
}

export function CreativeControls({
  enabled,
  onToggle,
  selectedPresetId,
  onPresetChange,
  onLogoUpload,
  logoPreview,
}: CreativeControlsProps) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onLogoUpload(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onLogoUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="bg-white/90 border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Creative mode</p>
          <p className="text-gray-600 text-sm">
            Keep Classic mode for everyday QR codes, or flip the switch for branded art with logos.
          </p>
        </div>
        <button
          type="button"
          className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
            enabled ? 'bg-primary text-white' : 'bg-slate-200 text-gray-500'
          }`}
          onClick={() => onToggle(!enabled)}
          aria-pressed={enabled}
        >
          <span
            className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition ${
              enabled ? 'translate-x-10' : 'translate-x-2'
            }`}
          />
          <span className="absolute left-6 text-xs font-semibold uppercase tracking-wide">
            {enabled ? 'On' : 'Off'}
          </span>
        </button>
      </div>

      {enabled && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {stylePresets.map((preset) => {
              const active = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPresetChange(preset.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-slate-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{preset.label}</h3>
                    {active && (
                      <span className="text-xs font-bold text-primary uppercase">Selected</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{preset.description}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Logo overlay (optional)</p>
              <p className="text-xs text-gray-500">
                Works best with square PNG/SVG. Keep logos under 20% of the QR area for reliable scans.
              </p>
            </div>
            <label className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium cursor-pointer hover:border-primary/50 transition">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              Upload logo
            </label>
            {logoPreview && (
              <div className="flex items-center gap-3">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-14 h-14 rounded-xl border border-slate-200 object-contain bg-white"
                />
                <button
                  type="button"
                  className="text-sm text-primary font-semibold"
                  onClick={() => onLogoUpload(null)}
                >
                  Remove logo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


