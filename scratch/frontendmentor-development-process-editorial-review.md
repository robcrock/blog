# Editorial Review: My Frontend Mentor Development Process

**Date**: 2026-03-01
**Word Count**: ~600 prose (excluding code blocks)
**Reading Time**: ~3 minutes
**Status**: Published — but contains draft content

---

## Executive Summary

This post is published but is unfinished. It contains placeholder image references, incomplete sections with no content, a broken opening sentence, and multiple typos. It reads as a working draft that was published accidentally. The content in the sections that are complete is useful, but the post should be unpublished immediately and finished before going back live.

---

## Major Issues

### 1. Post is published with placeholder content (Blocking)

Three sections contain image reference placeholders that appear verbatim in the rendered post:

```
-- REFERENCE THE post-001 image add-new-vercel-project
-- REFERENCE THE post-001 image click-deploy
-- REFERENCE THE post-001 image deployment-celebration
```

These are author notes, not content. They will appear as raw text to readers.

### 2. Two sections have no content (Blocking)

**"## Polish: Refine Spacing, Fonts, and Colors"** — heading only, no body.

**"## Publish: Count It ✅"** — heading only, no body.

Both sections must be written or removed before publication.

### 3. Opening sentence is incomplete (Blocking)

> "The advice given by FrontendMentors"

This sentence ends with no predicate and is followed immediately by a numbered list. It reads as a heading that was accidentally formatted as a paragraph. Rewrite with a proper intro or delete the fragment and let the numbered list stand with a real introduction above it.

---

## Verbosity & Conciseness

**"Initial Setup" is verbose in patches:**

> "Now we will create a repo with with a bunch of code that we'll need to clear out later, but also sets us up for success. I am not trying to change my stack every month."

The double "with with" is a typo. The aside about not changing stacks monthly is relevant but buried. Either give it its own sentence or trim.

> "Because this tech stack is so heavily used we benefit from a great developer experienct."

Typo: "experienct" → "experience". The sentence is also vague — "heavily used" by whom? A brief concrete claim ("the tooling is mature and well-documented") would be stronger.

**"Design: Align the Styles with Tailwind"** — two sentences, no detail. Expand or cut the section entirely.

---

## Repetition & Redundancy

The numbered setup list at the top of the post partially overlaps with the detailed walkthrough in "## Initial Setup." This creates the impression that the list is a summary, but it's never framed as one. Label the list explicitly as "Overview" or cut it and incorporate the steps into the detailed sections.

---

## Structure & Flow

The overall structure (Setup → Deployment → Clear Boilerplate → Add Assets → Design → Development → Polish → Publish) is logical and matches a real workflow. The problem is execution:

- The sections that are fleshed out (Initial Setup, First Deployment, Clear Out the Boilerplate) are useful step-by-step instructions.
- The sections that aren't (Design, Development, Polish, Publish) create a hard stop. Readers who reach "## Polish" get a heading and nothing else.

**"## Development: Bring the Layout to Life"** is two paragraphs and three React documentation links. This section has potential — the "understand your UI as a tree" framing is a good lens — but it stops before offering any concrete guidance.

---

## Technical Accuracy

- **`npx shadcn-ui@latest init`**: The `shadcn-ui` package name is outdated. The current CLI is `npx shadcn@latest init`. Update.
- **Font setup code**: The `Inter as FontSans` pattern matches older Next.js App Router patterns but still works. Not wrong, but may feel dated to readers on newer Next.js versions.
- **`fontFaimly`**: Typo in prose ("Update the `theme.extend.fontFaimly`") — should be `fontFamily`. The code block itself is correct.
- **`globals.cc`**: Not present in this post, but note for reference — check other posts for this typo (it appears in the Hiding Scrollbars post).
- **Prettier config**: The config shown (`{ "plugins": ["prettier-plugin-tailwindcss"] }`) is correct.

---

## Grammar & Style

Multiple errors:

| Location | Error | Fix |
|---|---|---|
| Opening sentence | "The advice given by FrontendMentors" | Complete the sentence or delete |
| Para 2 | "with with a bunch of" | Remove duplicate "with" |
| Para 2 | "developer experienct" | "experience" |
| Para 2 | "I am not trying to" | "I don't want to" (informal voice) |
| Para 3 | "Because this tech stack is so heavily used we benefit" | Add comma: "...used, we benefit" |
| Step list | "sttarter content" | "starter content" |
| Step list | "fontFaimly" | "fontFamily" |
| Step 6 note | "like it make sense" | "makes sense" |
| First Deployment | "create to repo" | "create the repo" |
| Clear Boilerplate | "FrontendMento" | "Frontend Mentor" |
| Step list item 7 | Numbered twice as "7." | Renumber |

---

## Specific Line-by-Line Feedback

**Opening**: Delete "The advice given by FrontendMentors" and replace with a real introduction. Why does your process matter? What does this post teach the reader that generic tutorials don't?

**The numbered overview list**: Label it "Overview" and keep it, or cut it. Right now it floats without context.

**Initial Setup → Scaffold the New Repo**: The shell commands are clean and correct. The stack list with links is a useful quick reference.

**First Deployment**: Useful steps, but the three image placeholders block the section. Replace with actual images or rewrite the steps as prose until images are available.

**Clear Out the Boilerplate**: The three-step list is clear and complete. No issues.

**Add Starter Code and Assets**: Step 7 appears twice (numbered as "7" for both "Optional: Add Attribution component" and "Make a commit"). Renumber.

**Attribution component code**: The component itself is fine and useful. Consider whether it belongs in the post body or a collapsible section — it's a digression from the main workflow.

**Design section**: Two sentences. Write this section or remove the heading.

**Development section**: Good lens (UI as tree, props, purity), but it needs at least one paragraph of concrete guidance, not just links.

**Polish and Publish**: Both are empty. Write them or delete them.

---

## Strengths

- The "Initial Setup" section is the best part of the post — clear, step-by-step, with working shell commands.
- The Attribution component is a useful copy-paste resource.
- The overall workflow structure matches how experienced developers actually approach these projects.
- Cross-links to React documentation are appropriate and well-chosen.

---

## Recommendations Summary

### Must Address (Blocking — unpublish until resolved)

- **Remove the three image placeholder strings** or replace with actual images.
- **Write or delete the empty sections**: Polish, Publish, Design (current version has 2 sentences).
- **Fix the broken opening sentence**.
- **Fix `npx shadcn-ui@latest` → `npx shadcn@latest`**.

### Should Address (Medium Priority)

- Fix all typos listed in the Grammar table above.
- Label the opening numbered list as "Overview" or integrate it into the intro.
- Expand "Development: Bring the Layout to Life" beyond documentation links.
- Renumber the duplicate step 7 in "Add Starter Code and Assets."

### Nice to Have (Low Priority)

- Add a personal opening: why do you have a documented process? What was the cost of not having one?
- Consider whether the Attribution component code belongs in the main flow or a sidebar.

---

## Overall Assessment

Unpublish immediately. This post has the bones of something useful — a real documented workflow with working commands — but it's not finished. The placeholder content, missing sections, and broken opener will damage credibility with any reader who finds it. Finish the empty sections, replace the image placeholders, and fix the typos before re-publishing.
