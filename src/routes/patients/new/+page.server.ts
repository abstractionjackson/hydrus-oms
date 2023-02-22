import { supabase } from '$lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name_first = formData.get('name_first');
		const name_last = formData.get('name_last');
		const dob = formData.get('dob');
		try {
			const { session, supabaseClient } = await getSupabase(event);
			// create a patient record
			const { data, error } = await supabaseClient
				.from('patient')
				.insert({ name_first, name_last, dob, surgeon_id: session.user.id });
			if (error) {
				console.error(error);
				return { success: false };
			}
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
