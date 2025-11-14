import { ChangeEvent } from 'react';
import { stylePresets } from '../data/stylePresets';
import type { StyledQRCodeOptions } from '../types/qrStyles';

const dotStyles: StyledQRCodeOptions['dotStyle'][] = [
  'square',
  'rounded',
  'classy',
  'classy-rounded',
  'dots',
  'extra-rounded',
];

const cornerStyles: StyledQRCodeOptions['cornerStyle'][] = ['square', 'rounded'];

interface CreativeControlsProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  selectedPresetId: string;
  onPresetChange: (presetId: string) => void;
  styleOptions: StyledQRCodeOptions;
  onStyleChange: (options: StyledQRCodeOptions) => void;
  onLogoUpload: (dataUrl: string | null) => void;
  logoPreview: string | null;
}

export function CreativeControls({
  enabled,
  onToggle,
  selectedPresetId,
  onPresetChange,
  styleOptions,
  onStyleChange,
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

  const handleBaseColorChange = (field: 'foregroundColor' | 'backgroundColor', value: string) => {
    onStyleChange({
      ...styleOptions,
      [field]: value,
    });
  };

  const toggleGradient = () => {
    if (styleOptions.gradient) {
      onStyleChange({ ...styleOptions, gradient: undefined });
    } else {
      onStyleChange({
        ...styleOptions,
        gradient: {
          type: 'linear',
          rotation: 45,
          colors: [styleOptions.foregroundColor, '#3B82F6'],
        },
      });
    }
  };

  const handleGradientColorChange = (index: number, value: string) => {
    const gradient = styleOptions.gradient ?? {
      type: 'linear',
      rotation: 45,
      colors: [styleOptions.foregroundColor, styleOptions.foregroundColor],
    };
    const colors = [...gradient.colors];
    colors[index] = value;
    onStyleChange({
      ...styleOptions,
      gradient: {
        ...gradient,
        colors,
      },
    });
  };

  const handleGradientRotationChange = (value: number) => {
    if (!styleOptions.gradient) return;
    onStyleChange({
      ...styleOptions,
      gradient: {
        ...styleOptions.gradient,
        rotation: value,
      },
    });
  };

  const handleDotStyleChange = (value: StyledQRCodeOptions['dotStyle']) => {
    onStyleChange({ ...styleOptions, dotStyle: value });
  };

  const handleCornerStyleChange = (value: StyledQRCodeOptions['cornerStyle']) => {
    onStyleChange({ ...styleOptions, cornerStyle: value });
  };

  return (
    <section className="bg-white/90 border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Creative mode</p>
          <p className="text-gray-600 text-sm mt-1">
            Keep Classic mode for everyday QR codes, or flip the switch for branded art with logos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
            enabled ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-primary border border-primary'
          }`}
        >
          {enabled ? 'Creative On' : 'Creative Off'}
          <span
            className={`h-4 w-4 rounded-full border-2 transition-colors ${
              enabled ? 'border-white bg-white/20' : 'border-primary bg-transparent'
            }`}
          />
        </button>
      </div>

      {!enabled && (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-sm text-gray-600">
          Flip the switch to unlock gradients, custom palettes, and logo overlays. Preset bundles will load
          automatically so you can tweak without starting from scratch.
        </div>
      )}

      {enabled && (
        <div className="space-y-6">
          <div className="space-y-3">
            {stylePresets.map((preset) => {
              const active = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPresetChange(preset.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 ring-1 ring-primary/30'
                      : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-3 w-3 rounded-full ${
                        active ? 'bg-primary' : 'bg-slate-300'
                      }`}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{preset.label}</h3>
                        {active && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-primary">Selected</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{preset.description}</p>
                    </div>
                  </div>
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

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <div>
                <p className="text-sm	font-semibold text-gray-900">Color palette</p>
                <p className="text-xs text-gray-500">Adjust brand colors or layer gradients.</p>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-gray-600 flex items-center justify-between">
                  Foreground
                  <input
                    type="color"
                    value={styleOptions.foregroundColor}
                    onChange={(e) => handleBaseColorChange('foregroundColor', e.target.value)}
                    className="h-8 w-16 rounded border border-slate-200 cursor-pointer"
                  />
                </label>
                <label className="text-xs font-semibold text-gray-600 flex items-center justify-between">
                  Background
                  <input
                    type="color"
                    value={styleOptions.backgroundColor}
                    onChange={(e) => handleBaseColorChange('backgroundColor', e.target.value)}
                    className="h-8 w-16 rounded border border-slate-200 cursor-pointer"
                  />
                </label>
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">Gradient</p>
                  <button
                    type="button"
                    onClick={toggleGradient}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                      styleOptions.gradient ? 'border-primary text-primary' : 'border-slate-200 text-gray-500'
                    }`}
                  >
                    {styleOptions.gradient ? 'Disable' : 'Enable'}
                  </button>
                </div>
                {styleOptions.gradient && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 text-xs font-semibold text-gray-600">
                        Start color
                        <input
                          type="color"
                          value={styleOptions.gradient.colors[0]}
                          onChange={(e) => handleGradientColorChange(0, e.target.value)}
                          className="block h-8 w-full rounded border border-slate-200 cursor-pointer"
                        />
                      </label>
                      <label className="flex-1 text-xs font-semibold text-gray-600">
                        End color
                        <input
                          type="color"
                          value={styleOptions.gradient.colors[1] ?? styleOptions.gradient.colors[0]}
                          onChange={(e) => handleGradientColorChange(1, e.target.value)}
                          className="block h-8 w-full rounded border border-slate-200 cursor-pointer"
                        />
                      </label>
                    </div>
                    <label className="text-xs font-semibold text-gray-600">
                      Rotation ({styleOptions.gradient.rotation ?? 0}°)
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={styleOptions.gradient.rotation ?? 0}
                        onChange={(e) => handleGradientRotationChange(Number(e.target.value))}
                        className="w-full"
                      />
                    </label>
                    <label className="text-xs font-semibold text-gray-600 flex items-center justify-between">
                      Type
                      <select
                        value={styleOptions.gradient.type}
                        onChange={(e) =>
                          onStyleChange({
                            ...styleOptions,
                            gradient: {
                              ...styleOptions.gradient!,
                              type: e.target.value as 'linear' | 'radial',
                            },
                          })
                        }
                        className="ml-3 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      >
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <div>
                <p className="text-sm	font-semibold text-gray-900">Shape & detail</p>
                <p className="text-xs text-gray-500">Fine-tune modules and corner treatments.</p>
              </div>
              <label className="text-xs font-semibold text-gray-600 space-y-2">
                Dot style
                <select
                  value={styleOptions.dotStyle}
                  onChange={(e) => handleDotStyleChange(e.target.value as StyledQRCodeOptions['dotStyle'])}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  {dotStyles.map((style) => (
                    <option key={style} value={style}>
                      {style.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-semibold text-gray-600 space-y-2">
                Corner style
                <select
                  value={styleOptions.cornerStyle}
                  onChange={(e) => handleCornerStyleChange(e.target.value as StyledQRCodeOptions['cornerStyle'])}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  {cornerStyles.map((style) => (
                    <option key={style} value={style}>
                      {style.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


