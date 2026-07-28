# Roofline Partners Design Specification

**Date**: 2026-07-28
**Status**: Foundation
**Author**: AI Agent (opencode)

## Brand Identity

**Roofline Partners** is a premium roofing company positioning itself as the trusted choice for residential and commercial roofing projects. The brand communicates craftsmanship, reliability, and quality.

## Target Audience

- Homeowners (25-65) considering roof repair, replacement, or maintenance
- Property managers and commercial building owners
- Geographic focus: Local/regional service area (to be defined)

## Pages & Content Structure

### Homepage (`/`)

- Hero section with brand name, tagline, and dual CTAs
  - "Request a Consultation" → `/contact`
  - "View Services" → `/services`
- Brief trust signals (years in business, projects completed)
- Featured services preview

### Services (`/services`)

- Residential roofing overview
- Commercial roofing overview
- Repair vs replacement guidance
- Service area information

### Packages (`/packages`)

- Tiered service packages (basic, standard, premium)
- What's included in each tier
- Call-to-action on each package

### About (`/about`)

- Company story and values
- Team information
- Certifications and warranties

### Contact (`/contact`)

- Lead capture form (name, email, phone, message)
- Business contact information
- Service area map (future)

## Lead Capture Form

### Fields

| Field   | Type     | Required | Validation            |
| ------- | -------- | -------- | --------------------- |
| Name    | text     | Yes      | Trimmed, non-empty    |
| Email   | email    | Yes      | Valid email format    |
| Phone   | tel      | No       | Phone format (future) |
| Message | textarea | Yes      | Trimmed, non-empty    |

### Processing

1. Client-side validation before submission
2. Server-side sanitisation (`stripHtml`)
3. Server-side validation (`isLeadValid`)
4. Store in Supabase `leads` table
5. Send notification via Resend
6. Log analytics event
7. Show success/error message to user

## SEO Requirements

### Metadata (all pages)

- Title: `{Page} | Roofline Partners`
- Description: Unique per page
- Open Graph: title, description, image, type, locale, site name
- Twitter Card: summary_large_image
- JSON-LD: Organization + Service schemas

### Assets

- **Favicon**: Self-generated SVG-based favicon (no external assets)
- **OG Image**: Generated at build time or static (to be created)
- **Fonts**: Geist Sans + Geist Mono (Next.js built-in, no external font loading)

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Roofline Partners",
  "url": "https://rooflinepartners.com",
  "logo": "/logo.svg",
  "sameAs": []
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Roofing",
  "provider": {
    "@type": "Organization",
    "name": "Roofline Partners"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {},
    "geoRadius": "50 mi"
  }
}
```

## Content Configuration

Content (packages, testimonials, service descriptions) should be configurable without code changes. Options:

1. **JSON configuration files** in `src/config/` (simplest, foundation approach)
2. **Supabase CMS tables** (full CMS, future)
3. **Headless CMS integration** (future)

Recommended approach for Milestone 3: JSON config files with a simple loader.

## Analytics

Events to track:

- Page views (all routes)
- Form submissions (success/failure)
- CTA clicks (Consultation, Services)
- Package views

Implementation: Lightweight analytics event logger → future integration with analytics provider.

## Asset Policy

### Allowed

- Self-generated SVGs (logo, icons, favicons)
- CSS-based visual elements
- Next.js built-in fonts (Geist)
- Generated OG images (static or @vercel/og)

### Not Allowed

- Unlicensed stock photos
- Third-party fonts from external CDNs
- External SVGs without license verification
- Any asset with unclear licensing

### Replacement Locations

Brand assets should be placed in:

- `src/app/icon.svg` — App Router favicon
- `public/logo.svg` — Primary logo
- `public/og-image.png` — Open Graph image (1200x630)
- `public/` — Other static assets

## Admin Capability Seam

No full admin dashboard in v1. Instead:

- Direct database access via Supabase dashboard for lead management
- Server actions with admin authentication for future dashboard
- CSV export capability for leads (future)

## Responsive Design

- Mobile-first approach with Tailwind CSS breakpoints
- Target: 320px minimum width
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
