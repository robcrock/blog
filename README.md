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

public/
└── images/                 # Static assets (Next.js requirement)
    ├── avatar.png         # Global assets
    ├── featured-projects/ # Organized by feature
    │   ├── bookmark_landing_page.png
    │   ├── room_homepage.png
    │   └── [other project images]
    └── posts/             # Organized by post
        └── hiding-scrollbars-in-tailwind/
            ├── image_00.jpg
            └── image_01.jpg
```

### Component Organization Benefits

- **Better discoverability** - Components grouped by purpose
- **Logical structure** - Related components together
- **Scalable architecture** - Easy to add new content types
- **Clear separation** - Layout, content, and UI components distinct

### Asset Organization

Static assets must be in the `public/` directory due to Next.js requirements:

- **Next.js Static Assets**: Only files in `public/` are served as static assets
- **Build Process**: Next.js optimizes and serves these files at build time
- **Hot Reloading**: Dev server watches `public/` for changes
- **Deployment**: Static assets are deployed to CDN/edge locations

**Organization Strategy:**
- `public/images/featured-projects/` - Project showcase images
- `public/images/posts/[slug]/` - Post-specific images
- `public/images/` - Global assets (avatar, icons, etc.)

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

## Content Creation

### Adding a New Blog Post

1. **Create Post Directory Structure:**
   ```bash
   mkdir -p src/app/posts/[post-slug]
   mkdir -p public/images/posts/[post-slug]
   ```

2. **Create the MDX File:**
   ```bash
   touch src/app/posts/[post-slug]/page.mdx
   ```

3. **Add Post Content:**
   ```mdx
   # Your Post Title
   
   Your post content here...
   
   <PostImage src="/images/posts/[post-slug]/image.jpg" />
   ```

4. **Add Post to Listing:**
   Update `src/app/posts/page.tsx` to include your new post in the `posts` array:
   ```typescript
   {
     slug: "your-post-slug",
     title: "Your Post Title",
     topic: "Your Topic",
     date: "2024-01-01",
   }
   ```

5. **Add Images:**
   Place any images in `public/images/posts/[post-slug]/` and reference them using `/images/posts/[post-slug]/filename.jpg`

### Adding a New Featured Project

1. **Add Project Images:**
   Place project images in `public/images/featured-projects/`

2. **Update Featured Projects:**
   Edit `src/components/sections/home/featured-project-section.tsx` and add your project to the `projects` array:
   ```typescript
   {
     title: "Your Project Title",
     description: "Project description...",
     tags: ["Next.js", "Tailwind", "TypeScript"],
     image: "/images/featured-projects/your-project-image.png",
     link: "https://your-project-link.com",
   }
   ```

### Asset Guidelines

- **Image Formats**: Use `.png` for UI screenshots, `.jpg` for photos
- **Naming Convention**: Use lowercase with hyphens (e.g., `my-project-image.png`)
- **Organization**: Group related images in appropriate subdirectories
- **Optimization**: Consider image optimization for web (WebP, appropriate sizing)

## TODO

[x] create header elements
[x] create code blocks
[x] create bulleted lists
[x] Upgrade to Next15
[x] Cleaned up the Posts page
[x] Remove blog components we no longer need
[x] Reorganize component structure
[x] Reorganize asset structure for better maintainability
[] Add link back to Posts page from the individual post
[] create images with captions
[] create quote/info sections
[] use same icon strategy as Build UI
