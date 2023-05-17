import type { Actions } from './$types';

export const actions = {
	signup: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		await supabase.auth.signUp({
			email,
			password
		});
		return { success: true };
	}
} satisfies Actions;
