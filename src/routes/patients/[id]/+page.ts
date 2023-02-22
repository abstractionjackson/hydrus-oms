import { getSupabase } from '@supabase/auth-helpers-sveltekit';
export const load = async (event) => {
	const { id } = event.params;
	try {
		const { supabaseClient } = await getSupabase(event);
		let response = await supabaseClient.from('patient').select('*').eq('id', id).limit(1);
		const patient = response.data[0];
		response = await supabaseClient.from('operation').select('*');
		const operation = response.data;
		response = await supabaseClient.from('reading').select('*').eq('patient_id', id);
		const readings = response.data;
		return {
			patient,
			operation,
			readings
		};
	} catch (error) {
		console.error(error);
	}
};
