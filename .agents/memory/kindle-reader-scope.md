---
name: Kindle Reader frontend scope
description: The user's intended boundary between the Kindle Reader prototype and a future AWS backend.
---

Keep the Kindle Reader as a frontend-only prototype until the user explicitly requests AWS integration.

**Why:** The user wants to connect AWS for the backend themselves.

**How to apply:** Keep sign-in, store, catalogue, wishlist, settings, reading progress, and PDF import behavior in the browser; do not add backend or AWS calls without an explicit request.
