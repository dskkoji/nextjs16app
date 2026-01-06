# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration

### Development Notes
- This project uses Next.js 16.1.1 with React 19.2.3
- React Compiler is enabled (`reactCompiler: true`)
- Turbopack is enabled for development with file system caching
- No separate test runner is configured

## Architecture Overview

### PostHog Analytics Integration
This project uses **client-side PostHog initialization via `instrumentation-client.ts`**, which is the recommended approach for Next.js 15.3+. Key details:

- **Critical**: PostHog is initialized in `instrumentation-client.ts` at the root level
- **Never** combine this with other PostHog initialization methods (e.g., PostHogProvider components)
- PostHog proxy is configured via Next.js rewrites to `/ingest/*` paths in `next.config.ts`
- Environment variables required:
  - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project key
  - `NEXT_PUBLIC_POSTHOG_HOST` - PostHog UI host
- Event tracking is implemented in components (`EventCard.tsx`, `Navbar.tsx`) using `posthog.capture()`

### Routing & Structure
- Uses Next.js App Router (not Pages Router)
- Main entry point: `app/page.tsx`
- Root layout: `app/layout.tsx` handles global styles, fonts, and layout components
- Path alias `@/*` maps to root directory for imports

### Key Components

#### LightRays (`components/LightRays.tsx`)
- Complex WebGL-based animated background using OGL library
- Renders light ray effects with configurable properties (origin, color, speed, spread, etc.)
- Uses Intersection Observer for performance optimization
- Client component with canvas rendering

#### EventCard & Navbar
- Both are client components that use PostHog for analytics
- EventCard displays event information with image, location, date/time
- Navbar provides site navigation with click tracking

### Styling
- Uses Tailwind CSS v4 with custom configuration
- Global styles in `app/globals.css`
- Tailwind utilities merged via `cn()` function in `lib/utils.ts` (using `clsx` + `tailwind-merge`)
- Custom fonts: Schibsted Grotesk and Martian Mono from Google Fonts
- shadcn/ui component pattern configured (New York style, RSC enabled)

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to root
- JSX set to `react-jsx` (React 19 automatic JSX transform)
- Target: ES2017

### Data Management
- Event data stored in `lib/constants.ts` as static array
- Type definitions colocated with data (`EventItem` type)
- No database or external API integration currently

## Important Patterns

### Import Aliases
Always use `@/` prefix for imports:
- `@/components/ComponentName`
- `@/lib/utils`
- `@/lib/constants`

### Component Structure
- Client components must have `'use client'` directive at the top
- Server components (default) should not include this directive
- Layout and page files follow Next.js App Router conventions

### PostHog Event Tracking
When adding analytics, use the existing pattern:
```typescript
import posthog from 'posthog-js'

posthog.capture('event_name', {
  property_key: value,
})
```

### Next.js Configuration
- `skipTrailingSlashRedirect: true` is required for PostHog API requests
- Rewrites handle PostHog proxy to avoid ad blockers
- React Compiler and Turbopack experimental features are enabled
