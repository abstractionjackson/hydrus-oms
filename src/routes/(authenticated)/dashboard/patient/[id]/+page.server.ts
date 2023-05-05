import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params }) => {
	const { id } = params;
	const { data, error } = await supabase.from('patient').select().eq('id', id).single();
	if (error) {
		console.error(error);
	}
	return {
		patient: data
	};
}) satisfies PageServerLoad;
