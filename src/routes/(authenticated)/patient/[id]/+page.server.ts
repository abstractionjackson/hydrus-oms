import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	deleteReading: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const readingIds = JSON.parse(formData.get('readingIds') as string);
		//delete all readings by id
		await supabase.from('reading').delete().in('id', readingIds);
		return { success: true };
	},
	deletePatient: async ({ locals: { supabase }, params, request }) => {
		const { id } = params;
		const formData = await request.formData();
		const [name_last, name_first] = [formData.get('name_last'), formData.get('name_first')];
		//delete patient by id
		const { error } = await supabase.from('patient').delete().eq('id', Number(id));
		if (error) {
			console.error(error);
		}
		throw redirect(
			303,
			`/patient?redirectFrom=deletePatient&name_last=${name_last}&name_first=${name_first}`
		);
	}
} satisfies Actions;
