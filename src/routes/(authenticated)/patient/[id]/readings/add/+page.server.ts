import { redirect } from '@sveltejs/kit';
import type { Action, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params }) => {
	const { id } = params;
	const { data, error } = await supabase
		.from('patient')
		.select('id, name_last, name_first')
		.eq('id', id)
		.single();
	if (error) {
		console.error(error);
	}
	return { patient: data };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals: { supabase }, request, params }) => {
		const formData = await request.formData();
		const date = formData.get('date');
		const iop = formData.get('iop');
		const { id } = params;
		const { data, error } = await supabase.from('reading').insert({ patient: id, date, iop });
		if (error) {
			console.error(error);
		}
		throw redirect(303, `/patient/${id}`);
	}
} satisfies Action;
