/**
 * Professional Development Service
 *
 * Supabase CRUD for skills inventory, certifications, and development goals.
 * Table: professional_development (user_id, skills, certifications, goals, updated_at)
 */

import { supabase, getCurrentUser } from '../lib/supabase'

export interface Skill {
  id: string
  name: string
  category: string       // e.g., 'technical', 'leadership', 'communication'
  proficiency: 1 | 2 | 3 | 4 | 5  // 1=beginner, 5=expert
  militaryAcquired: boolean
  notes: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  dateEarned: string     // ISO date
  expirationDate: string // ISO date or empty
  status: 'active' | 'expired' | 'in-progress' | 'planned'
  credentialId: string
  notes: string
}

export interface DevelopmentGoal {
  id: string
  title: string
  description: string
  targetDate: string     // ISO date
  status: 'not-started' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  steps: GoalStep[]
}

export interface GoalStep {
  id: string
  text: string
  completed: boolean
}

export interface ProfessionalDevData {
  skills: Skill[]
  certifications: Certification[]
  goals: DevelopmentGoal[]
  updated_at: string
}

/**
 * Get user's professional development data.
 */
export async function getProfessionalDev(): Promise<ProfessionalDevData | null> {
  const user = await getCurrentUser()
  if (!user || !supabase) return null

  const { data, error } = await supabase
    .from('professional_development')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('Error fetching professional dev:', error)
    return null
  }

  return data
}

/**
 * Save complete professional development data.
 */
async function saveProfessionalDev(
  payload: Omit<ProfessionalDevData, 'updated_at'>
): Promise<ProfessionalDevData | null> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('professional_development')
    .upsert(
      {
        user_id: user.id,
        skills: payload.skills,
        certifications: payload.certifications,
        goals: payload.goals,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving professional dev:', error)
    throw error
  }

  return data
}

// ─── Skill Operations ─────────────────────────────────────────────

export async function addSkill(skill: Omit<Skill, 'id'>): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const skills = [...(existing?.skills ?? []), { ...skill, id: generateId() }]
  return saveProfessionalDev({
    skills,
    certifications: existing?.certifications ?? [],
    goals: existing?.goals ?? [],
  })
}

export async function updateSkill(updatedSkill: Skill): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const skills = (existing?.skills ?? []).map((s: Skill) =>
    s.id === updatedSkill.id ? updatedSkill : s
  )
  return saveProfessionalDev({
    skills,
    certifications: existing?.certifications ?? [],
    goals: existing?.goals ?? [],
  })
}

export async function deleteSkill(skillId: string): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const skills = (existing?.skills ?? []).filter((s: Skill) => s.id !== skillId)
  return saveProfessionalDev({
    skills,
    certifications: existing?.certifications ?? [],
    goals: existing?.goals ?? [],
  })
}

// ─── Certification Operations ─────────────────────────────────────

export async function addCertification(
  cert: Omit<Certification, 'id'>
): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const certifications = [...(existing?.certifications ?? []), { ...cert, id: generateId() }]
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications,
    goals: existing?.goals ?? [],
  })
}

export async function updateCertification(
  updatedCert: Certification
): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const certifications = (existing?.certifications ?? []).map((c: Certification) =>
    c.id === updatedCert.id ? updatedCert : c
  )
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications,
    goals: existing?.goals ?? [],
  })
}

export async function deleteCertification(
  certId: string
): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const certifications = (existing?.certifications ?? []).filter(
    (c: Certification) => c.id !== certId
  )
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications,
    goals: existing?.goals ?? [],
  })
}

// ─── Goal Operations ──────────────────────────────────────────────

export async function addGoal(
  goal: Omit<DevelopmentGoal, 'id'>
): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const goals = [...(existing?.goals ?? []), { ...goal, id: generateId() }]
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications: existing?.certifications ?? [],
    goals,
  })
}

export async function updateGoal(
  updatedGoal: DevelopmentGoal
): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const goals = (existing?.goals ?? []).map((g: DevelopmentGoal) =>
    g.id === updatedGoal.id ? updatedGoal : g
  )
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications: existing?.certifications ?? [],
    goals,
  })
}

export async function deleteGoal(goalId: string): Promise<ProfessionalDevData | null> {
  const existing = await getProfessionalDev()
  const goals = (existing?.goals ?? []).filter((g: DevelopmentGoal) => g.id !== goalId)
  return saveProfessionalDev({
    skills: existing?.skills ?? [],
    certifications: existing?.certifications ?? [],
    goals,
  })
}

// ─── Helpers ──────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
