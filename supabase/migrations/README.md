# Database Migrations

## How to Run Migrations in Supabase

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `create_user_profiles.sql`
5. Paste into the SQL editor
6. Click "Run" to execute the migration

### Option 2: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push
```

## Migrations

### `create_user_profiles.sql`

Creates the `user_profiles` table to store user onboarding status and preferences.

**What it does:**
- Creates `user_profiles` table with fields:
  - `user_id` (references auth.users)
  - `situation` (retirement|separation|medboard|planning)
  - `onboarding_completed` (boolean)
  - `separation_date` (date)
  - `display_name` (text)
  - Timestamps (created_at, updated_at)
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance
- Adds auto-update trigger for `updated_at`

**Run this migration first** before deploying the new code changes.

## Testing the Migration

After running the migration, test it:

```sql
-- Check that table was created
SELECT * FROM user_profiles LIMIT 1;

-- Check RLS policies
SELECT tablename, policyname FROM pg_policies WHERE tablename = 'user_profiles';
```

## Rollback (if needed)

If you need to rollback this migration:

```sql
-- Drop the table and all related objects
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```
