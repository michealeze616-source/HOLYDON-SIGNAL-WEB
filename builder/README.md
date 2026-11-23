# HOLYDON BUILDER

Free-first AI website studio MVP.

## Features
- Plain-language prompt and 6 starter templates
- Template-driven starter drafts without API key
- Optional Gemini AI full-site generation (Google AI Studio API key supplied in-session)
- AI revision prompt for generated HTML sites
- Desktop/mobile preview
- Quick editing for business name, hero headline, tagline, light/dark and accent color for starter drafts
- HTML source view, copy and standalone export
- Project auto-save in browser localStorage (API key is never saved)
- Undo last action
- Sandboxed preview iframe

## AI / privacy notes
The AI mode sends the brief and (when editing) current generated HTML directly from the browser to Google Gemini using the user's own API key. The key is kept only in page memory and is not saved to the local project. Free-tier access and quotas are subject to Google AI Studio availability, usage limits, and terms. Starter mode is fully local and works without an AI key.


## Run
Install dependencies and run Next.js from this directory:
- `npm install`
- `npm run dev`
