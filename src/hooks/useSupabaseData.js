import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

/**
 * Custom hook for fetching and managing Supabase data
 * Handles loading states, errors, and refetching
 */
export const useSupabaseData = (fetchFunction, dependencies = []) => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    if (!user) {
      setData(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message || 'An error occurred')
      console.error('useSupabaseData error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user, ...dependencies])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Custom hook for mutation operations (create, update, delete)
 */
export const useSupabaseMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (mutationFunction) => {
    setLoading(true)
    setError(null)

    try {
      const result = await mutationFunction()
      setLoading(false)
      return { success: true, data: result, error: null }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)
      setLoading(false)
      return { success: false, data: null, error: errorMessage }
    }
  }

  return { mutate, loading, error }
}
