---
name: create-skill
description: Guides creation of Agent Skills for this project. Use when creating, writing, or authoring a new skill in the skills/ directory, or when asked about skill structure, best practices, or SKILL.md format.
---

# Creating Skills in This Project

This skill guides you through creating effective Agent Skills for robcrock.com. Skills are markdown files that teach the agent how to perform specific tasks: editorial review, MDX content patterns, animation best practices, or any specialized workflow for this codebase.

## Before You Begin: Gather Requirements

1. **Purpose and scope**: What specific task or workflow should this skill help with?
2. **Trigger scenarios**: When should the agent automatically apply this skill? (Include key terms in the description.)
3. **Key domain knowledge**: What specialized information does the agent need that it wouldn't already know?
4. **Output format preferences**: Any specific templates, formats, or styles?
5. **Existing patterns**: Are there existing examples to follow? See [skills/blog-editor/SKILL.md](../blog-editor/SKILL.md) for reference.

---

## Skill File Structure

### Directory Layout

Skills live under `skills/` at the project root:

```
skills/
├── skill-name/
│   ├── SKILL.md              # Required - main instructions
│   ├── reference.md          # Optional - detailed docs
│   └── examples.md           # Optional - usage examples
```

### SKILL.md Structure

Every skill requires a `SKILL.md` file with YAML frontmatter and markdown body:

```markdown
---
name: your-skill-name
description: Brief description of what this skill does and when to use it
---

# Your Skill Name

## Instructions
Clear, step-by-step guidance.

## Examples
Concrete examples.
```

### Required Metadata Fields

| Field | Requirements | Purpose |
|-------|--------------|---------|
| `name` | Max 64 chars, lowercase letters/numbers/hyphens only | Unique identifier |
| `description` | Max 1024 chars, non-empty | Helps agent decide when to apply the skill |

---

## Writing Effective Descriptions

The description is **critical** for skill discovery.

1. **Write in third person**:
   - ✅ "Processes Excel files and generates reports"
   - ❌ "I can help you process Excel files"

2. **Be specific and include trigger terms**:
   - ✅ "Extract text from PDF files. Use when working with PDFs, document extraction, or when the user mentions PDF."
   - ❌ "Helps with documents"

3. **Include both WHAT and WHEN**: capabilities + trigger scenarios.

---

## Core Principles

### 1. Concise is Key

The agent is already smart. Only add context it doesn't have. Challenge each piece: "Does the agent really need this?"

### 2. Keep SKILL.md Under 500 Lines

For optimal performance, keep the main file concise. Use progressive disclosure for detailed content.

### 3. Progressive Disclosure

Put essentials in SKILL.md; detailed material in separate files:

```markdown
## Quick start
[Essential instructions]

## Additional resources
- For details, see [reference.md](reference.md)
- For examples, see [examples.md](examples.md)
```

Keep references one level deep—link directly from SKILL.md.

### 4. Set Appropriate Degrees of Freedom

| Level | When to Use | Example |
|-------|-------------|---------|
| **High** | Multiple valid approaches | Code review guidelines |
| **Medium** | Preferred pattern, some variation | Report generation |
| **Low** | Fragile ops, consistency critical | Database migrations |

---

## Common Patterns

### Template Pattern

```markdown
## Output format

Use this template:

\`\`\`markdown
# [Title]
## Summary
[Overview]
## Key points
- Point 1
- Point 2
\`\`\`
```

### Examples Pattern

```markdown
## Format example

**Input**: Added user auth
**Output**:
\`\`\`
feat(auth): implement JWT-based authentication
\`\`\`
```

### Workflow Pattern

```markdown
## Workflow

1. Step 1: [Action]
2. Step 2: [Action]
3. Step 3: [Action]
```

---

## Anti-Patterns to Avoid

- **Windows-style paths**: Use `scripts/helper.py`, not `scripts\helper.py`
- **Too many options**: Provide a default with an escape hatch, not a long list
- **Vague names**: Use `editing-posts`, not `helper` or `utils`
- **Inconsistent terminology**: Pick one term and use it throughout

---

## Skill Creation Workflow

### Phase 1: Discovery

Gather: purpose, trigger scenarios, specific requirements, existing examples.

### Phase 2: Design

1. Draft skill name (lowercase, hyphens, max 64 chars)
2. Write specific, third-person description
3. Outline main sections
4. Identify supporting files if needed

### Phase 3: Implementation

1. Create `skills/<skill-name>/` directory
2. Write `SKILL.md` with frontmatter
3. Add reference/examples files if needed

### Phase 4: Verification

- [ ] Description is specific and includes trigger terms
- [ ] SKILL.md is under 500 lines
- [ ] Consistent terminology
- [ ] File references are one level deep

---

## Reference: Existing Skill

See [skills/blog-editor/SKILL.md](../blog-editor/SKILL.md) for a complete example of a well-structured skill in this project. It demonstrates:

- Clear frontmatter with name and description
- Structured sections (task, analysis dimensions, output format)
- Failure modes and calibration notes
- Concrete guidelines without verbosity
