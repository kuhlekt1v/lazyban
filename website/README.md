# Lazyban Website

Official landing page for Lazyban, built with [Astro](https://astro.build/).

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Deployment

This site is designed to be deployed to Azure Static Web Apps with custom domain support.

### Build Configuration

- **Build command**: `pnpm run build`
- **Output directory**: `dist`
- **Node version**: 16+

## Features

- ⚡ Fast page loads with Astro's static site generation
- 🎨 GitArbor-inspired design with Lazyban brand colors
- 📱 Fully responsive design
- ♿ Accessible markup and ARIA labels
- 🔍 SEO optimized with meta tags
- 🚀 High Lighthouse scores

## Project Structure

```
website/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # Route pages
│   │   └── index.astro
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Customization

Colors and styles are defined in CSS custom properties in `src/layouts/Layout.astro`.
