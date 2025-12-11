import { useState, useEffect, useCallback } from 'react'

const ONBOARDING_STORAGE_KEY = 'onboardingProgress'
const BANNER_DISMISSED_KEY = 'welcomeBannerDismissed'

// Default onboarding items
const DEFAULT_ONBOARDING_ITEMS = {
  separationDateSet: false,
  transitionAssessmentComplete: false,
  resumeStarted: false,
  stateBenefitsViewed: false,
  vaClaimsStarted: false
}

/**
 * Hook to manage onboarding progress for new users
 * Tracks completion of key getting started items
 */
export function useOnboardingProgress() {
  const [progress, setProgress] = useState(DEFAULT_ONBOARDING_ITEMS)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (savedProgress) {
        setProgress({ ...DEFAULT_ONBOARDING_ITEMS, ...JSON.parse(savedProgress) })
      }

      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
      setBannerDismissed(dismissed === 'true')
    } catch (e) {
      console.error('Error loading onboarding progress:', e)
    }
    setLoaded(true)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(progress))
      } catch (e) {
        console.error('Error saving onboarding progress:', e)
      }
    }
  }, [progress, loaded])

  // Mark a specific item as complete
  const markComplete = useCallback((itemKey) => {
    setProgress(prev => ({
      ...prev,
      [itemKey]: true
    }))
  }, [])

  // Dismiss the welcome banner
  const dismissBanner = useCallback(() => {
    setBannerDismissed(true)
    try {
      localStorage.setItem(BANNER_DISMISSED_KEY, 'true')
    } catch (e) {
      console.error('Error dismissing banner:', e)
    }
  }, [])

  // Calculate completion stats
  const completedCount = Object.values(progress).filter(Boolean).length
  const totalCount = Object.keys(progress).length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Check if onboarding should be shown (less than 3 items complete)
  const shouldShowChecklist = completedCount < 3

  // Check if user is brand new (0 items complete)
  const isNewUser = completedCount === 0

  // Reset onboarding (for testing)
  const resetOnboarding = useCallback(() => {
    setProgress(DEFAULT_ONBOARDING_ITEMS)
    setBannerDismissed(false)
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    localStorage.removeItem(BANNER_DISMISSED_KEY)
  }, [])

  return {
    progress,
    bannerDismissed,
    loaded,
    completedCount,
    totalCount,
    completionPercentage,
    shouldShowChecklist,
    isNewUser,
    markComplete,
    dismissBanner,
    resetOnboarding
  }
}

/**
 * Helper to check and mark onboarding items based on existing localStorage data
 * Call this on app load to sync onboarding with actual user progress
 */
export function syncOnboardingWithExistingData() {
  try {
    const currentProgress = JSON.parse(localStorage.getItem(ONBOARDING_STORAGE_KEY) || '{}')

    // Check if separation date is set
    const userSetup = localStorage.getItem('userSetup')
    if (userSetup) {
      const parsed = JSON.parse(userSetup)
      if (parsed.separationDate) {
        currentProgress.separationDateSet = true
      }
    }

    // Check if resume has been started
    const resumeData = localStorage.getItem('resumeData')
    if (resumeData) {
      const parsed = JSON.parse(resumeData)
      if (parsed.contactInfo || parsed.experience?.length > 0) {
        currentProgress.resumeStarted = true
      }
    }

    // Check if state benefits were viewed (if comparison exists)
    const stateComparison = localStorage.getItem('stateComparison')
    if (stateComparison) {
      currentProgress.stateBenefitsViewed = true
    }

    // Check if VA claims have been started
    const vaConditions = localStorage.getItem('vaClaimsConditions')
    if (vaConditions) {
      const parsed = JSON.parse(vaConditions)
      if (parsed.length > 0) {
        currentProgress.vaClaimsStarted = true
      }
    }

    // Check if transition assessment (timeline/progress) was viewed
    const timelineVisited = localStorage.getItem('timelineVisited')
    const progressVisited = localStorage.getItem('progressVisited')
    if (timelineVisited === 'true' || progressVisited === 'true') {
      currentProgress.transitionAssessmentComplete = true
    }

    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(currentProgress))
    return currentProgress
  } catch (e) {
    console.error('Error syncing onboarding data:', e)
    return DEFAULT_ONBOARDING_ITEMS
  }
}

export default useOnboardingProgress
