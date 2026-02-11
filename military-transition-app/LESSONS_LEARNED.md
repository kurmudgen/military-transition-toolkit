# LESSONS LEARNED

Universal reference for Next.js + Supabase + Stripe projects

---

## Supabase SSR (@supabase/ssr)

### Cookie Adapter Methods

- `@supabase/ssr` v0.3.0 uses `cookies.get(key)` (singular), NOT `getAll()`
- Custom `getAll()` implementations are completely ignored — `typeof cookies.get === "function"` returns `false`, and every cookie lookup returns `undefined`
- Must implement `get()`, `set()`, and `remove()` methods in cookie adapter
- This applies to all three client configurations: `server.ts`, `middleware.ts`, and `api/auth/callback/route.ts`

### Cookie Value Processing

- Cookie values may be URL-encoded (%7B instead of {) — always URL-decode
- Cookie values may be JSON-wrapped ("value" instead of value) — JSON.parse if starts/ends with quotes
- Processing order: raw cookie → URL-decode → JSON-unwrap → Supabase
- Both transformations MUST happen in the get() method of the cookie adapter
- Cookie chunking: Use the base cookie name (sb-{ref}-auth-token) for single-chunk values. Only use .0 / .1 suffixes when the payload needs splitting.

### PKCE Verifier Issues

- "PKCE code verifier not found" usually means cookie adapter isn't reading correctly
- Verifier should be ~43 characters — if 114+, it's probably JSON-wrapped

### Server-Side Session Persistence

- @supabase/ssr v0.3.x storage adapter does not reliably persist cookies in server actions
- Workaround: Manual cookie handling that bypasses @supabase/ssr
- redirect() in server actions drops Set-Cookie headers — return { redirectTo } and use window.location.href on client

### Connection Pooling

- Add ?pgbouncer=true to DATABASE_URL when using Supabase connection pooler
- Use port 6543 (pooler), not 5432 (direct)

### Conflicting Migrations

- One source of truth for schema, always — delete duplicate migration files
- Run `supabase db reset` and test signup flow locally before pushing migrations

---

## Supabase Auth

### OAuth Creates New Users

- signInWithOAuth creates a NEW user if the OAuth email differs from the signup email

### linkIdentity() SSR Issues

- Server-side linkIdentity() fails — always initiate OAuth from the browser client

---

## Supabase Storage

### Bucket Setup Required

- Uploads fail silently if Storage buckets don't exist or lack proper policies
- Add RLS policies for INSERT, SELECT, DELETE

### Storage Paths

- The bucket name in .from() is the container. The path in .upload() is relative to that container.

### Use Service Role Key for Server Uploads

- Server-side uploads using anon key fail silently — use service role key

---

## Stripe Integration

### Key Management

- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must match the account of STRIPE_SECRET_KEY
- Mismatched keys cause cryptic 400 errors

### Price/Amount Handling

- Use React state for price (store cents), format display on blur
- Don't use hidden fields with DOM manipulation

---

## Architecture: Merge Features, Not Codebases

When merging two apps, rebuild FEATURES inside the target app from scratch. Don't merge repos. Extract specs/logic from the source app, then rebuild natively.

---

## Tailwind v4 + CSS Reset Conflicts

- `* { margin: 0; padding: 0; }` overrides ALL Tailwind utilities (unlayered beats layered)
- Fix: Remove from globals.css — Tailwind's preflight handles resets correctly

---

## Diagnosis Before Fixes

### The "Read First" Rule

After 2 failed fix attempts on the same issue, STOP and run a diagnostic:
1. Print the full file contents
2. Check computed styles in DevTools
3. Look for competing CSS rules (especially in globals.css)

---

## Data Migration

### localStorage to Supabase Migration

- Gate migration behind a completion flag so it fires once and stops

---

## Dev Server: When to Restart vs Refresh

- Just refresh: component, page, or style changes
- Restart: .env.local, config files (next.config, tailwind.config, vite.config)
