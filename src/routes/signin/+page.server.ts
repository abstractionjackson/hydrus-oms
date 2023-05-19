import type { Actions } from '../$types';

export const actions = {
	default: async ({ locals: { supabase }, request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			throw error;
		}
		return { success: true };
	}
} satisfies Actions;
