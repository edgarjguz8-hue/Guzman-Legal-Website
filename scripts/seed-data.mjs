import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedData() {
  try {
    console.log('Seeding test data...')

    // Create test attorneys
    const attorneys = [
      {
        name: 'John Smith',
        email: 'john.smith@law.com',
        phone: '(212) 555-1001',
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@law.com',
        phone: '(212) 555-1002',
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@law.com',
        phone: '(212) 555-1003',
      },
    ]

    const { data: attorneyData, error: attorneyError } = await supabase
      .from('attorneys')
      .insert(attorneys)
      .select()

    if (attorneyError) {
      console.error('Error inserting attorneys:', attorneyError)
      return
    }

    console.log('Created attorneys:', attorneyData.length)

    // Create territories for test attorneys
    const territories = []

    // John Smith handles Car Accidents & Injury in New York and surrounding areas
    territories.push({
      attorney_id: attorneyData[0].id,
      zip_code: '10001',
      practice_area: 'Car Accidents & Injury',
    })
    territories.push({
      attorney_id: attorneyData[0].id,
      zip_code: '10002',
      practice_area: 'Car Accidents & Injury',
    })
    territories.push({
      attorney_id: attorneyData[0].id,
      zip_code: '10003',
      practice_area: 'Car Accidents & Injury',
    })

    // Sarah Johnson handles Family Law
    territories.push({
      attorney_id: attorneyData[1].id,
      zip_code: '10001',
      practice_area: 'Family Law',
    })
    territories.push({
      attorney_id: attorneyData[1].id,
      zip_code: '10002',
      practice_area: 'Family Law',
    })

    // Michael Chen handles Criminal Defense
    territories.push({
      attorney_id: attorneyData[2].id,
      zip_code: '10001',
      practice_area: 'Criminal Defense',
    })

    const { data: territoryData, error: territoryError } = await supabase
      .from('territories')
      .insert(territories)
      .select()

    if (territoryError) {
      console.error('Error inserting territories:', territoryError)
      return
    }

    console.log('Created territories:', territoryData.length)
    console.log('Test data seeded successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
