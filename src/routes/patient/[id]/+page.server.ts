import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	update: async (event) => {
		const data = await event.request.formData();
		const name_last = data.get('name_last');
		const name_first = data.get('name_first');
		const dob = data.get('dob');
		const id = data.get('id');
		const readingData = data.get('reading') as string;
		const reading = JSON.parse(readingData);
		// db
		const { supabaseClient } = await getSupabase(event);
		// update the patient
		await supabaseClient
			.from('patient')
			.update({
				name_first,
				name_last,
				dob
			})
			.eq('id', id);
		// delete exiting readings marked for deletion
		const patient_id = id;
		for (const { id, flag_delete, date, oir } of reading) {
			if (flag_delete) {
				// delete
				await supabaseClient.from('reading').delete().eq('id', id);
			} else if (id) {
				// update
				await supabaseClient
					.from('reading')
					.update({
						date,
						oir
					})
					.eq('id', id);
			} else {
				// create
				const { error } = await supabaseClient.from('reading').insert({
					date,
					oir,
					patient_id
				});
				console.log('ERR, ', error);
			}
		}
		throw redirect(304, `/patient/${id}`);
	}
} satisfies Actions;
