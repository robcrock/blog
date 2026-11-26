# Posts index

The posts index lists published writing. Each row opens that post.

## Sub-features

- `posts-list` shows every published post title.
- `posts-open` exposes a link to each post.
- `posts-back` offers a way back toward home.

## How to get to it (user POV)

- Open `/posts`.
- The home page does not link to `/posts`. Type the path or follow a link from a post.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.
- Published posts include Hiding Scrollbars in Tailwind and My Frontend Mentor Development Process.

- **Open the index.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot /posts --theme light --out .cursor/skills/verify-robcrock/artifacts/posts-index/light.png`. The PNG shows the heading Posts and both published titles.
- **Read the list.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs snapshot /posts --out .cursor/skills/verify-robcrock/artifacts/posts-index/list.aria.yml`. The YAML contains `Posts`, `Hiding Scrollbars in Tailwind`, `My Frontend Mentor Development Process`, and a link to `/posts/hiding-scrollbars-in-tailwind`.
- **Proof.** Keep both files. The titles in the snapshot are the list a reader can open.

## Gotchas

- The back link is named with the text Back to home and points at `/#posts`. The home page has no element with id `posts`, so the browser opens `/` and does not scroll to a posts section.
- An empty list would show No posts yet. This checkout has published posts. Do not unpublish them to see the empty copy.
- The accessible name of a post link includes the topic, reading time, and title. Match the title text. Do not require the name to be the title alone.
