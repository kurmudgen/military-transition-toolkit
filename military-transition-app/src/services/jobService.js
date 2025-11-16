import { supabase, getCurrentUser, isPremiumUser } from '../lib/supabase'

/**
 * Job Service
 * Manages saved jobs and job applications in Supabase
 */

// ============================================
// SAVED JOBS
// ============================================

// Get all saved jobs for current user
export const getSavedJobs = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('saved_jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved jobs:', error)
    return []
  }

  return data || []
}

// Save a new job
export const saveJob = async (jobData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // Check if user is free tier and has reached limit
  const isPremium = await isPremiumUser()
  if (!isPremium) {
    const existingJobs = await getSavedJobs()
    if (existingJobs.length >= 5) {
      throw new Error('Free tier users can save up to 5 jobs. Upgrade to Premium for unlimited saved jobs.')
    }
  }

  const { data, error } = await supabase
    .from('saved_jobs')
    .insert({
      user_id: user.id,
      ...jobData
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving job:', error)
    throw error
  }

  return data
}

// Update saved job
export const updateSavedJob = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('saved_jobs')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating saved job:', error)
    throw error
  }

  return data
}

// Delete saved job
export const deleteSavedJob = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting saved job:', error)
    throw error
  }

  return true
}

// ============================================
// JOB APPLICATIONS
// ============================================

// Get all job applications for current user
export const getJobApplications = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching job applications:', error)
    return []
  }

  return data || []
}

// Create job application
export const createJobApplication = async (applicationData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      user_id: user.id,
      ...applicationData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating job application:', error)
    throw error
  }

  return data
}

// Update job application
export const updateJobApplication = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('job_applications')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating job application:', error)
    throw error
  }

  return data
}

// Delete job application
export const deleteJobApplication = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting job application:', error)
    throw error
  }

  return true
}

// ============================================
// MIGRATION HELPERS
// ============================================

export const migrateJobsFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    // Migrate saved jobs
    const savedJobs = localStorage.getItem('savedJobs')
    if (savedJobs) {
      const parsed = JSON.parse(savedJobs)
      for (const job of parsed) {
        await saveJob(job)
      }
      console.log(`Migrated ${parsed.length} saved jobs`)
    }

    // Migrate job applications
    const applications = localStorage.getItem('jobApplications')
    if (applications) {
      const parsed = JSON.parse(applications)
      for (const app of parsed) {
        await createJobApplication(app)
      }
      console.log(`Migrated ${parsed.length} job applications`)
    }

    console.log('Job data migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating job data:', error)
  }
}
