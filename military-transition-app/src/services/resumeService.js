import { supabase, getCurrentUser, isPremiumUser } from '../lib/supabase'
import { auditService } from './auditService'

/**
 * Resume Service
 * Manages resume data in Supabase
 */

// Get all resumes for current user
export const getAllResumes = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching resumes:', error)
    return []
  }

  return data || []
}

// Get primary resume (or first resume)
export const getPrimaryResume = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  // Try to get primary resume first
  let { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_primary', true)
    .single()

  // If no primary resume, get the first one
  if (error || !data) {
    const { data: firstResume } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(1)
      .single()

    data = firstResume
  }

  return data
}

// Get resume by ID
export const getResumeById = async (id) => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error fetching resume:', error)
    return null
  }

  return data
}

// Create new resume
export const createResume = async (resumeData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // Check if user is free tier and already has a resume
  const isPremium = await isPremiumUser()
  if (!isPremium) {
    const existingResumes = await getAllResumes()
    if (existingResumes.length >= 1) {
      throw new Error('Free tier users can only create 1 resume. Upgrade to Premium for unlimited resumes.')
    }
  }

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: user.id,
      ...resumeData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating resume:', error)
    throw error
  }

  // Audit log
  await auditService.log('resume_created', 'resume', data.id, {
    resume_name: resumeData.resume_name
  })

  return data
}

// Update resume
export const updateResume = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error} = await supabase
    .from('resumes')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating resume:', error)
    throw error
  }

  // Audit log
  await auditService.log('resume_updated', 'resume', id, {
    resume_name: data.resume_name
  })

  return data
}

// Delete resume
export const deleteResume = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting resume:', error)
    throw error
  }

  // Audit log
  await auditService.log('resume_deleted', 'resume', id)

  return true
}

// Set resume as primary
export const setPrimaryResume = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  // First, unset all resumes as primary
  await supabase
    .from('resumes')
    .update({ is_primary: false })
    .eq('user_id', user.id)

  // Then set this one as primary
  const { data, error } = await supabase
    .from('resumes')
    .update({ is_primary: true })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error setting primary resume:', error)
    throw error
  }

  return data
}

// Save resume data (create or update primary resume)
export const saveResumeData = async (resumeData) => {
  const primary = await getPrimaryResume()

  if (primary) {
    return await updateResume(primary.id, resumeData)
  } else {
    return await createResume({
      ...resumeData,
      is_primary: true
    })
  }
}

// Get resume data (for backward compatibility with localStorage)
export const getResumeData = async () => {
  const resume = await getPrimaryResume()
  if (!resume) return null

  return {
    contactInfo: resume.contact_info || {},
    professionalSummary: resume.professional_summary || '',
    experience: resume.experience || [],
    education: resume.education || [],
    skills: resume.skills || {},
    certifications: resume.certifications || []
  }
}

// Migration helper: Import resume from localStorage
export const migrateResumeFromLocalStorage = async () => {
  try {
    const resumeData = localStorage.getItem('resumeData')
    if (!resumeData) return

    const parsed = JSON.parse(resumeData)
    await saveResumeData({
      contact_info: parsed.contactInfo || {},
      professional_summary: parsed.professionalSummary || '',
      experience: parsed.experience || [],
      education: parsed.education || [],
      skills: parsed.skills || {},
      certifications: parsed.certifications || []
    })

    console.log('Resume migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating resume:', error)
  }
}
