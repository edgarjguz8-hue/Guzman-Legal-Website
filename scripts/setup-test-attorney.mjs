import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.development.local
const envPath = path.join(__dirname, '..', '.env.development.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && key.trim() && !line.startsWith('#')) {
      let value = valueParts.join('=').trim();
      // Remove surrounding quotes if present
      if ((value.startsWith("'") && value.endsWith("'")) || 
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      }
      if (value) {
        process.env[key.trim()] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupTestAttorney() {
  console.log('Setting up test attorney and territory...\n');

  // Hillsborough County ZIP codes
  const hillsboroughZips = [
    '33602', '33606', '33607', '33609', '33618', '33619', '33647'
  ];

  try {
    // Step 1: Create attorney record
    console.log('1. Creating attorney record for Guzman Legal...');
    const { data: attorneyData, error: attorneyError } = await supabase
      .from('attorneys')
      .insert([
        {
          name: 'Edgar Guzman',
          email: 'test@attorneyabogado.com',
          phone: '(813) 555-0000',
        },
      ])
      .select();

    if (attorneyError) {
      console.error('Error creating attorney:', attorneyError);
      process.exit(1);
    }

    const attorneyId = attorneyData[0].id;
    console.log(`✓ Attorney created: ${attorneyData[0].name} (ID: ${attorneyId})\n`);

    // Step 2: Create territory assignments for each ZIP code
    console.log('2. Creating territory assignments for Hillsborough County ZIP codes...');
    
    const territoryInserts = hillsboroughZips.map(zip => ({
      attorney_id: attorneyId,
      zip_code: zip,
      practice_area: 'Car Accidents & Injury',
    }));

    const { data: territoryData, error: territoryError } = await supabase
      .from('territories')
      .insert(territoryInserts)
      .select();

    if (territoryError) {
      console.error('Error creating territories:', territoryError);
      process.exit(1);
    }

    console.log(`✓ Created ${territoryData.length} territory assignments\n`);

    // Step 3: Verify the setup
    console.log('3. Verifying setup...');
    
    for (const zip of hillsboroughZips) {
      const { data, error } = await supabase
        .from('territories')
        .select('*')
        .eq('zip_code', zip)
        .eq('practice_area', 'Car Accidents & Injury')
        .eq('attorney_id', attorneyId)
        .single();

      if (error || !data) {
        console.error(`✗ Verification failed for ZIP ${zip}`);
      } else {
        console.log(`✓ ZIP ${zip} → Guzman Legal (Car Accidents & Injury)`);
      }
    }

    console.log('\n=== TEST DATA SETUP COMPLETE ===\n');
    console.log('Attorney Details:');
    console.log(`- Firm Name: Guzman Legal`);
    console.log(`- Attorney Name: Edgar Guzman`);
    console.log(`- Email: test@attorneyabogado.com`);
    console.log(`- Phone: (813) 555-0000`);
    console.log(`- Attorney ID: ${attorneyId}`);
    console.log(`\nTerritory: Hillsborough County, Car Accidents & Injury`);
    console.log(`Coverage: ${hillsboroughZips.join(', ')}`);
    console.log('\nRouting is now active. Test by entering any of these ZIP codes.');

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

setupTestAttorney();
