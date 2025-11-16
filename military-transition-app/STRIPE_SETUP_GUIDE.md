# Stripe Integration Setup Guide

## Phase 4: Stripe Payment Integration - Complete Setup Instructions

This guide walks you through setting up Stripe for the Military Transition Toolkit SaaS application.

## Prerequisites

- Stripe account (https://dashboard.stripe.com)
- Vercel account for deployment (https://vercel.com)
- Environment variables configured

## Step 1: Create Stripe Account & Get API Keys

1. Go to https://dashboard.stripe.com/register
2. Create a Stripe account (use Test mode initially)
3. Navigate to **Developers > API Keys**
4. Copy the following keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

Add to your `.env` file:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

## Step 2: Create Products & Prices in Stripe

### Create Premium Monthly Product

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. Fill in details:
   - **Name**: Premium Monthly
   - **Description**: Full access to all Military Transition Toolkit features
   - **Pricing model**: Standard pricing
   - **Price**: $7.00 USD
   - **Billing period**: Monthly
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)
6. Add to `.env`:
   ```bash
   VITE_STRIPE_PRICE_MONTHLY=price_your_monthly_price_id
   ```

### Create Premium Annual Product

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. Fill in details:
   - **Name**: Premium Annual
   - **Description**: Full access to all features - Save $35/year
   - **Pricing model**: Standard pricing
   - **Price**: $49.00 USD
   - **Billing period**: Yearly
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)
6. Add to `.env`:
   ```bash
   VITE_STRIPE_PRICE_ANNUAL=price_your_annual_price_id
   ```

## Step 3: Set Up Webhook Endpoint

### Local Development (Using Stripe CLI)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
   ```bash
   stripe login
   ```
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### Production (Vercel Deployment)

1. Deploy your app to Vercel first
2. Go to **Developers > Webhooks** in Stripe Dashboard
3. Click **Add endpoint**
4. Enter endpoint URL:
   ```
   https://your-app.vercel.app/api/stripe/webhook
   ```
5. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_`)
8. Add to Vercel environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
   ```

## Step 4: Configure Customer Portal

1. Go to **Settings > Billing > Customer portal** in Stripe Dashboard
2. Click **Activate test link** (or **Activate** for production)
3. Configure portal settings:
   - ✅ Allow customers to update payment methods
   - ✅ Allow customers to update billing information
   - ✅ Allow customers to cancel subscriptions
   - ✅ Show pricing table
4. Save settings

## Step 5: Environment Variables Checklist

Ensure your `.env` file has all of these:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PRICE_MONTHLY=price_...
VITE_STRIPE_PRICE_ANNUAL=price_...

# App
VITE_APP_URL=http://localhost:5173
```

## Step 6: Test the Integration

### Test Checkout Flow

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Start Stripe webhook forwarding (in another terminal):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Create an account and navigate to `/pricing`
4. Click "Upgrade Now" on Premium Monthly or Annual
5. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
6. Complete checkout
7. Verify you're redirected to `/app/account`
8. Check Supabase `user_subscriptions` table - should see your subscription
9. Verify webhook events in Stripe Dashboard

### Test Customer Portal

1. After subscribing, go to `/app/account`
2. Click "Manage Subscription"
3. Verify you're redirected to Stripe Customer Portal
4. Test updating payment method
5. Test canceling subscription
6. Verify changes sync to Supabase

### Test Subscription Status

1. In Stripe Dashboard, go to **Customers**
2. Find your test customer
3. Click on their subscription
4. Try different statuses:
   - Active → Should show "Current Plan: Premium"
   - Cancel subscription → Should show "Cancels at period end"
   - Past due → Should update status in app

## Step 7: Deploy to Production

### Update Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all production environment variables:
   - Use production Stripe keys (`pk_live_` and `sk_live_`)
   - Use production webhook secret
   - Set `VITE_APP_URL` to your production URL

### Activate Live Mode

1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Repeat Steps 2-4 in Live mode
3. Update Vercel environment variables with live keys
4. Redeploy your app

## Troubleshooting

### Checkout Session Not Creating

- Check browser console for errors
- Verify Stripe publishable key is correct
- Check that API endpoint is accessible
- Ensure user is authenticated

### Webhook Not Firing

- Verify webhook endpoint URL is correct
- Check webhook signing secret matches
- View webhook logs in Stripe Dashboard
- For local dev, ensure `stripe listen` is running

### Subscription Not Updating in Database

- Check Supabase logs for errors
- Verify service role key has correct permissions
- Check webhook is sending correct user ID in metadata
- Verify RLS policies allow updates

### Customer Portal Not Working

- Ensure Customer Portal is activated in Stripe
- Verify customer has a Stripe customer ID
- Check that return URL is correct

## Security Checklist

- ✅ Never commit `.env` file to git
- ✅ Use environment variables for all secrets
- ✅ Verify webhook signatures in production
- ✅ Use service role key only in backend functions
- ✅ Enable Stripe fraud detection
- ✅ Use HTTPS in production
- ✅ Implement rate limiting on API endpoints
- ✅ Monitor Stripe Dashboard for suspicious activity

## Going Live Checklist

Before switching to production:

- [ ] Test all flows with test cards
- [ ] Verify webhooks work correctly
- [ ] Test subscription lifecycle (create, update, cancel)
- [ ] Test payment failures
- [ ] Verify data isolation (users can't see other users' data)
- [ ] Test customer portal
- [ ] Set up Stripe email notifications
- [ ] Configure subscription settings (grace periods, etc.)
- [ ] Review Stripe fraud settings
- [ ] Test with real card (your own)
- [ ] Monitor first real transactions closely

## Support Resources

- Stripe Documentation: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Stripe Webhooks Guide: https://stripe.com/docs/webhooks
- Stripe Testing Guide: https://stripe.com/docs/testing
- Stripe Dashboard: https://dashboard.stripe.com

## Next Steps

After completing Stripe setup:

1. ✅ Test thoroughly in test mode
2. ✅ Implement feature gating (Phase 5)
3. ✅ Add upgrade prompts throughout app
4. ✅ Monitor analytics and conversion rates
5. ✅ Set up email notifications for subscription events (Phase 6)
