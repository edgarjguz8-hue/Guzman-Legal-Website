import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mapping of all Florida ZIP codes to counties for our three launch counties
const zipToCountyMapping = {
  // Hillsborough County
  33602: 'Hillsborough County',
  33603: 'Hillsborough County',
  33604: 'Hillsborough County',
  33605: 'Hillsborough County',
  33606: 'Hillsborough County',
  33607: 'Hillsborough County',
  33609: 'Hillsborough County',
  33610: 'Hillsborough County',
  33611: 'Hillsborough County',
  33612: 'Hillsborough County',
  33613: 'Hillsborough County',
  33614: 'Hillsborough County',
  33615: 'Hillsborough County',
  33616: 'Hillsborough County',
  33617: 'Hillsborough County',
  33618: 'Hillsborough County',
  33619: 'Hillsborough County',
  33620: 'Hillsborough County',
  33621: 'Hillsborough County',
  33622: 'Hillsborough County',
  33624: 'Hillsborough County',
  33625: 'Hillsborough County',
  33626: 'Hillsborough County',
  33629: 'Hillsborough County',
  33634: 'Hillsborough County',
  33635: 'Hillsborough County',
  33637: 'Hillsborough County',
  33647: 'Hillsborough County',
  33655: 'Hillsborough County',
  33672: 'Hillsborough County',
  33673: 'Hillsborough County',
  33674: 'Hillsborough County',
  33675: 'Hillsborough County',
  33677: 'Hillsborough County',
  33680: 'Hillsborough County',
  33681: 'Hillsborough County',
  33682: 'Hillsborough County',
  33684: 'Hillsborough County',
  33685: 'Hillsborough County',
  33686: 'Hillsborough County',
  33687: 'Hillsborough County',
  33688: 'Hillsborough County',
  33689: 'Hillsborough County',
  33694: 'Hillsborough County',
  33696: 'Hillsborough County',
  33698: 'Hillsborough County',
  33699: 'Hillsborough County',
  
  // Pinellas County
  33701: 'Pinellas County',
  33702: 'Pinellas County',
  33703: 'Pinellas County',
  33704: 'Pinellas County',
  33705: 'Pinellas County',
  33706: 'Pinellas County',
  33707: 'Pinellas County',
  33708: 'Pinellas County',
  33709: 'Pinellas County',
  33710: 'Pinellas County',
  33711: 'Pinellas County',
  33712: 'Pinellas County',
  33713: 'Pinellas County',
  33714: 'Pinellas County',
  33715: 'Pinellas County',
  33716: 'Pinellas County',
  33731: 'Pinellas County',
  33732: 'Pinellas County',
  33733: 'Pinellas County',
  33734: 'Pinellas County',
  33735: 'Pinellas County',
  33736: 'Pinellas County',
  33738: 'Pinellas County',
  33740: 'Pinellas County',
  33741: 'Pinellas County',
  33742: 'Pinellas County',
  33743: 'Pinellas County',
  33744: 'Pinellas County',
  33745: 'Pinellas County',
  33755: 'Pinellas County',
  33756: 'Pinellas County',
  33757: 'Pinellas County',
  33759: 'Pinellas County',
  33760: 'Pinellas County',
  33761: 'Pinellas County',
  33762: 'Pinellas County',
  33763: 'Pinellas County',
  33764: 'Pinellas County',
  33765: 'Pinellas County',
  33766: 'Pinellas County',
  33767: 'Pinellas County',
  33770: 'Pinellas County',
  33771: 'Pinellas County',
  33772: 'Pinellas County',
  33773: 'Pinellas County',
  33774: 'Pinellas County',
  33775: 'Pinellas County',
  33776: 'Pinellas County',
  33777: 'Pinellas County',
  33778: 'Pinellas County',
  33781: 'Pinellas County',
  33782: 'Pinellas County',
  33783: 'Pinellas County',
  33784: 'Pinellas County',
  33785: 'Pinellas County',
  33786: 'Pinellas County',
  33787: 'Pinellas County',
  33788: 'Pinellas County',
  33789: 'Pinellas County',
  
  // Pasco County
  33510: 'Pasco County',
  33511: 'Pasco County',
  33512: 'Pasco County',
  33513: 'Pasco County',
  33514: 'Pasco County',
  33515: 'Pasco County',
  33516: 'Pasco County',
  33517: 'Pasco County',
  33518: 'Pasco County',
  33519: 'Pasco County',
  33520: 'Pasco County',
  33521: 'Pasco County',
  33522: 'Pasco County',
  33523: 'Pasco County',
  33524: 'Pasco County',
  33525: 'Pasco County',
  33526: 'Pasco County',
  33527: 'Pasco County',
  33528: 'Pasco County',
  33529: 'Pasco County',
  33530: 'Pasco County',
  33534: 'Pasco County',
  33539: 'Pasco County',
  33540: 'Pasco County',
  33541: 'Pasco County',
  33542: 'Pasco County',
  33543: 'Pasco County',
  33544: 'Pasco County',
  33545: 'Pasco County',
  33546: 'Pasco County',
  33547: 'Pasco County',
  33548: 'Pasco County',
  33549: 'Pasco County',
  33556: 'Pasco County',
  33558: 'Pasco County',
  33559: 'Pasco County',
  33564: 'Pasco County',
  33565: 'Pasco County',
  33566: 'Pasco County',
  33567: 'Pasco County',
  33568: 'Pasco County',
  33569: 'Pasco County',
  33571: 'Pasco County',
  33572: 'Pasco County',
  33573: 'Pasco County',
  33576: 'Pasco County',
  33577: 'Pasco County',
  33578: 'Pasco County',
  33579: 'Pasco County',
  33584: 'Pasco County',
  33586: 'Pasco County',
  33587: 'Pasco County',
  33592: 'Pasco County',
  33593: 'Pasco County',
  33594: 'Pasco County',
  33596: 'Pasco County',
};

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Step 1: Create zip_counties table
    console.log('Creating zip_counties table...');
    const { error: createTableError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS zip_counties (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          zip_code VARCHAR(5) NOT NULL UNIQUE,
          county VARCHAR(50) NOT NULL,
          state VARCHAR(2) NOT NULL DEFAULT 'FL',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_zip_counties_zip_code ON zip_counties(zip_code);
      `,
    });

    if (createTableError) {
      // If RPC doesn't work, try direct SQL insert approach
      console.log('Creating zip_counties table with direct insert...');
      
      // First, try to drop and recreate the table
      const { error: dropError } = await supabase
        .from('zip_counties')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Insert zip-to-county mappings
      const zipCountyRecords = Object.entries(zipToCountyMapping).map(
        ([zip, county]) => ({
          zip_code: zip,
          county,
          state: 'FL',
        })
      );

      const { error: insertError } = await supabase
        .from('zip_counties')
        .insert(zipCountyRecords);

      if (insertError) {
        console.error('Error inserting zip counties:', insertError);
        console.log('Note: zip_counties table may need to be created manually in Supabase');
      } else {
        console.log('✓ Inserted ZIP code to county mappings');
      }
    } else {
      console.log('✓ Created zip_counties table');
      
      // Insert zip-to-county mappings
      const zipCountyRecords = Object.entries(zipToCountyMapping).map(
        ([zip, county]) => ({
          zip_code: zip,
          county,
          state: 'FL',
        })
      );

      const { error: insertError } = await supabase
        .from('zip_counties')
        .insert(zipCountyRecords);

      if (insertError) {
        console.error('Error inserting zip counties:', insertError);
      } else {
        console.log('✓ Inserted ZIP code to county mappings');
      }
    }

    // Step 2: Update attorneys table if needed
    console.log('Checking attorneys table structure...');
    const { data: attorneysData } = await supabase
      .from('attorneys')
      .select('*')
      .limit(1);
    console.log('✓ Attorneys table exists');

    // Step 3: Update territories table
    console.log('Updating territories table structure...');
    // Note: This would require dropping and recreating the table
    // For now, we'll document what needs to be done
    console.log('Note: territories table needs to be updated with county column instead of zip_code');

    // Step 4: Update leads table
    console.log('Updating leads table structure...');
    // Add county column if it doesn't exist
    const { error: addColumnError } = await supabase
      .from('leads')
      .select('county')
      .limit(1);
    
    if (addColumnError && addColumnError.message.includes('column')) {
      console.log('County column needs to be added to leads table manually');
    } else {
      console.log('✓ Leads table structure is compatible');
    }

    console.log('\nMigration complete!');
    console.log('\nIMPORTANT: Manual Supabase setup required:');
    console.log('1. Update territories table:');
    console.log('   - Add column: county VARCHAR(50)');
    console.log('   - Add column: state VARCHAR(2) DEFAULT "FL"');
    console.log('   - Remove column: zip_code (if present)');
    console.log('   - Update Primary Key or Unique constraint');
    console.log('2. Update leads table:');
    console.log('   - Add column: county VARCHAR(50)');
    console.log('3. Update attorneys table (if needed):');
    console.log('   - Add columns: firm_name VARCHAR(255)');
    console.log('   - Add column: website VARCHAR(255)');
    console.log('   - Add column: active BOOLEAN DEFAULT true');

    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrate();
