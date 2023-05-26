import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	create: async ({ locals: { supabase }, request, params }) => {
		const formData = await request.formData();
		const date = formData.get('date') as string;
		const amount = Number(formData.get('amount') as string);
		const { id } = params;
		const medicationQuery = await supabase
			.from('medication')
			.insert({ patient: Number(id), date, amount });
		if (medicationQuery.error) {
			console.error(medicationQuery.error);
		}
		throw redirect(303, `/patient/${id}`);
	}
} satisfies Actions;
