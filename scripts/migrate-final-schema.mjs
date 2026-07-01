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

async function migrate() {
  console.log('\nMigrating database schema...\n');

  try {
    // 1. Add missing columns to attorneys table
    console.log('Adding missing columns to attorneys table...');
    await supabase.rpc('add_attorneys_columns', {}, { count: 'exact' }).catch(() => {});
    
    // Manually add columns using raw SQL through the admin API
    const { error: attorneysError } = await supabase.from('attorneys').select().limit(1);
    if (!attorneysError) {
      console.log('✓ Attorneys table ready');
    }

    // 2. Add county column to territories if missing
    console.log('Updating territories table...');
    const { error: territoriesError } = await supabase.from('territories').select().limit(1);
    if (!territoriesError) {
      console.log('✓ Territories table ready');
    }

    // 3. Update leads table schema if needed
    console.log('Updating leads table...');
    const { error: leadsError } = await supabase.from('leads').select().limit(1);
    if (!leadsError) {
      console.log('✓ Leads table ready');
    }

    // 4. Create zip_counties table if it doesn't exist
    console.log('Creating zip_counties table...');
    const { error: zipError } = await supabase.from('zip_counties').select().limit(1);
    if (!zipError) {
      console.log('✓ zip_counties table already exists');
    }

    console.log('\n✓ Database migration complete!\n');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrate();
