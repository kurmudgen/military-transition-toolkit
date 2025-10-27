# Feature Gating Implementation Guide

## Phase 5: Free vs Premium Feature Gating

This guide explains how to implement feature gating throughout the Military Transition Toolkit app.

## Overview

Feature gating ensures that:
- Free users have limited access (1 resume, 5 saved jobs, no exports)
- Premium users get unlimited access to all features
- Users see clear upgrade prompts when hitting limits
- The app gracefully handles feature restrictions

## Free Tier Limits

```javascript
FREE_TIER = {
  resumes: 1,
  savedJobs: 5,
  exports: false,
  aiQuestions: 0
}

PREMIUM_TIER = {
  resumes: Infinity,
  savedJobs: Infinity,
  exports: true,
  aiQuestions: 50
}
```

## Implementation Patterns

### Pattern 1: Checking Feature Access

Use the `useFeatureAccess` hook to check if a user has access to a feature:

```javascript
import { useFeatureAccess } from '../hooks/useFeatureAccess'
import { FEATURES } from '../utils/featureGating'
import UpgradePrompt from '../components/UpgradePrompt'

export default function MyComponent() {
  const { hasAccess, loading, upgradeMessage } = useFeatureAccess(FEATURES.RESUME_EXPORT)

  if (loading) return <div>Loading...</div>

  if (!hasAccess) {
    return (
      <UpgradePrompt
        variant="banner"
        title="Export Disabled"
        message={upgradeMessage}
      />
    )
  }

  return <div>{/* Feature content */}</div>
}
```

### Pattern 2: Checking Usage Limits

Use the `useUsageLimits` hook to check if a user has reached their limit:

```javascript
import { useUsageLimits } from '../hooks/useFeatureAccess'
import { PremiumBadge } from '../components/UpgradePrompt'

export default function ResumeList() {
  const { limits, checkLimit } = useUsageLimits()
  const [resumes, setResumes] = useState([])
  const [showUpgrade, setShowUpgrade] = useState(false)

  const handleCreateResume = async () => {
    const reachedLimit = await checkLimit('resumes', resumes.length)

    if (reachedLimit) {
      setShowUpgrade(true)
      return
    }

    // Create resume...
  }

  return (
    <div>
      <button onClick={handleCreateResume}>
        Create Resume
        {limits?.resumes === 1 && <PremiumBadge size="sm" />}
      </button>

      {showUpgrade && (
        <UpgradePrompt
          variant="modal"
          message="Free users can only create 1 resume. Upgrade to Premium for unlimited resumes."
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </div>
  )
}
```

### Pattern 3: Inline Upgrade Prompts

Show inline prompts for locked features:

```javascript
import UpgradePrompt from '../components/UpgradePrompt'

export default function StateBenefits() {
  const { hasAccess } = useFeatureAccess(FEATURES.INTERACTIVE_STATE_COMPARISON)

  return (
    <div>
      <h1>State Benefits Comparison</h1>

      {hasAccess ? (
        <InteractiveComparison />
      ) : (
        <>
          <ReadOnlyComparison />
          <UpgradePrompt
            variant="inline"
            message="Upgrade to Premium for interactive state-by-state comparison with personalized recommendations."
          />
        </>
      )}
    </div>
  )
}
```

### Pattern 4: Feature Lock Overlay

Show a lock overlay on premium features:

```javascript
import { FeatureLockOverlay } from '../components/UpgradePrompt'
import { useNavigate } from 'react-router-dom'

export default function AdvancedFeature() {
  const navigate = useNavigate()
  const { hasAccess } = useFeatureAccess(FEATURES.FULL_VA_CLAIMS)

  return (
    <div className="relative">
      <div className={hasAccess ? '' : 'opacity-50 pointer-events-none'}>
        {/* Feature content */}
      </div>

      {!hasAccess && (
        <FeatureLockOverlay
          message="Full VA Claims Builder is a Premium feature"
          onUpgrade={() => navigate('/pricing')}
        />
      )}
    </div>
  )
}
```

### Pattern 5: Conditional Rendering with Badge

Show premium badge on locked features:

```javascript
import { PremiumBadge } from '../components/UpgradePrompt'

export default function FeatureList() {
  const { hasAccess: hasExport } = useFeatureAccess(FEATURES.RESUME_EXPORT)

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={!hasExport}
        className="flex items-center gap-2"
      >
        Export PDF
        {!hasExport && <PremiumBadge />}
      </button>
    </div>
  )
}
```

## Components to Implement Feature Gating

### Priority 1: Resume Builder

**File**: `src/pages/ResumeBuilder.jsx`

**Restrictions**:
- Limit to 1 resume for free users
- Disable PDF export for free users
- Add watermark to free user resumes

**Implementation**:
```javascript
import { useUsageLimits, useFeatureAccess } from '../hooks/useFeatureAccess'
import { FEATURES } from '../utils/featureGating'
import UpgradePrompt from '../components/UpgradePrompt'

// Check if user can create more resumes
const { checkLimit } = useUsageLimits()
const canCreateMore = !(await checkLimit('resumes', resumeCount))

// Check if user can export
const { hasAccess: canExport } = useFeatureAccess(FEATURES.RESUME_EXPORT)

// Show upgrade prompt when creating resume over limit
if (!canCreateMore) {
  return <UpgradePrompt variant="modal" message="..." />
}

// Disable export button for free users
<button disabled={!canExport}>
  Export PDF {!canExport && <PremiumBadge />}
</button>
```

### Priority 2: Job Search

**File**: `src/pages/JobSearch.jsx`

**Restrictions**:
- Limit to 5 saved jobs for free users

**Implementation**:
```javascript
const { checkLimit } = useUsageLimits()

const handleSaveJob = async (job) => {
  const reachedLimit = await checkLimit('savedJobs', savedJobs.length)

  if (reachedLimit) {
    setShowUpgradeModal(true)
    return
  }

  await saveJob(job)
}
```

### Priority 3: VA Claims Builder

**File**: `src/pages/VAClaimsBuilder.jsx`

**Restrictions**:
- Full builder only for premium users
- Free users see basic version

**Implementation**:
```javascript
const { hasAccess } = useFeatureAccess(FEATURES.FULL_VA_CLAIMS)

return hasAccess ? <FullVAClaimsBuilder /> : (
  <>
    <BasicVAClaimsBuilder />
    <UpgradePrompt
      variant="banner"
      message="Upgrade to Premium for full VA claims builder with evidence tracking and rating calculator."
    />
  </>
)
```

### Priority 4: State Benefits

**File**: `src/pages/StateBenefits.jsx`

**Restrictions**:
- Interactive comparison only for premium
- Free users get read-only view

**Implementation**:
```javascript
const { hasAccess } = useFeatureAccess(FEATURES.INTERACTIVE_STATE_COMPARISON)

return (
  <div>
    {hasAccess ? (
      <InteractiveStateBenefits />
    ) : (
      <>
        <ReadOnlyStateBenefits />
        <UpgradePrompt variant="inline" message="..." />
      </>
    )}
  </div>
)
```

### Priority 5: Dashboard (Home)

**File**: `src/pages/Home.jsx`

**Restrictions**:
- Show usage stats and limits
- Add upgrade prompts when nearing limits

**Implementation**:
```javascript
const { limits } = useUsageLimits()

// Show usage progress
<div className="usage-stats">
  <div>Resumes: {resumeCount} / {limits.resumes === Infinity ? '∞' : limits.resumes}</div>
  <div>Saved Jobs: {savedJobs.length} / {limits.savedJobs === Infinity ? '∞' : limits.savedJobs}</div>
</div>

// Show upgrade prompt when nearing limits
{savedJobs.length >= 4 && limits.savedJobs === 5 && (
  <UpgradePrompt
    variant="inline"
    message="You're almost at your saved jobs limit (5). Upgrade for unlimited saved jobs."
  />
)}
```

## Upgrade Prompt Variants

### 1. Banner (Top of page)
```javascript
<UpgradePrompt
  variant="banner"
  title="Unlock Premium Features"
  message="Upgrade to access unlimited resumes, exports, and more."
/>
```

### 2. Modal (Blocking)
```javascript
<UpgradePrompt
  variant="modal"
  title="Premium Feature"
  message="This feature requires a Premium subscription."
  onClose={() => setShowModal(false)}
/>
```

### 3. Inline (Within content)
```javascript
<UpgradePrompt
  variant="inline"
  message="Upgrade to Premium to unlock this feature."
/>
```

## Testing Feature Gating

### Test as Free User

1. Create account, don't subscribe
2. Try to create 2nd resume → Should see upgrade prompt
3. Try to export PDF → Should be disabled
4. Save 6 jobs → Should see upgrade prompt on 6th
5. Access VA claims → Should see basic version
6. Access state benefits → Should see read-only version

### Test as Premium User

1. Create account, subscribe to Premium
2. Create multiple resumes → Should work
3. Export PDFs → Should work
4. Save unlimited jobs → Should work
5. Access all features → Should work

### Test Subscription Lifecycle

1. Start as free user → See limitations
2. Subscribe to Premium → Immediately unlock features
3. Cancel subscription → Keep access until period end
4. Subscription expires → Revert to free tier limitations

## Styling Upgrade Prompts

All upgrade prompts use Tailwind CSS with dark mode support:

```javascript
// Gradient button
className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"

// Premium badge
className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full"

// Lock overlay
className="bg-gray-900/10 dark:bg-gray-900/30 backdrop-blur-sm"
```

## Best Practices

1. **Be transparent**: Clearly show what's free vs premium
2. **Be helpful**: Explain why upgrade is valuable
3. **Be respectful**: Don't spam upgrade prompts
4. **Be consistent**: Use same patterns throughout app
5. **Be graceful**: Handle edge cases (expired subs, etc.)

## Checklist

Before launching:

- [ ] All free tier limits enforced
- [ ] Upgrade prompts on all locked features
- [ ] Premium badges on premium-only buttons
- [ ] Usage stats visible on dashboard
- [ ] Watermarks on free tier exports (if applicable)
- [ ] Tested as both free and premium user
- [ ] Tested subscription lifecycle
- [ ] Analytics tracking for upgrade prompt views

## Next Steps

After implementing feature gating:

1. Monitor conversion rates (free → premium)
2. A/B test upgrade prompt messaging
3. Add analytics to track which features drive upgrades
4. Optimize pricing based on usage data
5. Consider adding intermediate tier if needed
