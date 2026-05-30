# AI Workflow Docs

This folder contains reusable AI instruction files for working inside this repository.

## Purpose

These files help Claude operate more like a senior architect, reviewer, debugger, and security-minded engineer while respecting the existing patterns of the repo.

## Files in this folder

### claude-session-starter.md
Use this first at the start of a new Claude session. It tells Claude which files to read before doing any work.

### universal-senior-architect.md
The main reusable operating guide. This is the default behavior file and should be treated as the base working mode.

### project-brief-template.md
A blank template for creating app-specific context.

### project-brief.md
The filled project-specific context file for this repo. Update this file as the app evolves.

### code-review-mode.md
Load this when you want Claude to review code like a strict senior engineer.

### debugging-mode.md
Load this when you want Claude to diagnose a bug by focusing on root cause instead of patching symptoms.

### security-review-mode.md
Load this when you want Claude to review auth, permissions, sensitive data handling, and other practical security risks.

## Recommended usage

At the start of a new session, ask Claude to read:

1. docs/ai/claude-session-starter.md

That file will instruct Claude to also use:

1. docs/ai/universal-senior-architect.md
2. docs/ai/project-brief.md

## Mode loading

Only load these extra files when needed:
- docs/ai/code-review-mode.md
- docs/ai/debugging-mode.md
- docs/ai/security-review-mode.md

## Suggested workflow

### New session
Tell Claude:

Read this file first:
docs/ai/claude-session-starter.md

### Normal build work
Claude should use:
- universal-senior-architect.md
- project-brief.md

### Code review
Also load:
- code-review-mode.md

### Debugging
Also load:
- debugging-mode.md

### Security pass
Also load:
- security-review-mode.md

## Maintenance

Keep project-brief.md up to date.
If the repo architecture changes, update project-brief.md so Claude continues following the correct patterns.

## Important rule

These files are meant to guide Claude to follow the repo, not to override the repo with random new architecture. Existing codebase patterns should be respected unless a deliberate change is requested.
