# Supabase Setup Guide

This guide will help you set up Supabase for the Military Transition Toolkit.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub or email
3. Create a new organization (or use an existing one)

## Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization
3. Enter project details:
   - **Name**: `military-transition-toolkit`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
   - **Pricing Plan**: Free tier is fine to start
4. Click "Create new project"
5. Wait 2-3 minutes for the database to provision

## Step 3: Get Your API Keys

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (this is safe to use in frontend code)

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Fill in your Supabase values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Run Database Migrations

1. Go to your Supabase dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click "New query"
4. Open the file `supabase/migrations/001_initial_schema.sql`
5. Copy and paste the ENTIRE contents into the SQL editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

## Step 6: Verify Tables Were Created

1. Click on **Table Editor** in the left sidebar
2. You should see all these tables:
   - user_profiles
   - user_subscriptions
   - resumes
   - saved_jobs
   - job_applications
   - state_comparisons
   - va_conditions
   - va_evidence
   - appointments
   - checklist_progress
   - resource_ratings
   - custom_resources
   - usage_tracking
   - analytics_events

## Step 7: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - Site URL: `http://localhost:5173` (for development)
   - Redirect URLs: `http://localhost:5173/**` (for development)

## Step 8: Set Up Auth Templates (Optional but Recommended)

1. Go to **Authentication** → **Email Templates**
2. Customize these templates:
   - **Confirm signup**: Welcome message
   - **Magic Link**: One-click login
   - **Change Email Address**: Confirmation
   - **Reset Password**: Password reset instructions

## Step 9: Configure OAuth Providers (Phase 2)

### Google OAuth:
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Follow the instructions to create OAuth credentials in Google Cloud Console
4. Add authorized redirect URIs

### Apple OAuth:
1. Go to **Authentication** → **Providers** → **Apple**
2. Enable Apple provider
3. Follow the instructions to configure Sign in with Apple
4. Add authorized redirect URIs

## Step 10: Test the Connection

1. Start your development server: `npm run dev`
2. Open the browser console
3. Check for any Supabase connection errors
4. The app should now be using Supabase instead of localStorage

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure your `.env` file exists and has the correct values
- Restart your dev server after adding environment variables
- Check that variable names start with `VITE_` (required for Vite)

### "Unable to connect to Supabase"
- Check that your project URL is correct
- Verify the anon key is correct
- Make sure your Supabase project is running (check dashboard)

### "Row Level Security" errors
- Make sure you ran the migration SQL
- Check that RLS policies are enabled
- Verify the user is authenticated

### Database connection issues
- Check your internet connection
- Verify the project is not paused (free tier pauses after 1 week of inactivity)
- Check Supabase status page: https://status.supabase.com

## Next Steps

After completing this setup:
1. **Phase 2**: Implement authentication pages (signup, login, etc.)
2. **Phase 3**: Migrate all localStorage calls to Supabase
3. **Phase 4**: Set up Stripe for payments
4. **Phase 5**: Implement feature gating

## Important Security Notes

- **NEVER** commit your `.env` file to git
- **NEVER** share your service_role key publicly
- The anon key is safe to expose in frontend code (it's restricted by RLS policies)
- Always use Row Level Security to protect user data
- Keep your database password secure

## For Production Deployment

When deploying to Vercel:
1. Go to your Vercel project settings
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Update Supabase Auth settings:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/**`
4. Enable database backups in Supabase (Pro plan)
5. Set up monitoring and alerts
