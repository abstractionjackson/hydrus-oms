import { getSupabase } from '@supabase/auth-helpers-sveltekit';
export const load = async (event) => {
	const { id } = event.params;
	try {
		const { supabaseClient } = await getSupabase(event);
		const { data } = await supabaseClient.from('patient').select('*, operation(*), reading(*)').eq('id', id).limit(1);
		return {
     patient: {...data[0]}
		};
	} catch (error) {
		console.error(error);
	}
};
