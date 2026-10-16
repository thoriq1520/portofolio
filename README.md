# Thoriq Fadhilah Ajiji — Portfolio

Personal software-engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS, MDX, and Motion. The first visit uses the light theme; visitors can choose and save dark mode.

## Local development

Use Node.js 22 or newer and pnpm with the existing lockfile.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Development output goes to `.next-dev`; production builds use `.next`.

## Checks

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm check:content
pnpm build
```

The content check verifies matching project data, MDX, route loaders, and cover files, as well as the amended employment periods and absence of financial amounts in project copy.

For visual changes, also check desktop, tablet, and mobile layouts; keyboard navigation; the mobile menu; saved themes; reduced motion; and content visibility with JavaScript disabled.

## Content

- `data/profile.json`: identity and description.
- `data/projects.json`: project summaries, period, role, engagement, organization, optional cover, and live URL.
- `data/projects/*.mdx`: full case studies.
- `app/projects/[slug]/page.tsx`: explicit MDX loader registry.
- `data/experience.json` and `data/skills.json`: experience and technologies.

To add a project, add its JSON entry, MDX file, and route loader together, then run `pnpm check:content`. The first four projects are featured on the homepage. Covers are optional; the featured data-platform entry uses a typographic treatment.

Project summaries describe actual contributions. Contract files, compensation, credentials, internal URLs, and research documents belong outside this repository. Obtain any applicable client permission before publicly releasing client work.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS domain **before building**, so canonical URLs, JSON-LD, robots, and sitemap point to the correct host. The local fallback is `http://localhost:3000`. `GOOGLE_SITE_VERIFICATION` is optional.

```sh
pnpm build:cloudflare
pnpm preview
```

Cloudflare Workers deployment uses OpenNext and `wrangler.jsonc`. `pnpm deploy` publishes the site; use it only when ready to release. A successful Next.js build alone does not verify the Cloudflare deployment.

The Worker name is `portofolio`, matching the connected Cloudflare Builds project. `workers_dev` is explicitly enabled so the public `*.workers.dev` address remains available.

## Visual assets

The portrait and Ruang Main screenshot were already part of this portfolio. `amc-racing.webp` is a motorcycle visual reused from the AMC Racing storefront assets; `teh-poci.png` is the outlet brand mark reused from the finance application's assets. Neither is presented as a screenshot of the application. The RailDataHub panel is typography, with no private interface or client data.

Motion uses native scrolling, CSS, and the existing Motion package. Main content is rendered visibly on the server, and reduced-motion visitors receive the static composition.
