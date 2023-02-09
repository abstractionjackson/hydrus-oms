import { error as AppError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { supabase } from '$lib/db';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		try {
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw AppError(500, error.message);
			return { success: true };
		} catch (error) {
			throw AppError(500, error.message);
		}
	}
} satisfies Actions;
