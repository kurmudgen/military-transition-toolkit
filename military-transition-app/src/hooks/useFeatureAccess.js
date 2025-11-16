import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { hasFeatureAccess, getUserLimits, hasReachedLimit, getUpgradeMessage } from '../utils/featureGating'

/**
 * Custom hook to check feature access
 * Returns whether user has access to a specific feature
 */
export const useFeatureAccess = (feature) => {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false)
        setLoading(false)
        return
      }

      try {
        const access = await hasFeatureAccess(feature)
        setHasAccess(access)
      } catch (error) {
        console.error('Error checking feature access:', error)
        setHasAccess(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [user, feature])

  return { hasAccess, loading, upgradeMessage: getUpgradeMessage(feature) }
}

/**
 * Custom hook to check usage limits
 * Returns current limits and whether user has reached them
 */
export const useUsageLimits = () => {
  const { user } = useAuth()
  const [limits, setLimits] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLimits = async () => {
      if (!user) {
        setLimits(null)
        setLoading(false)
        return
      }

      try {
        const userLimits = await getUserLimits()
        setLimits(userLimits)
      } catch (error) {
        console.error('Error fetching limits:', error)
        setLimits(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLimits()
  }, [user])

  const checkLimit = async (limitType, currentCount) => {
    if (!limits) return false
    return await hasReachedLimit(limitType, currentCount)
  }

  return { limits, loading, checkLimit }
}
