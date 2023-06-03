import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { ODOS } from '$lib/types';
import { getPreviousDate } from '$lib/utils';

export const actions = {
	create: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		// get name_last, name_first, dob, etc from formData
		const name_last = formData.get('name_last'),
			name_first = formData.get('name_first'),
			dob = formData.get('dob'),
			case_date = formData.get('case_date'),
			od = formData.get('od'),
			os = formData.get('os'),
			pre_op_iop = formData.get('pre_op_iop'),
			pre_op_meds_count = formData.get('pre_op_meds_count');

		// validation
		let od_os: ODOS;
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
		// redirect to patients page
		if (error) {
			console.error(error);
		}
		console.log('added patient', data);
		await supabase.from('reading').insert([
			{
				patient: data.id,
				date: getPreviousDate(case_date),
				iop: pre_op_iop,
				medication: pre_op_meds_count
			}
		]);
		throw redirect(
			303,
			`/patient?redirectFrom=patient/add&id=${data.id}&name_last=${data.name_last}&name_first=${data.name_first}`
		);
	}
} satisfies Actions;
