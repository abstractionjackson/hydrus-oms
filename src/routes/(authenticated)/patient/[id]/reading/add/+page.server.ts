import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	create: async ({ locals: { supabase }, request, params }) => {
		const formData = await request.formData();
		const date = formData.get('date') as string;
		const iop = Number(formData.get('iop') as string);
		const medication = Number(formData.get('medication') as string);
		const { id } = params;
		const readingQuery = await supabase
			.from('reading')
			.insert({ patient: Number(id), date, iop, medication });
		if (readingQuery.error) {
			console.error(readingQuery.error);
		}
		throw redirect(303, `/patient/${id}`);
	}
} satisfies Actions;
