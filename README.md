# robcrock.com

Personal website and blog built with Next.js 15, featuring MDX-based content and modern design.

## Project Structure

This project uses a clean, purpose-driven component organization:

```
src/
├── components/
│   ├── layout/              # Layout & structure components
│   │   ├── container.tsx    # Content width constraint
│   │   ├── section.tsx      # Section wrapper with spacing
│   │   └── header.tsx       # Site header with navigation
│   ├── brand/              # Branding elements
│   │   └── logo.tsx        # Theme-aware logo component
│   ├── content/            # Content-specific components
│   │   ├── post-content.tsx      # MDX content wrapper
│   │   ├── post-image.tsx        # Post images with aspect ratio
│   │   └── transformer-copy-button.tsx  # Code block copy functionality
│   ├── sections/           # Page-specific sections
│   │   └── home/          # Homepage sections
│   │       ├── article-section.tsx
│   │       ├── featured-project-section.tsx
│   │       └── profile-section.tsx
│   ├── theme/             # Theme system
│   │   ├── theme-provider.tsx
│   │   └── theme-switcher.tsx
│   └── ui/                # Reusable UI primitives (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── avatar.tsx
│       ├── aspect-ratio.tsx
│       └── skeleton.tsx
└── mdx-components.tsx     # Global MDX component mapping
```

### Component Organization Benefits

- **Better discoverability** - Components grouped by purpose
- **Logical structure** - Related components together
- **Scalable architecture** - Easy to add new content types
- **Clear separation** - Layout, content, and UI components distinct

### Important: MDX Components File Location

The `src/mdx-components.tsx` file **must** remain at the `src/` level due to Next.js conventions:

- Next.js automatically discovers this file for MDX configuration
- Required for App Router MDX integration
- Must be named exactly `mdx-components.tsx/js`
- Cannot be moved to subdirectories like `src/components/`

This file provides global component mapping for all MDX files in the application.

## Development

### Scripts
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server

### Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **UI Components**: Radix UI primitives
- **Code Highlighting**: Bright (0.8.4) with Shiki
- **Package Manager**: pnpm

## Configuration

Configuration files are organized in the `config/` directory:
- `config/components.json` - shadcn/ui configuration

## TODO

[x] create header elements
[x] create code blocks
[x] create bulleted lists
[x] Upgrade to Next15
[x] Cleaned up the Posts page
[x] Remove blog components we no longer need
[x] Reorganize component structure
[] Add link back to Posts page from the individual post
[] create images with captions
[] create quote/info sections
[] use same icon strategy as Build UI
