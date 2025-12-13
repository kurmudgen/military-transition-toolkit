import { supabase, getCurrentUser } from '../lib/supabase'
import { auditService } from './auditService'

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

  // Audit log
  await auditService.log('va_condition_created', 'va_condition', data.id, {
    condition_name: conditionData.condition_name
  })

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

  // Audit log
  await auditService.log('va_condition_updated', 'va_condition', id, {
    condition_name: data.condition_name
  })

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

  // Audit log
  await auditService.log('va_condition_deleted', 'va_condition', id)

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

// Sync guest mode data from localStorage to user's account
// Called after user signs up or logs in
export const syncGuestVADataToAccount = async () => {
  const GUEST_VA_CONDITIONS_KEY = 'vaClaimsGuestConditions'
  const GUEST_VA_DETAILS_KEY = 'vaClaimsGuestDetails'
  const GUEST_VA_EVIDENCE_KEY = 'vaClaimsGuestEvidence'

  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, message: 'No authenticated user' }

    // Check if there's guest data to sync
    const guestConditions = localStorage.getItem(GUEST_VA_CONDITIONS_KEY)
    const guestDetails = localStorage.getItem(GUEST_VA_DETAILS_KEY)

    if (!guestConditions) {
      return { success: true, message: 'No guest data to sync', count: 0 }
    }

    const conditions = JSON.parse(guestConditions)
    const details = guestDetails ? JSON.parse(guestDetails) : {}
    const evidence = localStorage.getItem(GUEST_VA_EVIDENCE_KEY)
    const evidenceData = evidence ? JSON.parse(evidence) : {}

    if (conditions.length === 0) {
      return { success: true, message: 'No guest data to sync', count: 0 }
    }

    const conditionMap = {} // Map condition names to new database IDs

    // Create each condition in the database
    for (const conditionName of conditions) {
      const conditionDetail = details[conditionName] || {}

      const created = await createVACondition({
        condition_name: conditionName,
        category: conditionDetail.category || '',
        description: conditionDetail.description || '',
        start_date: conditionDetail.startDate || null,
        incident_description: conditionDetail.incident || '',
        symptoms: conditionDetail.symptoms || {},
        frequency: conditionDetail.frequency || '',
        worsening_factors: conditionDetail.worsening || '',
        treatment_history: conditionDetail.treatment || {},
        functional_limitations: conditionDetail.limitations || {},
        pain_level: conditionDetail.painLevel || '',
        service_connected: conditionDetail.serviceConnected !== false,
        estimated_rating: conditionDetail.estimatedRating || '',
        notes: conditionDetail.notes || ''
      })

      conditionMap[conditionName] = created.id
    }

    // Sync evidence for each condition
    for (const [conditionName, condEvidence] of Object.entries(evidenceData)) {
      const conditionId = conditionMap[conditionName]
      if (!conditionId || !condEvidence) continue

      // Sync required evidence
      if (condEvidence.required) {
        for (const [type, data] of Object.entries(condEvidence.required)) {
          if (data && Object.keys(data).length > 0) {
            await createVAEvidence({
              condition_id: conditionId,
              evidence_type: type,
              status: data.status || 'pending',
              details: data,
              notes: data.notes || ''
            })
          }
        }
      }

      // Sync recommended evidence
      if (condEvidence.recommended) {
        for (const [type, data] of Object.entries(condEvidence.recommended)) {
          if (data && Object.keys(data).length > 0) {
            await createVAEvidence({
              condition_id: conditionId,
              evidence_type: type,
              status: data.status || 'pending',
              details: data
            })
          }
        }
      }
    }

    // Clear guest data from localStorage after successful sync
    localStorage.removeItem(GUEST_VA_CONDITIONS_KEY)
    localStorage.removeItem(GUEST_VA_DETAILS_KEY)
    localStorage.removeItem(GUEST_VA_EVIDENCE_KEY)

    console.log(`✓ Synced ${conditions.length} VA claims from guest to account`)
    return { success: true, message: `Synced ${conditions.length} conditions`, count: conditions.length }
  } catch (error) {
    console.error('Error syncing guest VA data:', error)
    return { success: false, message: error.message, count: 0 }
  }
}
