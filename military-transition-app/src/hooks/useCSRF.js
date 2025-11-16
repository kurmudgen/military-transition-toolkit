// CSRF Token Hook
// SECURITY FIX: PENTEST-002 - Client-side CSRF token management

import { useState, useEffect } from 'react'

/**
 * Custom hook to manage CSRF tokens
 * Fetches a fresh CSRF token on mount and provides it to components
 * @returns {Object} - { csrfToken, loading, error, refreshToken }
 */
export function useCSRF() {
  const [csrfToken, setCSRFToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchToken = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.status}`)
      }

      const data = await response.json()
      setCSRFToken(data.csrfToken)
    } catch (err) {
      console.error('CSRF token fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch token on mount
  useEffect(() => {
    fetchToken()
  }, [])

  // Refresh token function (can be called manually if needed)
  const refreshToken = () => {
    fetchToken()
  }

  return {
    csrfToken,
    loading,
    error,
    refreshToken
  }
}

/**
 * Helper function to add CSRF token to fetch headers
 * @param {Object} headers - Existing headers object
 * @param {string} csrfToken - CSRF token to add
 * @returns {Object} - Headers with CSRF token
 */
export function addCSRFHeader(headers = {}, csrfToken) {
  if (!csrfToken) {
    console.warn('No CSRF token available - request may be rejected')
    return headers
  }

  return {
    ...headers,
    'X-CSRF-Token': csrfToken
  }
}

/**
 * Helper function to make a CSRF-protected fetch request
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {string} csrfToken - CSRF token
 * @returns {Promise} - Fetch promise
 */
export async function csrfFetch(url, options = {}, csrfToken) {
  // Only add CSRF token to state-changing methods
  const needsCSRF = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
    options.method?.toUpperCase()
  )

  if (needsCSRF && !csrfToken) {
    throw new Error('CSRF token required for this request')
  }

  const headers = needsCSRF
    ? addCSRFHeader(options.headers, csrfToken)
    : options.headers

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  })
}
