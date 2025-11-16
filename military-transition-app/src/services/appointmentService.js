import { supabase, getCurrentUser } from '../lib/supabase'
import { auditService } from './auditService'

/**
 * Appointment Service
 * Manages appointments in Supabase
 */

// Get all appointments for current user
export const getAppointments = async () => {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.id)
    .order('appointment_date', { ascending: true })

  if (error) {
    console.error('Error fetching appointments:', error)
    return []
  }

  return data || []
}

// Get upcoming appointments
export const getUpcomingAppointments = async (limit = 10) => {
  const user = await getCurrentUser()
  if (!user) return []

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', user.id)
    .gte('appointment_date', today)
    .eq('completed', false)
    .order('appointment_date', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching upcoming appointments:', error)
    return []
  }

  return data || []
}

// Create appointment
export const createAppointment = async (appointmentData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      user_id: user.id,
      ...appointmentData
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating appointment:', error)
    throw error
  }

  // Audit log
  await auditService.log('appointment_created', 'appointment', data.id, {
    title: appointmentData.title,
    type: appointmentData.type
  })

  return data
}

// Update appointment
export const updateAppointment = async (id, updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('appointments')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating appointment:', error)
    throw error
  }

  // Audit log
  await auditService.log('appointment_updated', 'appointment', id, {
    title: data.title
  })

  return data
}

// Delete appointment
export const deleteAppointment = async (id) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting appointment:', error)
    throw error
  }

  // Audit log
  await auditService.log('appointment_deleted', 'appointment', id)

  return true
}

// Mark appointment as completed
export const markAppointmentCompleted = async (id) => {
  return await updateAppointment(id, { completed: true })
}

// Migration helper
export const migrateAppointmentsFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    const appointments = localStorage.getItem('appointments')
    if (appointments) {
      const parsed = JSON.parse(appointments)
      for (const apt of parsed) {
        await createAppointment({
          title: apt.title,
          appointment_date: apt.date,
          appointment_time: apt.time,
          type: apt.type,
          location: apt.location,
          provider: apt.provider,
          notes: apt.notes,
          completed: apt.completed || false
        })
      }
      console.log(`Migrated ${parsed.length} appointments`)
    }

    console.log('Appointments migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating appointments:', error)
  }
}
