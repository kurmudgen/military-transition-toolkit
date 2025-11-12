# SEO Analytics & Tracking Setup

## Overview
Complete analytics setup guide for tracking SEO performance, user behavior, conversions, and ROI. Includes implementation steps for Google Analytics 4, Search Console, and key metrics dashboard.

---

## Analytics Stack (Recommended)

### Core Tools (Free)

1. **Google Search Console** (GSC) - SEO performance, indexing, keyword rankings
2. **Google Analytics 4** (GA4) - Traffic, user behavior, conversions
3. **Google Tag Manager** (GTM) - Tag management (optional but recommended)

### Optional Tools

4. **Plausible Analytics** ($9-19/mo) - Privacy-friendly alternative to GA4
5. **Microsoft Clarity** (Free) - Heatmaps, session recordings
6. **Ahrefs/Semrush** ($99-119/mo) - Rank tracking, competitor analysis
7. **Hotjar** ($39+/mo) - Advanced heatmaps, user feedback

### Tech Stack for This Project
- **React + Vite** (current setup)
- **Vercel hosting** (automatic deployment)
- **Supabase** (database for user data)

---

## Part 1: Google Search Console Setup

### Step 1: Verify Domain Ownership

**URL:** https://search.google.com/search-console

**Verification Methods:**
1. **HTML file upload** (easiest for Vite/Vercel)
2. **DNS record** (if you control DNS)
3. **HTML tag** (add to `<head>`)
4. **Google Analytics** (if already installed)

**Recommended: HTML Tag Method**

Add to `/public/index.html`:
```html
<head>
  <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
</head>
```

Deploy to Vercel, then click "Verify" in Search Console.

---

### Step 2: Submit Sitemaps

**After verification:**

1. Go to **Sitemaps** section
2. Submit: `https://militarytransitiontoolkit.com/sitemap.xml`
3. Submit individual sitemaps:
   - `https://militarytransitiontoolkit.com/sitemap-career-guides.xml`
   - `https://militarytransitiontoolkit.com/sitemap-state-benefits.xml`
   - `https://militarytransitiontoolkit.com/sitemap-va-claims.xml`
   - `https://militarytransitiontoolkit.com/sitemap-blog.xml`
   - `https://militarytransitiontoolkit.com/sitemap-resources.xml`

**Check Status:**
- "Success" = Google found sitemap
- Wait 1-7 days for indexing to begin

---

### Step 3: Key Reports to Monitor (Weekly)

#### Overview Dashboard
- **Total Clicks** - Organic traffic from Google
- **Total Impressions** - How many times your site appeared in search results
- **Average CTR** - Click-through rate (target: >3%)
- **Average Position** - Average ranking (target: <20, ideally <10)

#### Performance Report
- **Query:** What keywords are driving traffic
- **Pages:** Which pages get most clicks
- **Countries:** Geographic traffic
- **Devices:** Mobile vs. desktop

**Filter by:**
- Date range (compare periods)
- Query (search for specific keywords)
- Page (see performance of specific URLs)

#### Coverage Report (Indexing Status)
- **Valid pages** - Indexed and crawlable
- **Excluded pages** - Not indexed (investigate why)
- **Error pages** - Crawl errors (fix immediately)
- **Valid with warnings** - Indexed but with issues

**Goal:** 100% of 1,600 pages showing as "Valid" within 90 days

#### Enhancements
- **Mobile Usability** - Mobile issues (target: 0 errors)
- **Core Web Vitals** - Page speed issues (target: >75% "Good" URLs)
- **Breadcrumbs** - Structured data validation
- **FAQ** - FAQ schema validation

---

## Part 2: Google Analytics 4 Setup

### Step 1: Create GA4 Property

**URL:** https://analytics.google.com

1. Create Account: "Military Transition Toolkit"
2. Create Property: "Military Transition Toolkit"
3. Select industry: "Jobs & Education"
4. Time zone: Your timezone
5. Currency: USD

**Get Measurement ID:** (format: G-XXXXXXXXXX)

---

### Step 2: Install GA4 in React App

**Option 1: Direct Script (Simple)**

Add to `/public/index.html`:
```html
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

Replace `G-XXXXXXXXXX` with your Measurement ID.

**Option 2: React Package (Recommended)**

Install:
```bash
npm install react-ga4
```

Create: `src/analytics.js`
```javascript
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
```

Update `src/main.jsx`:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initGA } from './analytics';

// Initialize Google Analytics
initGA();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Update `src/App.jsx` to track page views:
```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from './analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    // Your app code
  );
}
```

---

### Step 3: Set Up Key Events (Conversions)

**Navigate to: Admin → Data display → Events → Create event**

**Key Events to Track:**

#### 1. Email Signup
```javascript
// When user submits email form
logEvent('conversion', 'email_signup', 'newsletter');
```

**GA4 Event Name:** `email_signup`
**Mark as Key Event:** Yes

#### 2. Tool Usage
```javascript
// When user uses VA calculator
logEvent('engagement', 'tool_used', 'va_calculator');
```

**GA4 Event Names:**
- `tool_used_va_calculator`
- `tool_used_retirement_calculator`
- `tool_used_skills_translator`
- `tool_used_terminal_leave`

#### 3. Resource Download
```javascript
// When user downloads PDF
logEvent('engagement', 'download', 'va_claims_checklist');
```

**GA4 Event Name:** `download`
**Parameters:** `file_name`, `file_type`

#### 4. Outbound Link Clicks
```javascript
// When user clicks external link (e.g., to VA.gov)
logEvent('engagement', 'outbound_click', 'va_gov');
```

**GA4 Event Name:** `outbound_click`
**Parameters:** `link_url`, `link_text`

#### 5. Search Usage (If you add site search)
```javascript
// When user searches
logEvent('search', 'site_search', searchTerm);
```

**GA4 Event Name:** `search`
**Parameters:** `search_term`

---

### Step 4: Configure Enhanced Measurement

**Admin → Data Streams → Web → [Your stream] → Enhanced measurement**

**Enable:**
- ✅ Page views (automatically tracked)
- ✅ Scrolls (tracks 90% scroll depth)
- ✅ Outbound clicks (external links)
- ✅ Site search (if you have search)
- ✅ Video engagement (if you add videos)
- ✅ File downloads (PDF, docs)

---

### Step 5: Key GA4 Reports to Monitor

#### Acquisition Reports
**Reports → Acquisition → Traffic acquisition**

**Metrics:**
- **Organic Search** - Traffic from Google (main focus)
- **Direct** - Users typing URL directly
- **Referral** - Traffic from backlinks
- **Social** - Facebook, Twitter, Reddit, LinkedIn
- **Unassigned** - Unknown sources (minimize this)

**Goal:** Organic Search = 70%+ of traffic within 6 months

---

#### Engagement Reports
**Reports → Engagement → Pages and screens**

**Metrics:**
- **Views** - Total pageviews per page
- **Users** - Unique visitors per page
- **Average engagement time** - How long users stay (target: 2+ minutes)
- **Event count** - Interactions per page

**Top Pages to Monitor:**
1. Homepage
2. Top 10 career guides (68W, 11B, HM, etc.)
3. VA Disability Rates 2025
4. State benefits guides (CA, TX, FL)
5. VA Claims guides

---

#### Events Report
**Reports → Engagement → Events**

**Track:**
- `email_signup` - Conversion rate (goal: 5%+ of visitors)
- `tool_used_*` - Tool engagement (goal: 20%+ use at least one tool)
- `download` - Resource downloads
- `outbound_click` - Clicks to VA.gov, job boards, etc.

---

#### Realtime Report
**Reports → Realtime**

**Use for:**
- Checking if GA4 is working (see live traffic)
- Monitoring new content launches (spike in traffic?)
- Identifying trending pages (what's getting traffic right now)

---

## Part 3: Advanced Tracking

### Conversion Tracking (Goals)

**Set up these conversion goals:**

#### Goal 1: Email Signup (Primary Conversion)

**Implementation:**
```javascript
// In your email form submit handler
import { logEvent } from './analytics';

const handleEmailSubmit = (email) => {
  // Submit email to database
  // Then track event
  logEvent('conversion', 'email_signup', 'newsletter');
};
```

**GA4 Configuration:**
- Admin → Events → Create event
- Event name: `email_signup`
- Mark as conversion: Yes
- Set conversion value: $5 (estimated value of email lead)

**Target:** 5% of visitors convert to email signups

---

#### Goal 2: Tool Usage (Engagement)

**Implementation:**
```javascript
// When calculator is used
const handleCalculation = () => {
  logEvent('engagement', 'tool_used', 'va_calculator');
};
```

**Target:** 20% of visitors use at least one tool

---

#### Goal 3: Affiliate Click (Revenue, if applicable)

If you add affiliate links (e.g., to resume services, education programs):

```javascript
// When user clicks affiliate link
const handleAffiliateClick = (affiliate) => {
  logEvent('conversion', 'affiliate_click', affiliate);
  // Then redirect to affiliate site
};
```

**Target:** 2% of visitors click affiliate links

---

### Custom Dimensions (User Properties)

**Admin → Data display → Custom dimensions**

**Create these custom dimensions:**

1. **User Type**
   - Dimension name: `user_type`
   - Scope: User
   - Values: "active_duty", "veteran", "spouse", "unknown"

2. **Military Branch**
   - Dimension name: `military_branch`
   - Values: "army", "navy", "marines", "air_force", "coast_guard", "unknown"

3. **Page Category**
   - Dimension name: `page_category`
   - Scope: Event
   - Values: "career_guide", "state_benefits", "va_claims", "blog", "tools"

**Implementation:**
```javascript
// Set user properties when known
ReactGA.set({ user_type: 'veteran', military_branch: 'army' });

// Or send with event
logEvent('page_view', 'career_guide', '68w-combat-medic', {
  page_category: 'career_guide',
  military_branch: 'army',
  mos_code: '68w'
});
```

---

## Part 4: Rank Tracking

### Option 1: Google Search Console (Free)

**Reports → Performance → Queries**

**Filter by:**
- Date range: Last 28 days
- Click on specific keywords to see ranking history

**Limitations:**
- Only shows keywords you already rank for
- Data is aggregated (average position)
- No competitor data

---

### Option 2: Ahrefs Rank Tracker (Paid - $99/mo)

**Setup:**
1. Add project: militarytransitiontoolkit.com
2. Add target keywords (50-100 priority keywords)
3. Set tracking frequency: Weekly
4. Set competitors: military.com, va.gov, indeed.com/military

**Track These Keywords (Top 50):**
1. va disability rates 2025
2. tsp military
3. how to file va disability claim
4. military retirement calculator
5. california veteran benefits
6. 68w civilian jobs
7. 11b civilian jobs
8. hospital corpsman civilian jobs
9. military transition checklist
10. terminal leave calculator
[Continue for top 50 from keyword research doc]

**Benefits:**
- Historical ranking data
- Competitor tracking (see who outranks you)
- SERP features tracking (featured snippets)
- Rank movement alerts

**Alternative (Cheaper):** Semrush Position Tracking ($119/mo, includes more features)

---

### Option 3: Free Rank Tracking Spreadsheet

**If you can't afford paid tools:**

Create spreadsheet: `keyword-rankings.xlsx`

**Columns:**
- Keyword
- Target URL
- Current Rank (check manually)
- Previous Rank (last week)
- Change (+/-)
- Date Checked

**Process:**
- Check top 50 keywords weekly (manually search in incognito mode)
- Record position (1-100, or "NR" if not ranking)
- Track progress over time

**Time:** 30-45 minutes per week

---

## Part 5: Competitor Analysis

### Identify Main Competitors

**SEO Competitors (Who ranks for your keywords):**
1. **Military.com** (DA 82) - Broad military content
2. **VA.gov** (DA 95) - Official VA content
3. **Indeed.com/Military** (DA 93) - Job listings
4. **Veterans United** (DA 68) - VA loans, benefits
5. **Military OneSource** (DA 80) - Official transition resources

**Monitor:**
- What keywords they rank for (Ahrefs → Competing domains)
- What content they publish (set Google Alerts)
- Their backlink profile (Ahrefs → Backlinks)
- Their traffic trends (SimilarWeb estimates)

---

### Google Alerts Setup

**URL:** https://www.google.com/alerts

**Create alerts for:**
1. "military transition" (monitor new content)
2. "va disability" (monitor VA content)
3. "veteran benefits" (monitor competitor posts)
4. "militarytransitiontoolkit.com" (monitor your mentions)

**Frequency:** Daily digest
**Purpose:** Stay informed on competitor content, find guest post opportunities, track brand mentions

---

## Part 6: Dashboard & Reporting

### Create Weekly SEO Dashboard

**Tools:** Google Sheets or Excel

**Metrics to Track Weekly:**

| Metric | Current Week | Last Week | Change | Goal |
|--------|--------------|-----------|--------|------|
| **Traffic** |  |  |  |  |
| Total Organic Sessions | 0 | 0 | - | 10,000 |
| Total Pageviews | 0 | 0 | - | 25,000 |
| Avg. Session Duration | 0:00 | 0:00 | - | 2:00 |
| Bounce Rate | 0% | 0% | - | <60% |
| **Indexing** |  |  |  |  |
| Indexed Pages (GSC) | 0 | 0 | - | 1,600 |
| Coverage Errors | 0 | 0 | - | 0 |
| **Rankings** |  |  |  |  |
| Keywords in Top 10 | 0 | 0 | - | 100 |
| Keywords in Top 20 | 0 | 0 | - | 200 |
| Avg. Position (GSC) | 0 | 0 | - | <15 |
| **Conversions** |  |  |  |  |
| Email Signups | 0 | 0 | - | 500/week |
| Tool Uses | 0 | 0 | - | 2,000/week |
| Affiliate Clicks | 0 | 0 | - | 100/week |
| **Backlinks** |  |  |  |  |
| Total Backlinks | 0 | 0 | - | 200 |
| Referring Domains | 0 | 0 | - | 100 |

---

### 90-Day Milestones

**Month 1 Goals:**
- 500 indexed pages
- 1,000 organic sessions/month
- 50 keywords ranking (any position)
- 10 backlinks

**Month 2 Goals:**
- 1,000 indexed pages
- 5,000 organic sessions/month
- 100 keywords ranking
- 10 keywords in top 20
- 30 backlinks

**Month 3 Goals:**
- 1,600 indexed pages (100%)
- 10,000 organic sessions/month
- 200 keywords ranking
- 30 keywords in top 10
- 50 backlinks

**Month 6 Goals (Aspirational):**
- 25,000 organic sessions/month
- 500 keywords ranking
- 100 keywords in top 10
- 100 backlinks
- 500 email signups/month

---

## Part 7: ROI Calculation

### Tracking Value

**Assign Value to Conversions:**

1. **Email Signup:** $5
   - Rationale: Industry average email lead value
   - Potential: Email list = future revenue (courses, affiliate, sponsorships)

2. **Affiliate Click:** $2
   - Rationale: Estimated conversion rate × commission
   - Example: 10% convert × $20 commission = $2 per click

3. **Tool Usage:** $0 (engagement, not direct revenue)
   - Tracks engagement, indicates content quality

**Monthly Revenue Estimate:**
```
Email Signups: 500/mo × $5 = $2,500
Affiliate Clicks: 200/mo × $2 = $400
Total Monthly Value: $2,900
```

**SEO ROI:**
```
Monthly Value: $2,900
Monthly Cost: $200 (hosting, tools, time)
ROI: ($2,900 - $200) / $200 = 1,350% ROI
```

**Note:** These are conservative estimates. Actual value increases with scale and monetization.

---

## Part 8: Monitoring & Alerts

### Set Up Alerts for Issues

**Google Search Console Alerts:**
- Coverage errors (crawl failures)
- Mobile usability issues
- Core Web Vitals issues

**Google Analytics Alerts (Admin → Custom alerts):**
- Traffic drops >50% week-over-week
- Conversion rate drops >30%
- Specific page traffic drops >70%

**Ahrefs Alerts (if using):**
- Lost backlinks
- Ranking drops (keyword falls out of top 20)
- New competitor backlinks

---

## Part 9: Privacy & Compliance

### GDPR / CCPA Compliance

**Requirements:**
- Cookie consent banner (if targeting EU/CA users)
- Privacy policy (link in footer)
- User data controls (delete account, export data)

**Implementation (Simple):**

Add cookie consent banner:
```bash
npm install react-cookie-consent
```

Add to `App.jsx`:
```javascript
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="gdpr_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      >
        We use cookies to analyze site traffic and improve your experience.{' '}
        <a href="/privacy" style={{ color: '#fff' }}>Learn more</a>
      </CookieConsent>
      {/* Your app */}
    </>
  );
}
```

**Privacy Policy:**
- Use generator: https://www.termsfeed.com/privacy-policy-generator/
- Include: What data you collect, how you use it, user rights
- Link in footer: `/privacy`

---

## Part 10: Tools Summary

### Free Tools (Use These)
- ✅ Google Search Console (required)
- ✅ Google Analytics 4 (required)
- ✅ Google Alerts (monitoring)
- ✅ Microsoft Clarity (heatmaps, session recordings)

### Paid Tools (Optional but Helpful)
- Ahrefs ($99/mo) - Rank tracking, backlink analysis, competitor research
- Semrush ($119/mo) - All-in-one SEO platform
- Plausible ($9/mo) - Privacy-friendly analytics alternative

### Total Monthly Cost
- **Minimum:** $0 (all free tools)
- **Recommended:** $99-119 (Ahrefs or Semrush for rank tracking)

---

## Next Steps (Implementation Checklist)

### Week 1: Core Setup
- [ ] Set up Google Search Console (verify domain)
- [ ] Submit sitemaps to GSC
- [ ] Set up Google Analytics 4 (create property)
- [ ] Install GA4 in React app (add tracking code)
- [ ] Test GA4 (check Realtime report for live traffic)

### Week 2: Advanced Tracking
- [ ] Set up key events (email signup, tool usage)
- [ ] Configure enhanced measurement
- [ ] Create custom dimensions (user_type, military_branch)
- [ ] Set up conversion goals
- [ ] Add cookie consent banner

### Week 3: Monitoring
- [ ] Set up rank tracking (Ahrefs or manual spreadsheet)
- [ ] Create weekly dashboard spreadsheet
- [ ] Set up Google Alerts (competitors, brand mentions)
- [ ] Configure Search Console alerts
- [ ] Create privacy policy page

### Week 4: Reporting
- [ ] Create first weekly report (baseline metrics)
- [ ] Set 90-day goals
- [ ] Document tracking process
- [ ] Schedule weekly review (every Monday at 9am)

---

## Ongoing Monitoring Schedule

### Daily (5 minutes)
- Check Google Analytics Realtime (is tracking working?)
- Review any critical alerts

### Weekly (30 minutes)
- Update dashboard spreadsheet
- Review top 10 performing pages
- Check Search Console coverage report (indexing issues?)
- Track top 50 keyword rankings (if manual)

### Monthly (2 hours)
- Detailed report: traffic, rankings, conversions, backlinks
- Analyze underperforming pages (opportunities for optimization)
- Review goals vs. actual performance
- Adjust strategy based on data

### Quarterly (4 hours)
- Comprehensive SEO audit
- Competitor analysis update
- Content refresh plan (update outdated content)
- Set next quarter goals

---

**Goal:** Data-driven SEO strategy with clear visibility into performance, conversions, and ROI.
