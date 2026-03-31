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

### Content Management with Contentlayer

This project uses Contentlayer2 for type-safe MDX content management:

- **Content Directory**: All MDX posts are stored in `content/posts/`
- **Type Safety**: Contentlayer generates TypeScript types from your content
- **Build Process**: Run `pnpm contentlayer` to build content or it runs automatically during `pnpm build`
- **Frontmatter**: Posts require `title`, `topic`, `date` fields; optional `description` and `published` fields
- **Computed Fields**: Automatically generates `slug`, `url`, and `readingTime` for each post

### Craft Post Lifecycle

Every craft post follows three phases: **Development → Assets → Publishing**. This checklist ensures each post ships with the same level of polish.

#### Phase 1: Development

1. Build the interactive demo component in `src/features/craft/playgrounds/`
2. Create the MDX file at `content/craft/{slug}.mdx` with frontmatter:
   ```yaml
   ---
   title: "Your Craft Title"
   date: 2025-03-01
   description: "What this craft piece demonstrates"
   tags: ["React", "CSS"]
   published: false
   ---
   ```
3. Write up the walkthrough content in the MDX body
4. Verify on dev server (`pnpm dev`) — make sure the demo works and the page renders

#### Phase 2: Assets

Each craft card displays an autoplaying video preview with a blur placeholder that shows instantly while the video loads.

**Prerequisites:**

- [ffmpeg](https://formulae.brew.sh/formula/ffmpeg) installed (`brew install ffmpeg`)
- [Screen Studio](https://screen.studio) or any screen recorder

**Steps:**

1. **Record** a 5–10 second loop of the interaction. Export from Screen Studio as MP4 (H.264, 1080p, 30fps, high quality). The source file is just a starting point — the script handles optimization.

2. **Process** with the video script:
   ```bash
   ./scripts/process-craft-video.sh ~/path/to/recording.mp4 {slug}
   ```
   This single command generates:
   - `public/video/{slug}/preview.mp4` — H.264 fallback (Safari, older browsers)
   - `public/video/{slug}/preview.webm` — VP9 primary (Chrome, Firefox, Edge)
   - Base64 blur poster — copied to clipboard and printed as a frontmatter snippet

3. **Update frontmatter** — paste the `video` and `poster` lines the script prints:
   ```yaml
   video: "/video/{slug}/preview.mp4"
   poster: "data:image/jpeg;base64,<output from script>"
   ```

4. **Verify sizes** — the script prints file sizes. Targets: MP4 under 1.5MB, WebM under 1MB. If larger, you can increase CRF values in the script (e.g., 30 for MP4, 38 for WebM).

5. **Check rendering** — confirm the blur placeholder appears instantly on the craft card, then the video plays over it.

> **Note:** Do not commit source recordings to `public/video/` — only the processed `preview.mp4` and `preview.webm` files.

#### Phase 3: Publishing

1. Set `published: true` in frontmatter
2. Verify the craft card renders correctly on both the home page and `/craft` list
3. Deploy

#### How the video system works

The card components use a 3-tier fallback: video + blur poster → static image → placeholder with first letter. The browser automatically picks WebM over MP4 when supported. The blur poster is a base64-encoded 40px-wide JPEG that renders instantly as a blurred background while the video buffers.

<details>
<summary>ffmpeg flag reference</summary>

| Flag                   | Purpose                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `-crf 28`              | Quality level (lower = better quality, bigger file). 28 is ideal for small card previews |
| `-preset slow`         | Better compression at the cost of longer encode time                                     |
| `scale=1280:-2`        | Scales to 720p width. `-2` ensures even height (required by H.264)                       |
| `-an`                  | Strips audio track (videos are muted anyway)                                             |
| `-movflags +faststart` | Moves metadata to file start so browser can play before full download                    |
| `-pix_fmt yuv420p`     | Ensures Safari and hardware decoder compatibility                                        |
| `-b:v 0` (WebM)        | Lets VP9 use variable bitrate guided purely by CRF                                       |

</details>

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
- `pnpm storybook` - Start Storybook development server on port 6006
- `pnpm build-storybook` - Build static Storybook for deployment

### Technologies

- **Framework**: Next.js 16 (16.0.10) with App Router
- **React**: React 19 (19.2.3)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Content**: Contentlayer2 (0.5.8) with MDX
- **UI Components**: Radix UI primitives + Base UI
- **Code Highlighting**: rehype-pretty-code with Shiki 1.26.1
- **Component Development**: Storybook 10.1.10 with Vite 7
- **Package Manager**: pnpm 9.13.2

## Configuration

Configuration files are organized in the `config/` directory:

- `config/components.json` - shadcn/ui configuration

## Storybook

This project uses Storybook 10.1.10 for component development and documentation.

### Running Storybook

```bash
pnpm storybook
```

This will start the Storybook development server at `http://localhost:6006`.

### Building Storybook

To build a static version of Storybook:

```bash
pnpm build-storybook
```

The static files will be generated in the `storybook-static/` directory.

### Creating Stories

Stories are located alongside their components in `src/components/ui/`. To create a new story:

1. Create a file named `[component].stories.tsx` next to your component
2. Use the CSF (Component Story Format) 3.0 syntax
3. Export a default meta object and individual story objects

Example:

```typescript
import type { Meta, StoryObj } from "@storybook/react";

import { YourComponent } from "./your-component";

const meta = {
  title: "UI/YourComponent",
  component: YourComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your component props
  },
};
```

### Configuration

- `.storybook/main.ts` - Main Storybook configuration with Vite builder
- `.storybook/preview.tsx` - Global decorators, parameters, and theme setup

**Note**: This project uses `@storybook/react-vite` with Vite 7 for faster builds and hot module replacement.

## Content Creation

### Adding a New Blog Post

1. **Create the MDX File:**

   ```bash
   mkdir -p public/images/posts/[post-slug]
   touch content/posts/[post-slug].mdx
   ```

2. **Add Frontmatter and Content:**

   ```mdx
   ---
   title: "Your Post Title"
   topic: "Your Topic"
   date: "2024-01-01"
   description: "Optional description for SEO"
   published: true
   ---

   Your post content here...

   <PostImage src="/images/posts/[post-slug]/image.jpg" />
   ```

3. **Build Content:**
   Run `pnpm contentlayer` to generate types and build the content, or it will run automatically during `pnpm build`

4. **Add Images:**
   Place any images in `public/images/posts/[post-slug]/` and reference them using `/images/posts/[post-slug]/filename.jpg`

**Note**: Posts are automatically discovered by Contentlayer from the `content/posts/` directory. No manual listing required!

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
[] post: Ergonomic Interactions example for input with icon https://devouringdetails.com/principles/ergonomic-interactions
