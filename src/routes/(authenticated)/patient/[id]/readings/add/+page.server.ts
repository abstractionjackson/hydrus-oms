import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { intervalFromDates } from '$lib/utils';
import type { Interval } from '$lib/types';

export const load = (async ({ locals: { supabase }, params }) => {
	const { id } = params;
	const { data, error } = await supabase
		.from('patient')
		.select('id, name_last, name_first, case_date')
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
		const date = formData.get('date') as string;
		const iop = Number(formData.get('iop') as string);
		const { id } = params;
		const readingQuery = await supabase.from('reading').insert({ patient: Number(id), date, iop });
		if (readingQuery.error) {
			console.error(readingQuery.error);
		}
		throw redirect(303, `/patient/${id}`);
	}
} satisfies Actions;
