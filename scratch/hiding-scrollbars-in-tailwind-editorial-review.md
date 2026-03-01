# Editorial Review: Hiding Scrollbars in Tailwind

**Date**: 2026-03-01
**Word Count**: ~450 prose
**Reading Time**: ~2 minutes
**Status**: Published

---

## Executive Summary

A useful, focused post with a clear problem-solution structure. The TL;DR pattern is a nice reader-friendly touch. Two issues need attention: a typo in the TL;DR that will break reader trust ("globals.cc" instead of "globals.css"), and a conclusion that falls back on generic developer-wisdom framing rather than closing with something specific. Otherwise, the post is in good shape.

---

## Major Issues

### 1. Typo in TL;DR: "globals.cc" (High)

The TL;DR opens with:

> "Add this utility class to your `globals.cc` file."

This should be `globals.css`. It's the very first line after the heading. Readers following the TL;DR path will be confused immediately, and readers who spot it will lose confidence in the rest of the post.

---

## Verbosity & Conciseness

**"The Solution: Custom Utility Class"** restates the code already shown in the TL;DR verbatim. The second appearance is warranted for structure, but the explanatory paragraph that follows is overwritten:

> "Don't worry if this looks complicated! It's doing something simple: creating a new class called scrollbar-hidden that you can use just like any other Tailwind class. The code looks complex because different web browsers need different instructions to hide scrollbars. Once you add this code, you can simply add scrollbar-hidden to any element where you want to hide the scrollbar while keeping the scrolling functionality."

This is three sentences too long. The code is not complicated. The over-reassurance reads as condescending and is a well-known AI writing signal. Cut it to: "The three blocks handle Chrome/Safari, Firefox, and IE/Edge separately — browser inconsistency, not complexity."

**"Why This Matters"** is a useful list, but item 4 ("Better understanding of the underlying CSS") is filler — it's an argument for doing anything yourself, not specific to this technique.

---

## Repetition & Redundancy

The solution code appears twice (TL;DR and "The Solution" section) — this is intentional and fine. But the explanatory prose covers the same ground twice as well:

- "This approach introduces an unnecessary dependency for what turns out to be a straightforward CSS solution." (paragraph 1 after The Quick Fix)
- "taking a moment to understand the problem often leads to a simpler solution" (Conclusion)

Pick one and cut the other.

---

## Structure & Flow

**The TL;DR works.** Opening with the answer is a strong choice for this kind of practical post. Readers who just want the code get it immediately; readers who want context keep reading.

**Problem → Quick Fix → Better Approach → Solution → Why → Conclusion** is the right shape. No reordering needed.

**"The Quick Fix vs The Right Solution"** sets up a false dichotomy: the "quick fix" plugin does solve the problem. The framing implies it's wrong to use it, but the author's actual argument is about dependency hygiene, which is a softer point. Consider: "The Plugin Solution vs. The Native Solution" — more accurate, less judgmental.

**The Conclusion is generic.** "Sometimes installing a package seems like the quickest fix, but taking a moment to understand the problem often leads to a simpler solution." This is true of every programming problem. The conclusion should say something specific about scrollbars, Tailwind's @layer utilities, or when you'd reach for this pattern again. The current ending reads as padding.

---

## Technical Accuracy

- **`globals.cc` in TL;DR**: Typo, should be `globals.css`. (See Major Issue #1.)
- **CSS selectors**: `::-webkit-scrollbar { display: none }`, `scrollbar-width: none`, `-ms-overflow-style: none` — all correct for their respective browsers.
- **`@layer utilities`**: Correct pattern for Tailwind v3. Works in Tailwind v4 too.
- **"Tailwind v3.4.13"**: Version-pinning the solution is useful, but could make the post feel dated. Consider dropping the specific version and saying "Tailwind v3 and v4."
- **`tailwind-scrollbar-hide` claim**: The author says the plugin "introduces an unnecessary dependency." This is accurate as written but could be read as a general statement against all utility plugins. Worth clarifying the scope.
- **Link to Subframe article**: The link text in the body is "a great article by Subframe called Hide your scrollbars but still scroll with Tailwind." This is descriptive. Good. The conclusion link "check out the complete Subframe article" is less descriptive — use the article title.

---

## Grammar & Style

| Location | Error | Fix |
|---|---|---|
| TL;DR | "globals.cc" | "globals.css" |
| Solution section | "Don't worry if this looks complicated!" | Rewrite (see Verbosity) |
| Conclusion | "If you're curious about other ways..." | The link text "complete Subframe article" should use the article title |

No em dashes. No grammar errors beyond the above. Tone is generally appropriate, but the "Don't worry" opener is the most significant style issue — it reads as patronizing and is a recognizable AI writing pattern.

---

## Specific Line-by-Line Feedback

**TL;DR**: Fix the `globals.cc` typo. Otherwise strong — gives readers the answer upfront.

**"Context"**: The Build UI course setup is a nice personal grounding. "While working through the course I encountered a common, but tricky styling challenge" — remove the comma between "common" and "but."

**The instructor link**: "The instructor, Sam Selikoff, demonstrates..." — good to name the source. No issues.

**"The Quick Fix vs The Right Solution"**: Good structure. The framing title could be softened (see Structure notes).

**"A Better Approach"**: "While researching this, I found a great article by Subframe..." — "great article" is weak link text. Either name the article or let the link speak for itself.

**"The Solution: Custom Utility Class"**: Remove the "Don't worry" paragraph. Replace with the one-sentence explanation suggested above.

**"Why This Matters" list**: Cut item 4 or replace with something specific. Items 1–3 are solid.

**Conclusion**: Rewrite the final two sentences to close on something specific to this technique rather than a general developer wisdom platitude.

---

## Strengths

- TL;DR pattern is reader-friendly and well-executed (aside from the typo).
- Problem is grounded in a real project and a named course — concrete and credible.
- Solution is genuinely useful and the CSS is correct.
- Cross-browser coverage (Chrome, Firefox, IE/Edge) is thorough.
- Crediting Subframe explicitly is good practice.

---

## Recommendations Summary

### Must Address (High Priority)

- **Fix "globals.cc" → "globals.css"** in the TL;DR. This is the most visible mistake in the post.

### Should Address (Medium Priority)

- **Rewrite the "Don't worry" paragraph** in "The Solution" section. It's condescending and reads as AI-generated filler.
- **Rewrite the Conclusion** to say something specific about this technique rather than generic developer wisdom.
- **Use the Subframe article's title** as link text in the Conclusion (currently "the complete Subframe article").

### Nice to Have (Low Priority)

- Soften the "Quick Fix" framing to "Plugin Solution" — more neutral, more accurate.
- Remove comma after "common" in "a common, but tricky styling challenge."
- Cut item 4 from the "Why This Matters" list or replace with something specific.
- Drop the Tailwind version pin from "v3.4.13" to "v3 and v4."

---

## Overall Assessment

Ready to publish after fixing the TL;DR typo. The structural revision and "Don't worry" rewrite are important but not blocking. This is a useful, well-targeted post — the kind that ranks well in search because it answers a specific question directly. The writing quality is solid throughout.
