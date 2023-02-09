import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

const url = dev ? env.PUBLIC_SUPABASE_LOCAL_URL : env.SUPABASE_URL;
const key = dev ? env.PUBLIC_SUPABASE_LOCAL_ANON_KEY : env.SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);
