import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper: Get all skills grouped by category
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index')
  if (error) throw error
  return data
}

// Helper: Get work experience
export async function getWorkExperience() {
  const { data, error } = await supabase
    .from('work_experience')
    .select('*')
    .order('order_index')
  if (error) throw error
  return data
}

// Helper: Get education
export async function getEducation() {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('order_index')
  if (error) throw error
  return data
}

// Helper: Send contact message
export async function sendMessage({ name, email, subject, message }) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, subject, message }])
  if (error) throw error
  return data
}
