# MDX post

A published post renders its title, body, and highlighted code. Code blocks offer a copy button.

## Sub-features

- `post-open` shows the post title and the way back to the index.
- `post-code` shows the CSS sample for hiding scrollbars.
- `post-copy` exposes a button named Copy code on each highlighted block.

## How to get to it (user POV)

- Open `/posts` and choose Hiding Scrollbars in Tailwind.
- Open `/posts/hiding-scrollbars-in-tailwind` directly.

## Driving it with verify-robcrock

Preconditions:

- `doctor` prints `"ok": true`.
- The post Hiding Scrollbars in Tailwind is published.

- **Open the post.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs screenshot /posts/hiding-scrollbars-in-tailwind --theme light --out .cursor/skills/verify-robcrock/artifacts/mdx-post/light.png`. The PNG shows the heading Hiding Scrollbars in Tailwind.
- **Read the code.** Run `node .cursor/skills/verify-robcrock/verify-robcrock.mjs snapshot /posts/hiding-scrollbars-in-tailwind --out .cursor/skills/verify-robcrock/artifacts/mdx-post/post.aria.yml`. The YAML contains the heading, the text `scrollbar-hidden`, a button named `Copy code`, and a link back to `/posts`.
- **Proof.** Keep both files. The snapshot is the code a reader can see and the copy button next to it.

## Gotchas

- The CLI does not click Copy code. The proof that the control exists is the button in the accessibility tree. Do not claim the clipboard changed unless you watched it outside this CLI.
- The code fence uses the `copy` directive in the MDX. The reader-facing name of the button is Copy code, then Copied! after a successful click.
- This post is the code-block sample. Other posts can omit a fence. Do not point this recipe at a different slug and call the same check passed.
