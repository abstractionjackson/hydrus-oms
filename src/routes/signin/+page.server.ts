import type { Actions } from '../$types';

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
	}
} satisfies Actions;
