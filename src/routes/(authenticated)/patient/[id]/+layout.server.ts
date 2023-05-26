import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params, depends }) => {
	depends('supabase:reading');
	const { id } = params;
	const { data, error } = await supabase
		.from('patient')
		.select('*, reading(id, date, iop), medication(id, date, amount)')
		.eq('id', id)
		.single();
	if (error) {
		console.error(error);
	}
	if (!data) {
		return { patient: null };
	}
	return {
		patient: data
	};
}) satisfies LayoutServerLoad;
