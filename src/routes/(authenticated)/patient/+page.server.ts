import type { PageServerLoad } from '../patient/$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('patient').select('*, reading(*), medication(*)');
	if (error) throw error;
	return { patients: data };
}) satisfies PageServerLoad;
