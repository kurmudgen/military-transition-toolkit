---

date: "2026-01-25"
---# Analytics & Tracking Implementation Guide
## Data-Driven Decision Making from Day 1

**Objective**: Implement comprehensive analytics to track every aspect of the business and make data-driven decisions.

---

## Table of Contents
1. [Analytics Stack](#analytics-stack)
2. [Google Analytics 4 Setup](#google-analytics-4-setup)
3. [Conversion Tracking](#conversion-tracking)
4. [Email Analytics](#email-analytics)
5. [Revenue Metrics](#revenue-metrics)
6. [Weekly Dashboard](#weekly-dashboard)

---

## Analytics Stack

### Essential Tools (Week 1)

**1. Google Analytics 4** (Free)
- Website traffic tracking
- User behavior analysis
- Conversion funnel visualization
- Audience demographics

**2. Google Search Console** (Free)
- SEO performance
- Keyword rankings
- Click-through rates
- Index coverage

**3. Email Platform Analytics** (ConvertKit, Mailchimp)
- Open rates
- Click rates
- Subscriber growth
- Automation performance

**4. Stripe Dashboard** (Payment processor)
- Revenue tracking
- MRR/ARR
- Churn rate
- Customer lifetime value

---

### Advanced Tools (Week 4+)

**5. Hotjar** ($39/mo)
- Heatmaps (where users click)
- Session recordings (watch user behavior)
- Surveys (ask users why they do things)
- Funnel analysis

**6. Mixpanel or Amplitude** (Free tier available)
- Product analytics (feature usage)
- Cohort analysis
- Retention tracking
- User journey mapping

**7. Google Data Studio** (Free)
- Custom dashboards
- Combine data from multiple sources
- Automated reporting
- Share with team

---

## Google Analytics 4 Setup

### Week 1: Basic Implementation

#### Step 1: Create GA4 Property

1. Go to analytics.google.com
2. Create account: "Military Transition Toolkit"
3. Create property: "MTT - Production"
4. Select industry category: "Jobs & Education"
5. Set business size: "Small"
6. Select objectives: "Generate leads", "Examine user behavior"

#### Step 2: Install Tracking Code

**For each app**:
- militarytransitiontoolkit.com
- spouse-force.com
- militarymoneycoaching.com

**Installation**:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Place in**: `<head>` section of all pages

#### Step 3: Verify Installation

1. Visit your website
2. Open GA4 Real-time report
3. Confirm you see your visit

---

### Week 1: Event Tracking Setup

**Events to Track**:

#### Standard Events (Auto-tracked by GA4)
- page_view
- scroll
- click (outbound links)
- file_download
- video_start, video_complete

#### Custom Events (Manually implement)

**Lead Generation Events**:
```javascript
// Email signup (lead magnet)
gtag('event', 'generate_lead', {
  'lead_source': 'blog_post',
  'lead_magnet': '11B_career_guide'
});

// Tool usage
gtag('event', 'tool_usage', {
  'tool_name': 'mos_translator',
  'mos_code': '11B'
});

// Free trial signup
gtag('event', 'begin_trial', {
  'plan': '7_day_trial',
  'source': 'pricing_page'
});
```

**Conversion Events**:
```javascript
// Purchase (paid subscription)
gtag('event', 'purchase', {
  'transaction_id': 'sub_xxxxxxxxxx',
  'value': 7.00,
  'currency': 'USD',
  'plan': 'monthly',
  'items': [{
    'item_name': 'MTT Monthly Subscription',
    'price': 7.00,
    'quantity': 1
  }]
});

// Upgrade (monthly → annual)
gtag('event', 'upgrade', {
  'from_plan': 'monthly',
  'to_plan': 'annual',
  'value': 49.00
});
```

**Engagement Events**:
```javascript
// Profile completion
gtag('event', 'profile_complete', {
  'branch': 'Army',
  'mos': '11B',
  'ets_months': 18
});

// Feature usage
gtag('event': 'feature_used', {
  'feature_name': 'resume_builder',
  'session_duration': 450 // seconds
});

// Community post
gtag('event', 'community_post', {
  'category': 'career_advice',
  'post_length': 250 // characters
});
```

---

### Week 2: Conversion Funnels

**Funnel 1: Visitor → Paid Subscriber**

**Steps**:
1. Landing (blog post)
2. Lead magnet signup
3. Email click-through
4. Trial signup
5. Trial activation (profile complete)
6. Purchase

**Setup in GA4**:
1. Navigate to "Explore" → "Funnel exploration"
2. Add steps:
   - Step 1: page_view (blog_post)
   - Step 2: generate_lead
   - Step 3: email_click
   - Step 4: begin_trial
   - Step 5: profile_complete
   - Step 6: purchase
3. Set funnel type: "Closed" (must complete in order)
4. Save as "Visitor to Paid Funnel"

**Track Weekly**:
- Conversion rate at each step
- Drop-off points (where users leave)
- Time to convert (days from step 1 to 6)

---

**Funnel 2: Trial → Paid**

**Steps**:
1. Trial started
2. Profile completed
3. Timeline generated
4. Tool used (2+ tools)
5. Community joined
6. Purchase

**Goal**: Identify which actions during trial lead to highest conversion

---

### Week 3: Audience Segmentation

**Segments to Create**:

**By Branch**:
- Army users
- Navy users
- Marines users
- Air Force users
- Coast Guard users

**By User Type**:
- Trial users
- Paid subscribers
- Canceled users
- Engaged users (3+ sessions/week)
- Power users (daily usage)

**By Acquisition Channel**:
- Organic search
- Paid search (Google Ads)
- Social media (Facebook, LinkedIn, Reddit)
- Email marketing
- Partnerships

**By Intent**:
- Career searchers (visited career guides)
- VA benefits researchers (visited VA content)
- Tool users (used 3+ tools)
- Content consumers (5+ page views)

**Usage**:
- Compare conversion rates by segment
- Identify highest-value segments
- Customize marketing by segment

---

## Conversion Tracking

### Email Capture Tracking

**Goal**: Track lead magnet signups by source

**Implementation**:
```html
<!-- Add to lead magnet signup form -->
<form id="lead-magnet-form">
  <input type="email" name="email" required>
  <input type="hidden" name="source" value="blog_post">
  <input type="hidden" name="magnet" value="11B_career_guide">
  <button type="submit">Download Free Guide</button>
</form>

<script>
document.getElementById('lead-magnet-form').addEventListener('submit', function(e) {
  gtag('event', 'generate_lead', {
    'lead_source': this.source.value,
    'lead_magnet': this.magnet.value
  });
});
</script>
```

**Track**:
- Total signups
- Signups by source (which blog posts convert best?)
- Signups by lead magnet (which magnets are most popular?)

---

### Trial Signup Tracking

**Goal**: Track trial conversions by traffic source

**Implementation**:
```javascript
// On trial signup completion page
gtag('event', 'begin_trial', {
  'plan': '7_day_trial',
  'source': '<?= $_GET['utm_source'] ?>',
  'campaign': '<?= $_GET['utm_campaign'] ?>'
});

// Also track as conversion for ads
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/YYYYYYYYYY', // Google Ads conversion ID
  'value': 7.00,
  'currency': 'USD'
});
```

**Track**:
- Trial signups by source (organic, paid, email, social)
- Cost per trial (paid sources)
- Trial-to-paid conversion rate by source

---

### Purchase Tracking

**Goal**: Track all revenue events

**Implementation**:
```javascript
// On purchase confirmation page
gtag('event', 'purchase', {
  'transaction_id': '<?= $subscription_id ?>',
  'value': <?= $amount ?>,
  'currency': 'USD',
  'plan': '<?= $plan_type ?>', // monthly, annual, lifetime
  'items': [{
    'item_name': '<?= $plan_name ?>',
    'price': <?= $amount ?>,
    'quantity': 1
  }]
});

// Send to Google Ads
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/YYYYYYYYYY',
  'value': <?= $amount ?>,
  'currency': 'USD',
  'transaction_id': '<?= $subscription_id ?>'
});

// Send to Facebook Pixel (if using FB Ads)
fbq('track', 'Purchase', {
  value: <?= $amount ?>,
  currency: 'USD'
});
```

**Track**:
- Revenue by source
- Revenue by plan type
- ROI by marketing channel
- Customer acquisition cost (CAC)

---

## Email Analytics

### ConvertKit Tracking

**Metrics to Track Weekly**:

**List Growth**:
- New subscribers
- Unsubscribes
- Subscriber growth rate
- Subscribers by source (blog, tool, social)

**Email Performance**:
- Open rate (target: 25-30%)
- Click rate (target: 5-10%)
- Unsubscribe rate (target: < 0.5%)
- Bounce rate (target: < 2%)

**Automation Performance**:
- Welcome sequence: open rate, click rate, trial conversion
- Nurture sequence: engagement over time
- Re-engagement sequence: reactivation rate

---

### Email Segmentation Tracking

**Segments to Track**:

**By Engagement**:
- Engaged (opened in last 30 days)
- Inactive (no open in 30+ days)
- Dead (no open in 90+ days)

**By Conversion Status**:
- Trial started
- Paid subscriber
- Canceled subscriber
- Never converted

**By Interest** (based on clicks):
- Career transition focus
- VA benefits focus
- Education/GI Bill focus
- Entrepreneurship focus

**Usage**:
- Send different content to different segments
- Re-engage inactive subscribers
- Upsell to engaged non-buyers

---

## Revenue Metrics

### Key Metrics to Track Daily/Weekly

**MRR (Monthly Recurring Revenue)**:
```
MRR = (Monthly subscriptions × $7) + (Annual subscriptions × $4.08) + (Lifetime ÷ 36)

Example:
500 monthly × $7 = $3,500
100 annual × $4.08 = $408
20 lifetime ÷ 36 = $139
Total MRR = $4,047
```

**New MRR**:
```
New MRR = Revenue from new customers this month

Example:
50 new monthly subscribers × $7 = $350
10 new annual subscribers × $4.08 = $40.80
2 new lifetime ÷ 36 = $13.89
Total New MRR = $404.69
```

**Churned MRR**:
```
Churned MRR = Revenue lost from cancellations this month

Example:
20 monthly cancellations × $7 = $140
5 annual non-renewals × $4.08 = $20.40
Total Churned MRR = $160.40
```

**Net New MRR**:
```
Net New MRR = New MRR - Churned MRR

Example:
$404.69 - $160.40 = $244.29
```

**MRR Growth Rate**:
```
Growth Rate = (Net New MRR / Previous MRR) × 100

Example:
($244.29 / $4,047) × 100 = 6% monthly growth
```

---

**ARR (Annual Recurring Revenue)**:
```
ARR = MRR × 12

Example:
$4,047 × 12 = $48,564
```

---

**ARPU (Average Revenue Per User)**:
```
ARPU = Total MRR / Total Paid Users

Example:
$4,047 MRR / 620 paid users = $6.53 ARPU
```

---

**Customer Acquisition Cost (CAC)**:
```
CAC = Total Marketing Spend / New Customers

Example:
$1,500 spent / 60 new customers = $25 CAC
```

---

**Customer Lifetime Value (LTV)**:
```
LTV = ARPU × Average Customer Lifespan (months)

Example:
$7 ARPU × 18 months = $126 LTV
```

---

**LTV:CAC Ratio**:
```
Ratio = LTV / CAC

Example:
$126 / $25 = 5:1 ratio ✅ (Target: 3:1 or higher)
```

---

**Payback Period**:
```
Payback Period = CAC / ARPU

Example:
$25 CAC / $7 ARPU = 3.6 months to recover acquisition cost
```

---

**Churn Rate**:
```
Churn Rate = (Customers Lost This Month / Customers Start of Month) × 100

Example:
25 churned / 500 customers = 5% monthly churn
```

---

**Retention Rate**:
```
Retention Rate = 100% - Churn Rate

Example:
100% - 5% = 95% retention rate
```

---

## Weekly Dashboard

### Google Data Studio Dashboard

**Create Custom Dashboard** (Week 2):

**Section 1: Traffic Overview**
- Total visitors (this week vs last week)
- Visitors by source (organic, paid, social, email, referral)
- Top 10 landing pages
- Bounce rate
- Pages per session
- Average session duration

**Section 2: Conversion Funnel**
- Visitors → Email Signups (conversion rate)
- Email Signups → Trials (conversion rate)
- Trials → Paid (conversion rate)
- Overall: Visitors → Paid (conversion rate)

**Section 3: Revenue Metrics**
- MRR (current)
- New MRR (this month)
- Churned MRR (this month)
- Net New MRR (this month)
- MRR Growth Rate
- Total paid users

**Section 4: Email Performance**
- Email list size
- New subscribers (this week)
- Email open rate (average)
- Email click rate (average)
- Top performing emails

**Section 5: Content Performance**
- Top 10 blog posts (by traffic)
- Top 10 blog posts (by conversions)
- Total posts published
- Keywords ranking (top 10, top 20, top 100)

**Section 6: User Engagement**
- Daily active users (DAU)
- Weekly active users (WAU)
- Monthly active users (MAU)
- Average sessions per user
- Feature usage (top 5 features)

---

### Weekly Review Process

**Every Friday (30 minutes)**:

1. **Review Traffic**:
   - Did traffic grow week-over-week?
   - Which sources drove most traffic?
   - Which blog posts performed best?

2. **Review Conversions**:
   - How many email signups?
   - How many trials started?
   - How many paid conversions?
   - What's the conversion rate trend?

3. **Review Revenue**:
   - What's new MRR this week?
   - What's churn this week?
   - Are we on track for monthly goals?
   - What's LTV:CAC ratio?

4. **Identify Issues**:
   - Where is the funnel breaking? (highest drop-off point)
   - Which channels underperforming?
   - What content isn't converting?

5. **Plan Next Week**:
   - What to double down on? (winners)
   - What to fix? (problems)
   - What to test? (experiments)

---

### Monthly Deep Dive

**First Monday of Each Month (2 hours)**:

1. **Cohort Analysis**:
   - How is each monthly cohort performing?
   - Is retention improving over time?
   - Which cohort has highest LTV?

2. **Channel Performance**:
   - ROI by channel (revenue / spend)
   - Which channels to scale?
   - Which channels to cut?

3. **Content ROI**:
   - Which posts drove most traffic?
   - Which posts drove most conversions?
   - Which topics to create more of?

4. **Feature Adoption**:
   - What % of users adopted each feature?
   - Which features correlate with retention?
   - Which features to promote more?

5. **Set Next Month Goals**:
   - Traffic goal
   - Conversion goal
   - Revenue goal
   - Churn goal

---

## Tracking Implementation Checklist

### Week 1: Foundation
- [ ] Install GA4 on all 3 apps
- [ ] Setup Google Search Console
- [ ] Install email platform (ConvertKit)
- [ ] Connect Stripe for revenue tracking
- [ ] Verify all tracking is working

### Week 2: Events & Funnels
- [ ] Implement custom event tracking (leads, trials, purchases)
- [ ] Create conversion funnels in GA4
- [ ] Setup audience segments
- [ ] Create basic Data Studio dashboard

### Week 3: Advanced Tracking
- [ ] Install Hotjar (heatmaps, recordings)
- [ ] Implement UTM parameters for all campaigns
- [ ] Setup goal tracking in GA4
- [ ] Create email automation tracking

### Week 4: Optimization
- [ ] Build comprehensive Data Studio dashboard
- [ ] Setup weekly review process
- [ ] Identify optimization opportunities
- [ ] Begin A/B testing

---

## Conclusion: Track Everything

**What gets measured gets managed.**

Without analytics, you're flying blind. With comprehensive tracking, you can:

1. **Identify what works**: Double down on winning channels and content
2. **Fix what's broken**: Find and fix funnel leaks
3. **Optimize systematically**: Test and improve every step
4. **Make data-driven decisions**: No more guessing
5. **Scale confidently**: Know your unit economics

**Start tracking from Day 1. Future you will thank present you.**

---

*Analytics & Tracking Guide v1.0 | Data-Driven Growth*
