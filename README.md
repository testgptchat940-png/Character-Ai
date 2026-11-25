# NOIR — Character Studio

A Russian-language, mobile-first character chat workspace built with Next.js App Router.

## Included in this version

- Dark responsive interface with Home, Discover, Chats, Library and Favorites.
- Character cards, local search, favorites and local persistence.
- Character editor with greeting, description, personality/definition and tags.
- Separate conversations per character, message history and prompt controls.
- Prompt styles: PipSqueak 2, PipSqueak 2 · Rawr, Deepsqweak.
- Response modes: Normal, Extended, Dramatic, Deep Immersion, Cinematic and Concise.
- Server-side OpenAI-compatible chat endpoint. API keys are never exposed to the browser.
- Health endpoint and Supabase schema/client foundation.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables:

| Variable | Required | Description |
|---|---:|---|
| \`OPENAI_API_KEY\` | Yes, for generation | Provider API key; server only |
| \`OPENAI_MODEL\` | No | Model ID; defaults to \`gpt-4o-mini\` |
| \`OPENAI_BASE_URL\` | No | OpenAI-compatible API base URL |
| \`OPENAI_EXTRA_HEADERS\` | No | JSON object of extra provider headers |
| \`OPENAI_TIMEOUT_MS\` | No | Request timeout; defaults to 90000 |
| \`NEXT_PUBLIC_SUPABASE_URL\` | No | Supabase project URL |
| \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` | No | Supabase anon key |

After changing environment variables, redeploy the project.

## Persistence and limitations

Characters, favorites, settings and chat history currently use browser localStorage. They remain on the current device/browser and are not synced across devices. Supabase schema and client setup are included as a foundation, but account flows and cloud sync are not enabled in this deployed interface yet.

This is an initial working NOIR version, not a feature-complete Character.AI replacement. Group chats, personas, lorebooks, scene builder, image generation, streaming responses, message alternatives/edit/regenerate, and advanced provider profile management are not implemented in this release. Comics and livestream features are intentionally excluded.

## Deployment

GitHub repository: https://github.com/testgptchat940-png/Character-Ai  
Vercel project: noir-character-studio-v2
