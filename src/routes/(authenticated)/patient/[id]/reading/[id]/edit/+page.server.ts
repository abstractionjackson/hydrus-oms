import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, params }) => {
	const { id } = params;
	const { data, error } = await supabase
		.from('reading')
		.select('*, patient(name_last, name_first)')
		.eq('id', id)
		.single();
	if (error) {
		console.error(error);
	}
	return { reading: data };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals: { supabase }, request, params }) => {
		const formData = await request.formData();
		const date = formData.get('date') as string;
		const iop = Number(formData.get('iop') as string);
		const { id } = params;
		const { data, error } = await supabase
			.from('reading')
			.update({ date, iop })
			.eq('id', id)
			.select('patient')
			.single();
		if (error) {
			console.error(error);
		}
		throw redirect(303, `/patient/${data?.patient}?redirectFrom=editReading&date=${date}`);
	}
} satisfies Actions;
