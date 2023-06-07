import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	create: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		// get name_last, name_first, dob, od, os from formData
		const name_last = formData.get('name_last'),
			name_first = formData.get('name_first'),
			dob = formData.get('dob'),
			case_date = formData.get('case_date'),
			od = formData.get('od'),
			os = formData.get('os');

		// validation
		let od_os: string[] = [];
		if (od && os) {
			od_os = ['OD', 'OS'];
		} else if (od) {
			od_os = ['OD'];
		} else if (os) {
			od_os = ['OS'];
		} else {
			throw new Error('OD/OS not selected');
		}
		// insert into database table patient
		const { data, error } = await supabase
			.from('patient')
			.insert([{ name_last, name_first, dob, case_date, od_os }])
			.select('id, name_last, name_first')
			.single();
		if (error) {
			console.error(error);
		}
		throw redirect(
			303,
			`/patient/${data?.id}`
		);
	}
} satisfies Actions;
