import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * Resource Service
 * Manages resource ratings and custom resources in Supabase
 */

// ============================================
// RESOURCE RATINGS
// ============================================

// Get all resource ratings for current user
export const getResourceRatings = async () => {
  const user = await getCurrentUser()
  if (!user) return {}

  const { data, error } = await supabase
    .from('resource_ratings')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching resource ratings:', error)
    return {}
  }

  // Convert to object keyed by resource_id
  const ratings = {}
  data?.forEach(rating => {
    ratings[rating.resource_id] = rating.rating
  })

  return ratings
}

// Save or update resource rating
export const saveResourceRating = async (resourceId, rating) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('resource_ratings')
    .upsert({
      user_id: user.id,
      resource_id: resourceId,
      rating: rating,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,resource_id'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving resource rating:', error)
    throw error
  }

  return data
}

// Delete resource rating
export const deleteResourceRating = async (resourceId) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('resource_ratings')
    .delete()
    .eq('user_id', user.id)
    .eq('resource_id', resourceId)

  if (error) {
    console.error('Error deleting resource rating:', error)
    throw error
  }

  return true
}

// ============================================
// CUSTOM RESOURCES
// ============================================

// Get all custom resources for current user
export const getCustomResources = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('custom_resources')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching custom resources:', error)
    return []
  }

  return data || []
}

// Create custom resource
export const createCustomResource = async (resourceData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('custom_resources')
    .insert({
      user_id: user.id,
      ...resourceData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating custom resource:', error)
    throw error
  }

  return data
}

// Update custom resource
export const updateCustomResource = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('custom_resources')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating custom resource:', error)
    throw error
  }

  return data
}

// Delete custom resource
export const deleteCustomResource = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('custom_resources')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting custom resource:', error)
    throw error
  }

  return true
}

// ============================================
// MIGRATION HELPERS
// ============================================

export const migrateResourcesFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    // Migrate resource ratings
    const ratings = localStorage.getItem('resourceRatings')
    if (ratings) {
      const parsed = JSON.parse(ratings)
      for (const [resourceId, rating] of Object.entries(parsed)) {
        await saveResourceRating(resourceId, rating)
      }
      console.log(`Migrated ${Object.keys(parsed).length} resource ratings`)
    }

    // Migrate custom resources
    const customResources = localStorage.getItem('customResources')
    if (customResources) {
      const parsed = JSON.parse(customResources)
      const customArray = parsed.filter(r => r.id && r.id.startsWith('custom-'))

      for (const resource of customArray) {
        await createCustomResource({
          title: resource.title,
          url: resource.url,
          description: resource.description,
          category: resource.category,
          type: resource.type,
          tags: resource.tags || []
        })
      }
      console.log(`Migrated ${customArray.length} custom resources`)
    }

    console.log('Resources migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating resources:', error)
  }
}
