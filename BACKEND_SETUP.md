# Backend Implementation Guide

This document explains the new backend functionality added to the AttorneyAbogado homepage.

## Overview

The following features have been added to enable attorney matching based on ZIP code and practice area:

1. **Attorney Search Flow**: Users can enter a ZIP code and select a legal issue to find matching attorneys
2. **Intake Form**: If an attorney is found, users are directed to a form to provide case details
3. **Lead Management**: Submitted leads are stored in the database with attorney associations
4. **Availability Message**: If no attorney is available, users see a message saying "We are currently expanding in your area"

## Database Schema

Three Supabase tables are used:

### `attorneys`
Stores attorney information:
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text)
- `created_at` (timestamp)

### `territories`
Maps attorneys to service areas and practice areas:
- `id` (uuid, primary key)
- `attorney_id` (uuid, foreign key to attorneys.id)
- `zip_code` (text)
- `practice_area` (text)
- `created_at` (timestamp)

### `leads`
Stores client intake information:
- `id` (uuid, primary key)
- `attorney_id` (uuid, foreign key to attorneys.id)
- `zip_code` (text)
- `practice_area` (text)
- `full_name` (text)
- `phone` (text)
- `email` (text)
- `legal_issue` (text)
- `created_at` (timestamp)

## Available Practice Areas

- Car Accidents & Injury
- Criminal Defense
- Family Law
- Immigration
- Employment Law
- Business Law
- Estate Planning & Probate
- Real Estate Law

## Setting Up Test Data

To populate the database with test attorneys and territories, use the seed script:

```bash
# First, ensure environment variables are loaded
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run the seed script
node scripts/seed-data.mjs
```

The seed script creates:
- 3 test attorneys
- 6 territories mapping attorneys to ZIP codes and practice areas

### Example Test Data

After seeding, you can test with:
- **ZIP Code**: 10001, 10002, or 10003
- **Practice Areas Available**:
  - Car Accidents & Injury (all three ZIPs)
  - Family Law (10001, 10002)
  - Criminal Defense (10001)

## How the Flow Works

### 1. Homepage Search (app/page.tsx)

The homepage now has an interactive form that:
- Accepts a 5-digit ZIP code
- Allows selection from 8 practice areas
- Calls `/api/find-attorney` to check for matching attorneys

### 2. Attorney Search API (app/api/find-attorney/route.ts)

This API endpoint:
- Receives ZIP code and practice area
- Queries the `territories` table
- Returns attorney ID if found, or null if not found

### 3. Intake Form (app/intake/page.tsx)

If an attorney is found:
- User is redirected to the intake form page
- Form collects: full name, phone, email, legal issue description
- Form includes confidentiality notice and security messaging

### 4. Lead Submission API (app/api/submit-lead/route.ts)

When the intake form is submitted:
- Validates all required fields
- Creates a new record in the `leads` table
- Associates the lead with the matched attorney
- Redirects to thank-you page on success

### 5. Thank You Page (app/thank-you/page.tsx)

Confirmation page showing:
- Success message
- What happens next (3-step process)
- Link back to homepage

## Environment Variables

The following environment variables are required and should already be set:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key (for client-side)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for server-side)

## File Structure

New files added:
- `lib/supabase.ts` - Supabase client setup
- `app/intake/page.tsx` - Intake form page
- `app/thank-you/page.tsx` - Thank you confirmation page
- `app/api/find-attorney/route.ts` - Attorney search API
- `app/api/submit-lead/route.ts` - Lead submission API
- `scripts/seed-data.mjs` - Database seeding script

Modified files:
- `app/page.tsx` - Added interactive search form

## Testing

### Test the Search Flow

1. **No Match Found**:
   - ZIP: 99999, Practice Area: Any
   - Result: "We are currently expanding in your area" message

2. **With Test Data (after seeding)**:
   - ZIP: 10001, Practice Area: Car Accidents & Injury
   - Result: Redirects to intake form

3. **Submit Intake Form**:
   - Fill all fields
   - Submit
   - Result: Redirects to thank-you page
   - Verify: Lead is saved in `leads` table

## Design Notes

- **Homepage**: Design remains exactly the same - only functionality added
- **Intake Form**: Clean, professional design matching the brand
- **Thank You Page**: Confirmation with clear next steps
- **Error Handling**: User-friendly error messages for failed submissions
- **Responsive**: All pages are mobile-responsive

## Security Considerations

- Service role key is only used on server-side (API routes)
- Client only has anonymous key access
- All inputs are validated on the server
- Lead data is properly scoped to attorneys
- Sensitive information is never logged
