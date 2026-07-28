# Melbourne Residential Builder Website

A production-ready foundation for a bilingual English / Simplified Chinese residential builder website. It uses Next.js App Router, TypeScript, Tailwind CSS, `next-intl`, Sanity Studio, typed GROQ queries and safe local fallback content.

## What is included

- Locale-prefixed English and Chinese routes (`/en` and `/zh`)
- Responsive, keyboard-accessible header, mobile navigation and language switcher
- Homepage, projects, project detail, services, about and contact pages
- Embedded Sanity Studio at `/studio`
- Localized Sanity field types with English fallback
- Project, service, testimonial, page and singleton site-settings schemas
- Typed, field-specific GROQ queries with CDN-backed published-content reads
- Project category and status filtering
- Address privacy: suburb-only display unless full-address publishing is explicitly enabled
- Locale and project metadata, canonical links, hreflang alternates, sitemap, robots and JSON-LD
- A visual-only contact form prepared for later Zod validation and Resend delivery

No real contact details, licence number, ABN, awards, testimonials or production content are invented. Safe generic fallbacks keep the site usable before Sanity is connected.

## Requirements

- Node.js 20.9 or newer
- npm
- A Sanity account and project for live CMS content

## Local setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open:

- Website: [http://localhost:3000/en](http://localhost:3000/en)
- Chinese website: [http://localhost:3000/zh](http://localhost:3000/zh)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

If Sanity is not configured, the public website uses safe local fallback content and `/studio` shows connection instructions.

## Environment variables

Create `.env.local` from `.env.local.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute production URL used by canonical links, sitemap and JSON-LD. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes for CMS | Project ID shown in the Sanity project dashboard. Safe for browser use. |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes for CMS | Dataset name, normally `production`. Safe for browser use. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes for CMS | Fixed API date used by Sanity queries. |
| `SANITY_API_READ_TOKEN` | Optional | Server-only token for private datasets or future preview mode. Never prefix with `NEXT_PUBLIC_`. |

Never commit `.env.local` or a real read token.

## Connect Sanity

1. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage), or use an existing project.
2. Copy its project ID into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Create or select the `production` dataset and set `NEXT_PUBLIC_SANITY_DATASET`.
4. Add `http://localhost:3000` to the project's CORS origins for local Studio access. Add the final production origin after deployment.
5. Restart `npm run dev` and open `/studio`.
6. Sign in with a Sanity account that has access to the project.
7. Open **Site Settings** and enter the real company identity, contact details, service areas, licence and ABN where applicable.
8. Open **Project**, create the first project, complete all required English fields and upload the cover image. Chinese fields can be added immediately or later.
9. Review image alternative text and the **Show full address publicly** option before publishing.
10. Click **Publish**. Published content appears on the website after the short cache interval.

To invite the company owner, open the Sanity project dashboard, go to project members, invite their email address and grant an editor-appropriate role. They can then manage content at `/studio` without touching code.

The singleton Studio structure always opens the document ID `siteSettings`, and duplicate/delete actions are removed for that document.

## Content fallback behaviour

- Chinese fields fall back to English when no Chinese value exists.
- Missing CMS configuration uses generic local development examples.
- A connected CMS with no published content shows graceful empty states.
- Full project addresses stay private unless `showFullAddress` is explicitly enabled.
- Missing contact details show editor guidance instead of fake phone numbers or email addresses.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the `builder-website` directory as a new Vercel project.
3. Add the production environment variables from `.env.local.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Deploy.
6. Add the production domain to Sanity's CORS origins.
7. Confirm `/en`, `/zh`, `/studio`, `/robots.txt` and `/sitemap.xml`.

Published reads use Sanity's CDN. The optional read token remains server-only.

## Main architecture

- `src/app/[locale]`: shared locale-aware routes and page layouts
- `src/components`: reusable layout, project, service and UI components
- `src/i18n`: locale routing and navigation helpers
- `src/messages`: static English and Chinese interface strings
- `src/sanity/schemaTypes`: modular Sanity document and object schemas
- `src/sanity/lib`: client, image builder, fallbacks and typed queries
- `sanity.config.ts`: embedded Studio configuration
- `proxy.ts`: locale routing for Next.js 16+

Server Components are the default. Client Components are limited to mobile navigation, language switching and project filtering.

## Planned next phase

Recommended next task: connect the real Sanity project, enter verified company content and replace local architectural placeholders with approved project photography.

Future work:

- Resend contact form through a Server Action or Route Handler
- Cloudflare Turnstile
- Rate limiting
- Sanity Visual Editing
- Draft preview
- Google Analytics
- Google Search Console
- Google Maps
- Domain API investigation
- CRM integration
