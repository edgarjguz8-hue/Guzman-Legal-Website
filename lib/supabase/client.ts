import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Browser/anon Supabase client.
 *
 * Uses the public anon key and is safe to import from Client Components. It is
 * also fine for server-side reads of publicly-readable data (e.g. ZIP/county
 * and approved-attorney lookups) where the anon key + RLS already govern
 * access. For privileged writes/reads, use `lib/supabase/server.ts` instead.
 *
 * A single instance is memoized per environment to avoid creating a new client
 * on every call.
 */
let browserClient: SupabaseClient | null = null

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Supabase browser client is not configured: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.",
    )
  }

  browserClient = createClient(url, anonKey)
  return browserClient
}
