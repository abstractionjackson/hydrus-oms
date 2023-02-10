import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
const url = PUBLIC_SUPABASE_URL ?? '';
const key = PUBLIC_SUPABASE_ANON_KEY ?? '';
export const supabase = createClient(url, key);
