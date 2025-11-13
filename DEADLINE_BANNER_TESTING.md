# Deadline Banner Testing Guide

## Overview
The DeadlineBanner component displays a countdown timer for the Founding Member deadline (Nov 20, 2025) and automatically switches to a trial banner after the deadline passes.

## Component Location
- **File:** `src/components/DeadlineBanner.jsx`
- **Integration:** `src/components/Layout.jsx` (lines 8, 223)

---

## Testing Scenarios

### 1. Test Before Deadline (Current State)

**Expected Behavior:**
- ✅ Banner displays at top of page (above PromoBanner)
- ✅ Gold/yellow gradient background
- ✅ Shows: "🎖️ FREE LIFETIME ACCESS ends Nov 19! Sign up now to become a Founding Member."
- ✅ Displays countdown: "Xd Xh Xm remaining"
- ✅ "Sign Up Free" button links to `/signup`
- ✅ Banner is NOT dismissible (no X button)
- ✅ Countdown updates every minute

**How to Test:**
1. Run: `npm run dev`
2. Navigate to: http://localhost:5173/app
3. Observe banner at top of page
4. Wait 1 minute - verify countdown updates
5. Verify button links to signup page

---

### 2. Test Urgent State (< 24 hours remaining)

**Expected Behavior:**
- ✅ Background changes to orange gradient
- ✅ Message changes to: "FINAL HOURS! FREE LIFETIME ACCESS ends Nov 19!"
- ✅ Countdown timer has red background with shadow
- ✅ Button shows white background with red text

**How to Test:**
1. Open `src/components/DeadlineBanner.jsx`
2. Change line 6 to set deadline to tomorrow:
   ```javascript
   const DEADLINE = new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours from now
   ```
3. Save and refresh browser
4. Verify orange gradient and urgent styling
5. **REVERT THIS CHANGE AFTER TESTING**

---

### 3. Test Very Urgent State (< 1 hour remaining)

**Expected Behavior:**
- ✅ Background changes to red gradient with pulse animation
- ✅ Message changes to: "LAST CHANCE! Less than 1 hour remaining for FREE LIFETIME ACCESS!"
- ✅ Countdown timer hidden (too urgent)
- ✅ Button shows: "🚨 Sign Up NOW!" with bounce animation
- ✅ Button has ring glow effect

**How to Test:**
1. Open `src/components/DeadlineBanner.jsx`
2. Change line 6 to set deadline to 30 minutes from now:
   ```javascript
   const DEADLINE = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
   ```
3. Save and refresh browser
4. Verify red gradient, pulse animation, and bounce effect
5. **REVERT THIS CHANGE AFTER TESTING**

---

### 4. Test After Deadline (Post-Nov 20, 2025)

**Expected Behavior:**
- ✅ Banner displays with blue gradient
- ✅ Shows: "🚀 Start your 7-day free trial today. No credit card required."
- ✅ "Try Free" button links to `/signup`
- ✅ Banner IS dismissible (X button in corner)
- ✅ Dismissal persists in localStorage
- ✅ No countdown timer

**How to Test:**
1. Open `src/components/DeadlineBanner.jsx`
2. Change line 6 to set deadline to yesterday:
   ```javascript
   const DEADLINE = new Date('2024-01-01T00:00:00-08:00') // Past date
   ```
3. Save and refresh browser
4. Verify blue gradient and trial message
5. Click X button - banner should disappear
6. Refresh page - banner should stay hidden
7. Clear localStorage and refresh - banner reappears
8. **REVERT THIS CHANGE AFTER TESTING**

---

### 5. Test Automatic Switching

**Expected Behavior:**
- ✅ Banner automatically switches from countdown to trial banner when deadline passes
- ✅ No page refresh needed
- ✅ Dismissal state resets when deadline passes

**How to Test:**
1. Open `src/components/DeadlineBanner.jsx`
2. Set deadline to 2 minutes from now:
   ```javascript
   const DEADLINE = new Date(Date.now() + 2 * 60 * 1000) // 2 minutes from now
   ```
3. Save and refresh browser
4. Observe countdown banner
5. Wait 2+ minutes
6. Banner should automatically switch to trial banner
7. **REVERT THIS CHANGE AFTER TESTING**

---

### 6. Test Mobile Responsiveness

**Expected Behavior:**
- ✅ Banner stacks to 2 lines on mobile (< 640px)
- ✅ Text remains readable
- ✅ Button stays visible and clickable
- ✅ Countdown timer remains legible
- ✅ Dismiss button (post-deadline) stays in corner

**How to Test:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test viewport sizes:
   - 320px (iPhone SE)
   - 375px (iPhone 12 Pro)
   - 768px (iPad)
   - 1024px (Desktop)
4. Verify layout at each breakpoint

---

### 7. Test Accessibility

**Expected Behavior:**
- ✅ Banner has `role="banner"`
- ✅ Countdown has proper `aria-label`
- ✅ Buttons have descriptive `aria-label`
- ✅ Color contrast meets WCAG AA standards
- ✅ Keyboard navigation works (Tab to button, Enter to activate)

**How to Test:**
1. Use keyboard to navigate:
   - Press Tab until button is focused
   - Press Enter to activate
2. Use screen reader (NVDA/JAWS/VoiceOver):
   - Should announce banner content
   - Should read countdown time
   - Should announce button purpose
3. Run Lighthouse accessibility audit:
   - Open DevTools → Lighthouse → Accessibility
   - Score should be 90+

---

### 8. Test Performance

**Expected Behavior:**
- ✅ Banner loads instantly (< 100ms)
- ✅ Countdown updates don't cause layout shift
- ✅ No memory leaks from setInterval
- ✅ Timer cleanup on unmount

**How to Test:**
1. Open DevTools → Performance
2. Start recording
3. Navigate between pages
4. Stop recording
5. Verify no long tasks or jank
6. Check memory usage doesn't increase over time

---

### 9. Test Edge Cases

#### User's Clock is Wrong
**Test:** Set system clock to 2026
**Expected:** Banner shows trial version (correct behavior)

#### Browser localStorage Disabled
**Test:** Disable cookies/storage in browser settings
**Expected:** Banner works but dismissal doesn't persist (acceptable)

#### Timezone Differences
**Test:** Change system timezone to EST, CST, MST
**Expected:** Countdown adjusts correctly (PST deadline converts properly)

#### Multiple Tabs Open
**Test:** Open app in 2 tabs, dismiss in one
**Expected:** Dismissal only affects that tab (sessionStorage per tab is fine)

---

## Manual Testing Checklist

Before deploying to production, verify:

- [ ] Banner displays correctly before deadline
- [ ] Countdown updates every minute
- [ ] Urgent styling appears when < 24 hours
- [ ] Very urgent styling appears when < 1 hour
- [ ] Banner switches to trial version after deadline
- [ ] Trial banner is dismissible
- [ ] Dismissal persists in localStorage
- [ ] Mobile layout works on phones (< 640px)
- [ ] Tablet layout works (640px - 1024px)
- [ ] Desktop layout works (> 1024px)
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Button links work (/signup)
- [ ] No console errors
- [ ] No performance issues

---

## Production Deployment

### Pre-Deployment Checklist

1. **Verify Deadline is Correct**
   ```javascript
   // src/components/DeadlineBanner.jsx line 6
   const DEADLINE = new Date('2025-11-20T00:00:00-08:00')
   ```
   - ✅ Date: November 20, 2025
   - ✅ Time: 00:00:00 (midnight)
   - ✅ Timezone: PST (America/Los_Angeles)

2. **Verify Links are Correct**
   - Line 116: `to="/signup"` ✅
   - Line 160: `to="/signup"` ✅

3. **Verify No Test Code Left**
   - No console.log statements
   - No temporary deadlines for testing
   - No debug flags

4. **Build Test**
   ```bash
   npm run build
   ```
   - ✅ No build errors
   - ✅ No TypeScript errors
   - ✅ No linting errors

### Deployment Steps

1. **Commit Changes**
   ```bash
   git add src/components/DeadlineBanner.jsx
   git add src/components/Layout.jsx
   git commit -m "Add founding member deadline banner with countdown timer"
   ```

2. **Push to Production**
   ```bash
   git push origin main
   ```

3. **Verify Deployment**
   - Visit production URL
   - Check banner appears correctly
   - Test countdown updates
   - Test mobile responsiveness

---

## Monitoring After Deployment

### Day 1-7: Early Monitoring
- Check analytics: banner view rate
- Check conversion: signup clicks from banner
- Monitor console for errors
- Check mobile traffic works correctly

### Days Remaining < 7: Increased Urgency
- Verify urgent styling appears correctly
- Check countdown accuracy
- Monitor signup rate increase

### Deadline Day (Nov 19/20):
- Monitor countdown closely
- Verify banner switches at midnight PST
- Check trial banner appears correctly
- Monitor signup conversion on trial banner

### Post-Deadline:
- Verify trial banner shows
- Check dismissal works
- Monitor localStorage persistence

---

## Troubleshooting

### Banner Not Appearing
**Cause:** Component not imported or rendered
**Fix:** Check `Layout.jsx` lines 8 and 223

### Countdown Not Updating
**Cause:** Timer not running
**Fix:** Check browser console for errors, verify useEffect cleanup

### Wrong Timezone
**Cause:** Deadline timezone incorrect
**Fix:** Verify `-08:00` offset in DEADLINE constant (PST)

### Banner Still Shows After Dismissal
**Cause:** localStorage not working
**Fix:** Check browser allows localStorage, verify key name

### Countdown Shows Negative Time
**Cause:** System clock ahead of deadline
**Fix:** This is expected behavior - banner should switch to trial version

### Mobile Layout Broken
**Cause:** Tailwind breakpoints not working
**Fix:** Check `sm:` and `lg:` prefixes in className strings

---

## Future Enhancements (Post-Launch)

Ideas for v2:
- [ ] Add seconds to countdown when < 5 minutes
- [ ] Add sound/notification at T-1 hour
- [ ] Track banner impressions and clicks
- [ ] A/B test different messages
- [ ] Add confetti animation on signup from banner
- [ ] Show "X people signed up today" social proof
- [ ] Personalize message based on user's profile

---

## Analytics to Track

Set up tracking for:
1. Banner impressions (views)
2. Banner clicks (to /signup)
3. Conversion rate (signups from banner)
4. Dismissal rate (post-deadline)
5. Mobile vs Desktop engagement
6. Time-to-conversion from first banner view

---

## Emergency Rollback

If banner causes critical issues:

1. **Quick Fix:** Comment out in Layout.jsx
   ```jsx
   {/* <DeadlineBanner /> */}
   ```

2. **Full Rollback:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

3. **Disable via Feature Flag** (if implemented):
   ```javascript
   const DEADLINE_BANNER_ENABLED = false
   ```

---

## Success Metrics

Goals for this feature:
- **Primary:** Increase signup rate by 20-30%
- **Secondary:** Create urgency and FOMO
- **Tertiary:** Maintain conversion after deadline switches to trial

Track:
- Daily signups (before vs during countdown)
- Hourly signups (last 24 hours)
- Banner click-through rate (CTR)
- Mobile vs Desktop conversion rates

---

## Contact

Questions about this feature?
- Developer: [Your Name]
- Product: [Product Manager Name]
- Analytics: [Analytics Team]

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Status:** Ready for Production ✅
