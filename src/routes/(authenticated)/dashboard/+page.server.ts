import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('patient').select('*');
	if (error) throw error;
	return { patients: data };
};
