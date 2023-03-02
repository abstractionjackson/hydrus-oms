import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const name_first = formData.get('name_first');
		const name_last = formData.get('name_last');
		const dob = formData.get('dob');
		const operation_date = formData.get('operation_date');
		try {
			const { session, supabaseClient } = await getSupabase(event);
			// create a patient record
			const { data, error } = await supabaseClient
				.from('patient')
				.insert({ name_first, name_last, dob, surgeon_id: session.user.id })
				.select();
			if (error) {
				console.error(error);
				return { success: false };
			}
			const { id } = data[0];
			if (operation_date) {
				const response = await supabaseClient
					.from('operation')
					.insert({ operation_date, patient_id: id });
				if (response.error) {
					console.error('Error creating operation record', response.error);
					return { success: false };
				}
			}
			return { success: true, id };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
} satisfies Actions;
