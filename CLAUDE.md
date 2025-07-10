# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack on http://localhost:3000
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 personal website and blog with MDX-based content and modern design patterns.

### Key Technical Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom color system using CSS variables
- **Content**: MDX with next-mdx-remote for blog posts
- **UI Components**: Radix UI primitives wrapped in custom components
- **Code Highlighting**: Bright (0.8.4) with Shiki for syntax highlighting
- **Package Manager**: pnpm (v9.13.2)

### Project Structure

The codebase follows a clean, purpose-driven component organization:

- `src/components/` - Organized by purpose rather than type
  - `layout/` - Layout components (Container, Section, Header)
  - `brand/` - Branding elements (Logo with theme awareness)
  - `content/` - Content-specific components (PostContent, PostImage, TransformerCopyButton)
  - `sections/home/` - Homepage-specific sections
  - `theme/` - Theme system implementation
  - `ui/` - Reusable UI primitives (shadcn/ui components)

- `src/app/` - Next.js App Router pages
  - `posts/[slug]/page.mdx` - Individual blog post MDX files
  - `posts/page.tsx` - Blog listing page with posts array

- `public/images/` - Static assets (Next.js requirement)
  - `featured-projects/` - Project showcase images
  - `posts/[slug]/` - Post-specific images organized by slug

### Critical File Locations

**MDX Components**: The `src/mdx-components.tsx` file **must** remain at the `src/` level. This is a Next.js convention that cannot be changed - the framework automatically discovers this file for MDX configuration.

### Adding Content

**New Blog Post**:
1. Create directory: `src/app/posts/[slug]/`
2. Add MDX file: `src/app/posts/[slug]/page.mdx` with metadata export:
   ```mdx
   export const metadata = {
     title: "Your Post Title",
     topic: "Category/Topic",
     date: "YYYY-MM-DD",
     slug: "url-slug"
   };
   
   # Your Post Title
   ```
3. Add images to: `public/images/posts/[slug]/`
4. Posts are automatically discovered from metadata export (no manual updates needed)

**New Featured Project**:
1. Add image to: `public/images/featured-projects/`
2. Update projects array in: `src/components/sections/home/featured-project-section.tsx`

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)

### Theme System
The project uses a custom theme system with CSS variables defined in `src/app/globals.css`. Theme switching is handled by next-themes with components in `src/components/theme/`.

### shadcn/ui Configuration
Located in `config/components.json`, using the "new-york" style with Radix UI components.