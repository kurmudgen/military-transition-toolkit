import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * Timeline Service
 * Manages timeline items and completion status in Supabase
 */

// Get all timeline items for current user
export const getTimelineItems = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('timeline_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching timeline items:', error)
    return []
  }

  return data || []
}

// Create timeline item
export const createTimelineItem = async (itemData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('timeline_items')
    .insert({
      user_id: user.id,
      ...itemData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating timeline item:', error)
    throw error
  }

  return data
}

// Update timeline item
export const updateTimelineItem = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('timeline_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating timeline item:', error)
    throw error
  }

  return data
}

// Delete timeline item
export const deleteTimelineItem = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('timeline_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting timeline item:', error)
    throw error
  }

  return true
}

// Mark task as complete
export const markTaskComplete = async (taskId, taskTitle, dueDate, category) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // Check if task already exists
  const { data: existing } = await supabase
    .from('timeline_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('task_id', taskId)
    .single()

  if (existing) {
    // Update existing
    return await updateTimelineItem(existing.id, {
      completed: true,
      completed_at: new Date().toISOString()
    })
  } else {
    // Create new
    return await createTimelineItem({
      task_id: taskId,
      task_title: taskTitle,
      due_date: dueDate,
      category: category,
      completed: true,
      completed_at: new Date().toISOString()
    })
  }
}

// Mark task as incomplete
export const markTaskIncomplete = async (taskId) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data: existing } = await supabase
    .from('timeline_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('task_id', taskId)
    .single()

  if (existing) {
    return await updateTimelineItem(existing.id, {
      completed: false,
      completed_at: null
    })
  }

  return null
}

// Get completion status for specific task
export const getTaskStatus = async (taskId) => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('timeline_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('task_id', taskId)
    .single()

  if (error) return null

  return data
}
