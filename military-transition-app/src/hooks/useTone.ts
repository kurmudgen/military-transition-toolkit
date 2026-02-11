/**
 * useTone Hook
 *
 * React hook wrapping toneAdapter.
 * Provides reactive tone state and copy helper.
 */

import { useState, useCallback } from 'react'
import {
  getTonePreference,
  setTonePreference,
  getToneCopy,
  type Tone,
} from '../services/toneAdapter'

interface UseToneReturn {
  tone: Tone
  setTone: (t: Tone) => void
  copy: (key: string) => string
}

export function useTone(): UseToneReturn {
  const [tone, setToneState] = useState<Tone>(getTonePreference)

  const setTone = useCallback((t: Tone) => {
    setTonePreference(t)
    setToneState(t)
  }, [])

  const copy = useCallback(
    (key: string) => getToneCopy(key, tone),
    [tone]
  )

  return { tone, setTone, copy }
}
