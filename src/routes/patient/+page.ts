import { routeTitles as titles } from '$lib/constants';
import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = (async (event) => {
	let data = {
		title: titles[event.route.id]
	};
	const { session, supabaseClient } = await getSupabase(event);
	const result = await supabaseClient.from('patient').select('*');
	if (result.error) {
		console.error(result.error);
		data = { ...data, success: false };
	} else {
		data = { ...data, success: true, patientList: result.data };
	}
	return data;
}) satisfies PageLoad;
