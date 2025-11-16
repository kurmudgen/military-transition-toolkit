# Military Transition App

A web application designed to help service members transition from military to civilian life.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database and authentication)
- Stripe account (for payment processing)
- Upstash Redis account (for rate limiting)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Supabase (Database & Authentication)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Payment Processing)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_ANNUAL=price_...
STRIPE_PRICE_LIFETIME=price_...

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token

# CSRF Protection (Generate with: openssl rand -base64 32)
CSRF_SECRET=your_csrf_secret_here

# Application
APP_URL=http://localhost:5173
NODE_ENV=development

# Promo Mode (Optional - set to 'true' to enable free access)
PROMO_MODE=false
```

### Required Setup Steps

1. **Supabase Setup**
   ```bash
   # Run the RLS policies in your Supabase SQL editor
   # File: SUPABASE_RLS_POLICIES.sql
   ```

2. **Stripe Setup**
   - Create products for Monthly, Annual, and Lifetime plans
   - Copy price IDs to environment variables
   - Configure webhook endpoint: `/api/stripe/webhook`

3. **Upstash Redis Setup**
   - Create a Redis database at https://upstash.com
   - Copy REST URL and token to environment variables

4. **Generate CSRF Secret**
   ```bash
   openssl rand -base64 32
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Features

- Career planning resources
- Education benefits information
- Healthcare guidance
- User profile management (coming soon)

## Tech Stack

- React 18
- Vite
- React Router
- Tailwind CSS
- ESLint

## Project Structure

- `/src/components` - Reusable React components
- `/src/pages` - Page components for routing
- `/src/App.jsx` - Main app component with routes
- `/src/main.jsx` - Application entry point
