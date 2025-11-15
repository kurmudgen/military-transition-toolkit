# Home.jsx Safety Patch

This document contains the critical fixes needed in Home.jsx to prevent white screen crashes.

## 1. Add Import at Top of File

Add these imports after the existing imports:

```javascript
import {
  getSafeDaysUntilSeparation,
  getSafeDisplayName,
  isValidSeparationDate
} from '../utils/profileValidation'
```

## 2. Replace getDaysUntil Function (Line ~174)

**OLD CODE (UNSAFE):**
```javascript
const getDaysUntil = () => {
  if (!separationDate) return null
  const today = new Date()
  const targetDate = new Date(separationDate)
  const diffTime = targetDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
```

**NEW CODE (SAFE):**
```javascript
const getDaysUntil = () => {
  // Use safe utility function that handles empty strings and invalid dates
  return getSafeDaysUntilSeparation(separationDate)
}
```

## 3. Find Line ~351 and Make Safe

**BEFORE:**
```javascript
const daysUntil = getDaysUntil()
```

**AFTER (no change needed, but add null check in rendering):**
```javascript
const daysUntil = getDaysUntil()
```

## 4. In Rendering Section - Add Null Checks

Find where `daysUntil` is rendered (around line 500-600) and wrap in null check:

**BEFORE:**
```javascript
<div className="text-3xl font-bold text-blue-600">
  {daysUntil} days
</div>
```

**AFTER:**
```javascript
{daysUntil !== null ? (
  <div className="text-3xl font-bold text-blue-600">
    {daysUntil} days
  </div>
) : (
  <div className="text-sm text-gray-600">
    <a href="/app/setup" className="text-blue-600 hover:underline">
      Complete your profile
    </a> to see countdown
  </div>
)}
```

## 5. Update userName Rendering

Find where `userName` is displayed and make it safe:

**BEFORE:**
```javascript
<h1>{userName}</h1>
```

**AFTER:**
```javascript
<h1>{getSafeDisplayName(userName)}</h1>
```

## 6. Add Profile Completeness Check at Top of Component

After the state declarations (around line 30), add this check:

```javascript
// Check profile completeness on mount
useEffect(() => {
  const checkProfile = () => {
    const profile = { situation: userSetup, separationDate, name: userName }

    // Check if any required field is missing
    if (profileLoaded && (!userSetup || !separationDate || !userName)) {
      console.warn('⚠️ Incomplete profile detected, showing setup prompt')
      setShowSetup(true)
    }
  }

  if (profileLoaded) {
    checkProfile()
  }
}, [profileLoaded, userSetup, separationDate, userName])
```

## Testing After Patch

After applying these changes, test these scenarios:

1. **Empty localStorage:**
   - Open DevTools Console
   - Run: `localStorage.clear()`
   - Reload page
   - Should redirect to /app/setup

2. **Incomplete userSetup:**
   - Run: `localStorage.setItem('userSetup', '{"situation":"medboard","separationDate":"","name":""}')`
   - Reload page
   - Should redirect to /app/setup

3. **Complete profile:**
   - Run: `localStorage.setItem('userSetup', '{"situation":"retirement","separationDate":"2025-12-31","name":"John Doe"}')`
   - Reload page
   - Should work normally with countdown

4. **Invalid date:**
   - Run: `localStorage.setItem('userSetup', '{"situation":"retirement","separationDate":"invalid","name":"John Doe"}')`
   - Reload page
   - Should show "Complete profile" instead of crashing

## Manual Application

If you need to manually apply this patch:

1. Open `src/pages/Home.jsx`
2. Add the import statement at the top (step 1)
3. Replace the `getDaysUntil` function (step 2)
4. Add null checks in the rendering section (step 4)
5. Update userName rendering (step 5)
6. Add profile completeness check (step 6)

The app should now be resilient to incomplete profile data!
