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

async function verifyLead() {
  console.log('\nVerifying lead submission...\n');

  try {
    // Get the most recent lead
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching leads:', error);
      process.exit(1);
    }

    if (!leads || leads.length === 0) {
      console.log('No leads found in database.');
      process.exit(1);
    }

    const lead = leads[0];
    console.log('✓ Lead successfully saved to database!\n');
    console.log('Lead Details:');
    console.log(`- Full Name: ${lead.full_name}`);
    console.log(`- Phone: ${lead.phone}`);
    console.log(`- Email: ${lead.email}`);
    console.log(`- ZIP Code: ${lead.zip_code}`);
    console.log(`- Practice Area: ${lead.practice_area}`);
    console.log(`- Legal Issue: ${lead.legal_issue}`);
    console.log(`- Attorney ID: ${lead.attorney_id}`);
    console.log(`- Created At: ${lead.created_at}`);
    
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

verifyLead();
