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

/**
 * Server-side reader using the public anon key.
 *
 * For server components / route handlers that only read publicly-readable
 * data (e.g. published articles). This preserves the original behavior of
 * those reads, which used the anon key rather than the service-role key.
 */
let serverReaderClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient {
  if (serverReaderClient) return serverReaderClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Supabase server reader is not configured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.",
    )
  }

  serverReaderClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return serverReaderClient
}
