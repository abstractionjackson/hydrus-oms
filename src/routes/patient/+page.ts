import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = (async (event) => {
	try {
		const { session, supabaseClient } = await getSupabase(event);
		const { data, error } = await supabaseClient.from('patient').select('*');
		if (error) {
			console.error(error);
			return { success: false };
		}
		return { success: true, patients: data };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}) satisfies PageServerLoad;
