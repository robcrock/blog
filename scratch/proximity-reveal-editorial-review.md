# Editorial Review: Proximity Reveal

**Date**: 2026-03-01
**Word Count**: ~760 prose / ~1,100 total with code
**Reading Time**: ~5 minutes

---

## Executive Summary

This is a well-crafted piece with a strong narrative voice and excellent progressive structure. The hook is immediately engaging, the section titles are memorable, and the closing lands nicely. Two issues need attention before publication: a factual mismatch between the throttle duration in prose and in the hook's default, and a silent shift from "blur and scale" (described in the intro) to "blur and translateY" (what the component actually does).

---

## Major Issues

### 1. Throttle duration mismatch (High)

The "Making It Performant" section says:

> "throttling to 16–32ms (roughly 30–60 measurements per second) is plenty."

But the hook at the bottom defaults to `throttleDuration = 500`, which is 500ms — an order of magnitude higher and noticeably laggy. A reader who copies the hook as-is will get a sluggish effect that contradicts the advice just given. Either change the default to `16` or `32`, or add a note explaining the discrepancy.

### 2. "Blur and scale" vs. "blur and translateY" (High)

The frontmatter description says "blur, scale, and opacity." The intro says "The image above uses blur and scale." But the actual effect (and the hook code values) maps distance to `blur` and `translateY`. Scale doesn't appear anywhere in the implementation. This will confuse readers who try to connect the description to the code. Fix the intro to say "blur and vertical offset" (or whatever the accurate properties are).

---

## Verbosity & Conciseness

The prose is tight throughout. No passages flag as unnecessarily long.

One minor trim opportunity — the second paragraph front-loads a list that slightly delays the payoff:

> "cards that tilt toward your cursor, backgrounds that shift in parallax, elements that glow as you approach."

This is fine, but the sentence that follows ("They all share the same DNA.") does the real work. Both are good; the list is not excessive.

---

## Repetition & Redundancy

The phrase "the single value that drives the blur effect at the top of this page" (after the triangle playground) echoes the same idea already established in the intro. It's a light callback rather than true repetition — acceptable, possibly intentional. No action needed.

---

## Structure & Flow

The structure is excellent: interactive demo → question → geometry → normalization → performance → hook → payoff. Each section earns the next.

One small friction point: the "Collapsing It Into a Hook" section introduces a hook that returns `[mousePosition, boundingBox]`, but never explicitly shows how to get from those values back to `distance`. A reader following along would need to call `getDistanceBetweenPoints({ x: mousePosition.x, y: mousePosition.y }, { x: 0, y: 0 })` — but that connection isn't drawn. One sentence bridging the hook's output to the earlier pipeline would close this loop.

---

## Technical Accuracy

- **Throttle default**: See Major Issue #1.
- **blur and scale**: See Major Issue #2.
- **`clamp`, `normalize`, `clampedNormalize` code**: Syntactically valid. The logic is correct.
- **`getDistanceBetweenPoints`**: Correct Pythagorean implementation. No issues.
- **Hook code**: Valid TypeScript. The `useMemo` wrapping `throttle` is correct. `throttleDuration = 500` is the only concern.
- **Frontmatter tags**: Tags include "JavaScript" but all code examples are TypeScript. Low priority, but worth aligning.

---

## Grammar & Style

No grammar or spelling errors found. Tone is consistent throughout — informal but precise, second-person, present tense. The occasional one-sentence paragraph ("Pythagorean theorem. Possibly the most useful thing you retained from high school.") fits the voice well.

---

## Specific Line-by-Line Feedback

**Intro, paragraph 1**: Strong. "It _lifts_, gradually" is exactly the right word. No changes.

**Intro, paragraph 2**: "The image above uses blur and scale." — update to match actual implementation (see Major Issue #2).

**"Relative Position"**: Clean. The code snippet illustrates exactly what the prose describes.

**"The Triangle You Forgot You Knew"**: Best section title in the post. The playground transition ("This is easier to _see_ than to read.") is excellent.

**After the playground**:
> "When you're close, the distance is small, so the blur is low and the scale is high."

"Scale" again — should be "translateY" or "vertical offset."

**"From Pixels to a Usable Range"**: The three-function block is long but necessary. The summary that follows ("That's the entire pipeline: measure the bounding rect, compute the distance, normalize it, and map the result to a CSS property. Three functions and some arithmetic.") is a satisfying close to the section.

**"Making It Performant"**: Good. The framing of "the cursor position itself updates freely—it's cheap" is a nice concrete distinction. The 16–32ms claim needs to match the hook default.

**"Collapsing It Into a Hook"**: The section opening ("Everything above—the rect measurement, the throttling, the relative coordinate math—collapses into a single reusable hook") is a strong setup. The hook itself is well-annotated in the surrounding prose. Missing: one sentence showing how to recover `distance` from the hook's return values.

**Closing (italicized)**:
> "What felt like a simple blur effect is actually a small pipeline: a bounding rect, a right triangle, a square root, a normalization, and a CSS property."

This is good. "Five steps between your cursor and that gradual reveal" is a satisfying final beat. No changes.

---

## Strengths

- The interactive-first opening ("Hover over the image above. Not quickly—slowly.") immediately earns reader attention.
- Progressive complexity is handled exceptionally well — each section adds exactly one concept.
- The section title "The Triangle You Forgot You Knew" is memorable and earns the Pythagorean callback.
- The closing retraces the pipeline in plain language — a technique that rewards readers who made it through.
- The prose-to-code ratio is well-balanced; no section dumps unexplained code.
- The description is punchy and would work well in search results: "turning a binary hover into a continuous, spatial interaction" is precise and distinctive.

---

## Recommendations Summary

### Must Address (High Priority)

- **Fix throttle default**: Change `throttleDuration = 500` in the hook to `16` or `32`, or annotate the discrepancy with a note.
- **Fix "blur and scale"**: Update all references to the effect's CSS properties to match the actual implementation (blur + translateY, not blur + scale).
- **Remove Ripple Button reference**: The link to `/craft/ripple-button` in the intro ("The [ripple button](/craft/ripple-button) in the next post uses click position.") references a post that doesn't exist yet. Remove or rewrite the sentence until that post is published.

### Should Address (Medium Priority)

- **Bridge hook to distance**: Add one sentence after the hook showing how to derive `distance` from the returned `mousePosition` values.

### Nice to Have (Low Priority)

- Update the frontmatter `tags` array to use "TypeScript" instead of "JavaScript."

---

## Overall Assessment

Ready to publish after the two Must Address items are resolved. The writing is genuinely good — clear structure, confident voice, no filler. The technical content is accurate except for the two factual mismatches flagged above, both of which are quick fixes. Once those are corrected, this is a strong piece.
