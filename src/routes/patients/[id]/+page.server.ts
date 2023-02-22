import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	operation: async (event) => {
		const data = await event.request.formData();
		const date = data.get('date');
		const patient_id = data.get('patient_id');
		// insert to the operation table
		try {
			const { supabaseClient } = await getSupabase(event);
			const { data, error } = await supabaseClient.from('operation').insert({ date, patient_id });
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	},
	reading: async (event) => {
		const data = await event.request.formData();
		const date = data.get('date');
		const patient_id = data.get('patient_id');
		const psi = data.get('psi');
		try {
			const { supabaseClient } = await getSupabase(event);
			const { data, error } = await supabaseClient
				.from('reading')
				.insert({ date, patient_id, psi });
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
} satisfies Actions;
