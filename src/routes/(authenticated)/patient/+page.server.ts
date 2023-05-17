import type { PageServerLoad } from '../patient/$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('patient').select('*');
	if (error) throw error;
	return { patients: data };
};
