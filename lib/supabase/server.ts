import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase client using the service-role key.
 *
 * Use this for privileged operations such as inserting leads. A runtime guard
 * throws if the module is ever evaluated in the browser, so the service-role
 * secret can never be exercised client-side. (We avoid the `server-only`
 * package to keep the dependency footprint unchanged.)
 */
let adminClient: SupabaseClient | null = null

export function getSupabaseAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error(
      "getSupabaseAdminClient() must never be called in the browser — it uses the service-role key.",
    )
  }

  if (adminClient) return adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is not configured: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
    )
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}
