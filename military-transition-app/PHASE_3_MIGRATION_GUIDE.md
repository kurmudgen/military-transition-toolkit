# Phase 3: Component Migration Guide

## Overview

This guide explains how to migrate components from localStorage to Supabase services.

## What's Already Done

### ✅ Infrastructure Complete
- `src/utils/dataMigration.js` - Automatic migration on first login
- `src/hooks/useSupabaseData.js` - Custom hooks for data fetching
- `src/contexts/AuthContext.jsx` - Auto-triggers migration on login
- All service files created (userService, resumeService, jobService, etc.)

### ✅ Migration Strategy
When a user first logs in after this update, all their localStorage data will automatically migrate to Supabase. The migration runs once and is marked complete.

## Migration Pattern for Components

### Step 1: Import Services and Hooks

```javascript
import { useSupabaseData, useSupabaseMutation } from '../hooks/useSupabaseData'
import { getResumeData, saveResumeData } from '../services/resumeService'
import { useAuth } from '../contexts/AuthContext'
```

### Step 2: Replace localStorage with Supabase

**OLD WAY (localStorage):**
```javascript
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('resumeData')
  return saved ? JSON.parse(saved) : {}
})

const saveData = (newData) => {
  localStorage.setItem('resumeData', JSON.stringify(newData))
  setData(newData)
}
```

**NEW WAY (Supabase):**
```javascript
const { data, loading, error, refetch } = useSupabaseData(getResumeData)
const { mutate, loading: saving } = useSupabaseMutation()

const saveData = async (newData) => {
  const result = await mutate(() => saveResumeData(newData))
  if (result.success) {
    refetch() // Refresh data from server
  }
}
```

### Step 3: Add Loading States

```javascript
if (loading) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  )
}
```

### Step 4: Handle Errors

```javascript
{error && (
  <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
    {error}
  </div>
)}
```

## Components That Need Migration

### Priority 1: Critical User-Facing Components
- [ ] `src/pages/Home.jsx` - Dashboard (uses user setup, checklists, appointments, VA data)
- [ ] `src/pages/ResumeBuilder.jsx` - Resume data
- [ ] `src/pages/JobSearch.jsx` - Saved jobs and applications
- [ ] `src/pages/VAClaimsBuilder.jsx` - VA conditions and evidence
- [ ] `src/pages/AppointmentsTracking.jsx` - Appointments
- [ ] `src/pages/StateBenefits.jsx` - State comparison

### Priority 2: Checklist Components
- [ ] `src/pages/Retirement.jsx` - Retirement checklist
- [ ] `src/pages/MedBoard.jsx` - MedBoard checklist
- [ ] `src/pages/SeparationUnder20.jsx` - Separation checklist

### Priority 3: Supporting Components
- [ ] `src/pages/Resources.jsx` - Resource ratings and custom resources
- [ ] `src/pages/Profile.jsx` - User profile data
- [ ] `src/pages/Progress.jsx` - Overall progress (reads multiple sources)
- [ ] `src/components/RemindersWidget.jsx` - Reminders data

## Service Reference

### User Service
```javascript
import { getUserProfile, updateUserProfile, getUserSetup, updateUserSetup } from '../services/userService'
```

### Resume Service
```javascript
import { getResumeData, saveResumeData, getAllResumes, createResume } from '../services/resumeService'
// Note: Free tier limit - 1 resume max
```

### Job Service
```javascript
import { getSavedJobs, saveJob, getJobApplications, createJobApplication } from '../services/jobService'
// Note: Free tier limit - 5 saved jobs max
```

### VA Service
```javascript
import { getVAConditions, createVACondition, getAllVAEvidence, createVAEvidence } from '../services/vaService'
```

### Appointment Service
```javascript
import { getAppointments, getUpcomingAppointments, createAppointment } from '../services/appointmentService'
```

### Checklist Service
```javascript
import { getChecklistProgress, updateChecklistProgress, toggleChecklistItem } from '../services/checklistService'
// Checklist types: 'retirement', 'medboard', 'separation'
```

### Resource Service
```javascript
import { getResourceRatings, saveResourceRating, getCustomResources } from '../services/resourceService'
```

### State Benefits Service
```javascript
import { getStateComparison, saveStateComparison } from '../services/stateBenefitsService'
```

## Example: Complete Component Migration

### Before (localStorage):
```javascript
export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData')
    return saved ? JSON.parse(saved) : { contactInfo: {}, experience: [] }
  })

  const handleSave = (data) => {
    localStorage.setItem('resumeData', JSON.stringify(data))
    setResumeData(data)
  }

  return <div>{/* UI */}</div>
}
```

### After (Supabase):
```javascript
import { useSupabaseData, useSupabaseMutation } from '../hooks/useSupabaseData'
import { getResumeData, saveResumeData } from '../services/resumeService'

export default function ResumeBuilder() {
  const { data: resumeData, loading, error, refetch } = useSupabaseData(getResumeData)
  const { mutate, loading: saving } = useSupabaseMutation()

  const handleSave = async (data) => {
    const result = await mutate(() => saveResumeData(data))
    if (result.success) {
      refetch()
      // Show success message
    } else {
      // Show error message
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return <div>{/* UI with resumeData */}</div>
}
```

## Testing Data Isolation

After migration, test that users can only see their own data:

1. Create User A - add resume, jobs, VA claims
2. Log out
3. Create User B - add different resume, jobs
4. User A should NOT see User B's data
5. User B should NOT see User A's data

This is enforced by Row Level Security (RLS) policies in Supabase.

## Troubleshooting

### Data not showing after migration
- Check browser console for errors
- Verify user is authenticated
- Check Supabase dashboard for data
- Verify RLS policies are active

### Migration failed
- Check `localStorage.getItem('supabase_migration_completed')`
- If migration failed, you can manually retry by removing this key
- Check console for specific migration errors

### Performance issues
- Use `useSupabaseData` hook which handles caching
- Avoid calling services directly in render
- Use `refetch()` only when data changes

## Next Steps After Component Migration

Once all components are migrated:

1. Test all features thoroughly
2. Verify data isolation between users
3. Test migration with real localStorage data
4. Move to Phase 4: Stripe Integration
5. Move to Phase 5: Feature Gating

## Timeline Estimate

- Priority 1 components: 4-6 hours
- Priority 2 components: 2-3 hours
- Priority 3 components: 2-3 hours
- Testing: 2-3 hours
- **Total: 10-15 hours**

This migration can be done incrementally - start with Priority 1 and release, then continue with Priority 2 and 3.
