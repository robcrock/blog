# Blog Editor: Reference

---

## Target Style

Distilled from [Maxime Heckel's blog](https://blog.maximeheckel.com/), which represents the gold standard for this kind of technical/craft writing. Use these patterns as the benchmark when reviewing posts.

### Voice & Tone

- **First-person, personal opening.** Start with why _you_ built or explored this, not with a definition. Ground the reader in your motivation before introducing the concept.
- **Conversational but precise.** Informal phrasing is fine; vague phrasing is not. "I got a bit lost" is good. "This can be tricky" is not.
- **Direct address.** Talk to the reader as "you." Anticipate their confusion and name it: "_Why would we need this?_ you may ask."
- **Short declarative sentences land key ideas.** Reserve longer sentences for context and scaffolding. The punchline gets its own sentence, often its own paragraph.
- **No em dashes.** Use parentheses for asides, colons for elaboration, semicolons for closely related clauses. Em dashes are an AI writing signal and should be absent entirely.

### Concept Introduction Sequence

Every non-trivial concept should follow this order:

1. **Why it matters** — personal motivation or real problem it solves
2. **Intuitive framing** — analogy, plain-English description, or visual metaphor
3. **Interactive demo or diagram** — show before you fully explain
4. **Technical detail** — precise definition, math, or API
5. **Code** — only after the reader already has a mental model

Flag any post that leads with code or a formal definition before establishing intuition.

### Interactive Demos

- Always introduce what the reader is about to see _before_ the demo appears.
- After the demo, tell the reader what to notice: "Notice how..." or "Try changing X and observe Y."
- Encourage experimentation: suggest what to fork or tweak.
- Never drop a demo with no surrounding prose.

### Code Blocks

- Every code block needs a prose sentence before it explaining what the code does, not just what it is.
- Inline comments should highlight the non-obvious lines, not restate what is already readable.
- After a long block, add a plain-English summary of what just happened.
- Step-by-step numbered lists work well before a large implementation block.

### Structure & Transitions

- Section headers should feel like forward momentum, not just labels. "From Pixels to a Usable Range" is better than "Normalization."
- Use "We now know X. Next, we'll Y." transitions between major sections to keep the reader oriented.
- Credit external sources organically within the prose, not in a bibliography at the end.
- Move from simple to complex progressively. Never introduce the full solution before the reader has seen the sub-problems.

### Introductions

A strong intro does all of the following:

- Opens with a personal moment or observation, not a definition
- Names exactly what the reader will learn or be able to do by the end
- Earns the reader's trust before asking for their attention

### Conclusions

- Recap the pipeline or journey in plain terms (not just "we learned X")
- Give a concrete next step or invitation to experiment
- End with forward momentum, not a summary table

### What to Flag

These patterns break the style and should be flagged in reviews:

- Post opens with a formal definition or API overview
- Code block appears with no preceding context sentence
- Demo is dropped inline without setup or follow-up observation
- Transition between sections is abrupt with no bridging sentence
- External references are missing for non-obvious claims or techniques
- Conclusion is a bullet-point summary rather than a narrative close
- Em dashes present anywhere in the prose

---

## Output Template

Use this template when writing the review to `scratch/{post-slug}-editorial-review.md`.

```markdown
# Editorial Review: {Post Title}

**Date**: {current date}
**Word Count**: {approximate word count}
**Reading Time**: {estimated minutes}

## Executive Summary

{2-3 sentence overview of the post's strengths and main areas for improvement}

## Major Issues

{List significant problems that should be addressed before publication}

## Verbosity & Conciseness

{Specific examples of wordy passages with suggested rewrites}

## Repetition & Redundancy

{Sections or ideas that are repeated unnecessarily}

## Structure & Flow

{Assessment of organization and transitions. Suggest reordering if needed}

## Technical Accuracy

{Any technical concerns, questionable claims, or code issues}

## Grammar & Style

{Grammar errors, style inconsistencies, and any deviations from the target style guide}

## Specific Line-by-Line Feedback

{Go through the document section by section with targeted suggestions}

## Strengths

{What's working well - be specific and encouraging}

## Recommendations Summary

### Must Address (High Priority)

- {item}

### Should Address (Medium Priority)

- {item}

### Nice to Have (Low Priority)

- {item}

## Overall Assessment

{Final thoughts, whether it's ready to publish, and next steps}
```
