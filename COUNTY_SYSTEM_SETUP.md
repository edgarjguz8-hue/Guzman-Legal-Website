# County-Based Attorney Routing System Setup

## Overview

This system has been updated to route users to attorneys based on their **county**, not individual ZIP codes. This simplifies scaling and management—all ZIP codes in a county automatically route to that county's assigned attorney.

## Launch Counties

The system is configured for:
- **Hillsborough County** (Tampa area)
- **Pinellas County** (St. Petersburg/Clearwater area)
- **Pasco County** (Wesley Chapel area)

## Database Schema

### 1. `zip_counties` Table
Maps every ZIP code to its county.

```sql
id: UUID (Primary Key)
zip_code: VARCHAR(5) - The 5-digit ZIP code
county: VARCHAR(50) - County name (e.g., "Hillsborough County")
state: VARCHAR(2) - State code (default: "FL")
created_at: TIMESTAMP
```

**Index**: `zip_code` (for fast lookups)

### 2. `attorneys` Table
Stores attorney information.

```sql
id: UUID (Primary Key)
name: VARCHAR(255) - Attorney's full name
email: VARCHAR(255) - Contact email
phone: VARCHAR(20) - Contact phone
active: BOOLEAN - Whether this attorney is actively taking cases
created_at: TIMESTAMP
```

### 3. `territories` Table
Assigns attorneys to counties and practice areas (replaces ZIP code mapping).

```sql
id: UUID (Primary Key)
attorney_id: UUID - Foreign key to attorneys table
county: VARCHAR(50) - County name
state: VARCHAR(2) - State code (default: "FL")
practice_area: VARCHAR(100) - Legal specialty
active: BOOLEAN - Whether this territory assignment is active
created_at: TIMESTAMP
```

**Unique Constraint**: `(attorney_id, county, state, practice_area)` - Each attorney can only have one assignment per county/practice area combination

### 4. `leads` Table
Stores client intake information.

```sql
id: UUID (Primary Key)
attorney_id: UUID - Assigned attorney
zip_code: VARCHAR(5) - Client's ZIP code
county: VARCHAR(50) - Determined county
practice_area: VARCHAR(100) - Legal issue type
name: VARCHAR(255) - Client's full name
phone: VARCHAR(20) - Client's phone
email: VARCHAR(255) - Client's email
description: TEXT - Legal issue description
status: VARCHAR(50) - Lead status (default: "new")
created_at: TIMESTAMP
```

## How the Flow Works

### User Journey

1. **Homepage** → User enters ZIP code and selects practice area
2. **API Call** (`/api/find-attorney`) → 
   - Looks up ZIP code in `zip_counties` table
   - Determines the county
   - Searches `territories` for a match: `(county, practice_area)`
3. **Result** → 
   - If attorney found → Route to intake form
   - If no attorney → Show "Currently expanding" message
4. **Intake Form** → User fills out form with ZIP, county, and practice area
5. **Submit** (`/api/submit-lead`) → Lead saved with all details to `leads` table
6. **Thank You** → Confirmation page

## Setup Instructions

### Step 1: Update Supabase Tables

You need to create/update the `zip_counties` table in Supabase. Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS zip_counties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code VARCHAR(5) NOT NULL UNIQUE,
  county VARCHAR(50) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'FL',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_zip_counties_zip_code ON zip_counties(zip_code);
```

Then update the `territories` table:

```sql
ALTER TABLE territories
  ADD COLUMN county VARCHAR(50),
  ADD COLUMN state VARCHAR(2) DEFAULT 'FL',
  ADD COLUMN active BOOLEAN DEFAULT true;

-- Remove zip_code column if it exists
-- ALTER TABLE territories DROP COLUMN zip_code;

-- Create unique constraint
ALTER TABLE territories
  ADD CONSTRAINT unique_attorney_county_practice 
  UNIQUE(attorney_id, county, state, practice_area);
```

And update the `leads` table:

```sql
ALTER TABLE leads
  ADD COLUMN county VARCHAR(50),
  ADD COLUMN status VARCHAR(50) DEFAULT 'new',
  RENAME COLUMN full_name TO name,
  RENAME COLUMN legal_issue TO description;
```

### Step 2: Seed Test Data

Run the seeding script to populate test attorneys and ZIP mappings:

```bash
node scripts/seed-county-data.mjs
```

This will:
- Create 3 test attorneys (Joe, Maria, Robert)
- Assign them to different counties and practice areas
- Map 150+ ZIP codes to their respective counties

### Test Data

After seeding, you can test with these ZIP codes:

| ZIP | County | Attorney | Practice Areas |
|-----|--------|----------|---|
| 33618 | Hillsborough | Joe Smith | Car Accidents & Injury, Criminal Defense |
| 33701 | Pinellas | Maria Garcia | Family Law, Immigration |
| 33510 | Pasco | Robert Johnson | Business Law, Real Estate Law |

## API Changes

### `/api/find-attorney` (POST)

**Request:**
```json
{
  "zipCode": "33618",
  "practiceArea": "Car Accidents & Injury"
}
```

**Response (Attorney Found):**
```json
{
  "attorneyId": "uuid-here",
  "county": "Hillsborough County"
}
```

**Response (No Attorney):**
```json
{
  "attorneyId": null,
  "county": "Hillsborough County"
}
```

**Response (ZIP Not in Service Area):**
```json
{
  "attorneyId": null,
  "county": null
}
```

### `/api/submit-lead` (POST)

**Request:**
```json
{
  "attorneyId": "uuid-here",
  "zipCode": "33618",
  "county": "Hillsborough County",
  "practiceArea": "Car Accidents & Injury",
  "fullName": "John Doe",
  "phone": "(555) 123-4567",
  "email": "john@example.com",
  "legalIssue": "Car accident claim"
}
```

## Adding New Counties

To expand to additional counties:

1. **Get ZIP code list** for the new county
2. **Add to `zip_counties` table** with the new county name
3. **Create attorneys** in `attorneys` table
4. **Assign territories** in `territories` table with new county
5. All ZIP codes automatically route to the assigned attorney

## Frontend Changes

The homepage and intake form maintain the exact same design. The only changes:
- Search now validates against `zip_counties` table
- Attorney matching uses `counties` instead of direct ZIP mappings
- Intake form passes `county` parameter to submit lead API

**County selection is invisible to users** — it happens automatically based on their ZIP code entry.

## Troubleshooting

### "We are currently expanding in your area"

This message appears when:
1. ZIP code not found in `zip_counties` table
2. No attorney assigned to that county + practice area combination
3. Attorney's territory assignment is marked `active = false`

### Check if ZIP is mapped:
```sql
SELECT county FROM zip_counties WHERE zip_code = '33618';
```

### Check territory assignment:
```sql
SELECT attorney_id, county, practice_area, active
FROM territories
WHERE county = 'Hillsborough County'
  AND practice_area = 'Car Accidents & Injury'
  AND active = true;
```

### Check attorney is active:
```sql
SELECT id, name, active FROM attorneys WHERE id = 'uuid-here';
```
