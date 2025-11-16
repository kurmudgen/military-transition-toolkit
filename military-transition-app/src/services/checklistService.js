import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * Checklist Service
 * Manages checklist progress in Supabase
 */

// Get checklist progress for a specific type
export const getChecklistProgress = async (checklistType) => {
  const user = await getCurrentUser()
  if (!user) return {}

  const { data, error } = await supabase
    .from('checklist_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('checklist_type', checklistType)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No data found, return empty object
      return {}
    }
    console.error('Error fetching checklist progress:', error)
    return {}
  }

  return data?.checklist_data || {}
}

// Get all checklist progress for current user
export const getAllChecklistProgress = async () => {
  const user = await getCurrentUser()
  if (!user) return {}

  const { data, error } = await supabase
    .from('checklist_progress')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching all checklist progress:', error)
    return {}
  }

  // Convert to object keyed by checklist_type
  const progressByType = {}
  data?.forEach(item => {
    progressByType[item.checklist_type] = item.checklist_data
  })

  return progressByType
}

// Update checklist progress
export const updateChecklistProgress = async (checklistType, progressData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('checklist_progress')
    .upsert({
      user_id: user.id,
      checklist_type: checklistType,
      checklist_data: progressData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,checklist_type'
    })
    .select()
    .single()

  if (error) {
    console.error('Error updating checklist progress:', error)
    throw error
  }

  return data
}

// Toggle a single checklist item
export const toggleChecklistItem = async (checklistType, itemKey) => {
  const currentProgress = await getChecklistProgress(checklistType)
  const newProgress = {
    ...currentProgress,
    [itemKey]: !currentProgress[itemKey]
  }

  return await updateChecklistProgress(checklistType, newProgress)
}

// Migration helper
export const migrateChecklistsFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    const checklistTypes = [
      'retirementChecklist',
      'medBoardChecklist',
      'separationUnder20Checklist'
    ]

    const typeMap = {
      'retirementChecklist': 'retirement',
      'medBoardChecklist': 'medboard',
      'separationUnder20Checklist': 'separation'
    }

    for (const oldType of checklistTypes) {
      const data = localStorage.getItem(oldType)
      if (data) {
        const parsed = JSON.parse(data)
        const newType = typeMap[oldType]
        await updateChecklistProgress(newType, parsed)
        console.log(`Migrated ${oldType} to ${newType}`)
      }
    }

    console.log('Checklists migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating checklists:', error)
  }
}
