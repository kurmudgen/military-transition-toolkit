# Authentication Setup Guide

This guide explains how to configure authentication for the Military Transition Toolkit, including email/password and OAuth providers (Google, Apple).

## Table of Contents

- [Email/Password Authentication](#emailpassword-authentication)
- [OAuth Providers (Google & Apple)](#oauth-providers-google--apple)
- [Email Confirmation Setup](#email-confirmation-setup)
- [Troubleshooting](#troubleshooting)

---

## Email/Password Authentication

Email/password authentication is enabled by default once Supabase is configured.

### Required Environment Variables

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Configuration Steps

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to: **Authentication** → **Providers**
3. Find "Email" provider (enabled by default)
4. Configure email confirmation settings:
   - **Confirm email**: Toggle ON (recommended for production)
   - **Secure email change**: Toggle ON
   - **Enable email confirmations**: Toggle ON

### Email Templates

Supabase sends these emails automatically:
- **Confirmation email**: Sent when user signs up
- **Password recovery**: Sent when user requests password reset
- **Email change**: Sent when user changes their email

You can customize email templates at:
**Authentication** → **Email Templates**

---

## OAuth Providers (Google & Apple)

OAuth sign-in is optional but recommended for better user experience.

### Google OAuth Setup

#### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to: **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the OAuth consent screen:
   - User Type: **External**
   - App name: **Military Transition Toolkit**
   - User support email: `support@formationlabs.net`
   - Developer contact: `support@formationlabs.net`
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **Military Transition Toolkit**
   - Authorized redirect URIs:
     ```
     https://your-project.supabase.co/auth/v1/callback
     ```

#### 2. Configure in Supabase

1. Go to: [Supabase Dashboard](https://app.supabase.com/project/_/auth/providers)
2. Find "Google" provider and click **Enable**
3. Add your credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
4. Click **Save**

#### 3. Update URL Configuration

Go to: **Authentication** → **URL Configuration**

Add these URLs:
- **Site URL**:
  - Production: `https://militarytransitiontoolkit.com`
  - Development: `http://localhost:5173`
- **Redirect URLs**:
  ```
  https://militarytransitiontoolkit.com/auth/callback
  https://military-transition-toolkit.vercel.app/auth/callback
  http://localhost:5173/auth/callback
  ```

### Apple OAuth Setup

#### 1. Apple Developer Account Requirements

- Active Apple Developer account ($99/year)
- Access to [Apple Developer Portal](https://developer.apple.com/account)

#### 2. Create Apple OAuth Credentials

1. Go to: [Apple Developer Portal](https://developer.apple.com/account/resources/identifiers/list)
2. Click **+** to create new identifier
3. Select **App IDs** → **Continue**
4. Configure:
   - Description: **Military Transition Toolkit**
   - Bundle ID: `com.formationlabs.militarytransitiontoolkit`
   - Capabilities: Enable **Sign in with Apple**
5. Create a **Service ID**:
   - Identifier: `com.formationlabs.militarytransitiontoolkit.web`
   - Return URLs: `https://your-project.supabase.co/auth/v1/callback`
6. Create a **Private Key**:
   - Enable **Sign in with Apple**
   - Download the `.p8` key file
   - Note the **Key ID**

#### 3. Configure in Supabase

1. Go to: [Supabase Dashboard](https://app.supabase.com/project/_/auth/providers)
2. Find "Apple" provider and click **Enable**
3. Add your credentials:
   - **Client ID**: Your Service ID
   - **Team ID**: From Apple Developer account
   - **Key ID**: From private key
   - **Private Key**: Contents of `.p8` file
4. Click **Save**

---

## Email Confirmation Setup

### Current Flow

1. User signs up with email/password
2. Supabase sends confirmation email
3. User clicks link in email → redirected to `/auth/callback`
4. App validates token and confirms email
5. User redirected to `/app` dashboard

### Callback Route

The app uses `/auth/callback` to handle:
- Email confirmations
- OAuth redirects
- Password recovery
- Error states

**File**: `src/pages/auth/AuthCallback.jsx`

### Error Handling

The callback handler provides user-friendly errors for:
- ❌ Expired confirmation links
- ❌ Already-used confirmation links
- ❌ Invalid tokens
- ❌ OAuth errors (cancelled, provider not configured)
- ✅ Successful confirmations

### Testing Email Confirmation

#### Development Mode

In development, Supabase shows confirmation URLs in:
- **Authentication** → **Users** → Click user → **Send confirmation email**
- Check terminal logs for email content
- Use [Inbucket](https://inbucket.org) for local email testing

#### Production Mode

1. Sign up with real email address
2. Check inbox for confirmation email (check spam folder)
3. Click confirmation link
4. Should redirect to app successfully

If errors occur:
- Check Supabase logs: **Logs** → **Auth Logs**
- Check browser console for errors
- Verify Site URL and Redirect URLs are correct

---

## Troubleshooting

### Google/Apple Sign-In Not Working

**Symptoms**: Clicking OAuth button shows error

**Solution**:
1. Check Supabase logs: **Authentication** → **Logs**
2. Verify provider is enabled in Supabase dashboard
3. Check OAuth credentials are correct
4. Verify redirect URIs match exactly (no trailing slashes)

**Common Errors**:
- `Provider not enabled`: Enable provider in Supabase dashboard
- `Invalid client`: Check Client ID/Secret are correct
- `Redirect URI mismatch`: Add correct URL to authorized redirects

### Email Confirmation Link Errors

**Symptoms**: "Confirmation link expired or invalid"

**Solutions**:
1. **Expired link**: Request new confirmation email
   - Go to: **Authentication** → **Users**
   - Find user → Click **Send confirmation email**
2. **Wrong Site URL**:
   - Check: **Authentication** → **URL Configuration**
   - Ensure Site URL matches your domain
3. **Missing redirect URL**:
   - Add `/auth/callback` to Redirect URLs list

### OAuth Redirects to Wrong URL

**Symptoms**: After OAuth, redirected to wrong domain

**Solution**:
1. Update redirect URLs in OAuth provider config:
   - **Google**: Update Authorized redirect URIs
   - **Apple**: Update Return URLs in Service ID
2. Update Supabase URL Configuration:
   - Match production domain exactly
   - No trailing slashes

### Users Can't Sign In After Email Confirmation

**Symptoms**: Email confirmed but login fails

**Solutions**:
1. Check email is confirmed:
   - Go to: **Authentication** → **Users**
   - Look for user → Check "Email Confirmed" column
2. Try password reset:
   - Click "Forgot password" on login page
   - Follow reset link in email
3. Check user's account status:
   - Ensure not banned/disabled

### Development vs Production Configuration

**Development** (`http://localhost:5173`):
```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Production** (`https://militarytransitiontoolkit.com`):
```bash
# Vercel Environment Variables
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
APP_URL=https://militarytransitiontoolkit.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important**:
- Frontend vars need `VITE_` prefix
- Backend API vars need NO prefix
- Update OAuth redirect URLs for both environments

---

## Support

If you encounter issues not covered here:

1. **Check Supabase Logs**: Authentication → Logs
2. **Check Browser Console**: F12 → Console tab
3. **Contact Support**: support@formationlabs.net

---

## Quick Reference

### Supabase Dashboard URLs

- **Main Dashboard**: https://app.supabase.com
- **Auth Providers**: https://app.supabase.com/project/_/auth/providers
- **URL Configuration**: https://app.supabase.com/project/_/auth/url-configuration
- **Email Templates**: https://app.supabase.com/project/_/auth/templates
- **Users**: https://app.supabase.com/project/_/auth/users
- **Auth Logs**: https://app.supabase.com/project/_/logs/auth-logs

### OAuth Provider Dashboards

- **Google Cloud Console**: https://console.cloud.google.com/apis/credentials
- **Apple Developer**: https://developer.apple.com/account/resources/identifiers/list

### Testing Checklist

- [ ] Email/password signup works
- [ ] Confirmation email received
- [ ] Confirmation link works (no errors)
- [ ] User can log in after confirmation
- [ ] Google OAuth works (if configured)
- [ ] Apple OAuth works (if configured)
- [ ] Password reset works
- [ ] Error messages are user-friendly
- [ ] Production domain works
- [ ] Development localhost works
