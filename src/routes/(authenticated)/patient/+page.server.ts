import type { PageServerLoad } from '../patient/$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('patient').select('*, reading(*)');
	if (error) throw error;
	return { patients: data };
};
