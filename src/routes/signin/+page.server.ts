import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			return fail(401, { email, incorrect: true, message: error.message})
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
