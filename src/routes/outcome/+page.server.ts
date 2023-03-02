import { routeTitles } from '$lib/constants';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const title = routeTitles[event.route.id];
	const { supabaseClient } = await getSupabase(event);
	const { data } = await supabaseClient.from('reading').select();
	return {
		title,
		readingList: data
	};
}) satisfies PageServerLoad;
