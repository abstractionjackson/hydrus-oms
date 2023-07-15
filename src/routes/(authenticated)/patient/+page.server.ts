import type { PageServerLoad } from '../patient/$types';

export const load = (async ({ locals: { supabase } }) => {
	// todo - filter by user
	// really todo - add rls to supabase
	const { data, error } = await supabase.from('patients').select('*');
	if (error) throw error;
	return { patients: data };
}) satisfies PageServerLoad;
