# Security

## Overview

The Military Transition Toolkit handles sensitive veteran medical data (Protected Health Information under HIPAA) and payment information. We take security seriously and have implemented comprehensive security measures to protect this data.

## Security Measures Implemented

### Authentication & Authorization
- ✅ JWT token authentication on all API endpoints
- ✅ Row Level Security (RLS) policies on all database tables
- ✅ User ownership verification before data access
- ✅ Session timeout (15 minutes with 2-minute warning)
- ✅ Secure password storage (bcrypt via Supabase)

### API Security
- ✅ **Rate Limiting** (PENTEST-001 fix)
  - Authentication: 5 attempts per 15 minutes
  - API calls: 100 requests per minute
  - Sensitive operations: 10 requests per hour
  - Webhooks: 1000 requests per minute

- ✅ **CSRF Protection** (PENTEST-002 fix)
  - CSRF tokens required for all state-changing operations
  - Token validation on all POST/PUT/DELETE endpoints
  - Secure token generation and verification

- ✅ **Input Validation** (PENTEST-006/007/008 fix)
  - Comprehensive validation for all user inputs
  - XSS prevention (script tags, event handlers)
  - SQL injection detection
  - Length limits enforced
  - Automatic sanitization

### Data Protection
- ✅ **GDPR Compliance** (PENTEST-004 fix)
  - Complete account deletion (Right to Erasure)
  - Stripe customer data deletion
  - Audit log anonymization
  - PHI removal on deletion

- ✅ **HIPAA Compliance**
  - PHI never logged to console in production
  - Audit trail for all data access
  - Encrypted data in transit (HTTPS)
  - Encrypted data at rest (Supabase)
  - Access controls prevent unauthorized PHI disclosure

### Payment Security
- ✅ No credit card data stored (Stripe handles all payment processing)
- ✅ Price ID whitelist prevents payment manipulation
- ✅ Webhook signature verification
- ✅ Subscription status verification
- ✅ PCI DSS compliance via Stripe

### Infrastructure Security
- ✅ **CORS** - Strict origin whitelist
- ✅ **Security Headers** - CSP, X-Frame-Options, HSTS, X-Content-Type-Options
- ✅ **Environment Variables** - Secrets never in code
- ✅ **Server-Side Validation** - All access control server-side (PENTEST-003 fix)

### Logging & Monitoring
- ✅ Production-safe logging (no PHI exposure)
- ✅ Audit logs for compliance
- ✅ Security event tracking
- ✅ Error handling without information disclosure

## Security Fixes Applied

### PENTEST v3.0 Results

**CRITICAL Vulnerabilities Fixed:**
- ✅ PENTEST-001: Rate limiting implemented (CVSS 9.1)
- ✅ PENTEST-002: CSRF protection added (CVSS 8.8)

**HIGH Priority Vulnerabilities Fixed:**
- ✅ PENTEST-003: Server-side promo validation (CVSS 7.5)
- ✅ PENTEST-004: Complete GDPR account deletion (CVSS 7.4)
- ✅ PENTEST-005: User ID exposure fixed (CVSS 5.3)

**MEDIUM Priority Vulnerabilities Fixed:**
- ✅ PENTEST-006-008: Input validation & sanitization
- ✅ PENTEST-011: Production error handling

**Security Score:** Improved from 7.5/10 to **9.5/10** (estimated)

## Reporting Security Vulnerabilities

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**Email:** security@formationlabs.net

**Please include:**
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

### What to Expect

1. **Acknowledgment:** Within 48 hours
2. **Initial Assessment:** Within 7 days
3. **Updates:** Regular status updates
4. **Resolution:** Security patches deployed ASAP
5. **Disclosure:** Public disclosure after patch (with credit to reporter)

### Responsible Disclosure Policy

We ask that you:
- **Do not** publicly disclose the vulnerability until we've had a chance to fix it
- **Do not** access or modify user data beyond what's necessary to demonstrate the vulnerability
- **Do not** perform attacks that degrade service availability

In return, we commit to:
- Work with you to understand and resolve the issue
- Keep you informed of our progress
- Recognize your contribution (if desired)
- **Not pursue legal action** against researchers who follow this policy

## Security Best Practices for Users

### For Veterans Using This Tool

1. **Strong Passwords**
   - Use 12+ characters
   - Include letters, numbers, and symbols
   - Use a unique password (not reused from other sites)

2. **Session Security**
   - Always log out when done, especially on shared computers
   - Don't share your account with others
   - Session automatically expires after 15 minutes of inactivity

3. **Data Sharing**
   - Only share your account reference with official support
   - Never share your password
   - Be cautious of phishing emails claiming to be from us

4. **Account Deletion**
   - Request account deletion from Settings → Account → Delete Account
   - Deletion is permanent and GDPR-compliant
   - All medical data is securely erased

### For Developers Contributing

1. **Never commit secrets**
   - Use environment variables for API keys
   - Check `.gitignore` before committing
   - Use `git-secrets` or similar tools

2. **Follow secure coding practices**
   - Validate all user input
   - Use the provided validation utilities
   - Never log PHI
   - Use the production-safe logger

3. **Test security**
   - Test RLS policies
   - Test authentication/authorization
   - Verify input validation
   - Check for XSS/injection vulnerabilities

## Required Environment Variables

### Stripe (Payment Processing)
```
STRIPE_SECRET_KEY=sk_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_ANNUAL=price_...
STRIPE_PRICE_LIFETIME=price_...
```

### Supabase (Database & Auth)
```
SUPABASE_URL=https://....supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
VITE_SUPABASE_URL=https://....supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Rate Limiting (Upstash Redis)
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### CSRF Protection
```
CSRF_SECRET=<generate with: openssl rand -base64 32>
```

### Promo Mode (Optional)
```
PROMO_MODE=true  # Set to 'true' to enable promotional free access
```

### Application
```
APP_URL=https://military-transition-toolkit.vercel.app
NODE_ENV=production
```

## Security Checklist for Deployment

Before deploying to production:

- [ ] All environment variables set in Vercel
- [ ] CSRF_SECRET generated and set
- [ ] Upstash Redis configured for rate limiting
- [ ] Stripe webhooks configured and tested
- [ ] RLS policies enabled on all tables
- [ ] Security headers configured (vercel.json)
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] CSP policy tested and working
- [ ] No secrets in code or logs
- [ ] Production error handling enabled
- [ ] Audit logging active
- [ ] Session timeout configured

## Compliance

### HIPAA Compliance

This application is designed to handle Protected Health Information (PHI) in a HIPAA-compliant manner:

- ✅ **Access Controls:** RLS policies restrict data access
- ✅ **Audit Controls:** Comprehensive audit logging
- ✅ **Integrity Controls:** Data validation and sanitization
- ✅ **Transmission Security:** HTTPS enforced
- ✅ **Breach Notification:** Audit logs support breach investigation

**Note:** Full HIPAA compliance requires organizational policies and procedures beyond the technical controls implemented in this application.

### GDPR Compliance

- ✅ **Right to Access:** Users can view all their data
- ✅ **Right to Erasure:** Complete account deletion implemented
- ✅ **Data Minimization:** Only necessary data collected
- ✅ **Security:** Encryption, access controls, audit logs
- ✅ **Breach Notification:** Audit trails support compliance

## Security Roadmap

### Planned Improvements

- **Phase 1** (Q1 2026): Third-party penetration test
- **Phase 2** (Q2 2026): SOC 2 Type II certification
- **Phase 3** (Q3 2026): HIPAA BAA with Supabase
- **Phase 4** (Q4 2026): Advanced threat detection

## Contact

**Security Issues:** security@formationlabs.net
**General Support:** support@formationlabs.net
**Website:** https://military-transition-toolkit.vercel.app

---

*Last Updated: November 2, 2025*
*Security Audit: PENTEST v3.0 Complete*
