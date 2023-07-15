import { error as layoutError } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types';
import type { Patient } from '$types';

export const load = (async ({ locals: { supabase }, params, depends }) => {
	depends('supabase:reading');
	const { id } = params;
	const { data, error } = await supabase
		.from('patients')
		.select('*, iop_readings ( * ), medication_readings ( * )')
		.eq('id', id)
		.single();
	if (error) {
		console.error(error);
	}
	if (!data) {
		throw layoutError(
			404, {
				message: 'Patient not found'
			}
		)
	}
	return { patient: data as Patient };
}) satisfies LayoutServerLoad;
