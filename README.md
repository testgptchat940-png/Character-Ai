# NOIR Character Studio v2

Mobile-first character chat experience inspired by the supplied Character.AI demonstration. NOIR uses its own name and implementation. The Comics and Streams sections are intentionally omitted.

## Deploy environment

Set `OPENAI_API_KEY` (server-only), optional `OPENAI_MODEL`, `OPENAI_BASE_URL`, `OPENAI_EXTRA_HEADERS`, and `OPENAI_TIMEOUT_MS` in Vercel. For account sign-in and cloud sync, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then execute `supabase/schema.sql` in Supabase SQL Editor. Without Supabase the UI uses browser local storage.

## Local development

`npm install && npm run dev`
