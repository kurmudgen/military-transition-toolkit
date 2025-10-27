import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * VA Service
 * Manages VA claims conditions and evidence tracking in Supabase
 */

// ============================================
// VA CONDITIONS
// ============================================

// Get all VA conditions for current user
export const getVAConditions = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('va_conditions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching VA conditions:', error)
    return []
  }

  return data || []
}

// Create VA condition
export const createVACondition = async (conditionData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('va_conditions')
    .insert({
      user_id: user.id,
      ...conditionData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating VA condition:', error)
    throw error
  }

  return data
}

// Update VA condition
export const updateVACondition = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('va_conditions')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating VA condition:', error)
    throw error
  }

  return data
}

// Delete VA condition
export const deleteVACondition = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('va_conditions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting VA condition:', error)
    throw error
  }

  return true
}

// ============================================
// VA EVIDENCE TRACKING
// ============================================

// Get all evidence for a condition
export const getVAEvidence = async (conditionId) => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('va_evidence')
    .select('*')
    .eq('user_id', user.id)
    .eq('condition_id', conditionId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching VA evidence:', error)
    return []
  }

  return data || []
}

// Get all evidence for current user (across all conditions)
export const getAllVAEvidence = async () => {
  const user = await getCurrentUser()
  if (!user) return {}

  const { data, error } = await supabase
    .from('va_evidence')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching all VA evidence:', error)
    return {}
  }

  // Group evidence by condition_id
  const evidenceByCondition = {}
  data?.forEach(evidence => {
    if (!evidenceByCondition[evidence.condition_id]) {
      evidenceByCondition[evidence.condition_id] = []
    }
    evidenceByCondition[evidence.condition_id].push(evidence)
  })

  return evidenceByCondition
}

// Create evidence entry
export const createVAEvidence = async (evidenceData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('va_evidence')
    .insert({
      user_id: user.id,
      ...evidenceData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating VA evidence:', error)
    throw error
  }

  return data
}

// Update evidence entry
export const updateVAEvidence = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('va_evidence')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating VA evidence:', error)
    throw error
  }

  return data
}

// Delete evidence entry
export const deleteVAEvidence = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('va_evidence')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting VA evidence:', error)
    throw error
  }

  return true
}

// ============================================
// MIGRATION HELPERS
// ============================================

export const migrateVADataFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    // Migrate VA conditions
    const conditions = localStorage.getItem('vaClaimsConditions')
    if (conditions) {
      const parsed = JSON.parse(conditions)
      const conditionMap = {} // Map old condition names to new IDs

      for (const condition of parsed) {
        const created = await createVACondition({
          condition_name: condition.condition || condition.name,
          category: condition.category,
          description: condition.description,
          service_connected: condition.serviceConnected !== false,
          estimated_rating: condition.estimatedRating,
          notes: condition.notes
        })
        conditionMap[condition.condition || condition.name] = created.id
      }
      console.log(`Migrated ${parsed.length} VA conditions`)

      // Migrate VA evidence
      const evidence = localStorage.getItem('vaClaimsEvidence')
      if (evidence) {
        const parsedEvidence = JSON.parse(evidence)
        let evidenceCount = 0

        for (const [conditionName, evidenceData] of Object.entries(parsedEvidence)) {
          const conditionId = conditionMap[conditionName]
          if (!conditionId) continue

          // Migrate required evidence
          if (evidenceData.required) {
            if (evidenceData.required.strs) {
              await createVAEvidence({
                condition_id: conditionId,
                evidence_type: 'strs',
                status: evidenceData.required.strs.status || 'pending',
                details: evidenceData.required.strs,
                notes: evidenceData.required.strs.notes
              })
              evidenceCount++
            }
            if (evidenceData.required.diagnosis) {
              await createVAEvidence({
                condition_id: conditionId,
                evidence_type: 'diagnosis',
                status: evidenceData.required.diagnosis.status || 'pending',
                details: evidenceData.required.diagnosis,
                notes: evidenceData.required.diagnosis.notes
              })
              evidenceCount++
            }
            if (evidenceData.required.nexus) {
              await createVAEvidence({
                condition_id: conditionId,
                evidence_type: 'nexus',
                status: evidenceData.required.nexus.status || 'pending',
                details: evidenceData.required.nexus,
                notes: evidenceData.required.nexus.notes
              })
              evidenceCount++
            }
          }

          // Migrate recommended evidence
          if (evidenceData.recommended) {
            const recommendedTypes = [
              'buddyStatements',
              'commanderStatement',
              'photos',
              'prescriptions',
              'appointments',
              'dbq'
            ]

            for (const type of recommendedTypes) {
              if (evidenceData.recommended[type]) {
                await createVAEvidence({
                  condition_id: conditionId,
                  evidence_type: type,
                  status: evidenceData.recommended[type].status || 'pending',
                  details: evidenceData.recommended[type]
                })
                evidenceCount++
              }
            }
          }
        }
        console.log(`Migrated ${evidenceCount} evidence entries`)
      }
    }

    console.log('VA data migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating VA data:', error)
  }
}
