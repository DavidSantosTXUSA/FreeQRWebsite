import { memo } from 'react';

const features = [
  {
    title: 'Permanent & Private',
    description: 'All QR codes are generated locally in your browser. Nothing is uploaded, ever.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'Poster-Ready Quality',
    description: 'High-error correction PNGs stay crisp on large prints, signage, and badges.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M3 6a3 3 0 0 1 3-3h2.25M21 18a3 3 0 0 1-3 3h-2.25M3 12h18M3 12l3 3m-3-3 3-3M21 12l-3 3m3-3-3-3"
        />
      </svg>
    ),
  },
  {
    title: 'Grandma-Friendly',
    description: 'Large inputs, clear states, and single-tap downloads that work on every phone.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M15 9h3.75M15 12h3.75M15 15h3.75m-6 0h.008v.008H12m0-3h.008v.008H12m0-3h.008v.008H12M6.75 18h10.5A2.25 2.25 0 0 0 19.5 15.75v-7.5A2.25 2.25 0 0 0 17.25 6h-10.5A2.25 2.25 0 0 0 4.5 8.25v7.5A2.25 2.25 0 0 0 6.75 18Z"
        />
      </svg>
    ),
  },
];

const FeatureHighlightsComponent = () => {
  return (
    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto bg-white/80 border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
          <span className="h-px w-8 bg-primary/30" aria-hidden="true" />
          Why builders prefer this tool
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeatureHighlights = memo(FeatureHighlightsComponent);
FeatureHighlights.displayName = 'FeatureHighlights';


