import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to find matching attorney territory
export async function findAttorneyByZipAndPracticeArea(
  zipCode: string,
  practiceArea: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('territories')
      .select('attorney_id')
      .eq('zip_code', zipCode)
      .eq('practice_area', practiceArea)
      .single()

    if (error || !data) return null
    return data.attorney_id
  } catch {
    return null
  }
}
