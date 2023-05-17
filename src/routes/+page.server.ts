import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	if (session) {
		throw redirect(303, '/patient');
	}

	return { url: url.origin };
};

export const actions = {
	signinwithemail: async ({ locals: { supabase }, request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: url.origin + '/signing-in?redirect=/'
			}
		});
		return { success: true };
	},
	signinwithemailandpassword: async ({ locals: { supabase }, request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			throw error;
		}
		return { success: true };
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
} satisfies Actions;
