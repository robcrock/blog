---
name: blog-editor
description: Performs comprehensive editorial review of technical blog posts for robcrock.com. Use when asked to review, edit, proofread, or give feedback on an MDX or markdown post, or when the user invokes the blog-editor skill.
---

# Blog Editor

Reviews technical blog posts across content quality, technical accuracy, writing style, and blog-specific concerns. Produces a structured review document in the `scratch/` directory.

## Workflow

1. Read the specified post (file path provided by user)
2. Analyze across all dimensions below
3. Write the review to `scratch/{post-slug}-editorial-review.md` using the [output template](reference.md)
4. Tell the user where the review was saved and summarize the main findings

## Analysis Dimensions

### Content
- **Verbosity**: Flag wordy passages with suggested rewrites
- **Repetition**: Find duplicate ideas or circular reasoning
- **Flow**: Evaluate transitions between sections
- **Structure**: Assess logical order; suggest reordering if needed
- **Length**: If > 3000 words, assess whether it could be split or condensed

### Technical Accuracy
- **Code examples**: Verify syntax, best practices, and explanation
- **Technical claims**: Flag questionable statements
- **Terminology**: Check for correct, consistent usage
- **API/Library usage**: Verify referenced APIs are used correctly

### Writing Quality
- **Grammar & spelling**: Catch errors spell-checkers miss (e.g., "affect" vs "effect")
- **Em dashes (`—`)**: Flag every instance. Replace with a colon, comma, semicolon, or parentheses depending on context. Em dashes are a known AI writing signal and must be removed entirely.
- **Tone**: Ensure consistent voice throughout
- **Clarity**: Flag confusing sentences with suggested rewrites
- **Active voice**: Prefer active; flag excessive passive constructions

### Blog-Specific
- **Frontmatter**: Verify title, description, date, and tags are appropriate
- **Introduction**: Does it hook the reader?
- **Conclusion**: Does it close satisfyingly with next steps?
- **Links**: Check for broken or unpublished references; verify link text is descriptive
- **SEO**: Is the description compelling for search results?

### Engagement
- **Reader value**: Is the takeaway clear?
- **Pacing**: Does interest hold throughout?
- **Actionability**: For tutorials, can readers follow along?

## Calibration

Weight issues by impact on a developer reader, not editorial perfectionism. Conversational tone, intentional passive voice, and informal phrasing are not problems if consistent.

Recommendations Summary rules:
- Posts with no major structural problems should have 3 or fewer Must Address items. If every section yields a high-priority item, recalibrate.
- Only include Should Address / Nice to Have items with clear reader benefit
- If a section has no issues, write "No issues found" rather than manufacturing feedback

## Failure Modes to Avoid

- **Over-flagging style**: Consistent fragments, passive voice, or informal tone are not errors
- **Inventing problems**: Write "No issues found" for clean sections; do not manufacture feedback to seem thorough
- **Generic feedback**: Every comment must quote specific text and suggest a concrete rewrite
- **Scope creep**: Improve what's there; do not redesign the post's structure or thesis
- **Inconsistent depth**: Calibrate note count to actual issue density, not a target number
