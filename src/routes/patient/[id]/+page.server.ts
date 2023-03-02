import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	update: async (event) => {
		const data = await event.request.formData();
		const name_last = data.get('name_last');
		const name_first = data.get('name_first');
		const dob = data.get('dob');
		const id = data.get('id');
		const { supabaseClient } = await getSupabase(event);
		try {
			const { data, error } = await supabaseClient
				.from('patient')
				.update({ name_last, name_first, dob })
				.eq('id', id);
			if (error) {
				console.error(error);
				return { success: false };
			} else {
				return { success: true };
			}
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
} satisfies Actions;
