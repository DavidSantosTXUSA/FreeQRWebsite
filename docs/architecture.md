# Architecture

## Executive Summary

FreeQRCodeWebsite is a client-side web application that generates permanent QR codes from URLs. The architecture prioritizes simplicity, scalability, and mobile-first performance. The application runs entirely in the browser with no server-side processing, ensuring permanent QR codes that never expire and minimal infrastructure costs. The architecture is designed to handle thousands of daily users with excellent performance on mobile devices (iPhone-optimized).

**Key Architectural Principles**:
- **Client-Side Generation**: All QR code generation happens in the browser (no server dependency)
- **Static Site**: Deployable as a static site (no backend required)
- **Mobile-First**: Optimized for iPhone and mobile devices
- **Scalability**: Handles thousands of daily users with minimal infrastructure
- **Performance**: Fast loading (<2 seconds on 3G), instant generation (<1 second)
- **Security**: Client-side only, no data storage, privacy-focused
- **Reliability**: 99.9%+ uptime via static hosting with CDN

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| **Frontend Framework** | React with Vite | Latest | All | Fast development, excellent performance, mobile-optimized |
| **Styling** | Tailwind CSS | Latest | All | Mobile-first utilities, minimal CSS, fast loading |
| **QR Code Library** | qrcode.js | Latest | QR Generation | Client-side generation, reliable, well-maintained |
| **Build Tool** | Vite | Latest | All | Fast builds, excellent development experience |
| **Deployment** | Vercel | Latest | All | Free static site hosting, CDN, 99.9%+ uptime, automatic HTTPS |
| **Type Safety** | TypeScript | Latest | All | Type safety, better developer experience |
| **Package Manager** | npm | Latest | All | Standard, widely supported |
| **Browser Support** | Modern browsers (ES2020+) | - | All | Mobile-first, modern JavaScript features |
| **Accessibility** | WCAG 2.1 Level AA | - | All | Grandma-friendly, accessible to all users |
| **Performance** | Client-side generation | - | All | Instant generation, no server latency |

## Project Structure

```
FreeQRCodeWebsite/
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── QRCodeGenerator.tsx
│   │   ├── URLInput.tsx
│   │   ├── QRCodePreview.tsx
│   │   ├── DownloadButton.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── SuccessFeedback.tsx
│   │   └── Header.tsx
│   ├── hooks/
│   │   ├── useQRCode.ts
│   │   ├── useURLValidation.ts
│   │   └── useDownload.ts
│   ├── utils/
│   │   ├── urlValidation.ts
│   │   ├── qrCodeGeneration.ts
│   │   └── download.ts
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── docs/
    ├── PRD.md
    ├── ux-design-specification.md
    └── architecture.md
```

## Epic to Architecture Mapping

| Epic | Architecture Component | Technology | Notes |
|------|----------------------|------------|-------|
| **QR Code Generation** | `useQRCode.ts` hook, `qrCodeGeneration.ts` utility | qrcode.js | Client-side generation, instant feedback |
| **URL Input & Validation** | `URLInput.tsx` component, `useURLValidation.ts` hook | React, TypeScript | Real-time validation, friendly error messages |
| **QR Code Preview** | `QRCodePreview.tsx` component | React, Canvas/Image | Large, clear display, mobile-optimized |
| **Download Functionality** | `DownloadButton.tsx` component, `useDownload.ts` hook | React, File API | Mobile-optimized download, proper file handling |
| **Error Handling** | `ErrorMessage.tsx` component | React | Friendly, helpful error messages |
| **Success Feedback** | `SuccessFeedback.tsx` component | React | Clear, positive success feedback |
| **Responsive Design** | Tailwind CSS utilities | Tailwind CSS | Mobile-first, responsive breakpoints |
| **Accessibility** | ARIA labels, semantic HTML | React, HTML | WCAG 2.1 Level AA compliance |
| **Performance** | Code splitting, lazy loading | Vite | Fast loading, minimal bundle size |
| **Deployment** | Static site deployment | Vercel/Netlify | CDN, 99.9%+ uptime, global performance |

## Technology Stack Details

### Core Technologies

**Frontend Framework**: React 18+
- **Rationale**: Modern, performant, excellent ecosystem
- **Benefits**: Component-based architecture, excellent mobile performance
- **Version**: Latest stable version

**Build Tool**: Vite
- **Rationale**: Fast development, excellent performance, modern tooling
- **Benefits**: Instant HMR, fast builds, optimal production bundles
- **Version**: Latest stable version

**Styling**: Tailwind CSS
- **Rationale**: Mobile-first utilities, minimal CSS, fast loading
- **Benefits**: Consistent design system, responsive utilities, accessibility support
- **Version**: Latest stable version

**QR Code Library**: qrcode.js
- **Rationale**: Client-side generation, reliable, well-maintained
- **Benefits**: No server dependency, permanent QR codes, fast generation
- **Version**: Latest stable version

**Type Safety**: TypeScript
- **Rationale**: Type safety, better developer experience
- **Benefits**: Catch errors early, better IDE support, self-documenting code
- **Version**: Latest stable version

**Package Manager**: npm
- **Rationale**: Standard, widely supported
- **Benefits**: Large ecosystem, reliable, well-documented
- **Version**: Latest stable version

### Integration Points

**No External Integrations Required**:
- Client-side only application
- No API calls, no database, no authentication
- No third-party services required
- Static site deployment (Vercel/Netlify)

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Component Pattern

**React Functional Components with Hooks**:
```typescript
// Component structure
import React from 'react';
import { useQRCode } from '../hooks/useQRCode';

export const QRCodeGenerator: React.FC = () => {
  const { qrCode, generateQRCode, error } = useQRCode();
  
  return (
    <div className="qr-code-generator">
      {/* Component implementation */}
    </div>
  );
};
```

**Pattern Rules**:
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Include ARIA labels for accessibility

### Hook Pattern

**Custom Hooks for Business Logic**:
```typescript
// Hook structure
import { useState, useEffect } from 'react';

export const useQRCode = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateQRCode = (url: string) => {
    // QR code generation logic
  };
  
  return { qrCode, generateQRCode, error };
};
```

**Pattern Rules**:
- Extract business logic into custom hooks
- Keep hooks focused and reusable
- Use TypeScript for type safety
- Handle errors gracefully
- Provide clear return values

### Utility Pattern

**Pure Functions for Utility Logic**:
```typescript
// Utility function structure
export const validateURL = (url: string): boolean => {
  // URL validation logic
  return /^https?:\/\/.+\..+/.test(url);
};
```

**Pattern Rules**:
- Use pure functions for utilities
- Keep functions small and focused
- Use TypeScript for type safety
- Handle edge cases gracefully
- Provide clear error messages

### Styling Pattern

**Tailwind CSS Utility Classes**:
```typescript
// Styling with Tailwind CSS
<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
  <input className="w-full max-w-md px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
</div>
```

**Pattern Rules**:
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use consistent spacing scale (8px base unit)
- Use consistent color palette
- Ensure WCAG 2.1 Level AA compliance
- Use large tap targets (minimum 44x44px on mobile)

### Error Handling Pattern

**Friendly Error Messages**:
```typescript
// Error handling structure
const handleError = (error: Error) => {
  // Friendly, helpful error message
  setError('Please enter a valid URL (e.g., https://example.com)');
};
```

**Pattern Rules**:
- Provide friendly, helpful error messages
- Use non-technical language
- Provide actionable suggestions
- Display errors prominently
- Clear error state on correction

### Performance Pattern

**Optimized Rendering**:
```typescript
// Performance optimization
import { useMemo, useCallback } from 'react';

const QRCode = useMemo(() => {
  return generateQRCode(url);
}, [url]);

const handleDownload = useCallback(() => {
  downloadQRCode(qrCode);
}, [qrCode]);
```

**Pattern Rules**:
- Use React.memo for expensive components
- Use useMemo for expensive computations
- Use useCallback for event handlers
- Lazy load components when possible
- Optimize bundle size
- Minimize re-renders

## Consistency Rules

### Naming Conventions

**Components**: PascalCase
- Example: `QRCodeGenerator.tsx`, `URLInput.tsx`

**Hooks**: camelCase with "use" prefix
- Example: `useQRCode.ts`, `useURLValidation.ts`

**Utilities**: camelCase
- Example: `urlValidation.ts`, `qrCodeGeneration.ts`

**Constants**: UPPER_SNAKE_CASE
- Example: `MAX_URL_LENGTH`, `MIN_QR_CODE_SIZE`

**Files**: Match export name
- Example: `QRCodeGenerator.tsx` exports `QRCodeGenerator`

### Code Organization

**Component Structure**:
1. Imports (React, hooks, utilities)
2. Component definition
3. Hooks (useState, useEffect, custom hooks)
4. Event handlers
5. Render logic
6. Return statement

**File Organization**:
- Components in `src/components/`
- Hooks in `src/hooks/`
- Utilities in `src/utils/`
- Styles in `src/styles/`
- Types in `src/types/` (if needed)

### Error Handling

**Error Handling Approach**:
- Catch errors at component level
- Display friendly error messages
- Log errors for debugging (console.error in development)
- Provide actionable error messages
- Clear errors on user action

**Error Message Format**:
- Friendly, helpful language
- Non-technical terminology
- Actionable suggestions
- Clear visual indication (red text, error icon)

### Logging Strategy

**Logging Approach**:
- Development: Console logging for debugging
- Production: Minimal logging (errors only)
- No user data logging (privacy-focused)
- No third-party analytics (privacy-focused)

## Data Architecture

**No Data Storage Required**:
- Client-side only application
- No database, no API, no data persistence
- QR codes generated in browser, downloaded to user's device
- No user data collected or stored

**QR Code Generation**:
- Input: URL string (user input)
- Processing: Client-side QR code generation (qrcode.js)
- Output: QR code image (PNG format)
- Storage: User's device (downloaded file)

**State Management**:
- React useState for component state
- React hooks for business logic
- No global state management needed (simple application)

## API Contracts

**No API Required**:
- Client-side only application
- No server-side API calls
- No external API integrations
- All functionality in browser

## Security Architecture

### Security Approach

**Client-Side Only**:
- No server-side processing
- No user data storage
- No authentication required
- No sensitive data handling

**Input Sanitization**:
- URL validation before QR code generation
- Prevent XSS attacks (React handles this)
- Sanitize user input (URL validation)
- Content Security Policy (CSP) headers

**HTTPS**:
- Site served over HTTPS (Vercel/Netlify)
- Valid SSL certificate
- Secure connections only

**Privacy**:
- No user data collection
- No third-party tracking
- No analytics (privacy-focused)
- No cookies (optional, not required)

**Content Security Policy**:
- CSP headers implemented
- Prevent XSS attacks
- Restrict resource loading
- Secure by default

## Performance Considerations

### Performance Strategies

**Fast Loading**:
- Minimal JavaScript bundle (code splitting)
- Optimized assets (images, fonts)
- CDN for static assets (Vercel/Netlify)
- Lazy loading for non-critical components
- Target: <2 seconds on 3G connection

**Instant Generation**:
- Client-side QR code generation (no server latency)
- Optimized QR code library (qrcode.js)
- Efficient rendering (React optimization)
- Target: <1 second for QR code generation

**Mobile Performance**:
- Mobile-first design (optimized for mobile)
- Fast loading on mobile networks (3G, 4G, 5G)
- Efficient rendering on mobile devices
- Minimal battery usage

**Scalability**:
- Static site deployment (handles thousands of users)
- CDN for global performance (Vercel/Netlify)
- No server-side processing (infinite scalability)
- Target: 10,000+ QR code generations per day

## Deployment Architecture

### Deployment Approach

**Static Site Deployment (Vercel)**:
- Deploy to Vercel (free tier available)
- Static site hosting (no server required)
- CDN for global performance (Vercel Edge Network)
- 99.9%+ uptime guarantee
- Automatic HTTPS (SSL certificate)
- Zero-config deployment (Git integration)
- Preview deployments for pull requests
- Automatic deployments on git push

**Build Process (Vercel)**:
1. Install dependencies (`npm install`)
2. Build production bundle (`npm run build`)
3. Deploy to Vercel (`vercel deploy` or via Git integration)
4. CDN distribution (automatic via Vercel Edge Network)
5. Automatic deployments on git push to main branch

**Environment Variables**:
- No environment variables required (client-side only)
- Optional: Analytics (if needed in future)
- Optional: Custom domain (if needed)

**CI/CD**:
- GitHub Actions (optional)
- Automatic deployment on push to main
- Preview deployments for pull requests
- Automated testing (if needed)

## Development Environment

### Prerequisites

**Required Software**:
- Node.js 18+ (LTS version)
- npm 9+ (comes with Node.js)
- Git (for version control)
- Code editor (VS Code recommended)

**Optional Software**:
- VS Code extensions (ESLint, Prettier, Tailwind CSS IntelliSense)
- Browser developer tools (Chrome DevTools, Firefox DevTools)
- Mobile device testing (iPhone, Android)

### Setup Commands

```bash
# Clone repository (if applicable)
git clone <repository-url>
cd FreeQRCodeWebsite

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (if applicable)
npm test

# Lint code (if applicable)
npm run lint

# Format code (if applicable)
npm run format
```

## Architecture Decision Records (ADRs)

### ADR-001: Client-Side QR Code Generation

**Decision**: Use client-side QR code generation (qrcode.js) instead of server-side generation.

**Rationale**:
- **Permanent QR Codes**: QR codes work even if service is unavailable (data embedded in QR code)
- **No Server Dependency**: No server-side processing required (scalability, cost)
- **Privacy**: No user data sent to server (privacy-focused)
- **Performance**: Instant generation (no server latency)
- **Reliability**: Works offline (if PWA implemented)

**Alternatives Considered**:
- Server-side generation (rejected: server dependency, scalability issues)
- Third-party API (rejected: cost, reliability, privacy concerns)

**Consequences**:
- QR codes are permanent and never expire
- No server-side processing required
- Excellent performance and scalability
- Privacy-focused (no data collection)

### ADR-002: React with Vite

**Decision**: Use React with Vite instead of Next.js or other frameworks.

**Rationale**:
- **Simplicity**: Simple SPA, no SSR required (static site)
- **Performance**: Fast development, excellent production builds
- **Mobile-Optimized**: Excellent mobile performance
- **Developer Experience**: Fast HMR, excellent tooling

**Alternatives Considered**:
- Next.js (rejected: SSR not needed, added complexity)
- Vue.js (rejected: React ecosystem preferred)
- Vanilla JavaScript (rejected: React provides better structure)

**Consequences**:
- Fast development experience
- Excellent production performance
- Simple deployment (static site)
- Good mobile performance

### ADR-003: Tailwind CSS

**Decision**: Use Tailwind CSS instead of CSS-in-JS or traditional CSS.

**Rationale**:
- **Mobile-First**: Excellent mobile-first utilities
- **Performance**: Minimal CSS, fast loading
- **Consistency**: Consistent design system
- **Accessibility**: Built-in accessibility support

**Alternatives Considered**:
- CSS-in-JS (rejected: performance, bundle size)
- Traditional CSS (rejected: maintainability, consistency)
- CSS Modules (rejected: Tailwind provides better utilities)

**Consequences**:
- Consistent design system
- Fast loading (minimal CSS)
- Excellent mobile-first support
- Good accessibility support

### ADR-004: Vercel Deployment

**Decision**: Deploy as static site to Vercel instead of traditional hosting or other platforms.

**Rationale**:
- **Free Tier**: Generous free tier for static sites (perfect for this project)
- **Scalability**: Handles thousands of users with minimal infrastructure
- **Performance**: Vercel Edge Network (CDN) for global performance
- **Reliability**: 99.9%+ uptime guarantee
- **Zero Config**: Automatic deployments on git push, zero configuration
- **Developer Experience**: Excellent DX with preview deployments, analytics
- **Cost**: Free for static sites, no costs for this use case

**Alternatives Considered**:
- Netlify (rejected: Vercel has better free tier and DX for React/Vite)
- Traditional hosting (rejected: scalability, cost, maintenance)
- Serverless functions (rejected: not needed, added complexity)
- Cloud hosting (rejected: overkill, cost)

**Consequences**:
- Excellent scalability (handles thousands of users)
- Global performance (Vercel Edge Network)
- High reliability (99.9%+ uptime)
- Zero cost (free tier sufficient)
- Easy deployment (Git integration, zero config)

---

## Related Documents

- **PRD**: [PRD.md](./PRD.md) - Product Requirements Document
- **UX Design**: [ux-design-specification.md](./ux-design-specification.md) - UX Design Specification

---

_This Architecture document captures the technical architecture for FreeQRCodeWebsite - a client-side web application that generates permanent QR codes from URLs with excellent performance, scalability, and mobile-first design._

_Created through collaborative architecture facilitation between David and AI facilitator._

