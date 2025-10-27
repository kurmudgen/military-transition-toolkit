import { migrateFromLocalStorage as migrateUser } from '../services/userService'
import { migrateResumeFromLocalStorage } from '../services/resumeService'
import { migrateJobsFromLocalStorage } from '../services/jobService'
import { migrateVADataFromLocalStorage } from '../services/vaService'
import { migrateAppointmentsFromLocalStorage } from '../services/appointmentService'
import { migrateChecklistsFromLocalStorage } from '../services/checklistService'
import { migrateResourcesFromLocalStorage } from '../services/resourceService'
import { migrateStateBenefitsFromLocalStorage } from '../services/stateBenefitsService'

const MIGRATION_KEY = 'supabase_migration_completed'

/**
 * Check if migration has already been completed
 */
export const isMigrationCompleted = () => {
  return localStorage.getItem(MIGRATION_KEY) === 'true'
}

/**
 * Mark migration as completed
 */
const markMigrationCompleted = () => {
  localStorage.setItem(MIGRATION_KEY, 'true')
}

/**
 * Migrate all localStorage data to Supabase for the authenticated user
 * This should run once per user on first login
 */
export const migrateAllDataToSupabase = async () => {
  // Check if migration already completed
  if (isMigrationCompleted()) {
    console.log('Migration already completed, skipping...')
    return { success: true, alreadyCompleted: true }
  }

  console.log('Starting data migration from localStorage to Supabase...')

  const results = {
    user: { success: false, error: null },
    resume: { success: false, error: null },
    jobs: { success: false, error: null },
    va: { success: false, error: null },
    appointments: { success: false, error: null },
    checklists: { success: false, error: null },
    resources: { success: false, error: null },
    stateBenefits: { success: false, error: null }
  }

  try {
    // Migrate user profile data
    try {
      await migrateUser()
      results.user.success = true
      console.log('✓ User data migrated')
    } catch (error) {
      results.user.error = error.message
      console.error('✗ User migration failed:', error)
    }

    // Migrate resume data
    try {
      await migrateResumeFromLocalStorage()
      results.resume.success = true
      console.log('✓ Resume data migrated')
    } catch (error) {
      results.resume.error = error.message
      console.error('✗ Resume migration failed:', error)
    }

    // Migrate job search data
    try {
      await migrateJobsFromLocalStorage()
      results.jobs.success = true
      console.log('✓ Jobs data migrated')
    } catch (error) {
      results.jobs.error = error.message
      console.error('✗ Jobs migration failed:', error)
    }

    // Migrate VA claims data
    try {
      await migrateVADataFromLocalStorage()
      results.va.success = true
      console.log('✓ VA data migrated')
    } catch (error) {
      results.va.error = error.message
      console.error('✗ VA migration failed:', error)
    }

    // Migrate appointments
    try {
      await migrateAppointmentsFromLocalStorage()
      results.appointments.success = true
      console.log('✓ Appointments migrated')
    } catch (error) {
      results.appointments.error = error.message
      console.error('✗ Appointments migration failed:', error)
    }

    // Migrate checklists
    try {
      await migrateChecklistsFromLocalStorage()
      results.checklists.success = true
      console.log('✓ Checklists migrated')
    } catch (error) {
      results.checklists.error = error.message
      console.error('✗ Checklists migration failed:', error)
    }

    // Migrate resources
    try {
      await migrateResourcesFromLocalStorage()
      results.resources.success = true
      console.log('✓ Resources migrated')
    } catch (error) {
      results.resources.error = error.message
      console.error('✗ Resources migration failed:', error)
    }

    // Migrate state benefits
    try {
      await migrateStateBenefitsFromLocalStorage()
      results.stateBenefits.success = true
      console.log('✓ State benefits migrated')
    } catch (error) {
      results.stateBenefits.error = error.message
      console.error('✗ State benefits migration failed:', error)
    }

    // Mark migration as completed
    markMigrationCompleted()
    console.log('✓ Migration completed successfully!')

    return { success: true, results, alreadyCompleted: false }
  } catch (error) {
    console.error('Migration failed:', error)
    return { success: false, error: error.message, results }
  }
}

/**
 * Clear all localStorage data after successful migration (optional)
 * WARNING: This will remove all local data. Only call after confirming migration success.
 */
export const clearLocalStorageAfterMigration = () => {
  const keysToKeep = [MIGRATION_KEY, 'darkMode', 'theme'] // Keep UI preferences

  const allKeys = Object.keys(localStorage)
  allKeys.forEach(key => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key)
    }
  })

  console.log('Local storage cleared (except UI preferences)')
}
