import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.development.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && key.trim() && !line.startsWith('#')) {
      let value = valueParts.join('=').trim();
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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupGuzmanLegal() {
  console.log('\nSetting up Guzman Legal test attorney...\n');

  try {
    // 1. Check if attorney already exists
    let existingAttorney = null;
    try {
      const result = await supabase
        .from('attorneys')
        .select('id')
        .eq('email', 'test@attorneyabogado.com')
        .single();
      if (!result.error) {
        existingAttorney = result.data;
      }
    } catch (e) {
      // Attorney doesn't exist yet
    }

    let attorneyId;

    if (existingAttorney?.id) {
      attorneyId = existingAttorney.id;
      console.log('✓ Guzman Legal attorney already exists');
      
      // Update attorney details
      await supabase
        .from('attorneys')
        .update({
          name: 'Edgar Guzman',
          firm_name: 'Guzman Legal',
          email: 'test@attorneyabogado.com',
          phone: '(813) 555-0000',
          website: 'attorneyabogado.com',
          bio: 'Guzman Legal helps clients connect with legal support quickly, clearly, and professionally.',
        })
        .eq('id', attorneyId);
      
      console.log('✓ Updated attorney details');
    } else {
      // Create new attorney
      const { data: newAttorney, error: attorneyError } = await supabase
        .from('attorneys')
        .insert([
          {
            name: 'Edgar Guzman',
            firm_name: 'Guzman Legal',
            email: 'test@attorneyabogado.com',
            phone: '(813) 555-0000',
            website: 'attorneyabogado.com',
            bio: 'Guzman Legal helps clients connect with legal support quickly, clearly, and professionally.',
          },
        ])
        .select()
        .single();

      if (attorneyError) {
        console.error('Failed to create attorney:', attorneyError);
        process.exit(1);
      }

      attorneyId = newAttorney.id;
      console.log('✓ Created Guzman Legal attorney');
    }

    // 2. Set up territories for all Hillsborough County ZIP codes
    const hillsboroughZips = [
      '33602', '33603', '33604', '33605', '33606', '33607', '33609',
      '33610', '33611', '33612', '33614', '33615', '33616', '33617',
      '33618', '33619', '33620', '33621', '33622', '33623', '33624',
      '33625', '33626', '33627', '33628', '33629', '33647', '33650',
    ];

    // Clear existing territories for this attorney
    await supabase
      .from('territories')
      .delete()
      .eq('attorney_id', attorneyId);

    // Insert territories for each ZIP code
    const territories = hillsboroughZips.map(zip => ({
      attorney_id: attorneyId,
      zip_code: zip,
      practice_area: 'Car Accidents & Injury',
    }));

    const { error: territoriesError } = await supabase
      .from('territories')
      .insert(territories);

    if (territoriesError) {
      console.error('Failed to create territories:', territoriesError);
      process.exit(1);
    }

    console.log(`✓ Created ${hillsboroughZips.length} territories for Hillsborough County`);

    console.log('\n✓ Guzman Legal setup complete!\n');
    console.log('Test Flow:');
    console.log('1. Go to homepage');
    console.log('2. Enter any Hillsborough County ZIP code (e.g., 33618)');
    console.log('3. Select "Car Accidents & Injury"');
    console.log('4. Click "Find My Attorney"');
    console.log('5. You should see Guzman Legal');
    console.log('6. Click "Get Connected"');
    console.log('7. Fill in the intake form');
    console.log('8. See confirmation page\n');

  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

setupGuzmanLegal();
